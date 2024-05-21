require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const Routes = require('./routes/generateRoutes');

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

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
    console.log(app.get('port'));
});

app.use('/', Routes);
// app.use('/', viewsRoutes);
