'use strict'
var gCurrImg;
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
        strHTMLs += `<img src="${img.url}" onclick="onClickImg(this, '${img.id}')">`
    )
    document.querySelector('.img-container').innerHTML = strHTMLs
}

function onClickImg(img, imgId) {
    showMemePage()
    gCurrImg = img
    drawImg(gCurrImg)
    updateSelectedImg(imgId)
    // onDrawLine()
    var text = gMeme.lines[0].txt
    drawText(text)
}

function drawImg(img) {
    var elCanvasContainer = document.querySelector('.canvas-container')
    gCanvas.height = img.naturalHeight * gCanvas.width / img.naturalWidth
    // gCanvas.width = img.naturalHeight * gCanvas.height / img.naturalWidth
    elCanvasContainer.style.width = gCanvas.width + 'px'
    elCanvasContainer.style.height = gCanvas.height + 'px'
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onDrawText(elInput) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
    drawText(elInput.value)
    renderLines()
}

function onChangeFontSize(size) {
    changeTextSize(size)
}

function onChangeHeight(height) {
    changeRowHeight(height)
}

function onAddLine() {
    addLine()
}