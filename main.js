// const mongoose = require('mongoose')

const express = require('express')
const server = express()
server.set('view engine', 'ejs');

const wordRouter = require('./routes/word.routes')

const PORTserver = 8080
const PORTlocal = 3000

const HOSTserver = "143.198.98.87"
const HOSTlocal = "localhost"

// const DB_URL = `mongodb+srv://stasvv1:tUe8UsaR2XoIQKNa@words.iz19pkt.mongodb.net/?retryWrites=true&w=majority`

server.use(express.json())

server.use('/api', wordRouter)


async function startApp() {
    try {
        // await mongoose.connect(DB_URL)
        server.listen(PORTserver, HOSTserver, () => {
            console.log(`Server started: http://${HOSTserver}:${HOSTserver}`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()