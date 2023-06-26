const db = require('../db')


class WordController {
    async getWords(req, res) {
        console.log("getWords")
        const allWords = await db.query(`SELECT 
    t.english_word,
    t.russian_translation
FROM 
    dictionaries d
INNER JOIN 
    dictionary_words dw ON d.id = dw.dictionary_id
INNER JOIN 
    translator t ON dw.word_id = t.id
WHERE 
    d.name = 'A1';
`)
        res.render('index', {allWords})
    }


}

module.exports = new WordController()