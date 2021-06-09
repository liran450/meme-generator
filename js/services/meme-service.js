var gCurrLineId = 1;

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            id: 1,
            txt: 'I never eat Falafel',
            size: 40,
            align: 'left',
            color: 'red',
            font: 'Impact',
            pos: { x: 100, y: 100 }
        },
    ]
}


function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}

function drawText(text, x = 100, y = 100) {
    gMeme.lines[gCurrLineId-1].txt = text
    // renderLines()

    // console.log(`${text}`);
    // console.log(`${gMeme.lines[gCurrLineId-1].size}`);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[gCurrLineId-1].color
    // gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[gCurrLineId-1].size}px ${gMeme.font}`
    // gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function changeTextSize(size) {
    // make a return that it cannot go below a certain number
    // var currSize = (gMeme.lines[0].size === 10) ? 1: size
    // console.log(currSize);
    var currText = gMeme.lines[0].txt
    gMeme.lines[0].size += size
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
    drawText(currText)
}

function changeRowHeight(height) {
    var currText = gMeme.lines[0].txt
    gMeme.lines[0].pos.y += height
    var posY = gMeme.lines[0].pos.y
    var posX = gMeme.lines[0].pos.x
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)
    drawText(currText, posX, posY)
}

function addLine() {
    var y = gCanvas.height - 100
    console.log(y);
    gCurrLineId++;
    if (gCurrLineId === 2) y = gCanvas.height / 2
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImg(gCurrImg)

    gMeme.lines.push({
        id: gCurrLineId,
        txt: 'I never eat Falafel',
        size: 40,
        align: 'left',
        color: 'red',
        font: 'Impact',
        pos: { x: 100, y }
    })
    renderLines()
}

function renderLines() {
    for (var i = 0; i < gCurrLineId; i++) {
        var currText = gMeme.lines[i].txt
        var posX = gMeme.lines[i].pos.x
        var posY = gMeme.lines[i].pos.y

        drawText(currText, posX, posY)
    }
}