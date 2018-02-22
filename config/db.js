const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.Promise = global.Promise;


mongoose.connect(config.database)
.then(()=> console.log('Database Successfully Connected!'))
.catch((err)=> console.log(err));
