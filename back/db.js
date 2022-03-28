const mysql = require('mysql2/promise')
require('dotenv').config()

const config ={
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 5
}

const conn = () => {
    try {
        const pool = mysql.createPool(config)
        return pool
    } catch (e) {
        return false;
    }
}

// const pool = mysql.createPool(config)
// console.log(pool)
module.exports = {pool:conn()}