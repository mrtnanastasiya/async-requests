// Массив для хранения данных опросов
let pollsData = [];
let currentPollIndex = 0;

// Функция для отображения опроса по указанному индексу
function displayPoll(index) {
    const poll = pollsData[index];
    if (poll) {
        const pollTitle = document.getElementById('poll__title');
        const pollAnswers = document.getElementById('poll__answers');
        
        pollTitle.textContent = poll.question;
        pollAnswers.innerHTML = '';

        poll.answers.forEach((answer, answerIndex) => {
            const answerElement = document.createElement('button');
            answerElement.textContent = answer;
            answerElement.addEventListener('click', () => {
                console.log(`Выбран ответ ${answer} для вопроса: ${poll.question}`);
                alert(`Спасибо, ваш голос засчитан!`);
            });
            pollAnswers.appendChild(answerElement);
        });
    } else {
        console.error('Опрос не найден.');
    }
}

// Запрос данных об опросе через XMLHttpRequest
const xhr = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/poll'; 

xhr.open('GET', url, true);
xhr.onload = function() {
    if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);

        // Обновляем pollsData с полученными данными
        const newPoll = {
            question: responseData.data.title,
            answers: responseData.data.answers
        };
        pollsData.push(newPoll);

        // Вызываем функцию отображения опроса
        displayPoll(currentPollIndex);
    } else {
        console.error('Не удалось загрузить данные об опросе.');
    }
};

xhr.send();