const dbConection = require('../services/dataBaseService');
const redesController = require('../controllers/redesController');

async function dashboard(req, res){
    switch (req.session.rol) {
        case '1':
            res.render('estudiantes/dashboard', {userName: req.session.name});
            break;
        case '2':
            res.render('docentes/dashboard', {userName: req.session.name});
            break;
        case '3':
            res.render('administrativos/dashboard', {userName: req.session.name});
            break;
        case '4':
            await dbConection.selectRaw('SELECT t.* FROM temperaturas as t order by t.datetime desc limit 100').then((temperaturas) => {
                temperaturas = redesController.formatedDateTemperature(temperaturas);
                var lastTemperature = temperaturas.shift();
                res.render('redes/dashboard', {userName: req.session.name, lastTemperature: lastTemperature, temperaturas: JSON.stringify(temperaturas)});
            }).catch((error) => {
                res.render('redes/dashboard', {userName: req.session.name, lastTemperature: [], temperaturas: JSON.stringify([])});
            });
            break;
        default:
            res.render('estudiantes/dashboard', {userName: req.session.name});
    }
}

async function horario(req, res){
    // horario = await dbConection.selectRaw('SELECT * FROM usuarios WHERE nombre_usuario = ${data.username}');
    res.render('estudiantes/horario', {userName: req.session.name});
}

module.exports = {
    dashboard,
    horario,
}
