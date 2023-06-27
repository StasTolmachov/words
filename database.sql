CREATE DATABASE words;


CREATE TABLE translator (
    id SERIAL PRIMARY KEY,
    english_word VARCHAR(255) NOT NULL UNIQUE,
    russian_word VARCHAR(255) NOT NULL
);

CREATE TABLE word_info (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES translator(id),
    transcription VARCHAR(255),
    synonyms TEXT,
    pss VARCHAR(255),
    psst VARCHAR(255),
    pp VARCHAR(255),
    ppt VARCHAR(255),
    pps VARCHAR(255),
    ppst VARCHAR(255),
    ppp VARCHAR(255),
    pppt VARCHAR(255),
    pos VARCHAR(255),
    dict VARCHAR(255),
    rating INTEGER,
    word_status VARCHAR(255)
);

CREATE TABLE dictionaries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE dictionary_words (
    dictionary_id INTEGER REFERENCES dictionaries(id),
    word_id INTEGER REFERENCES translator(id),
    PRIMARY KEY (dictionary_id, word_id)
);
//добавление слов в переводчик
INSERT INTO translator (english_word, russian_word)
VALUES ('apple', 'яблоко'),
       ('banana', 'банан'),
       ('cherry', 'вишня'),
       ('grape', 'виноград'),
       ('peach', 'персик');
//добавление доп инфо про слово
INSERT INTO word_info (word_id, transcription, synonyms, pss, psst, pp, ppt, pps, ppst, ppp, pppt, pos, dict, rating, word_status)
VALUES ((SELECT id FROM translator WHERE english_word = 'apple'), 'ˈæpl', 'pippin, fruit', 'eats', 'eats', 'ate', 'eaten', 'was eating', 'has eaten', 'had eaten', 'add', 'noun', 'fruits', 5, 'active'),
       ((SELECT id FROM translator WHERE english_word = 'banana'), 'bəˈnænə', 'plantain', 'eats', 'eats', 'ate', 'eaten', 'was eating', 'has eaten', 'had eaten', 'add', 'noun', 'fruits', 4, 'active'),
       ((SELECT id FROM translator WHERE english_word = 'cherry'), 'ˈtʃɛri', 'tart', 'eats', 'eats', 'ate', 'eaten', 'was eating', 'has eaten', 'had eaten', 'add', 'noun', 'fruits', 5, 'active'),
       ((SELECT id FROM translator WHERE english_word = 'grape'), 'greɪp', 'vitis', 'eats', 'eats', 'ate', 'eaten', 'was eating', 'has eaten', 'had eaten', 'add', 'noun', 'fruits', 3, 'active'),
       ((SELECT id FROM translator WHERE english_word = 'peach'), 'piːtʃ', 'prunus', 'eats', 'eats', 'ate', 'eaten', 'was eating', 'has eaten', 'had eaten', 'add', 'noun', 'fruits', 4, 'active');


//добавление словаря
INSERT INTO dictionaries (name)
VALUES ('Fruits'), ('Common Words');

//Этот код добавит все слова из таблицы translator в словарь "Fruits" и добавит слово 'apple' в словарь "Common Words"
INSERT INTO dictionary_words (dictionary_id, word_id)
SELECT
    (SELECT id FROM dictionaries WHERE name = 'Fruits'),
    id
FROM
    translator;

INSERT INTO dictionary_words (dictionary_id, word_id)
SELECT
    (SELECT id FROM dictionaries WHERE name = 'Common Words'),
    id
FROM
    translator
WHERE
    english_word = 'apple';

// вывод слов из словаря
SELECT
    t.english_word,
    t.russian_word
FROM
    dictionaries d
INNER JOIN
    dictionary_words dw ON d.id = dw.dictionary_id
INNER JOIN
    translator t ON dw.word_id = t.id
WHERE
    d.name = 'Fruits';










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