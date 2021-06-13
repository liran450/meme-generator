var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gId = 0;

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy', 'dog', 'dogs'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy', 'dog', 'baby', 'funny'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy', 'cat', 'computer'] },
    { id: 5, url: 'img/5.jpg', keywords: ['win', 'baby', 'boy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy', 'movie', 'actor', 'hair', 'funny', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy', 'baby', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy', 'funny', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy', 'baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy', 'smile', 'teeth', 'obama', 'politics'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy', 'gay', 'sport', 'men'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy', 'tv', 'show', 'man', 'old'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy', 'leonardo', 'leonardo dicaprio', 'movie', 'star'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy', 'movie', 'matrix', 'man', 'glasses'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy', 'lord of the rings', 'man', 'movie'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy', 'x men', 'star trek', 'old', 'man'] },
    { id: 17, url: 'img/17.jpg', keywords: ['putin', 'old', 'politics'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy', 'toy story', 'woody', 'buzz', 'movie', 'animated'] },
    { id: 19, url: 'img/19.jpg', keywords: ['putin', 'old', 'politics'] },
    { id: 20, url: 'img/20.jpg', keywords: ['happy', 'toy story', 'woody', 'buzz', 'movie', 'animated'] },
    { id: 21, url: 'img/21.jpg', keywords: ['happy', 'cat', 'computer'] },
    { id: 22, url: 'img/22.jpg', keywords: ['happy', 'funny', 'man'] },
    { id: 23, url: 'img/23.jpg', keywords: ['happy', 'baby', 'funny'] },
    { id: 24, url: 'img/24.jpg', keywords: ['happy', 'tv', 'show', 'man', 'old'] },
    { id: 25, url: 'img/25.jpg', keywords: ['happy', 'movie', 'woman', 'view'] },
    { id: 26, url: 'img/26.jpg', keywords: ['funny', 'movie'] },
    { id: 27, url: 'img/27.jpg', keywords: ['win', 'baby', 'boy'] },
    { id: 28, url: 'img/28.jpg', keywords: ['happy', 'dog', 'baby', 'funny'] },
    { id: 29, url: 'img/29.jpg', keywords: ['happy', 'dog', 'dogs'] },
    { id: 30, url: 'img/30.jpg', keywords: ['trump', 'politics', 'old'] },
    { id: 31, url: 'img/31.jpg', keywords: ['funny', 'movie', 'mr evil', 'austin powers'] },
    { id: 32, url: 'img/32.jpg', keywords: ['happy', 'movie', 'actor', 'hair', 'funny', 'man'] },
    { id: 33, url: 'img/33.jpg', keywords: ['happy', 'kids', 'funny', 'desert'] },
    { id: 34, url: 'img/34.jpg', keywords: ['trump', 'politics', 'old'] },
    { id: 35, url: 'img/35.jpg', keywords: ['happy', 'baby', 'funny'] },
    { id: 36, url: 'img/36.jpg', keywords: ['happy', 'dog', 'funny'] },
    { id: 37, url: 'img/37.jpg', keywords: ['happy', 'smile', 'teeth', 'obama', 'politics'] },
    { id: 38, url: 'img/38.jpg', keywords: ['happy', 'gay', 'sport', 'men'] },
    { id: 39, url: 'img/39.jpg', keywords: ['happy', 'leonardo', 'leonardo dicaprio', 'movie', 'star'] },
    { id: 40, url: 'img/40.jpg', keywords: ['happy', 'movie', 'matrix', 'man', 'glasses'] },
    { id: 41, url: 'img/41.jpg', keywords: ['happy', 'lord of the rings', 'man', 'movie'] },
    { id: 42, url: 'img/42.jpg', keywords: ['happy', 'oprah'] },
    { id: 43, url: 'img/43.jpg', keywords: ['happy', 'x men', 'star trek', 'old', 'man'] },
];

var gFilteredImgs = gImgs
var gKeywords = createKeywordsArray()


function createKeywordsArray() {
    var keyWords = []
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            keyWords.push(keyword)
        })
    });
    var keyWordObjects = keyWords.reduce(function (acc, keyword) {
        if (!acc[keyword]) acc[keyword] = 0;
        return acc;
    }, {})
    return keyWordObjects
}

function putKeywordsInArray() {
    var sortedWords = []
    for (const key in gKeywords) {
        sortedWords.push([key, gKeywords[key]]);
    }
    return sortedWords
}

// sortedWords.push({[key]: gKeywords[key]});

function sortKeysByPopularity() {
    var keywords = putKeywordsInArray()
    keywords.sort(function (a, b) {
        if (a[1] > b[1]) return -1;
        if (b[1] < a[1]) return 1;
    });
    return keywords
}

function showMemePage() {
    var elPageContainer = document.querySelector('.main-gallery')
    var elMemePage = document.querySelector('.meme-page')
    elPageContainer.style.display = 'none';
    elMemePage.style.display = 'block'
    getCurrCanvasSize()
}

function toggleMenu() {
    var elBody = document.querySelector('body');
    elBody.classList.toggle('menu-open');
}



function getImgs(value) {
    var regex = new RegExp(value, 'i')
    // var rgx = /ab*\dc/ // Cannot use this syntax while creating dynamic regex

    var imgs = gImgs.filter(function (img) {
        return regex.test(img.keywords)
    })

    gFilteredImgs = imgs
}

function addClickToKeyword(elKeyword) {
    for (const key in gKeywords) {
        if (key === elKeyword.innerText) gKeywords[key]++
    }
    var word = elKeyword.innerText
    elKeyword.style.fontSize = gKeywords[word] + 32 + 'px'
}