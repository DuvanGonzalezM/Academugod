const loginController = require('../controllers/loginController');

var routes = [];

routes.push(
    {
        'method': 'get',
        'path': '/login',
        'function': loginController.login
    },
    {
        'method': 'post',
        'path': '/login',
        'function': loginController.auth
    },
    {
        'method': 'get',
        'path': '/logout',
        'function': loginController.logout
    },
);

module.exports = routes;