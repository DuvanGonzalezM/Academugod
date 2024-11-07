const dbConection = require('../services/dataBaseService');
const dateFormat = require('handlebars-dateformat');
const redesController = require('../controllers/redesController');
const moment = require('moment');

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
            await dbConection.selectRaw("SELECT t.temperatura, t.humedad, t.datetime FROM temperaturas as t order by t.id_register desc limit 11").then((temperaturas) => {
                var lastTemperature = temperaturas.shift();
                temperaturas = redesController.formatedDateTemperature(temperaturas);
                lastTemperature.datetime = moment(lastTemperature.datetime).tz('America/Bogota').format("DD/MM/YYYY HH:mm:ss");
                res.render('redes/dashboard', {userName: req.session.name, lastTemperature: lastTemperature, temperaturas: JSON.stringify(temperaturas)});
            }).catch((error) => {
                res.render('redes/dashboard', {userName: req.session.name, lastTemperature: [], temperaturas: JSON.stringify([])});
            });
            break;
        default:
            res.render('estudiantes/dashboard', {userName: req.session.name});
    }
}

function cargarN(req , res){
    res.render('docentes/cargar_notas');
}

async function horario(req, res){
    var days = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
    horario = await dbConection.selectRaw('SELECT m.nombre as nombre_materia, concat(p.nombre," ",p.apellido) AS nombre_profesor, h.* FROM horario AS h JOIN registro_materias AS rm ON h.id_horario = rm.id_materia JOIN materias AS m ON m.id_materia = h.id_materia JOIN profesores AS p ON p.id_profesor = h.id_profesor JOIN estudiantes AS es ON es.id_estudiante = rm.id_estudiante WHERE es.id_usuario = ?',
        [req.session.id_usuario]).then((horario) => {
        var events = horario.map((item) => {
            var inicio = item.hora_inicio.slice(0, 5);
            var fin = item.hora_fin.slice(0, 5);
            return { 
                daysOfWeek: '' + days.indexOf(item.dia_semana),
                classNames: 'acade-cal-event',
                start: inicio,
                end: fin,
                time: inicio + ' - ' + fin,
                materia: item.nombre_materia,
                profesor: item.nombre_profesor,
                salon: item.aula
            };
        });
        res.render('estudiantes/horario', {userName: req.session.name, horario: JSON.stringify(events)});
    }).catch((error) => {
        res.render('estudiantes/horario', {userName: req.session.name, horario: JSON.stringify([])});
    });
}

async function cargarNotas(req, res){
    materia = await getMateriasByMateriaID(req.params.id_materia).then((materia) => {
        return materia;
    }).catch((error) => {
       return "";
    });
    estudiantes = await getEstudiantesByMateriaID(req.params.id_materia).then((estudiantes) => {
        return estudiantes;
    }).catch((error) => {
       return [];
    });
    res.render('docentes/cargar_notas', {userName: req.session.name, estudiantes: estudiantes, materia: materia});
}

async function subirNotas(req, res){
    var data = req.body;
    delete data['notas_estudiantes_length'];
    for (const [key, value] of Object.entries(data)) {
        id_estudiante = key.replace('notas_', "");
        notaC1 = value[0] ? value[0] : 0;
        notaC2 = value[1] ? value[1] : 0;
        notaC3 = value[2] ? value[2] : 0;
        var register = await dbConection.selectRaw('select count(c.id_calificacion) as register from calificaciones AS c join registro_materias AS rm ON c.id_materia = rm.id_registro join horario as h on rm.id_materia = h.id_horario where rm.id_estudiante = ? and h.id_materia=?', [id_estudiante, req.params.id_materia]);
        var registro_materia = await dbConection.selectRaw('select rm.id_registro from registro_materias AS rm join horario as h on rm.id_materia = h.id_horario where rm.id_estudiante = ? and h.id_materia=?', [id_estudiante, req.params.id_materia]);

        if(register[0].register == 0){
            await dbConection.insertRaw('INSERT INTO calificaciones (id_materia, nota_c1, nota_c2, nota_c3) VALUES ('+registro_materia[0].id_registro+', '+notaC1+', '+notaC2+', '+notaC3+')');
        }else if(register[0].register == 1){
            await dbConection.updateRaw('UPDATE calificaciones SET nota_c1 = '+notaC1+', nota_c2 = '+notaC2+', nota_c3 = '+notaC3+' where id_materia = '+registro_materia[0].id_registro);
        }
    }
    
    res.redirect('/docentes/consultar/estudiantes/'+req.params.id_materia);
}

async function consultarNotas(req, res){
    materia = await getMateriasByMateriaID(req.params.id_materia).then((materia) => {
        return materia;
    }).catch((error) => {
       return "";
    });
    estudiantes = await getEstudiantesByMateriaID(req.params.id_materia).then((estudiantes) => {
        return estudiantes;
    }).catch((error) => {
       return [];
    });
    res.render('docentes/consultar_notas', {userName: req.session.name, estudiantes: estudiantes, materia: materia});
}


async function consultarMaterias (req, res){
    baseUrl = req.params.accion == 'cargar' ? '/docentes/cargar/notas/' : '/docentes/consultar/estudiantes/';
    materias = await getMateriasByDocenteID(req.session.id_usuario).then((materias) => {
        return materias;
    }).catch((error) => {
       return [];
    });
    res.render('docentes/consultar_materias', {userName: req.session.name, materias: materias, baseUrl: baseUrl}); 
}

async function registrarMaterias (req,res){
    var materias_registradas = await dbConection.selectRaw('SELECT rm.id_materia  from registro_materias as rm inner join estudiantes as es  on es.id_estudiante = rm.id_estudiante  where es.id_usuario = ?', [req.session.id_usuario]);
    var num_mat_reg = materias_registradas.length;
    if (num_mat_reg < 5 ){
        await dbConection.selectRaw('SELECT h.id_horario, m.nombre AS nombre_materia, h.dia_semana, h.hora_inicio, h.hora_fin, p.nombre AS nombre_profesor, p.apellido, h.aula FROM academugod.horario AS h INNER JOIN academugod.materias AS m ON h.id_materia = m.id_materia INNER JOIN academugod.profesores AS p ON h.id_profesor = p.id_profesor').then((materias) => {
            res.render('estudiantes/registrar_materias', {userName: req.session.name, materias, materias_registradas});
        }).catch((error) => {
            res.render('estudiantes/registrar_materias', {userName: req.session.name, materias: []});
        });
    } else {
        res.render('estudiantes/registrar_materias', {userName: req.session.name, materias: []});
    }
}

async function cargarMaterias (req,res){
    var data = req.body;
    delete data['materias_length'];
    var values = '';
    var id_estudiante = await dbConection.selectRaw('SELECT es.id_estudiante from estudiantes as es where es.id_usuario = ?', [req.session.id_usuario]);
    id_estudiante = id_estudiante[0].id_estudiante;
    for (const [key, value] of Object.entries(data)) {
        values += "(" +id_estudiante+","+ value +"), "; 
    }
    values = values.slice(0, -2);
    await dbConection.deleteRaw('DELETE from registro_materias where id_estudiante='+id_estudiante);
    await dbConection.insertRaw('INSERT INTO registro_materias ( id_estudiante, id_materia ) VALUES '+ values ).then((materias) => {
        res.redirect('/estudiantes/registrar');
    }).catch((error) => {
        res.redirect('/estudiantes/registrar');
    });
}

function getMateriasByDocenteID(idDocente){
    materias =  dbConection.selectRaw('SELECT distinct m.nombre , m.id_materia from materias as m join horario as h on m.id_materia = h.id_materia join profesores as p on h.id_profesor = p.id_profesor where p.id_usuario = ?', [idDocente]);
    return materias;
}

function getMateriasByMateriaID(idMateria){
    materias =  dbConection.selectRaw('SELECT distinct m.* from materias as m where m.id_materia = ? limit 1', [idMateria])
    return materias;
}

function getEstudiantesByMateriaID(idMateria){
  
    estudiantes = dbConection.selectRaw('SELECT distinct es.id_estudiante, es.nombre, es.apellido, es.numero_estudiante, c.nota_c1, c.nota_c2, c.nota_c3, round((c.nota_c1+c.nota_c2+c.nota_c3)/3,1) as promedio FROM registro_materias as rm left join calificaciones as c on rm.id_registro = c.id_materia join horario as h on rm.id_materia = h.id_horario join estudiantes as es on rm.id_estudiante = es.id_estudiante where h.id_materia = ?', [idMateria]);

    return estudiantes;
}

async function consultarNotasEstudiantes(req, res){
    notas = await dbConection.selectRaw('SELECT distinct m.nombre, c.nota_c1, c.nota_c2, c.nota_c3, round((c.nota_c1+c.nota_c2+c.nota_c3)/3,1) as promedio FROM registro_materias as rm left join calificaciones as c on rm.id_registro = c.id_materia join estudiantes as es on rm.id_estudiante = es.id_estudiante join horario as h on rm.id_materia = h.id_horario join materias as m on h.id_materia = m.id_materia where es.id_usuario = ?', [req.session.id_usuario]).then((notas) => {
        res.render('estudiantes/consultar_notas', {userName: req.session.name, notas: notas}); 
    }).catch((error) => {
        res.render('estudiantes/consultar_notas', {userName: req.session.name, notas: []}); 
    });
}

module.exports = {
    dashboard,
    cargarN, 
    horario,
    cargarNotas,
    consultarNotas,
    consultarMaterias,
    consultarNotasEstudiantes,
    registrarMaterias,
    cargarMaterias,
    subirNotas,
}