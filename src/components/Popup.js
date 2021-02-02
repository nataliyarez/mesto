class Popup {
    constructor(popupSelector) {

        this._popupSelector = document.querySelector(popupSelector);
    }

    open() { // открытие попапа
        this._popupSelector.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() { // закрытие  попапа
        this._popupSelector.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));

    }

    _handleEscClose(evt) { // закрытие попап по Esc
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));

        this._popupSelector.addEventListener('click',  (evt) => { //закртие по оверлею 
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }


}




export {Popup};