var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
    {
    txt: 'I never eat Falafel',
    size: 40,
    align: 'left',
    color: 'red',
    font: 'Impact'
    }
    ]
   }


   function updateSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
   }

   function drawText(text, x = 100, y = 100) {
       console.log(`${text}`);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[0].color
    // gCtx.fillStyle = 'white'
    gCtx.font = `${gMeme.lines[0].size}px ${gMeme.font}`
    // gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}