// const mongoose = require('mongoose')


const express = require('express')
const api = express()
api.set('view engine', 'ejs');

const wordRouter = require('./routes/word.routes')


const PORTapi = 8080
const PORTlocal = 3000

const HOSTapi = "wordsen.tolmachov.dev"
const HOSTlocal = "localhost"

const HOST = HOSTlocal
const PORT = PORTlocal



// const DB_URL = `mongodb+srv://stasvv1:tUe8UsaR2XoIQKNa@words.iz19pkt.mongodb.net/?retryWrites=true&w=majority`

api.use(express.json())

api.use('/api', wordRouter)


async function startApp() {
    try {
        // await mongoose.connect(DB_URL)
        api.listen(PORT, HOST, () => {
            console.log(`Server started: http://${HOST}:${PORT}/api/getWords`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()