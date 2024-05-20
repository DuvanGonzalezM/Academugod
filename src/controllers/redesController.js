const dbConection = require('../services/dataBaseService');
const dateFormat = require('handlebars-dateformat');

async function getTemperaturas(req, res){
    await dbConection.selectRaw('SELECT t.* FROM temperaturas as t order by t.datetime desc limit 100').then((temperaturas) => {
        var lastTemperature = temperaturas.shift();
        temperaturas = formatedDateTemperature(temperaturas);
        lastTemperature.datetime = dateFormat(lastTemperature.datetime, "DD/MM/YYYY HH:mm:ss");
        res.json({'data':temperaturas, 'last': lastTemperature});
    }).catch((error) => {
        res.json({'data':[], 'last': []});
    });
}

async function sendTemperaturas(req, res) {
    const data = req.body;
    var temperatura = data.temperatura;
    var humedad = data.humedad;
    await dbConection.insertRaw('INSERT INTO temperaturas (temperatura, humedad) VALUES (' + temperatura + ',' + humedad +')').then(() => {
        res.status(200).send({"message": 'Los datos han sido almacenados correctamente'});
    }).catch((error) => {
        res.status(500).send({"message": 'No se pudo completar el envio de información'});
    });
}

function formatedDateTemperature(array) {
    var result = array.map((item) => {
        return { ...item, 
            datetime: dateFormat(item.datetime, "DD/MM/YYYY HH:mm:ss"),
            temperatura: item.temperatura + ' \xB0C',
            humedad: item.humedad + ' %'
        };
    });
    return result;
}

module.exports = {
    getTemperaturas,
    formatedDateTemperature,
    sendTemperaturas,
}