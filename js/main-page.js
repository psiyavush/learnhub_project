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

// Функция прибавления лайков
function plusLikes(){
    let plusBtn = document.querySelectorAll('.plus');
    plusBtn.forEach((btn) => {
        btn.addEventListener('click', ()=>{
            let likesResult = parseInt(document.getElementById(`${btn.dataset.id}`).textContent)
            let newLikes = likesResult + 1
            fetch(`https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article/${btn.dataset.id-1}.json`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    'likes': newLikes
                })
            })
            .then(response => response.json())
            .then((article) =>{
                document.getElementById(`${btn.dataset.id}`).textContent = '' 
                document.getElementById(`${btn.dataset.id}`).textContent = article.likes 
            })
        })
    })
}

// Функция удаления лайков
function minusLikes(){
    let minusBtn = document.querySelectorAll('.minus');
    minusBtn.forEach((btn) => {
        btn.addEventListener('click', ()=>{
            let likesResult = parseInt(document.getElementById(`${btn.dataset.id}`).textContent)
            let newLikes = likesResult - 1
            fetch(`https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article/${btn.dataset.id-1}.json`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    'likes': newLikes
                })
            })
            .then(response => response.json())
            .then((article) =>{
                document.getElementById(`${btn.dataset.id}`).textContent = '' 
                document.getElementById(`${btn.dataset.id}`).textContent = article.likes 
            })
        })
    })
}

// Вызов элементов и помещение их в соответствующие карточки
const getAllCard = () => {
fetch('https://learnhub-project-cb2ba-default-rtdb.europe-west1.firebasedatabase.app/article.json')
.then(response => response.json())
.then((articles) => {
    
    articles.slice().reverse().forEach((article, i) => {
        if(i==0){
            addMainCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
        }
        else if(i>0 && i<5){
            addFirstCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
        }
        else if(i>4 && i<11){
            addSecondCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
        }
        else if(i>10 && i<21){
            document.querySelector('.more').addEventListener('click', function () {
                addSecondCardToDocument(article.title, article.content, article.pic, article.id, article.likes)
                document.querySelector('.more').style.display = 'none';
                // Добавляем и удаляем лайки в дополнительном списке
                plusLikes()
                minusLikes()
            });
            
        }
    });
    // Добавляем и удаляем лайки
    plusLikes()
    minusLikes()
})
.catch((err) => {
    alert('Нет статей')
    console.log(`ERR: `, err)
});
}

getAllCard();