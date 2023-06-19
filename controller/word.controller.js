const db = require('../db')


class WordController {
    async getWords(req, res) {
        console.log("getWords")
        const allWords = await db.query(`select * from translate`)
        res.render('index', {rows: allWords.rows})
    }


}

module.exports = new WordController()