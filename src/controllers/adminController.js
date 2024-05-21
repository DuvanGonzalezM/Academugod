const dbConection = require('../services/dataBaseService');

function estudiantes(req, res){
    res.render('administrativos/ed_est', {userName: req.session.name});
}

function registrarEstudiante(req, res){
    res.render('administrativos/reg_est', {userName: req.session.name});
}

async function consultarEstudiante(req, res){
    await dbConection.selectRaw('SELECT * FROM estudiantes').then((estudiantes) => {
        res.render('administrativos/cons_est', {userName: req.session.name, estudiantes: estudiantes});
    }).catch((error) => {
        res.render('administrativos/cons_est', {userName: req.session.name, estudiantes: []});
    });
}

async function consultarProfesores(req, res){
    await dbConection.selectRaw('SELECT * FROM profesores').then((profesores) => {
        res.render('administrativos/cons_pro', {userName: req.session.name, profesores: profesores});
    }).catch((error) => {
        res.render('administrativos/cons_pro', {userName: req.session.name, profesores: []});
    });
}
function profesores(req, res){
    res.render('administrativos/ed_pro', {userName: req.session.name});
}

function registrarProfesores(req, res){
    res.render('administrativos/reg_pro', {userName: req.session.name});
}


module.exports = {
    estudiantes,
    registrarEstudiante,
    consultarEstudiante,
    profesores,
    registrarProfesores,
    consultarProfesores,
}
