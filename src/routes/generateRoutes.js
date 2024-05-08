const express = require('express');
const loginRoutes = require('./login');
const viewsRoutes = require('./views');

var routes = [];
const router = express.Router();

routes = routes.concat(
    loginRoutes,
    viewsRoutes,
);

routes.forEach(route => {
    switch (route['method']) {
        case 'get':
            router.get(route['path'], function(req,res,next){
                if(req.session.loggedin != true && req.originalUrl != '/login' && req.originalUrl != '/logout'){
                    res.redirect('/login');
                } else{
                    next();
                }
            }, route['function']);
            break;
        case 'post':
            router.post(route['path'], function(req,res,next){
                if(req.session.loggedin != true && req.originalUrl != '/login'){
                    res.status(401);
                } else{
                    next();
                }
            }, route['function']);
            break;
        default:
            router.get(route['path'], function(req,res,next){
                if(req.session.loggedin != true && req.originalUrl != '/login' && req.originalUrl != '/logout'){
                    res.redirect('/login');
                } else{
                    next();
                }
            }, route['function']);
            break;
    }
});

module.exports = router;