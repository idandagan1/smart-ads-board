import express from 'express';
import bodyParser from 'body-parser';
import log from 'morgan';
import expressValidator from 'express-validator';
//import routes from './routes/';
app.use(log('dev'));
//app.use(routes);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(expressValidator());

const server = app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
