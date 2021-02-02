import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photo = document.querySelector('#image_popup');
    }

    open(src, alt) {
        this._photo.src = src;
        this._photo.alt = alt;
        document.querySelector('.popup__title').textContent = alt;
        super.open();
    }

}

export {PopupWithImage};