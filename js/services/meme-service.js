var gLineId = 0
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gSavedMemes = loadSavedMemes() || []

var gCurrCanvasSize;

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    clickedLineIdx: null,
    lines: [
        {
            id: 0,
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            color: 'red',
            font: 'Impact',
            pos: { x: 200, y: 100 },
            width: 80.043,
            isSelected: false,
            isDrag: false
        },
    ]
}

function drawImg(img) {
    gCanvas.height = img.naturalHeight * gCanvas.width / img.naturalWidth
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}

function drawText(text, x, y, size, color, align) {
    if (gMeme.lines.length === 0) createNewLine()
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${gMeme.font}`
    gCtx.textAlign = align
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    var textWidth = gCtx.measureText(text).width
    gMeme.lines[gMeme.selectedLineIdx].width = textWidth
    gCtx.closePath()
}

function changeTextSize(size) {
    // make a return that it cannot go below a certain number
    // var currSize = (gMeme.lines[0].size === 10) ? 1: size
    // console.log(currSize);

    gMeme.lines[gMeme.selectedLineIdx].size += size
    // console.log(gMeme.lines[gMeme.selectedLineIdx].size);
    renderCanvas()
    renderLines()
}

function changeRowHeight(height) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += height
    renderCanvas()
    renderLines()
}

function addLine() {
    var y = gCanvas.height - 100
    gLineId++;
    if (gLineId >= 2) y = gCanvas.height / 2
    if (gMeme.lines.length === 0) selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    gMeme.lines.push({
        id: gLineId,
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: 200, y },
        isDrag: false,
        width: 80.043
    })
    renderLines()
}

function createNewLine() {
    gMeme.lines.push({
        id: ++gLineId,
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: 200, y: 100 },
        isDrag: false,
        width: 80.043
    })
}

// if (gMeme.lines[gMeme.selectedLineIdx].isSelected) lineSquare()

function changeColor(fillColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = fillColor
    renderCanvas()
    renderLines()
}

function changeTextAlign(btnClass) {
    if (btnClass.contains('text-left')) {
        gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    } else if (btnClass.contains('text-middle')) {
        gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    }
    else {
        gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    }
    renderCanvas()
    renderLines()
}

function switchLines() {
    if (gMeme.lines.length === 0) return
    var linesCount = gMeme.lines.length
    var prevLineIdx = gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx < linesCount - 1) gMeme.selectedLineIdx += 1
    else gMeme.selectedLineIdx = 0

    var textWidth = measureSelectedTextWidth()
    console.log(textWidth);
    gMeme.lines[gMeme.selectedLineIdx].width = textWidth
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    gMeme.lines[prevLineIdx].isSelected = false
    lineSquare()
    renderLines()
}

function measureSelectedTextWidth() {
    return gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
}

function measureClickedTextWidth() {
    return gCtx.measureText(gMeme.lines[gMeme.clickedLineIdx].txt).width
}

function lineSquare() {
    if (!gMeme.lines[gMeme.selectedLineIdx].isSelected) return
    renderCanvas()
    var linePosX = gMeme.lines[gMeme.selectedLineIdx].pos.x
    var linePosY = gMeme.lines[gMeme.selectedLineIdx].pos.y
    // var lineHeight = gMeme.lines[gMeme.selectedLineIdx].size
    var lineWidth = gMeme.lines[gMeme.selectedLineIdx].width
    gCtx.beginPath()
    // gCtx.lineWidth = 1
    gCtx.moveTo(linePosX - 40, linePosY - 40)
    gCtx.lineTo(linePosX + lineWidth + 40, linePosY - 40)
    gCtx.lineTo(linePosX + lineWidth + 40, linePosY + 20)
    gCtx.lineTo(linePosX - 40, linePosY + 20)
    gCtx.lineTo(linePosX - 40, linePosY - 40)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function deleteLine() {
    // if (gMeme.lines.length === 1) return
    // var prevLineIdx = gMeme.selectedLineIdx
    var idx = gMeme.lines.findIndex((line) => {
        return line.isSelected
    })
    gMeme.lines.splice(idx, 1)
    if (gMeme.selectedLineIdx !== 0) gMeme.selectedLineIdx -= 1
    renderCanvas()
    renderLines()
}

// function dragAndDrop() {

// }

function getCurrCanvasSize() {
    var elCanvasWidth = document.querySelector('.canvas').clientWidth
    var elCanvasHeight = document.querySelector('.canvas').clientHeight
    // console.log('canvas height:',elCanvasHeight , 'canvas width:',elCanvasWidth );
    return gCurrCanvasSize = { width: elCanvasWidth, height: elCanvasHeight }
}

function downloadCanvas(canvas) {
    const data = gCanvas.toDataURL()
    canvas.href = data
    canvas.download = 'Canvas Img'
}

function saveMemes(canvas) {
    const data = gCanvas.toDataURL()
    // canvas.href = data
    console.log(data);
    gSavedMemes.push(data)
    saveToStorage('savedMemes', gSavedMemes)
    renderSavedMemes()
}

function loadSavedMemes() {
    var savedMemes = loadFromStorage('savedMemes')
    if (!savedMemes || savedMemes.length === 0) return []
    else return savedMemes
}

function renderSavedMemes() {
    if (!gSavedMemes || gSavedMemes.length === 0) return
    var strHTML = ``
    gSavedMemes.forEach(meme =>
        strHTML += `<img class="saved-meme-img" src="${meme}">`
    )
    document.querySelector('.saved-memes').innerHTML = strHTML
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
