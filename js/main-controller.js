'use strict'
var gCurrImg;
var gCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery()
    addListeners()
    renderSavedMemes()
    renderKeywords()
}

// window.addEventListener('resize',resizeCanvas)


function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
}

function renderGallery() {
    var imgs = gFilteredImgs
    var strHTMLs = ``
    imgs.forEach((img) =>
        strHTMLs += `<img src="${img.url}" onclick="onClickImg(this, '${img.id}')">`
    )
    document.querySelector('.img-container').innerHTML = strHTMLs
}

function drawImg(img) {
    gCanvas.height = img.naturalHeight * gCanvas.width / img.naturalWidth
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function renderLines() {
    gCanvas = document.querySelector('canvas');
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



function renderSavedMemes() {
    if (!gSavedMemes || gSavedMemes.length === 0) return
    var strHTML = ``
    gSavedMemes.forEach(meme =>
        strHTML += `<img class="saved-meme-img" src="${meme}">`
    )
    document.querySelector('.saved-memes').innerHTML = strHTML
}

function renderKeywords() {
    var keyWords = sortKeysByPopularity()
    var strHtmls = ``
    // keyWords.forEach(keyword => {
    //     strHtmls += `<span onclick="onClickKeyword(this)">${keyword[0]}</span> `
    // });

    for (let i = 0; i < 4 ; i++){
        strHtmls += `<span class="keywords" onclick="onClickKeyword(this)">${keyWords[i][0]}</span> `
    }
    document.querySelector('.keyword-search').innerHTML = strHtmls
}

function onClickImg(img, imgId) {
    gCurrImg = img
    drawImg(gCurrImg)
    showMemePage()
    updateSelectedImg(imgId)
    var text = gMeme.lines[0].txt
    drawText(text)
}

function onDrawText(elInput) {
    renderCanvas()
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
    document.querySelector('.main-gallery').style = 'block'
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        getCurrCanvasSize()
    })
}


function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    canvasClicked(ev)
    if (canvasClicked(ev) === -1) return
    setLineDrag(true)
    setLineSelected(true)
    lineSquare()
    renderLines()
    gStartPos = pos
    var elInput = document.querySelector('.meme-input')
    var elContainer = document.querySelector('.canvas-container');
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
    elContainer.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!getClickedLine()) return
    const line = getClickedLine();
    if (line.isDrag) {
        const pos = getEvPos(ev)
        console.log('gStartPos:', gStartPos)
        console.log('pos:', pos)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        // renderCanvas()
        //has renderCanvas inside lineSquare()
        var textWidth = measureClickedTextWidth()
        gMeme.lines[gMeme.clickedLineIdx].width = textWidth
        lineSquare()
        renderLines()
    }
}

function onUp() {
    setLineDrag(false)
    setLineSelected(false)
    var elContainer = document.querySelector('.canvas-container');
    elContainer.style.cursor = 'grab'
}

function onDwnlCanvas(elLink) {
    downloadCanvas(elLink)
}

function onToggleMemesModal() {
    document.querySelector('.saved-memes-container').classList.toggle('hide');
}

function onSaveMeme(elLink) {
    saveMemes(elLink)
}

function onSearchImg(value) {
    getImgs(value)
    renderGallery()
}

function onClickKeyword(elKeyword) {
    addClickToKeyword(elKeyword)
    getImgs(elKeyword.innerText)
    renderGallery()
}