require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const viewsRoutes = require('./routes/views');


const app = express();

app.set('port', 4000);
app.set('views', __dirname + '/views');
app.use('/assets', express.static('public'));

app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});

app.use('/', loginRoutes);
app.use('/', viewsRoutes);
