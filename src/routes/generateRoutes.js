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
                } else if(route['path'] != '/' && req.session.rol != route['role']  && 0 != route['role']){
                    res.redirect('/');
                } else {
                    next();
                }
            }, route['function']);
            break;
        case 'post':
            router.post(route['path'], function(req,res,next){
                const data = req.body;
                const token = process.env.TOKEN_API;
                var access = false;
                if(req.originalUrl === '/login'){ 
                    access = true;
                } else if(typeof req.session.loggedin === "undefined"){
                    if(data.token === token){
                        access = true;
                    }
                } else if(req.session.loggedin == true && (req.session.rol == route['role'] || 0 == route['role'])){
                    access = true;
                }

                if(!access){
                    res.status(401).send("No tienes acceso para la solicitud");
                } else {
                    next();
                }
            }, route['function']);
            break;
        default:
            router.get(route['path'], function(req,res,next){
                if(req.session.loggedin != true && req.originalUrl != '/login' && req.originalUrl != '/logout'){
                    res.redirect('/login');
                } else if(route['path'] != '/' && req.session.id != route['role']  && 0 != route['role']){
                    res.redirect('/');
                } else {
                    next();
                }
            }, route['function']);
            break;
    }
});



module.exports = router;