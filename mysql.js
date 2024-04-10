const mysql = require('mysql2')

const conection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

console.log(process.env.DATABASE_HOST)
console.log(process.env.DATABASE_NAME)
conection.connect( (err) =>{
    if(err) throw err
    console.log('La conexion funciona')
})

conection.query("SELECT * FROM usuarios", (err, rows) =>{
    if(err) throw err
    console.log('Los datos de la tabla son:')
    console.log(rows)
})

conection.end();