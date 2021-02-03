import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photo = this._popup.querySelector('#image_popup');
        this._title = this._popup.querySelector('.popup__title');
    }

    open(src, alt) {
        this._photo.src = src;
        this._photo.alt = alt;
        this._title.textContent = alt;
        super.open();
    }

}

export {PopupWithImage};