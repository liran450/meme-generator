'use strict'
var gCurrImg;
var gCanvas;
var gCtx;

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

function renderKeywords() {
    var keyWords = sortKeysByPopularity()
    var strHtmls = ``
    // keyWords.forEach(keyword => {
    //     strHtmls += `<span onclick="onClickKeyword(this)">${keyword[0]}</span> `
    // });

    for (let i = 0; i < 4 ; i++){
        strHtmls += `<span onclick="onClickKeyword(this)">${keyWords[i][0]}</span> `
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

function drawImg(img) {
    // var elCanvasContainer = document.querySelector('.canvas-container')
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
    // document.querySelector('.main-container').style = 'block'
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

function getEvPos(ev) {
    var OffsetXDiff = gCanvas.width / gCurrCanvasSize.width
    var OffsetYDiff = gCanvas.height / gCurrCanvasSize.height
    var pos = {
        x: ev.offsetX * OffsetXDiff,
        y: ev.offsetY * OffsetYDiff
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: (ev.pageX - ev.target.offsetLeft - ev.target.clientLeft) * OffsetXDiff,
            y: (ev.pageY - ev.target.offsetTop - ev.target.clientTop) * OffsetYDiff
        }
        console.log('click location', pos);
    }
    return pos
}

function getClickedLine() {
    return gMeme.lines[gMeme.clickedLineIdx]
}

function canvasClicked(ev) {
    //insert line width BEFORE switching lines (maybe in the put the func object)

    // find out if clicked inside of star chart
    var pos = getEvPos(ev)
    const clickedLineIdx = gMeme.lines.findIndex(line =>
        pos.x > line.pos.x &&
        pos.x < line.pos.x + line.width &&
        pos.y < line.pos.y &&
        pos.y > line.pos.y - 40
    )
    gMeme.clickedLineIdx = clickedLineIdx
    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx
        var textWidth = measureSelectedTextWidth()
        gMeme.lines[gMeme.clickedLineIdx].width = textWidth
    }
    return clickedLineIdx
}

function setLineDrag(isDrag) {
    if (gMeme.clickedLineIdx === -1) return
    gMeme.lines[gMeme.clickedLineIdx].isDrag = isDrag
}

function setLineSelected(isSelected) {
    if (gMeme.clickedLineIdx === -1) return
    gMeme.lines[gMeme.clickedLineIdx].isSelected = isSelected
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.clickedLineIdx].pos.x += dx
    gMeme.lines[gMeme.clickedLineIdx].pos.y += dy
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