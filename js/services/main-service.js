var gKeywords = {'happy': 12,'funny puk': 1}
var gId = 0;
var gImgs = [
    {id: 1, url: 'img/1.jpg', keywords: ['happy']},
    {id: 2, url: 'img/2.jpg', keywords: ['happy']},
    {id: 3, url: 'img/3.jpg', keywords: ['happy']},
    {id: 4, url: 'img/4.jpg', keywords: ['happy']},
    {id: 5, url: 'img/5.jpg', keywords: ['happy']},
    {id: 6, url: 'img/6.jpg', keywords: ['happy']},
    {id: 7, url: 'img/7.jpg', keywords: ['happy']},
    {id: 8, url: 'img/8.jpg', keywords: ['happy']},
    {id: 9, url: 'img/9.jpg', keywords: ['happy']},
    {id: 10, url: 'img/10.jpg', keywords: ['happy']},
    {id: 11, url: 'img/11.jpg', keywords: ['happy']},
    {id: 12, url: 'img/12.jpg', keywords: ['happy']},
    {id: 13, url: 'img/13.jpg', keywords: ['happy']},
    {id: 14, url: 'img/14.jpg', keywords: ['happy']},
    {id: 15, url: 'img/15.jpg', keywords: ['happy']},
    {id: 16, url: 'img/16.jpg', keywords: ['happy']},
    {id: 17, url: 'img/17.jpg', keywords: ['happy']},
    {id: 18, url: 'img/18.jpg', keywords: ['happy']},
    {id: 19, url: 'img/19.jpg', keywords: ['happy']},
    {id: 20, url: 'img/20.jpg', keywords: ['happy']},
    {id: 21, url: 'img/21.jpg', keywords: ['happy']},
    {id: 22, url: 'img/22.jpg', keywords: ['happy']},
    {id: 23, url: 'img/23.jpg', keywords: ['happy']},
    {id: 24, url: 'img/24.jpg', keywords: ['happy']},
    {id: 25, url: 'img/25.jpg', keywords: ['happy']},
    {id: 26, url: 'img/26.jpg', keywords: ['happy']},
    {id: 27, url: 'img/27.jpg', keywords: ['happy']},
    {id: 28, url: 'img/28.jpg', keywords: ['happy']},
    {id: 29, url: 'img/29.jpg', keywords: ['happy']},
    {id: 30, url: 'img/30.jpg', keywords: ['happy']},
    {id: 31, url: 'img/31.jpg', keywords: ['happy']},
    {id: 32, url: 'img/32.jpg', keywords: ['happy']},
    {id: 33, url: 'img/33.jpg', keywords: ['happy']},
    {id: 34, url: 'img/34.jpg', keywords: ['happy']},
    {id: 35, url: 'img/35.jpg', keywords: ['happy']},
    {id: 36, url: 'img/36.jpg', keywords: ['happy']},
    {id: 37, url: 'img/37.jpg', keywords: ['happy']},
    {id: 38, url: 'img/38.jpg', keywords: ['happy']},
    {id: 39, url: 'img/39.jpg', keywords: ['happy']},
    {id: 40, url: 'img/40.jpg', keywords: ['happy']},
    {id: 41, url: 'img/41.jpg', keywords: ['happy']},
    {id: 42, url: 'img/42.jpg', keywords: ['happy']},
    {id: 43, url: 'img/43.jpg', keywords: ['happy']},
];

function showMemePage() {
    var elPageContainer = document.querySelector('.main-gallery')
    var elMemePage = document.querySelector('.meme-page')   
    elPageContainer.style.display = 'none';
    elMemePage.style.display = 'block'
    getCurrCanvasSize()
    // var elCanvasHeight = document.querySelector('.canvas').clientHeight
    // var elCanvasWidth = document.querySelector('.canvas').clientWidth
    // gCurrCanvasSize.height = elCanvasHeight
    // gCurrCanvasSize.width = elCanvasWidth
}

function toggleMenu() {
    var elBody = document.querySelector('body');
    elBody.classList.toggle('menu-open');
}
