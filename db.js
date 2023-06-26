const Pool = require('pg').Pool
// const pool = new Pool({
//     user: "stasvv1",
//     password: '417149',
//     host: "localhost",
//     port: 5432,
//     database: 'words'
// })


//local
const pool = new Pool({
    user: "st",
    password: 'root',
    host: "localhost",
    port: 5432,
    database: 'words'
})

module.exports = pool
