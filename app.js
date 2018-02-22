const express = require('express');
const handlebars = require('express-handlebars');

const session = require('express-session');
const cors = require('cors')
const bodyparser = require('body-parser');
const cookieparser =  require('cookie-parser');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const path = require('path');

const config = require('./config/config');

const index = require('./routes/index');
const route = require('./routes/route');

//initialising app
const app = express();

//initialising Database
//require('./config/db');

//setting up port
const port = process.env.PORT || 3004;


//
//setting handlebars html files
//
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');


//setting up bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());

//routing public files
app.use(express.static(path.join(__dirname, 'public')));

//setting up express sessions
// app.use(session({
//     secret : config.secretKey,
//     resave : true,
//     saveUninitialized : false,
//     cookie : { 
//         maxAge : 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

//initialising passport
// app.use(passport.initialize());
// app.use(passport.session());

//initialinsing cors
app.use(cors());

//setting up routes
app.use('/', index);
app.use('/route', route);

//setting up port
app.set('port', port);

//initialising app
app.listen(port, () =>{
    console.log('Server started on port:' + app.get('port'));
});
