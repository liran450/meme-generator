'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
}

// window.addEventListener('resize',resizeCanvas)


function renderGallery() {
    var strHTMLs = ``
    gImgs.forEach((img) =>
        strHTMLs += `<img src="${img.url}" onclick="renderImg(this)">`
    )
    document.querySelector('.img-container').innerHTML = strHTMLs

}

function renderImg(img) {
    var elPageContainer = document.querySelector('.main-container')
    var elMemePage = document.querySelector('.meme-page')
    var elCanvasContainer = document.querySelector('.canvas-container')
    elMemePage.style.display = 'block'
    elPageContainer.style.display = 'none';

    // console.log(img.naturalWidth)
    // console.log(img.naturalHeight)
    gCanvas.height = img.naturalHeight * gCanvas.width / img.naturalWidth
    gCanvas.width = img.naturalHeight * gCanvas.height / img.naturalWidth
    elCanvasContainer.style.width = gCanvas.width + 'px'
    elCanvasContainer.style.height = gCanvas.height + 'px'
    // console.log(elContainer.style.width);
    console.log('width', gCanvas.width)
    console.log('height', gCanvas.height)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    // gCanvas.height = elContainer.offsetHeight
}


