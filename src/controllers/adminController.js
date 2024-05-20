const dbConection = require('../services/dataBaseService');

function estudiantes(req, res){
    res.render('administrativos/ed_est', {userName: req.session.name});
}

function Registrar(req, res){
    res.render('administrativos/reg_est', {userName: req.session.name});
}

function Consultar(req, res){
    res.render('administrativos/cons_est', {userName: req.session.name});
}

function atras1(req, res){
    res.render('administrativos/dashboard', {userName: req.session.name});
}

module.exports = {
    estudiantes,
    Registrar,
    Consultar,
    atras1,

}
