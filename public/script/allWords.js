console.log('script allWords')


// тестовый запрос данных
// fetch('/api/getAllWords')
//     .then(response => response.json())
//     .then(allWords => {
//         console.log(allWords.rows[2].english_word)
//         console.log(allWords.rows)
//
//     })


//окно поиска по словам из базы данных
const searchInput = document.getElementById('input-text')
const resultList = document.getElementById('results')
let selectedIndex = -1
const wordInfo = document.getElementById('wordInfo')


const wordEn = document.getElementById('wordEn')
const wordRu = document.getElementById('wordRu')

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
                    item.textContent = `${word.english_word} - ${word.russian_translation}`;
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
        const selectedObject = JSON.parse(selectedWord.dataset.wordInfo)
        console.log(selectedObject.english_word)

        // wordEn.textContent = selectedWord
        wordEn.value = selectedObject.english_word
        wordRu.value = selectedObject.russian_translation


        resultList.style.display = 'none'
        searchInput.value = selectedObject.english_word

    }
})
