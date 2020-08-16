'use strict';

const IMG_COUNT = 18;
var gNextImageId = IMG_COUNT + 1;
var gMemeMemomry = [];

var gKeywords = { 'Cute': 3, 'Funny': 1, 'Animal': 2 };
var gImgs = [];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: -1,
    isFirstClick: true,
    isEditing: false,
    isLoadedFromSaved: false,
    isLoadedFromPC: false,
    urlForLoadedImg: false,
    lines: [],
};


function getSrcFromLoadedImg() {
    return gImgs[getImgId()].url
}

function initService() {
    _createImgs();
}

function _createImgs() {
    for (let i = 1; i <= IMG_COUNT; i++) {
        gImgs.push(_createImg(i));
    }
}

function _createImg(id) {
    let keywords = [];

    // adding tags to img
    if (id === 2 || id === 3 || id === 4 || id === 5) {
        keywords.push('Cute');
    }
    if (id === 6 || id === 7 || id === 8 || id === 9 || id === 10) {
        keywords.push('Funny');
    }
    if (id === 2 || id === 3 || id === 4) {
        keywords.push('Animal');
    }

    return { id, url: `./img/${id}.jpg`, keywords };
}

function updateCurrMeme(imgId) {
    gMeme.selectedImgId = imgId;
}

function updateTextModel(text) {
    gMeme.lines[getCurrLine()].txt = text;
}

function getCurrText() {
    return gMeme.lines[getCurrLine()].txt;
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
    } else {
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

function setIsLoadedFromSaved(val) {
    return gMeme.isLoadedFromSaved = val === true;
}

function getIsLoadedFromSaved() {
    return gMeme.isLoadedFromSaved;
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

function deleteMeme(index) { // CR - make with filter
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

function deleteCurrLine() { // CR - make with filter
    const currLine = getCurrLine();
    let newLines = [];
    gMeme.lines.forEach((line, index) => {
        if (index !== currLine) newLines.push(line);
    });
    gMeme.lines = newLines;
}

function setLineIdxToZero() {
    gMeme.selectedLineIdx = -1;
}

function updateKeywordsModel(key) {
    gKeywords[key]++;
}

function addImgToModel(imgPath) {
    gImgs.push({ id: gNextImageId++, url: imgPath, keywords: [] });
}

function setIsLoadedFromPC(val) {
    gMeme.isLoadedFromPC = val === true;
}

function getIsLoadedFromPC() {
    return gMeme.isLoadedFromPC;
}

function getSrcOfLoadedImg(imgId) {
    return gImgs[imgId - 1].url;
}

function setGmemeToLoadedFile(imgId) {
    updateCurrMeme(imgId);
    setIsLoadedFromPC(true);
    gMeme.urlForLoadedImg = gImgs[imgId - 1].url;
}
