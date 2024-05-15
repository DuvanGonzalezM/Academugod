const viewController = require('../controllers/viewController');

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

// Rutas docentes
routesTeachers.push(
    {
        'method': 'get',
        'path': '/estudiante/horario',
        'function': viewController.horario
    },
    {
        'method': 'get',
        'path': '/docentes/cargar_notas',
        'function': viewController.cargarN
    },
    {
        'method': 'get',
        'path': '/docentes/dashboard',
        'function': viewController.regresarD
    },
);

routes = routes.concat(
    routesStudents,
    routesTeachers,
    routesAdmin,
);

module.exports = routes;