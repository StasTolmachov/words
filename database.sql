CREATE DATABASE words;


CREATE TABLE translate(
id SERIAL PRIMARY KEY,
word_en VARCHAR(255),
word_ru VARCHAR(255)
);

select * from translate;

INSERT INTO translate VALUES (1, 'car', 'машина');

ALTER TABLE translate
ADD word_ua VARCHAR(255);

INSERT INTO translate (id, word_en, word_ru, word_ua)
VALUES (2, 'morning', 'утро', 'ранок');