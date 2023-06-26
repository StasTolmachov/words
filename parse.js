//Импортируйте необходимые модули:
const fs = require('fs');
const path = require('path');
const {Pool} = require('pg');

//Настройте соединение с базой данных PostgreSQL:
const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'mydatabase',
    password: 'password',
    port: 5432,
});

//Прочтите JSON файл и разберите его содержимое:
const data = fs.readFileSync(path.join(__dirname, 'yourfile.json'));
const words = JSON.parse(data);

//Добавьте слова в базу данных:
words.forEach(async word => {
    try {
        const wordResult = await pool.query(
            'INSERT INTO translator (english_word, russian_translation) VALUES ($1, $2) RETURNING id',
            [word.WordOriginal, word.WordTranslated]
        );

        const wordId = wordResult.rows[0].id;

        await pool.query(
            'INSERT INTO word_info (word_id, transcription, synonyms, pos, rating, status) VALUES ($1, $2, $3, $4, $5, $6)',
            [wordId, word.WordOriginalTranscription, word.WordOriginalSynonyms, word.WordOriginalPartOfSpeech, word.Rating, 'active']
        );
    } catch (err) {
        console.error(err);
    }
});
