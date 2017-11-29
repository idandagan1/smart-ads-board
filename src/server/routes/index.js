const person = require('../controllers').person;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }));

  app.post('/api/person', person.create);

};
