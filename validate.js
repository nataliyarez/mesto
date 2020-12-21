const showError = (form, input, obj) => {
    const formError = form.querySelector(`#${input.id}-error`);
    input.classList.add(obj.inputErrorClass);
    formError.textContent = input.validationMessage;
};

const hideError = (form, input, obj) => {
    const formError = form.querySelector(`#${input.id}-error`);
    input.classList.remove(obj.inputErrorClass);
    formError.textContent = '';
};

const checkInputValidity = (form, input, obj) => {
    if (!input.validity.valid) {
        showError(form, input, obj);

    } else {
        hideError(form, input, obj);
    }
};

function setButtonState(button, isActive, obj) {
    if (isActive) {
        button.classList.remove(obj.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(obj.inactiveButtonClass);
        button.disabled = true;
    }
}


function setEventListeners(form, obj) {
    const inputsList = form.querySelectorAll(obj.inputSelector);
    const submitButton = form.querySelector(obj.submitButtonSelector);

    inputsList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, obj);
            setButtonState(submitButton, form.checkValidity(), obj)
        })
    })
}


function enableValidation(obj) {
    const formAll = document.querySelectorAll(obj.formSelector);
    formAll.forEach(form => {
        setEventListeners(form, obj);
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        const submitButton = form.querySelector(obj.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), obj)
    })
}

const obj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

enableValidation(obj);



