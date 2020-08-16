'use strict';

const gCanvas = document.getElementById('myCanvas');
const gCtx = gCanvas.getContext('2d');
const elInput = document.querySelector('.input-txt');
var isDeleteMeme = false;
var currPage = 'header-gallery';

elInput.addEventListener('input', updateText); //new text input


function init() {
    findScreenXidth();
    initService();
    _renderImgs();
    _renderTags();
}

function findScreenXidth() {
    if (window.innerWidth < 620) {
        document.getElementById("myCanvas").style.height = "300px";
        document.getElementById("myCanvas").style.width = "300px";
    }
}

function _renderImgs(key = false) {
    let strHTML = [];

    if (key) {
        strHTML = gImgs.map(img => {
            if (img.keywords.includes(key)) {
                return `<img src="${img.url}" alt="Image" class="img-card" onclick="onShowEditorPage(${img.id}, ${true})">`;
            }
        })
    } else {
        strHTML = gImgs.map(img => `<img src="${img.url}" alt="Image" class="img-card" onclick="onShowEditorPage(${img.id}, ${true})">`
        );
    }

    document.querySelector('.img-container').innerHTML = strHTML.join('');
}

function _renderTags() {
    let strHTML = [];

    const keywords = Object.keys(gKeywords);

    keywords.forEach(key => {
        strHTML.push(`<h3 class="tag ${key}-tag" onclick="onSearchTag('${key}')">${key}</h3>`);
    })
    document.querySelector('.tags-container').innerHTML = strHTML.join('');
}

function onSearchTag(key) {
    updateKeywordsModel(key);
    _renderImgs(key);
    const firstFontSize = 18;
    document.querySelector(`.${key}-tag`).style.fontSize = `${firstFontSize + gKeywords[key]}px`;
}

function _renderCanvas() {

    const imgId = getImgId();
    let img = new Image();

    if (imgId > IMG_COUNT) { // rendering img from pc
        clearCanvas();
        setGmemeToLoadedFile(imgId);
        img.src = getSrcOfLoadedImg(imgId);
    } else {
        img.src = `./img/${imgId}.jpg`;
    }


    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        _drawInput();
    }
}

// nav-bar

function onShowEditorPage(imgId = getCurrImgId(), isNeedToDeleteText = false) {
    setCurrPage('header-memes');
    elInput.value = '';
    setLineIdxToZero();

    if (imgId < 1) imgId = 1;

    showEditPage();

    if (isNeedToDeleteText) deleteTextFromEditorModel();

    if (!getIsLoadedFromSaved()) updateCurrMeme(imgId);

    _renderCanvas();
}

function showEditPage() {
    document.querySelector('.img-container').classList.add('hide');
    document.querySelector('.control-gallery').classList.add('hide');
    document.querySelector('.saved').classList.add('hide');
    document.querySelector('.editor-container').classList.remove('hide');
}



function onShowGalleryPage() {
    setCurrPage('header-gallery');
    document.querySelector('.control-gallery').classList.remove('hide');
    document.querySelector('.img-container').classList.remove('hide');
    document.querySelector('.editor-container').classList.add('hide');
    document.querySelector('.saved').classList.add('hide');
}

function onSetAboutPage() {
    setCurrPage('header-about');
    var strHTML = `
    <h2>This Meme generator made by Shahar Sadof</h2>
    <h3>About this website - What is the Meme Generator?</h3>
    <p>It's a free online image maker that allows you to add custom resizable text to images. It operates in HTML5 canvas, so your images are created instantly on your own device. Most commonly, people use the generator to add text captions to established memes, so technically it's more of a meme "captioner" than a meme maker. However, you can also upload your own images as templates.</p>
    `
    document.querySelector('.about').classList.remove('hide');
    document.querySelector('.exit-about').classList.remove('hide');
    document.querySelector('.about').innerHTML = strHTML;

}

function onExitAbout() {
    document.querySelector('.about').classList.add('hide');
    document.querySelector('.exit-about').classList.add('hide');
}

function onSetSavedMemesPage() {

    setCurrPage('header-saved');
    let strHTML = '';
    var savedMemes = getSavedMemes();

    if (savedMemes) {
        savedMemes.forEach((Meme, index) => {
            console.log("onSetSavedMemesPage -> Meme", Meme)
            if (Meme.isLoadedFromPC) {
                const imgSrc = getSrcOfLoadedImg(Meme.selectedImgId);
                strHTML += `<img src="${imgSrc}.jpg" alt="Image" class="img-card" onclick="onLoadFromSaved(${index})">`
            } else {
                strHTML += `<img src="./img/${Meme.selectedImgId}.jpg" alt="Image" class="img-card" onclick="onLoadFromSaved(${index})">`
            }
        });
    }

    document.querySelector('.saved-meme-container').innerHTML = strHTML;
    document.querySelector('.saved').classList.remove('hide');

    document.querySelector('.img-container').classList.add('hide');
    document.querySelector('.editor-container').classList.add('hide');
    document.querySelector('.control-gallery').classList.add('hide');
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
    gCtx.font = `${currLine.size}px ${currLine.font}`;
    gCtx.textAlign = 'center';
    gCtx.fillText(currLine.txt, currLine.xPos, currLine.yPos);
    gCtx.strokeText(currLine.txt, currLine.xPos, currLine.yPos);
}

function _drawRect(lineIdx) {
    let currLine = gMeme.lines[lineIdx];

    gCtx.beginPath();
    gCtx.lineWidth = "1";
    gCtx.rect(0, currLine.yPos - currLine.size, 500, currLine.size);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function updateText(ev) {
    // debugger
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
        if ((!getIsFirstClick() && i === numOfLine - 1) ||
            (getIsEdit() && i === getCurrLine())) _drawRect(i);
        _drawText(i);
    }
}

function onChangeFontSize(val) {
    if (!getNumOfLine()) return;
    setFontSizeModel(val);
    _renderFontSize();
    _renderCanvas();
}

function _renderFontSize() {
    document.querySelector('.font-size-value').innerHTML = getFontSize();
}

function onMoveText(val) {
    if (!getNumOfLine()) return;
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
    setIsEdit(true);
    setSelectedLineIdx(-1);
    addTextToInput();
    _renderCanvas();
}

function addTextToInput() {
    elInput.value = getCurrText();
}

function onSave() {
    if (getIsLoadedFromPC()) return;
    addToSaveMemes();
}

function onDownload(elLink) {
    let data = gCanvas.toDataURL();
    elLink.href = data;
}

function onDoneEdit() {
    setIsEdit(false);
    _renderCanvas();
}

function onLoadFromSaved(index) {
    // debugger
    if (isDeleteMeme) {
        deleteMeme(index);
        onSetSavedMemesPage();
        return;
    };

    let MemeMemomry = getMemeMemomry(index);
    setIsLoadedFromSaved(true);
    onShowEditorPage(undefined, true);
    updateMeme(MemeMemomry);
    _renderCanvas();
}

function onDeleteMeme() {
    document.querySelector('.saved').classList.add('red');
    isDeleteMeme = true;
}

function onDoneDeleteMeme() {
    document.querySelector('.saved').classList.remove('red');
    isDeleteMeme = false;
}

function onChangeColor() {
    let newColor = document.querySelector('.color-input').value;
    setNewColor(newColor);
    _renderCanvas();
}

function toggleMenu() {
    document.querySelector('.nav-bar').classList.toggle('nav-bar-open');
    document.querySelector('.empty').classList.toggle('empty-open');
}

function onChangeFont() {
    var newFont = document.querySelector('.font-select').value;
    setFontToModel(newFont);
    _renderCanvas();
}

function setCurrPage(nextPage) {

    document.querySelector('.' + currPage).classList.remove('black-font');
    document.querySelector('.' + nextPage).classList.add('black-font');
    currPage = nextPage;
}

function onDeleteText() {
    deleteCurrLine();
    setSelectedLineIdx(-1);
    elInput.value = '';
    _renderCanvas();
}

function onUploadImg(ev) {
    addImgToModel(URL.createObjectURL(ev.target.files[0]));
    _renderImgs();
}

// function onUploadImg(ev) {
//     var img = new Image();
//     img.onload = draw;
//     img.src = URL.createObjectURL(ev.target.files[0]);
//     console.log("onUploadImg -> img.src", img.src)
//   };
//   function draw() {
//     gCanvas.width = this.width;
//     gCanvas.height = this.height;
//     gCtx.drawImage(this, 0,0);
//   }

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}
