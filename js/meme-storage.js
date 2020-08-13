'use strict';


function addToSaveMemes(newMemes = false) {
    let savedMemes = [];
    if (!newMemes) {
        if (getSavedMemes()) savedMemes = getSavedMemes();
        savedMemes.push(gMeme);
    } else {
        savedMemes = newMemes;
    }
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));
}

function getSavedMemes() {
    var tempSMemes = localStorage.getItem('savedMemes');
    gMemeMemomry = JSON.parse(tempSMemes);
    return gMemeMemomry;
}