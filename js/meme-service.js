'use strict';

const IMG_COUNT = 8;
var gMemeMemomry = [];

var gKeywords = { 'happy': 3, 'funny': 1 };
var gImgs = [];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: -1,
    isFirstClick: true,
    isEditing: false,
    isLoadedFromSaved: false,
    lines: [],
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
}

function updateTextModel(text) {
    gMeme.lines[getCurrLine()].txt = text;
}

function getImgId() {
    return gMeme.selectedImgId;
}

function setFontSizeModel(val) {
    gMeme.lines[getCurrLine()].size += (val * 2);
}

function getFontSize() {
    return gMeme.lines.length ? gMeme.lines[getCurrLine()].size : 0;
}

function setMoveText(val) {
    if (val === 1 || val === -1) {
        gMeme.lines[getCurrLine()].yPos += (val * 10);
    } else{
        gMeme.lines[getCurrLine()].xPos += (val * 5);
    }
}

function addNewLineModel() {
    gMeme.lines.push({
        txt: '',
        size: 50,
        align: 'center',
        color: 'black',
        yPos: 80,
        xPos: 200,
        font: 'Impact',
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

function getCurrImgId() {
    return gMeme.selectedImgId;
}

function getIsEdit() {
    return gMeme.isEditing;
}

function setIsEdit(val) {
    return gMeme.isEditing = val === true;
}

function getIsLoadedFromSaved() {
    return gMeme.isLoadedFromSaved;
}

function setIsLoadedFromSaved(val) {
    return gMeme.isLoadedFromSaved = val === true;
}

function getMemeMemomry(index) {
    return gMemeMemomry[index];
}

function updateMeme(MemeMemomry) {
    gMeme = MemeMemomry;
}

function deleteTextFromEditorModel() {
    gMeme.lines = [];
}

function deleteMeme(index) {
    let tempMemeMemory = [];
    for (let i = 0; i < gMemeMemomry.length; i++) {
        if (i !== index) tempMemeMemory.push(gMemeMemomry[i]);
    }
    addToSaveMemes(tempMemeMemory);
}

function setNewColor(newColor) {
    gMeme.lines[getCurrLine()].color = newColor;
}

function setFontToModel(newFont) {
    gMeme.lines[getCurrLine()].font = newFont;
}