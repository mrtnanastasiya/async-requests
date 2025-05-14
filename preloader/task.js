const loader = document.getElementById('loader');
const items = document.getElementById('items')

// Функция для загрузки курса валют и отображения данных
function loadCurrency() {
    // Показать анимацию загрузки
    loader.classList.add('loader_active');

    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses'); 

    // Обработчик для загрузки данных
    xhr.onload = function() {
        // Проверяем статус ответа
        if (xhr.readyState === 4) {
            // Парсим JSON ответ
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData)

            // Скрыть анимацию загрузки
            loader.classList.remove('loader_active');

            // Отобразить данные на странице
            items.innerHTML = '';
            for (let currency in responseData.response.Valute) {
                const code = responseData.response.Valute[currency].CharCode;
                const value = responseData.response.Valute[currency].Value;
                const currencyElement = `
                    <div class="item__code">${code}</div>
                    <div class="item__value">${value}</div>
                    <div class="item__currency">руб.</div>
                    <br>
                `;
                items.insertAdjacentHTML('beforeBegin', currencyElement);
            }
        } else {
            // В случае ошибки отобразить сообщение
            items.textContent = 'Ошибка при загрузке данных.';
        }
    };

    // Отправляем запрос
    xhr.send();
}

// Вызываем функцию загрузки курса валют
loadCurrency();
