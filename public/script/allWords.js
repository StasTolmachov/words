console.log('script allWords')

//окно поиска по словам из базы данных
const searchInput = document.getElementById('input-text')
const resultList = document.getElementById('results')
let selectedIndex = -1
const wordInfo = document.getElementById('wordInfo')


const original = document.getElementById('original')
const translation = document.getElementById('translation')
const transcription = document.getElementById('transcription')
const rating = document.getElementById('rating')
const dict = document.getElementById('dict')
const word_status = document.getElementById('word_status')
const dictionary_names = document.getElementById('dictionary_names')
const synonyms = document.getElementById('synonyms')
const id = document.getElementById('id')
const pos = document.getElementById('pos')

const pss = document.getElementById('pss')
const psst = document.getElementById('psst')
const pp = document.getElementById('pp')
const ppt = document.getElementById('ppt')
const pps = document.getElementById('pps')
const ppst = document.getElementById('ppst')
const ppp = document.getElementById('ppp')
const pppt = document.getElementById('pppt')


let selectedObject = null


searchInput.addEventListener('input', function () {
    console.log('search')
    const query = this.value
    console.log(query)

    if (query) {
        fetch(`/api/search?q=${query}`)
            .then(response => response.json())
            .then(results => {
                resultList.innerHTML = ''
                selectedIndex = -1

                for (const word of results) {
                    const item = document.createElement('li')
                    item.textContent = `${word.english_word} - ${word.russian_word} ${word.word_status} ${word.rating}`;
                    item.dataset.wordInfo = JSON.stringify(word)
                    resultList.appendChild(item)
                }
                resultList.style.display = 'block'
            })
            .catch(error => console.error('Error: ', error))
    } else {
        resultList.style.display = 'none'
    }
})

searchInput.addEventListener('keydown', function (event) {
    const items = resultList.getElementsByTagName('li')
    console.log(items)

    if (event.key === 'ArrowDown' && selectedIndex < items.length - 1) {
        // Снимаем выделение с текущего элемента
        if (selectedIndex > -1) {
            items[selectedIndex].classList.remove('selected');
        }
        selectedIndex++;
        // Выделяем следующий элемент
        items[selectedIndex].classList.add('selected');
    } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
        // Снимаем выделение с текущего элемента
        items[selectedIndex].classList.remove('selected');
        selectedIndex--;
        // Выделяем предыдущий элемент
        items[selectedIndex].classList.add('selected');
    } else if (event.key === 'Enter' && selectedIndex > -1) {
        event.preventDefault()
        // Нажат Enter, выводим дополнительную информацию
        const selectedWord = items[selectedIndex];
        // Здесь можно запросить и вывести дополнительную информацию о слове
        console.log('Selected word:', selectedWord);
        selectedObject = JSON.parse(selectedWord.dataset.wordInfo)
        console.log(selectedObject.english_word)

        // wordEn.textContent = selectedWord
        id.textContent = selectedObject.id
        original.textContent = selectedObject.english_word
        translation.textContent = selectedObject.russian_word
        transcription.textContent = selectedObject.transcription
        rating.textContent = selectedObject.rating
        dict.textContent = selectedObject.dict
        word_status.textContent = selectedObject.word_status
        dictionary_names.textContent = selectedObject.dictionary_names
        synonyms.textContent = selectedObject.synonyms
        pos.textContent = selectedObject.pos

        pss.textContent = selectedObject.pss
        psst.textContent = selectedObject.psst
        pp.textContent = selectedObject.pp
        ppt.textContent = selectedObject.ppt
        pps.textContent = selectedObject.pps
        ppst.textContent = selectedObject.ppst
        ppp.textContent = selectedObject.ppp
        pppt.textContent = selectedObject.pppt


        resultList.style.display = 'none'
        // searchInput.textContent = selectedObject.english_word


    }
})

document.getElementById("wordInfo").addEventListener("keydown", (e) => {
    // Предотвращение стандартного поведения формы
    if (e.key === "Enter") {
        e.preventDefault()

        // Сбор данных формы
        const idString = document.getElementById("id").textContent;
        const id = parseInt(idString, 10)
        const original = document.getElementById("original").textContent;
        const translation = document.getElementById("translation").textContent;
        const transcription = document.getElementById("transcription").textContent;
        const ratingString = document.getElementById("rating").textContent;
        const rating = parseInt(ratingString, 10)
        const dict = document.getElementById("dict").textContent;
        const word_status = document.getElementById("word_status").textContent;
        const dictionary_names = document.getElementById("dictionary_names").textContent;
        const synonyms = document.getElementById("synonyms").textContent;
        const pos = document.getElementById("pos").textContent;

        const pss = document.getElementById("pss").textContent;
        const psst = document.getElementById("psst").textContent;
        const pp = document.getElementById("pp").textContent;
        const ppt = document.getElementById("ppt").textContent;
        const pps = document.getElementById("pps").textContent;
        const ppst = document.getElementById("ppst").textContent;
        const ppp = document.getElementById("ppp").textContent;
        const pppt = document.getElementById("pppt").textContent;


        // Создание объекта с данными
        const data = {
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
            word_status,
            dictionary_names,

        };

        // Отправка данных на сервер
        fetch('/api/updateWord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});
