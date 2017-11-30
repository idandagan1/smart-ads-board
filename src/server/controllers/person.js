const Person = require('../models').Person;
const utils = require('../utils/utils');
const  mysql = require('mysql2');
module.exports = {
   create(req, res) {
    return utils.createPerson(req.body).then((person)=> {
        return res.json(person);
    });

  }



};