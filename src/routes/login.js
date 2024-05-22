const loginController = require('../controllers/loginController');

var routes = [];

routes.push(
    {
        'method': 'get',
        'path': '/login',
        'function': loginController.login,
        'role': 0
    },
    {
        'method': 'post',
        'path': '/login',
        'function': loginController.auth,
        'role': 0
    },
    {
        'method': 'get',
        'path': '/logout',
        'function': loginController.logout,
        'role': 0
    },
);

module.exports = routes;