class Popup {
    constructor(popupSelector) {

        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() { // открытие попапа
        this._popup.classList.add('popup_visible');
       // document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() { // закрытие  попапа
        this._popup.classList.remove('popup_visible');
        //document.removeEventListener('keydown', this._handleEscClose.bind(this));
        document.removeEventListener('keydown', this._handleEscClose);

    }

    _handleEscClose(evt) { // закрытие попап по Esc
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));

        this._popup.addEventListener('click',  (evt) => { //закртие по оверлею
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }


}




export {Popup};