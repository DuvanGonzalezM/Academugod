const bcrypt = require('bcrypt');
const dbConection = require('../services/dataBaseService');

function login(req, res){
    res.render('login/index', {layout: 'login.hbs' });
}

async function auth(req, res){
    const data = req.body;
    user = await dbConection.selectRaw('SELECT * FROM usuarios WHERE nombre_usuario = ?', [data.username]).then((user) => {
        if (user.length > 0) {
            bcrypt.compare(data.password, user[0].password, (err, isMatch) => {
                if (!isMatch) {
                    res.render('login/index', { layout: 'login.hbs', error: 'La constraseña es incorrecta!'})                    
                } else {
                    req.session.loggedin = true;
                    req.session.name = user[0].nombre_usuario;
                    req.session.id = user[0].id_usuario;
                    req.session.rol = user[0].rol;
    
                    res.redirect('/');
                }
            });
        } else {
            res.render('login/index', { layout: 'login.hbs', error: 'Usuario no existe!' })
        }
    }).catch((error) => {
        res.status(500).render('login/index', { layout: 'login.hbs', error: 'Error con la conexión a la base de datos!' })
    });
}

function logout(req, res){
    req.session.loggedin = false;
    req.session.name = '';
    req.session.id = '';
    req.session.rol = '';

    res.redirect('/');
}

module.exports = {
    login,
    auth,
    logout,
}