const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Conexion con la base de datos existosa.');
}).catch((error) => {
    console.log('Error con la conexión a la base de datos!');
});

function selectRaw(query, arg){
    
    result = sequelize.query(query, {
        replacements: arg,
        type: QueryTypes.SELECT,
    });

    return result; 
}

function insertRaw(query){
    
    result = sequelize.query(query, {
        type: QueryTypes.INSERT,
    });

    return result; 
}

function updateRaw(query){
    
    result = sequelize.query(query, {
        type: QueryTypes.UPDATE,
    });

    return result; 
}

function deleteRaw(query){
    
    result = sequelize.query(query, {
        type: QueryTypes.DELETE,
    });

    return result; 
}

module.exports = {
    selectRaw,
    insertRaw,
    updateRaw,
    deleteRaw,
}