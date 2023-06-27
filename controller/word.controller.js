const db = require('../db')


class WordController {

    //отправляет страницу
    async allWords(req, res) {
        console.log('allWords - отправляет страницу allWords.html')
        res.sendFile('/Users/st/js/words/views/allWords.html')
    }


//отправляет данные со словами
    async getAllWords(req, res) {
        const allWords = await db.query(`SELECT
    t.english_word,
    t.russian_word
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
        console.log('getSearch - поиск в бд слов')
        const wordQuery = req.query.q;
        const sqlQuery = `
SELECT
    t.id,
    t.english_word,
    t.russian_word,
    wi.transcription,
    wi.synonyms,
    wi.pss,
    wi.psst,
    wi.pp,
    wi.ppt,
    wi.pps,
    wi.ppst,
    wi.ppp,
    wi.pppt,
    wi.pos,
    wi.dict,
    wi.rating,
    wi.word_status,
    STRING_AGG(d.name, ', ') AS dictionary_names
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
GROUP BY
    t.id,
    t.english_word,
    t.russian_word,
    wi.transcription,
    wi.synonyms,
    wi.pss,
    wi.psst,
    wi.pp,
    wi.ppt,
    wi.pps,
    wi.ppst,
    wi.ppp,
    wi.pppt,
    wi.pos,
    wi.dict,
    wi.rating,
    wi.word_status
LIMIT 10;
        `; //sql запрос
        const results = await db.query(sqlQuery, [wordQuery + '%'])

        res.json(results.rows);
        console.log('getSearch ищет по запросу: ',  wordQuery, 'отправляет: ', results.rows)
    }

    //редактировать слово в бд
    async updateWord(req, res) {
        const {
            id,
            original,
            translation,
            transcription,
            synonyms,
            pss,
            psst,
            pp,
            ppt,
            pps,
            ppst,
            ppp,
            pppt,
            pos,
            dict,
            rating,
            word_status
        } = req.body;

        const editTranslator = `
        UPDATE
        translator
        SET
        english_word = $1,
        russian_word = $2
        WHERE
        id = $3;`

        await db.query(editTranslator, [original, translation, id])

        const editWordInfo = `
        UPDATE word_info
        SET
        transcription = $1,
        synonyms = $2,
        pss = $3,
        psst = $4,
        pp = $5,
        ppt = $6,
        pps = $7,
        ppst = $8,
        ppp = $9,
        pppt = $10,
        pos = $11,
        dict = $12,
        rating = $13,
        word_status = $14
        WHERE word_id = $15;
`
        await db.query(editWordInfo, [transcription, synonyms, pss, psst, pp, ppt, pps, ppst, ppp, pppt, pos, dict, rating, word_status, id])

        res.send('200')
        console.log('updateWord обновило слово в бд')
    }

    //обновление статуса
    async updateWordStatus(req, res) {
        const {id} = req.body
        const editWordInfo = `
      UPDATE word_info
      SET word_status = 'done'
      WHERE word_id = $1;
`
        await db.query(editWordInfo, [id])
        res.send('200')
        console.log('updateWordStatus')
    }
}

module.exports = new WordController()

