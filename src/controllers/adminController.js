const dbConection = require('../services/dataBaseService');

function estudiantes(req, res) {
    res.render('administrativos/ed_est', { userName: req.session.name });
}

function registrarEstudiante(req, res) {
    res.render('administrativos/reg_est', { userName: req.session.name });
}

async function updateestudiante(req, res) {
    const { numero_estudiante, nombre, apellido } = req.body;
    var id_estudiante = req.params.id_estudiante;
    await dbConection.updateRaw('update estudiantes set numero_estudiante = '+numero_estudiante+' ,nombre = '+nombre+' , apellido = '+apellido+'  where id_estudiante = '+id_estudiante).then((estudiantes) => {
        console.log(estudiantes[0].numero_estudiante);
            res.redirect('administrativos/cons_est');
        })
        .catch((error) => {
            res.render('administrativos/cons_est', { userName: req.session.name, error });
        });
}

async function consultarEstudiante(req, res) {
    await dbConection.selectRaw('SELECT * FROM estudiantes').then((estudiantes) => {
        res.render('administrativos/cons_est', { userName: req.session.name, estudiantes: estudiantes });
    }).catch((error) => {
        res.render('administrativos/cons_est', { userName: req.session.name, estudiantes: [] });
    });
}

async function editarEstudiante(req, res) {
    var id_estudiante = req.params.id_estudiante;
    await dbConection.selectRaw('SELECT * FROM estudiantes where id_estudiante = ?', [id_estudiante]).then((estudiantes) => {
        console.log(estudiantes[0].numero_estudiante);
        res.render('administrativos/edit_estudiante', { userName: req.session.name, estudiante: estudiantes[0] });
    }).catch((error) => {
        res.redirect('/admistrativo/consultar/estudiantes');
    });
}

async function consultarProfesores(req, res) {
    await dbConection.selectRaw('SELECT * FROM profesores').then((profesores) => {
        res.render('administrativos/cons_pro', { userName: req.session.name, profesores: profesores });
    }).catch((error) => {
        res.render('administrativos/cons_pro', { userName: req.session.name, profesores: [] });
    });
}
async function insertarEstudiante(req, res) {
    const { numero_estudiante, nombre, apellido } = req.body;
    await dbConection.insertRaw('INSERT INTO estudiantes (numero_estudiante, nombre, apellido) VALUES (' + numero_estudiante + ', "' + nombre + '", "' + apellido + '")')
        .then(() => {
            res.redirect('/admistrativo/consultar/estudiantes');
        })
        .catch((error) => {
            res.render('administrativos/reg_est', { userName: req.session.name, error });
        });
}
async function insertarProfesores(req, res) {
    const { no_identificacion, tipo_identificacion, nombre, apellido } = req.body;
    await dbConection.insertRaw('INSERT INTO profesores (no_identificacion , tipo_identificacion , nombre, apellido) VALUES (' + no_identificacion + ', "' + tipo_identificacion + '", "' + nombre + '", "' + apellido + '")')
        .then(() => {
            res.redirect('/admistrativo/consultar/profesores');
        })
        .catch((error) => {
            res.render('administrativos/reg_pro', { userName: req.session.name, error });
        });
}
async function updateprofesor(req, res) {
    const { no_identificacion,tipo_identificacion, nombre, apellido } = req.body;
    var id_profesor = req.params.id_profesor;
    await dbConection.updateRaw('update profesores set no_identificacion = '+no_identificacion+' ,tipo_identificacion = '+tipo_identificacion+' ,nombre = '+nombre+' , apellido = '+apellido+'  where id_estudiante = '+id_profesor).then((profesores) => {
        console.log(profesores[0].no_identificacion);
            res.redirect('/admistrativo/consultar/profesores');
        })
        .catch((error) => {
            res.render('administrativos/cons_pro', { userName: req.session.name, error });
            res.render('', { userName: req.session.name, error });
        });
}
function profesores(req, res) {
    res.render('administrativos/ed_pro', { userName: req.session.name });
}

function registrarProfesores(req, res) {
    res.render('administrativos/reg_pro', { userName: req.session.name });
}


module.exports = {
    estudiantes,
    registrarEstudiante,
    consultarEstudiante,
    profesores,
    registrarProfesores,
    consultarProfesores,
    insertarEstudiante,
    insertarProfesores,
    updateprofesor,
    editarEstudiante,
    updateestudiante,
}
