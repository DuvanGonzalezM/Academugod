
function dashboard(req, res){
    if(req.session.loggedin != true || !req.session.rol){
        res.redirect('/login');
    }else{
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
}

module.exports = {
    dashboard,
}