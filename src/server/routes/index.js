const person = require('../controllers').person;
const creative = require('../controllers').creative;
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!'
  }));

  app.post('/api/person', person.create);
  app.post('/api/creative', creative.getCreative);
  app.post('/api/impression', creative.setImpression);

};
