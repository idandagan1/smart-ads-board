const Person = require('../models').Person;
const _ = require('lodash');
const  mysql = require('mysql2');
module.exports = {
   createPerson(person) {
       const {personId, gender, age, glasses} = person;
       return new Promise((resolve, reject) => {
           var con = mysql.createConnection({
               host: "data-services-mysql.coao2qn5lx2j.us-east-1.rds.amazonaws.com",
               user: "tableau_search",
               password: "SearchTSearch",
               database: "TableauDB"
           });

           con.connect(function (err) {
               if (err) throw err;
               console.log("Connected!");
               var sql = `CALL fr_CreatePerson('${personId}', '${gender}', '${age}', '${glasses}');`;
               con.query(sql, function (err, result) {
                   if (err) throw err;
                   return resolve(result[0]);
               });
           });
       });
   },

    getCreatives() {
           return new Promise((resolve, reject) => {
               var con = mysql.createConnection({
                          host: "data-services-mysql.coao2qn5lx2j.us-east-1.rds.amazonaws.com",
                          user: "tableau_search",
                          password: "SearchTSearch",
                          database: "TableauDB"
                      });

                      con.connect(function (err) {
                          if (err){
                              return reject(err);
                          }
                          console.log("Connected!");
                          var sql = `CALL fr_GetCreative()`;
                          con.query(sql, function (err, result) {
                              if (err) throw err;
                              const resultSets = _.first(result);
                              const creatives = _.map(resultSets, (resultSet) => {
                                  const {creative_id, age_group, category, gender, is_glasses, img_name} = resultSet;
                                  return {
                                      creativeId: creative_id,
                                      ageRange: age_group,
                                      category,
                                      gender,
                                      imgName: img_name,
                                      isGlasses: is_glasses
                                  }
                              });
                              return resolve(creatives);
                          });
                      });
           });
       },
    getImpressions(personId) {
       return new Promise((resolve, reject) => {
           var con = mysql.createConnection({
                      host: "data-services-mysql.coao2qn5lx2j.us-east-1.rds.amazonaws.com",
                      user: "tableau_search",
                      password: "SearchTSearch",
                      database: "TableauDB"
                  });
           sql = `CALL fr_GetImpressions(${personId})`;
           con.query(sql, function (err, result) {
               const resultSets = _.first(result);
               const impressions = _.map(resultSets, (resultSet) => {
                   const {creative_id, liked} = resultSet;
                   return {
                       creativeId: creative_id,
                       liked
                   }
               });
               return resolve(impressions);
           });
       });
   },
   getPerson(person) {
       const {personId, gender, age, glasses} = person;
       return new Promise((resolve, reject) => {
           var con = mysql.createConnection({
             host: "data-services-mysql.coao2qn5lx2j.us-east-1.rds.amazonaws.com",
             user: "tableau_search",
             password: "SearchTSearch",
             database: "TableauDB"
           });

           con.connect(function(err) {
             if (err) throw err;
             console.log("Connected!");
             var sql = `CALL fr_GetPerson('${personId}');`;
             con.query(sql, function (err, result) {
               if (err) throw err;
               return resolve(result[0][0]);
             });
           });
       });

    // return Person
    //   .create(req.body)
    //   .then((person) => res.status(201).send(person))
    //   .catch((error) => res.status(400).send(error));
  }



};
