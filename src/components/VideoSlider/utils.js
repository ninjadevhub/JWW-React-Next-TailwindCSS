export const applySliderLeftBtnStyles = ( btnLeft ) => {
    btnLeft.style.left = '7.4%';
    btnLeft.style.zIndex = '1';
    btnLeft.style.width = '30px';
    btnLeft.style.height = '30px';
}

export const applySliderRightBtnStyles = ( btnRight ) => {
    btnRight.style.right = '7.4%';
    btnRight.style.width = '30px';
    btnRight.style.height = '30px';
}

export const applySliderCardStyles = (cards) => {
    for(let card of cards) {
        card.style.padding = '20px 6px';
    }
}