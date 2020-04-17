const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

//connect to  database
const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

con.connect((err)=>{
    if (err) throw err;
    console.log(`Connected to database: ${process.env.DB}`);
});

module.exports = con;