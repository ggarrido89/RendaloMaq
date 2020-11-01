const mongoose = require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/rendalomaq',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('Connected to mongo'))
    .catch(err => {console.error('DB Error:');console.error(err)})