const mongoose = require('mongoose');

const dbUrl = 'mongodb://127.0.0.1:27017/filebox';

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

mongoose.connection.once('open', function (done) {
    console.log('database connection successfull');
})

mongoose.connection.on('error', function (err) {
    console.log('database connection failed');
})