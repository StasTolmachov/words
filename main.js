// const mongoose = require('mongoose')

const express = require('express')
const server = express()
server.set('view engine', 'ejs');

const wordRouter = require('./routes/word.routes')

const PORT = 8080
const HOST = "143.198.98.87"

// const DB_URL = `mongodb+srv://stasvv1:tUe8UsaR2XoIQKNa@words.iz19pkt.mongodb.net/?retryWrites=true&w=majority`

server.use(express.json())

server.use('/api', wordRouter)


async function startApp() {
    try {
        // await mongoose.connect(DB_URL)
        server.listen(PORT, HOST, () => {
            console.log(`Server started: http://${HOST}:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()