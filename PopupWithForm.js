import {Popup} from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this.submitCallback = submitCallback;
        this.form = this._popupSelector.querySelector('.form');

    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitCallback(this._getInputValues());
            this.close();

        });

    }

    _getInputValues() { // собирает данные с полей
        const inputs = this._popupSelector.querySelectorAll('.form__input');
        const formData = {};
        inputs.forEach((input) => {
            formData[input.name] = input.value;
        });

        return formData;
    }

    open(name, job) { // открывает попап и забирает данные со страницы
        super.open();
        document.querySelector('#name').value = name;
        document.querySelector('#job').value = job;

    }

    close() { // завравает попап очищает форму
        this.form.reset();
        super.close();
    }
}

export {PopupWithForm};