const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const HTML_FILE = path.join(__dirname, '../public/index.html');

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.json());
app.use(routes);
//app.get('*', (req, res) => res.sendFile(HTML_FILE));

const server = app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
