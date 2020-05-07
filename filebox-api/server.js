const express = require('express');
const app = express();

require('./config/db');

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

const fileRoute = require('./controllers/files')();

app.use('/files', fileRoute);

app.use(function (err, req, res, next) {
    res.status(err.status || 400).json(err);
})

app.listen(4040, function (err, done) {
    if (err) {
        console.log('server listening failed');
    } else {
        console.log('server listening at port 4040');
    }
})