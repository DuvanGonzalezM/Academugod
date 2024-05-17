const dbConection = require('../services/dataBaseService');

function dashboard(req, res){
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
        default:
            res.render('estudiantes/dashboard', {userName: req.session.name});
    }
}

async function horario(req, res){
    // horario = await dbConection.selectRaw('SELECT * FROM usuarios WHERE nombre_usuario = ?', [data.username]);
    res.render('estudiantes/horario', {userName: req.session.name});
}

module.exports = {
    dashboard,
    horario,
}
