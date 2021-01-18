const obj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};


class Validation {

    constructor (obj,form) {
        this.obj = obj;
        this.form = form;

    }

    enableValidation() {
       // const formAll = document.querySelectorAll(obj.formSelector);
      // formAll.forEach(form => {
            this.setEventListeners(this.form, this.obj);
        this.form.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            const submitButton = this.form.querySelector(obj.submitButtonSelector);
            this.setButtonState(submitButton, this.form.checkValidity(), this.obj)
        //})
    }
     _showError = (form, input, obj) => {
        const formError = this.form.querySelector(`#${input.id}-error`);
        input.classList.add(obj.inputErrorClass);
        formError.textContent = input.validationMessage;
    }
    hideError = (form, input, obj) => {
        const formError = this.form.querySelector(`#${input.id}-error`);
        input.classList.remove(obj.inputErrorClass);
        formError.textContent = '';
    };

    _checkInputValidity = (form, input, obj) => {
        if (!input.validity.valid) {
            this._showError(this.form, input, this.obj);

        } else {
            this.hideError(this.form, input, this.obj);
        }
    };

    setButtonState(button, isActive, obj) {
        if (isActive) {
            button.classList.remove(this.obj.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this.obj.inactiveButtonClass);
            button.disabled = true;
        }
    }


    setEventListeners(form, obj) {
        const inputsList = this.form.querySelectorAll(this.obj.inputSelector);
        const submitButton = this.form.querySelector(this.obj.submitButtonSelector);

        inputsList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(this.form, input, this.obj);
                this.setButtonState(submitButton, this.form.checkValidity(), this.obj)
            })
        })
    }

}
const formAll = document.querySelectorAll(obj.formSelector);

formAll.forEach(form => {
    const validation = new Validation(obj,form);
    validation.enableValidation();
});
