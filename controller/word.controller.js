const db = require('../db')


class WordController {
    //отправляет страницу
    async allWords(req, res) {
        console.log("allWords")
        res.sendFile('/Users/st/js/words/views/allWords.html')
    }


//отправляет данные со словами
    async getAllWords(req, res) {
        console.log('getAllWords')
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

        res.json(allWords)
    }


    //окно поиска по словам из базы данных
    async getSearch(req, res) {
        const wordQuery = req.query.q;


        //     const sqlQuery = `
        //   SELECT
        //       english_word,
        //       russian_translation
        //   FROM
        //       translator
        //   WHERE
        //       english_word ILIKE $1
        //       LIMIT 10;
        // `;


        const sqlQuery = `
            SELECT
    t.id,
    t.english_word,
    t.russian_translation,
    wi.transcription,
    wi.synonyms,
    wi.ps,
    wi.pps,
    wi.pst,
    wi.ppt,
    wi.ppst,
    wi.ppp,
    wi.pppt,
    wi.pos,
    wi.dict,
    wi.rating,
    wi.status,
    d.name AS dictionary_name
FROM
    translator t
LEFT JOIN
    word_info wi ON t.id = wi.word_id
LEFT JOIN
    dictionary_words dw ON t.id = dw.word_id
LEFT JOIN
    dictionaries d ON dw.dictionary_id = d.id
WHERE
    t.english_word ILIKE $1
LIMIT 10;
        `;


        const results = await db.query(sqlQuery, [wordQuery + '%'])

        console.log(results.rows)

        res.json(results.rows);
    }
}

module.exports = new WordController()

// считывание с базы данных
// const allWords = await db.query(`SELECT
//     t.english_word,
//     t.russian_translation
// FROM
//     dictionaries d
// INNER JOIN
//     dictionary_words dw ON d.id = dw.dictionary_id
// INNER JOIN
//     translator t ON dw.word_id = t.id
// WHERE
//     d.name = 'A1';
// `)



// udate words
// UPDATE translator
// SET russian_translation = $1
// WHERE id = $2;
//
//
// UPDATE word_info
// SET transcription = $1, synonyms = $2, ...
// WHERE word_id = $3;

