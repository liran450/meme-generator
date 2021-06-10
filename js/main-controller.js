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

function renderLines() {
    gMeme.lines.forEach((line) => {
        var currText = line.txt
        var posX = line.pos.x
        var posY = line.pos.y
        var size = line.size
        var color = line.color
        var align = line.align
        drawText(currText, posX, posY, size, color, align)
    })
}

function onClickImg(img, imgId) {
    showMemePage()
    gCurrImg = img
    drawImg(gCurrImg)
    updateSelectedImg(imgId)
    var text = gMeme.lines[0].txt
    drawText(text)
}

function drawImg(img) {
    var elCanvasContainer = document.querySelector('.canvas-container')
    gCanvas.height = img.naturalHeight * gCanvas.width / img.naturalWidth
    // gCanvas.width = img.naturalHeight * gCanvas.height / img.naturalWidth
    // gCanvas.width *= 0.8
    // elCanvasContainer.style.width = gCanvas.width + 'px'
    // elCanvasContainer.style.height = gCanvas.height + 'px'
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onDrawText(elInput) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // var posX = gMeme.lines[gMeme.selectedLineIdx].pos.x
    // var posY = gMeme.lines[gMeme.selectedLineIdx].pos.y
    // var size = gMeme.lines[gMeme.selectedLineIdx].size
    drawImg(gCurrImg)
    // drawText(elInput.value, posX, posY, size)
    if (gMeme.lines.length === 0) createNewLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = elInput.value
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

function onChangeColor(elInput) {
    changeColor(elInput.value)
}

function onChangeAlign(elBtn) {
    changeTextAlign(elBtn.classList)
}

function onSwitchLines() {
    switchLines()
}

function onDeleteLine() {
    deleteLine()
}

function onClickGallery() {
    document.querySelector('.meme-page').style = 'none'
    document.querySelector('.main-container').style = 'block'    
}

