// var gLineId = 1;
var gLineId = 0

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            id: 0,
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            color: 'red',
            font: 'Impact',
            pos: { x: 200, y: 100 },
            isSelected: false,
            width: null
        },
    ]
}


function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}

function drawText(text, x, y, size, color, align) {
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${gMeme.font}`
    // gCtx.fillText(text, x, y)
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
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
    renderLines()
}

function changeRowHeight(height) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += height
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
    renderLines()
}

function addLine() {
    var y = gCanvas.height - 100
    // var txt = ''
    gLineId++;
    if (gLineId >= 2) y = gCanvas.height / 2
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    // drawImg(gCurrImg)
    gMeme.selectedLineIdx++
    gMeme.lines.push({
        id: gLineId,
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: 200, y }
    })
    renderLines()
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
// if (gMeme.lines[gMeme.selectedLineIdx].isSelected) lineSquare()

function changeColor(fillColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = fillColor
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
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
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)

    renderLines()
}

function switchLines() {
    var linesCount = gMeme.lines.length
    var prevLineIdx = gMeme.selectedLineIdx
    if (gMeme.selectedLineIdx < linesCount - 1) gMeme.selectedLineIdx += 1
    else gMeme.selectedLineIdx = 0
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    gMeme.lines[prevLineIdx].isSelected = false
    lineSquare() 
    renderLines()
}

function lineSquare() {
    if (!gMeme.lines[gMeme.selectedLineIdx].isSelected) return
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
    var linePosX = gMeme.lines[gMeme.selectedLineIdx].pos.x
    var linePosY = gMeme.lines[gMeme.selectedLineIdx].pos.y
    // var lineHeight = gMeme.lines[gMeme.selectedLineIdx].size
    var lineWidth = gMeme.lines[gMeme.selectedLineIdx].width
    gCtx.beginPath()
    gCtx.lineWidth = 1
    gCtx.moveTo(linePosX - 40, linePosY - 40)
    gCtx.lineTo(linePosX + lineWidth + 40, linePosY - 40)
    gCtx.lineTo(linePosX + lineWidth + 40, linePosY + 20)
    gCtx.lineTo(linePosX - 40, linePosY + 20)
    gCtx.lineTo(linePosX - 40, linePosY - 40)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}