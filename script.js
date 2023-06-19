fetch('/api/getWords')
    .then(response => response.json())
    .then(data => {
        const wordsDiv = document.getElementById('words');
        // проверяем, есть ли данные и являются ли они объектом
        if(data && typeof data === 'object' && Array.isArray(data.rows)) {
            data.rows.forEach(row => {
                const p = document.createElement('p');
                p.textContent = `ID: ${row.id}, English: ${row.word_en}, Russian: ${row.word_ru}, Ukrainian: ${row.word_ua}`;
                wordsDiv.appendChild(p);
            });
        }
    });
