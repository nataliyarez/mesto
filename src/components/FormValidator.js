class FormValidator {

    constructor(configuration, form) {
        this.form = form;
        this._inputSelector = configuration.inputSelector;
        this._submitButtonSelector = configuration.submitButtonSelector;
        this._inactiveButtonClass = configuration.inactiveButtonClass;
        this._inputErrorClass = configuration.inputErrorClass;

    }

    enableValidation() {

        this._setEventListeners();
        this.form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this.toggleButtonState();
    }
    _showError = (inputElement) => {
        const formError = this.form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        formError.textContent = inputElement.validationMessage;
    };
    _hideError = (inputElement) => {
        const formError = this.form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        formError.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(inputElement);

        } else {
            this._hideError(inputElement);
        }
    };

    toggleButtonState() {
        if (this.form.checkValidity()) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }


    _setEventListeners() {
        this._inputsList = this.form.querySelectorAll(this._inputSelector);
        this._submitButton = this.form.querySelector(this._submitButtonSelector);
        this._inputsList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            })
        })
    }

}

export {FormValidator};