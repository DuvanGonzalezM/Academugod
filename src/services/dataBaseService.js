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

module.exports = {
    selectRaw,
}