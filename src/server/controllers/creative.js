const _ = require('lodash');
const mysql = require('mysql2');
const utils = require('../utils/utils');
function matchAge(age, ageRang) {
    if (_.isNil(ageRang) || _.isEmpty(ageRang)) return 1;
    if (_.isNil(age)) return 1;
    const range = _.split(ageRang, '-');
    if (_.inRange(_.parseInt(age), _.parseInt(range[0]), _.parseInt(range[1]))) {
        return 2
    } else {
        return 0
    }
}
function matcher(str, otherStr) {
    if (_.isNil(otherStr) || _.isEmpty(otherStr) ) return 1;
    if (_.isNil(str) || _.isEmpty(str) ) return 1;
    if (_.toLower(_.toString(str)) === _.toLower(_.toString(otherStr))) {
        return 2
    } else {
        return 0
    }
}
module.exports = {
    setImpression(req, res){
        const {person, creativeId, liked} = req.body;
             var con = mysql.createConnection({
               host: "data-services-mysql.coao2qn5lx2j.us-east-1.rds.amazonaws.com",
               user: "tableau_search",
               password: "SearchTSearch",
               database: "TableauDB"
             });

             con.connect(function(err) {
               if (err) throw err;
               console.log("Connected!");
               var sql = `CALL fr_SetImpressions(${person.personId})`;
               con.query(sql, function (err, result) {
                 if (err) throw err;
                   res.send();
                   
                
               });
             });

    },
    getCreative(req, res) {
        const {personId} = req.body;
        return utils.getPerson(req.body)
        .then((person)=> {
            return Promise.all([person, utils.getCreatives()])
        }).then(([person ={}, creatives]) => {
            const candidates = _.map(creatives, (creative) => {
                let score = 1;
                score = score * matchAge(person.age, creative.ageRange);
                score = score * matcher(person.gender, creative.gender);
                score = score * matcher(person.glasses, creative.isGlasses);
                return _.assign(creative, {score});
            });
            return utils.getImpressions(personId) .then((impressions) =>{
                const likedCreative = _.find(impressions, {liked: true});
                if (likedCreative) {
                    const superCandidate = _.find(candidates, (candidate) => {
                        return candidate.creativeId !== likedCreative.creativeId
                            && candidate.category === likedCreative.category;
                    });
                    superCandidate.score = superCandidate.score * 100;
                }
                const finalCandidate = _.reject(candidates, (canidate) => canidate.score < 1);
                console.log("Succeeded");
                const personWithCreative = _.assign({}, person, {creatives: _.orderBy(finalCandidate, ['score', 'creativeId'], ['asc', 'asc'])});
                res.json(personWithCreative);
            });
        }).catch((err)=> {
            console.log(err);
            res.status(500).send();
        });
    }
};