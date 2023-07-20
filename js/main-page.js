// Карточка главного элемента
function addMainCardToDocument(title, content, pic, id, likes) {
    const mainCardTemplate = document.getElementById('main-card-template');
    let firstSectionItemMain= document.querySelector('.first-section-item-main');
    const cloneMainCard = mainCardTemplate.content.cloneNode(true)

    cloneMainCard.querySelector('.first-section-item-main-title').textContent = title;
    cloneMainCard.querySelector('.first-section-item-main-text').textContent = content;
    cloneMainCard.querySelector('.first-section-item-main-img').src = pic;
    cloneMainCard.querySelector('.first-section-item-main-img').alt = title;
    cloneMainCard.querySelector('.link-mainCard').href = `article.htm?id=${id}`;
    cloneMainCard.querySelector('.card-end-text').textContent = likes;
    cloneMainCard.querySelector('.card-end-text').id = `${id}`;
    cloneMainCard.querySelector('.plus').dataset.id = `${id}`;
    cloneMainCard.querySelector('.minus').dataset.id = `${id}`;
    firstSectionItemMain.append(cloneMainCard)
};

// Карточки первой секции
function addFirstCardToDocument(title, content, pic, id, likes) {
    const firstCardTemplate = document.querySelector('.first-section-template');
    let firstSectionItem= document.querySelector('.first-section');
    const cloneFirstCard = firstCardTemplate.content.cloneNode(true)

    cloneFirstCard.querySelector('.first-section-item-title').textContent = title;
    cloneFirstCard.querySelector('.first-section-item-text').textContent = content;
    cloneFirstCard.querySelector('.first-section-item-img').src = pic;
    cloneFirstCard.querySelector('.first-section-item-img').alt = title;
    cloneFirstCard.querySelector('.link-firstCard').href = `article.htm?id=${id}`;
    cloneFirstCard.querySelector('.card-end-text').textContent = likes;
    cloneFirstCard.querySelector('.card-end-text').id = `${id}`;
    cloneFirstCard.querySelector('.plus').dataset.id = `${id}`;
    cloneFirstCard.querySelector('.minus').dataset.id = `${id}`;
    firstSectionItem.append(cloneFirstCard)
}

// Карточки второй секции
function addSecondCardToDocument(title, content, pic, id, likes) {
    const secondCardTemplate = document.querySelector('.section-section-template');
    let secondSectionItem= document.querySelector('.second-section');
    const cloneSecondCard = secondCardTemplate.content.cloneNode(true)

    cloneSecondCard.querySelector('.second-section-title').textContent = title;
    cloneSecondCard.querySelector('.second-section-text').textContent = content;
    cloneSecondCard.querySelector('.second-section-item-img').src = pic;
    cloneSecondCard.querySelector('.second-section-item-img').alt = title;
    cloneSecondCard.querySelector('.link-secondCard').href = `article.htm?id=${id}`;
    cloneSecondCard.querySelector('.card-end-text').textContent = likes;
    cloneSecondCard.querySelector('.card-end-text').id = `${id}`;
    cloneSecondCard.querySelector('.plus').dataset.id = `${id}`;
    cloneSecondCard.querySelector('.minus').dataset.id = `${id}`;
    secondSectionItem.append(cloneSecondCard)
}


// // Функция прибавления лайков
// function plusLikes(){
//     let plusBtn = document.querySelectorAll('.plus');
//     plusBtn.forEach((btn) => {
//         btn.addEventListener('click', ()=>{
//             let likesResult = parseInt(document.getElementById(`${btn.dataset.id}`).textContent)
//             let newLikes = likesResult + 1
//             fetch(`https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article/${btn.dataset.id-1}.json`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': "application/json; charset=UTF-8"
//                 },
//                 body: JSON.stringify({
//                     'likes': newLikes
//                 })
//             })
//             .then(response => response.json())
//             .then((article) =>{
//                 document.getElementById(`${btn.dataset.id}`).textContent = '' 
//                 document.getElementById(`${btn.dataset.id}`).textContent = article.likes 
//             })
//         })
//     })
// }

// // Функция удаления лайков
// function minusLikes(){
//     let minusBtn = document.querySelectorAll('.minus');
//     minusBtn.forEach((btn) => {
//         btn.addEventListener('click', ()=>{
//             let likesResult = parseInt(document.getElementById(`${btn.dataset.id}`).textContent)
//             let newLikes = likesResult - 1
//             fetch(`https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article/${btn.dataset.id-1}.json`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': "application/json; charset=UTF-8"
//                 },
//                 body: JSON.stringify({
//                     'likes': newLikes
//                 })
//             })
//             .then(response => response.json())
//             .then((article) =>{
//                 document.getElementById(`${btn.dataset.id}`).textContent = '' 
//                 document.getElementById(`${btn.dataset.id}`).textContent = article.likes 
//             })
//         })
//     })
// }

// В первых функциях plusLikes и minusLikes, которые добавляли обработчики событий на кнопки (+ и - лайк), была проблема:
// Если эти функции вызываются несколько раз, к каждой кнопке будет добавлено несколько обработчиков событий, что может привести к непредсказуемому поведению.
// А вызывать их несколько раз приходилось из-за свойства template при подгруздке новых карточек
// Решил проблему с помощью метода removeEventListener
// В этом коде я создал одну функцию updateLikes, которая заменяет функции plusLikes и minusLikes. 
// Эта функция принимает два аргумента: btnClass - класс кнопок, для которых нужно обновить обработчик, и increment - значение, на которое нужно изменить количество лайков (1 для кнопок "плюс" и -1 для кнопок "минус").
// При каждом вызове updateLikes сначала удаляется старый обработчик событий (если он был добавлен ранее), а затем добавляется новый. Для хранения ссылки на функцию обработчика используется свойство handler каждой кнопки

function updateLikes(btnClass, increment) {
    let btns = document.querySelectorAll(btnClass);
    btns.forEach((btn) => {
        // Удаление предыдущего обработчика событий
        btn.removeEventListener('click', btn.handler);
        btn.handler = () => {
            let likesResult = parseInt(document.getElementById(`${btn.dataset.id}`).textContent);
            let newLikes = likesResult + increment;
            articles[btn.dataset.id-1].likes = newLikes;
            localStorage.setItem("cards-info", JSON.stringify(articles)); // обновляем localStorage
            document.getElementById(`${btn.dataset.id}`).textContent = articles[btn.dataset.id-1].likes;
        }
        // Добавление нового обработчика событий
        btn.addEventListener('click', btn.handler);
    });
}

// Вызов элементов и помещение их в соответствующие карточки (демонстрационная версия)

let articles;

function updateCardOnPage() {
    articles = JSON.parse(localStorage.getItem('cards-info'))
    articles.slice().reverse().forEach((article, i) => {
        if (i == 0) {
            addMainCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
        }
        else if (i > 0 && i < 5) {
            addFirstCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
        }
        else if (i > 4 && i < 11) {
            addSecondCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
        }
        else if (i > 10 && i < 21) {
            document.querySelector('.more').addEventListener('click', function () {
                addSecondCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
                document.querySelector('.more').style.display = 'none';
                // Добавляем и удаляем лайки в дополнительном списке
                updateLikes('.plus', 1);
                updateLikes('.minus', -1);
            });
        }
    });
    // Добавляем и удаляем лайки
    updateLikes('.plus', 1);
    updateLikes('.minus', -1);
}

const getAllCard = () => {
    if (localStorage.getItem('cards-info') === null) {
        fetch('https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article.json')
            .then(response => response.json())
            .then((items) => {
                localStorage.setItem("cards-info", JSON.stringify(items))
                updateCardOnPage()
            })
            .catch((err) => {
                alert('Нет статей')
                console.log(`ERR: `, err)
            });
    } else {
        updateCardOnPage()
    }
}


// // Вызов элементов и помещение их в соответствующие карточки
// const getAllCard = () => {
// fetch('https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article.json')
// .then(response => response.json())
// .then((articles) => {
    
//     articles.slice().reverse().forEach((article, i) => {
//         if(i==0){
//             addMainCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
//         }
//         else if(i>0 && i<5){
//             addFirstCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
//         }
//         else if(i>4 && i<11){
//             addSecondCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
//         }
//         else if(i>10 && i<21){
//             document.querySelector('.more').addEventListener('click', function () {
//                 addSecondCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
//                 document.querySelector('.more').style.display = 'none';
//                 // Добавляем и удаляем лайки в дополнительном списке
//                 plusLikes()
//                 minusLikes()
//             });
//         }
//     });
//     // Добавляем и удаляем лайки
//     plusLikes()
//     minusLikes()
// })
// .catch((err) => {
//     alert('Нет статей')
//     console.log(`ERR: `, err)
// });
// }

getAllCard();

// Ваш массив с занятыми периодами
const busy = [
    { start: '10:30', stop: '10:50' },
    { start: '18:40', stop: '18:50' },
    { start: '14:40', stop: '15:50' },
    { start: '16:40', stop: '17:20' },
    { start: '20:05', stop: '20:20' }
];

// Задаем время открытия и закрытия и продолжительность временных окон
const openingTime = '09:00';
const closingTime = '21:00';
const windowFree = 30;

// Функция для вычисления свободных окон
const calculateFreeWindows = (busy, openingTime, closingTime, windowFree) => {
    // Создаем пустой массив для свободных окон
    const freeWindows = [];

    // Задаем начальное время равное времени открытия
    let startTime = openingTime;
    let stopTime = '';

    // Проходим по каждому занятому периоду
    for (let i = 0; i < busy.length; i++) {
        // Устанавливаем конечное время равным началу занятого периода
        stopTime = busy[i].start;

        // Пока разница во времени между конечным и начальным временем больше или равна продолжительности окна
        while (timeDifference(stopTime, startTime) >= windowFree) {
            // Добавляем свободное окно в массив
            freeWindows.push({ start: startTime, stop: incrementTime(startTime, windowFree) });
            
            // Увеличиваем начальное время на продолжительность окна
            startTime = incrementTime(startTime, windowFree);
        }

        // Устанавливаем начальное время равным конечному времени занятого периода
        startTime = busy[i].stop;
    }

    // Если разница времени между временем закрытия и текущим начальным временем больше или равна продолжительности окна
    if (timeDifference(closingTime, startTime) >= windowFree) {
        // Добавляем последнее свободное окно в массив
        freeWindows.push({ start: startTime, stop: incrementTime(startTime, windowFree) });
    }

    // Возвращаем массив со свободными окнами
    return freeWindows;
};

// Функция для вычисления разницы между временами
const timeDifference = (stopTime, startTime) => {
    // Парсим время из формата "чч:мм" в минуты
    const stopTimeMinutes = parseInt(stopTime.split(':')[0]) * 60 + parseInt(stopTime.split(':')[1]);
    const startTimeMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);

    // Возвращаем разницу в минутах
    return stopTimeMinutes - startTimeMinutes;
};

// Функция для увеличения времени на заданное значение
const incrementTime = (time, increment) => {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);

    // Вычисляем общее количество минут на основе текущего времени и заданного значения и переводим в формат "чч:мм"
    const totalMinutes = hours * 60 + minutes + increment;
    const newHours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const newMinutes = (totalMinutes % 60).toString().padStart(2, '0');

    // Возвращаем увеличенное время
    return `${newHours}:${newMinutes}`;
};

// Вычисляем свободные окна
const freeWindows = calculateFreeWindows(busy, openingTime, closingTime, windowFree);

// Если не найдено свободных окон
if (freeWindows.length === 0) {
    console.log('Не найдено свободных окон');
} else {
    // Выводим список свободных окон
    freeWindows.forEach((window) => {
        console.log(`Свободное окно: ${window.start} - ${window.stop}`);
    });
}
