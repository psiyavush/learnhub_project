function getUrlParam() {
    let query = window.location.search.substring(1);
    let id = query.split('=');
    return Number(id[1]);
};

const getId = getUrlParam();

let article = document.getElementById('article');

fetch(`https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article/${getId-1}.json`)
.then((response) => response.json())
.then((item) => {
    article.innerHTML = `
    <h1 class="article__title">${item.title}</h1>
    <div class="article__content">
    ${item.content}
    <img src="${item.pic}" alt="${item.title}" class="article-img">
    </div>
    `
});
