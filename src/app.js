const  express = require('express');
const bodyParser= require('body-parser');
const log = require('morgan');
const expressValidator = require('express-validator');
const publicPath = path.join(__dirname, '..', 'client', 'public', 'build');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(publicPath));
app.use(log('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());
require('./server/routes/index')(app);

const server = app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
