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
    }
}

function cargarN(req , res){
    res.render('docentes/cargar_notas');
}
function regresarD(req , res){
    res.render('docentes/dashboard');
}

async function horario(req, res){
    // horario = await dbConection.selectRaw('SELECT * FROM usuarios WHERE nombre_usuario = ?', [data.username]);
    res.render('estudiantes/horario', {userName: req.session.name});
}

async function cargarEstudiantes (req, res){
       nombresE = await dbConection.selectRaw('SELECT es.nombre, es.apellido, m.nombre, es.id_usuario, m.id_materia from academugod.registro_materias as rm inner join academugod.estudiantes as es on rm.id_estudiante = es.id_estudiante inner join academugod.materias as m on rm.id_materia = m.id_materia where m.id_materia = 7;');
       console.log(nombresE);
       res.render('docentes/cargar_notas', {userName: req.session.name});
}

module.exports = {
    dashboard,
    cargarN, 
    horario,
    regresarD,
    cargarEstudiantes,
}