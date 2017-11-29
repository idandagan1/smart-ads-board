const Person = require('../models').Person;
const  mysql = require('mysql2');
module.exports = {
   create(req, res) {
    const {personId, gender, age, glasses} = req.body;
     var con = mysql.createConnection({
       host: "data-services-mysql.coao2qn5lx2j.us-east-1.rds.amazonaws.com",
       user: "tableau_search",
       password: "SearchTSearch",
       database: "TableauDB"
     });

     con.connect(function(err) {
       if (err) throw err;
       console.log("Connected!");
       var sql = `CALL fr_CreatePerson('${personId}', '${gender}', '${age}', '${glasses}');`;
       con.query(sql, function (err, result) {
         if (err) throw err;
         res.send();
       });
     });

    // return Person
    //   .create(req.body)
    //   .then((person) => res.status(201).send(person))
    //   .catch((error) => res.status(400).send(error));
  }



};