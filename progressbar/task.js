const inputFile = document.getElementById('file');
const progress = document.getElementById('progress');
//progress.value = 0.7;
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', inputFile.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.upload.onloadstart = function() {
    console.log('Начало загрузки файла на сервер');
};

    xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        progress.value = percentComplete;
        console.log('Прогресс загрузки файла на сервер: ' + percentComplete);
    }
};

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Обработка успешного ответа сервера
            console.log('Файл успешно загружен');
        } else {
            // Обработка ошибки ответа от сервера
            console.error('Произошла ошибка загрузки файла:', xhr.statusText);
        }
    };

    xhr.open('POST','https://students.netoservices.ru/nestjs-backend/upload', true);
    xhr.send(formData);
});