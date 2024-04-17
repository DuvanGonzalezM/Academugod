const bcrypt = require('bcrypt');

function login(req, res){
    if(req.session.loggedin != true || !req.session.rol){
        res.render('login/index', {layout: 'login.hbs', logout: true });
    }else{
        res.redirect('/');
    }
}

function auth(req, res){
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [data.username], (err, userdata) => {
            if (userdata.length > 0) {
                bcrypt.compare(data.password, userdata[0].password, (err, isMatch) => {
                    if (!isMatch) {
                        res.render('login/index', { layout: 'login.hbs', error: 'La constraseña es incorrecta!', logout: true})                    
                    } else {
                        req.session.loggedin = true;
                        req.session.name = data.username;
                        req.session.rol = userdata[0].rol;

                        res.redirect('/');
                    }
                });
            } else {
                res.render('login/index', { layout: 'login.hbs', error: 'Usuario no existe!', logout: true })
            }
        });
    });
}

function logout(req, res){
    req.session.loggedin = false;
    req.session.name = '';
    req.session.rol = '';

    res.redirect('/');
}

module.exports = {
    login,
    auth,
    logout,
}