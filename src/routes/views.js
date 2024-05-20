const viewController = require('../controllers/viewController');
const adminController = require('../controllers/adminController');

var routes = [];
var routesStudents = [];
var routesTeachers = [];
var routesAdmin = [];

routes.push(
    {
        'method': 'get',
        'path': '/',
        'function': viewController.dashboard
    },
);

// Rutas estudiantes
routesStudents.push(
    {
        'method': 'get',
        'path': '/estudiante/horario',
        'function': viewController.horario
    },
);

// Rutas Administrativos
routesAdmin.push(
    {
        'method': 'get',
        'path': '/admistrativo/estudiantes',
        'function': adminController.estudiantes
    },

    {
        'method': 'get',
        'path': '/admistrativo/Registrar',
        'function': adminController.Registrar
    },

    {
        'method': 'get',
        'path': '/admistrativo/Consultar',
        'function': adminController.Consultar
    },

    {
        'method': 'get',
        'path': '/admistrativo/atras',
        'function': adminController.atras1
    },
);

routes = routes.concat(
    routesStudents,
    routesTeachers,
    routesAdmin,
);

module.exports = routes;