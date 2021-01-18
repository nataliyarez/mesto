const items = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];




class Card {
    constructor(data) {
        this._link = data.link;
        this._name = data.name;

    }
    _getTemplate() {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.cloneNode(true);

        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.image_card').srs =imageValue;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.image_card').alt = textValue;

        return this._element;
    }
    addCard (){
        this._card = this.generateCard();
        cardContainer.prepend(this._card);
    }
}

items.forEach((item) => {
    const card = new Card(item);
    const cardElement = card.addCard();

    // Добавляем в DOM
    document.querySelector('.elements').append(cardElement);
});



initialCards.forEach(function (item) { // проходим массив с карточками
    const card = createCard(item.link, item.name)
    addCard(card);
});

function createCard (imageValue, textValue) { // создаем карточки

    // get template
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    // generate card
    const cardImage = cardElement.getElementById('image_card');
    cardImage.src = imageValue;
    cardElement.querySelector('.element__text').textContent = textValue;
    cardImage.alt= textValue;
    const basketButton = cardElement.querySelector(`.button_type_basket`);
    basketButton.addEventListener('click', removeCard);
    const likeButton = cardElement.querySelector(`.element__like`);
    likeButton.addEventListener('click', likeCard);
    const image = cardElement.querySelector(`.element__image`);
    image.addEventListener('click', openImage);

    return cardElement;

}

function addCard (card) { // добавляем карточки
    cardContainer.prepend(card);
}

function formCardSubmit (evt) { // добавление новой карточки через кнопку
    evt.preventDefault();
    const card = createCard(imageInput.value, titleInput.value)
    addCard(card);
    form.reset();
    removePopupVisibility(popupCard);
}

function removeCard () { // удаление карточек
    //const oneCard = document.querySelector('.element');
    const oneCard = this.closest('.element');
    oneCard.remove();
}
function likeCard () {//переключаем класс лайк на анлайк
    this.classList.toggle('element__like_active');
}

function openImage () {// открытие попапа с фото
    const popupPhoto = document.getElementById('image_popup');
    popupPhoto.src = this.src;
    popupPhoto.alt = this.alt;
    document.querySelector('.popup__title').textContent = this.alt;
    // popupImage.classList.add('popup_visible');
    showPopup (popupImage);
}




//валидация
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



