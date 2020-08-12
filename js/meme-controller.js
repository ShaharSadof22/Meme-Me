'use strict';

const gCanvas = document.getElementById('myCanvas');
const gCtx = gCanvas.getContext('2d');
const elInput = document.querySelector('.input-txt');

elInput.addEventListener('input', updateText); //new text input

function init() {
    initService();
    _renderImgs();
}

function _renderImgs() {
    let strHTML = '';

    strHTML = gImgs.map(img => `<img src="${img.url}" alt="Image" class="img-card" onclick="setEditorPage(${img.id})">`);

    document.querySelector('.img-container').innerHTML = strHTML;

}

function _renderCanvas() {

    let imgId = getImgId();
    let img = new Image();
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        _drawInput();
    }
}

function setEditorPage(imgId) {
    document.querySelector('.img-container').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');
    updateCurrMeme(imgId);
    _renderCanvas(imgId);
}

function drawImg() {
    let imgId = getImgId();
    let img = new Image();
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function _drawText(lineIdx) {
    let currLine = gMeme.lines[lineIdx];
    gCtx.lineWidth = '1';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = currLine.color;
    gCtx.font = `${currLine.size}px Impact`;
    gCtx.textAlign = 'center';
    gCtx.fillText(currLine.txt, currLine.xPos, currLine.yPos);
    gCtx.strokeText(currLine.txt, currLine.xPos, currLine.yPos);
}

function _drawRect(lineIdx) {
    let currLine = gMeme.lines[lineIdx];
    gCtx.beginPath();
    gCtx.rect(0, currLine.yPos - 50, 500, 50);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();

    var my_gradient = gCtx.createLinearGradient(0, 0, 170, 0);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    gCtx.fillStyle = my_gradient;

    gCtx.fillRect(0, currLine.yPos - 50, 500, 50);
}

function updateText(ev) {
    let text = ev.target.value;
    if (text.length > 0 && getIsFirstClick()) {
        addNewLineModel();
        setSelectedLineIdx(1);
        setIsFirstClick(0);
    }
    updateTextModel(text);
    _renderCanvas();
}

function _drawInput() {
    _renderFontSize();
    let numOfLine = getNumOfLine();
    for (let i = 0; i < numOfLine; i++) {
        if (!getIsFirstClick() && i === numOfLine - 1) _drawRect(i);
        _drawText(i);
    }
}

function onChangeFontSize(val) {
    if(!getNumOfLine()) return;
    setFontSizeModel(val);
    _renderFontSize();
    _renderCanvas();
}

function _renderFontSize() {
    document.querySelector('.font-size-value').innerHTML = getFontSize();
}

function onMoveText(val) {
    if(!getNumOfLine()) return;
    setMoveText(val);
    _renderCanvas();
}

function onAddText() {
    ``
    if (elInput.value === '') return;
    setIsFirstClick(true);
    elInput.value = '';
    _renderCanvas();
}

function onChangeCurrText() {
    // debugger;
    setSelectedLineIdx(-1);
    _renderFontSize();
}
