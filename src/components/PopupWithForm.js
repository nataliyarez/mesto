import {Popup} from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this.submitCallback = submitCallback;
        this.form = this._popup.querySelector('.form');

    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitCallback(this._getInputValues());

        });

    }

    _getInputValues() { // собирает данные с полей
        const inputs = this._popup.querySelectorAll('.form__input');
        const formData = {};
        inputs.forEach((input) => {
            formData[input.name] = input.value;
        });

        return formData;
    }


    close() { // завравает попап очищает форму
        this.form.reset();
        super.close();
    }
}

export {PopupWithForm};