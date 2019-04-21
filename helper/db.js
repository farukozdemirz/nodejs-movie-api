const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://farukozdemir:22110022f@ds137255.mlab.com:37255/heroku_p0v2bsq4', { useNewUrlParser: true });

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected')
    })
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err)
    })

    mongoose.Promise = global.Promise;
};