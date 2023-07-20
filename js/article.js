function getUrlParam() {
    let query = window.location.search.substring(1);
    let id = query.split('=');
    return Number(id[1]);
};

const getId = getUrlParam();

let article = document.getElementById('article');

// вывод данных (демонстрационная версия)
articles = JSON.parse(localStorage.getItem('cards-info'))
article.innerHTML = `
    <h1 class="article__title">${articles[getId-1].title}</h1>
    <div class="article__content">
    ${articles[getId-1].content}
    <img src="${articles[getId-1].pic}" alt="${articles[getId-1].title}" class="article-img">
    </div>
    `

// fetch(`https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article/${getId-1}.json`)
// .then((response) => response.json())
// .then((item) => {
//     article.innerHTML = `
//     <h1 class="article__title">${item.title}</h1>
//     <div class="article__content">
//     ${item.content}
//     <img src="${item.pic}" alt="${item.title}" class="article-img">
//     </div>
//     `
// });
