'use strict';

const IMG_COUNT = 6;
var gKeywords = { 'happy': 3, 'funny': 1 };
var gImgs = [];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: -1,
    isFirstClick: true,
    lines: []
};

function initService() {
    _createImgs();
}

function _createImgs() {
    for (let i = 1; i <= IMG_COUNT; i++) {
        gImgs.push(_createImg(i));
    }
}

function _createImg(id) {
    return { id, url: `./img/${id}.jpg`, keywords: ['happy', 'funny'] };
}

function updateCurrMeme(imgId) {
    gMeme.selectedImgId = imgId;
    // gMeme.selectedLineIdx = 0;
}

function updateTextModel(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function getImgId() {
    return gMeme.selectedImgId;
}

function setFontSizeModel(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += (val * 2);
}

function getFontSize() {
    return gMeme.lines.length ? gMeme.lines[gMeme.selectedLineIdx].size : 0;
}

function setMoveText(val) {
    gMeme.lines[gMeme.selectedLineIdx].yPos += (val * 10);
}

function addNewLineModel() {
    gMeme.lines.push({
        txt: '',
        size: 50,
        align: 'center',
        color: 'black',
        yPos: 80,
        xPos: 200
    })
}

function setSelectedLineIdx(val) {
    gMeme.selectedLineIdx += val;
    if (gMeme.selectedLineIdx < 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    }

}

function getNumOfLine() {
    return gMeme.lines.length;
}

function getIsFirstClick() {
    return gMeme.isFirstClick;
}

function setIsFirstClick(val) {
    gMeme.isFirstClick = val === true;
}

function getCurrLine() {
    return gMeme.selectedLineIdx;
}