import {Popup} from "./Popup";

class PopupDeleteCard  extends Popup{
    constructor(popupSelector) {
        super(popupSelector);

    }

    open(removeCallback) {
        super.open();
        this.removeCallback =removeCallback;

    }
    setEventListeners() {// удаляем карточку и закрываем попап
        super.setEventListeners();

        this._popup.querySelector('.form__button_delete').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.removeCallback();
            super.close();

        });

    }

}

export {PopupDeleteCard};