import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'


const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.button_type_add-card')
const popups = document.querySelectorAll('.popup');
const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_card');
const popupImage = document.querySelector('.popup_image');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');
const popupImageCloseButton = document.querySelector('.popup__close-button_image');
const formElement = document.querySelector('.form');
const formCardElement = document.querySelector('.form_card');
const form = document.forms.form__card;


const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');


const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

//карточки
const titleInput = document.querySelector('#title');
const imageInput = document.querySelector('#image');
const cardContainer = document.querySelector('.elements');
const cardTemplate = '#card-template';
const initialCards = [
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


// валиадация
const defaultFormConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};


// добавление карточки
initialCards.forEach((item) => {
    const card = new Card(item.link, item.name, cardTemplate);
    const cardElement = card.generateCard();
    cardContainer.prepend(cardElement);

});


function formCardSubmit(evt) { // добавление новой карточки через кнопку
    evt.preventDefault();
    const card = new Card(imageInput.value, titleInput.value, cardTemplate);
    const cardElement = card.generateCard();
    cardContainer.prepend(cardElement);
    form.reset();
    addPopupValidation.toggleButtonState()
    removePopupVisibility(popupCard);

}


function addPopupVisibility(popup) { // делаем попап видимым
    popup.classList.add('popup_visible');
    document.addEventListener('keydown', handleEscUp);
}

function updatePopupData() { // забираем контент со страницы в попап длаем попап видимым
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    addPopupVisibility(popup);
    editPopupValidation.toggleButtonState();
}

function removePopupVisibility(popup) { // делаем попап не видимым
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', handleEscUp);
}

function formSubmitHandler(evt) { // добовляем значения из попапа на страницу закрываем попап
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    removePopupVisibility(popup);
}

function handleEscUp(evt) {
    if (evt.key === 'Escape') {
        removePopupVisibility(popup);
        removePopupVisibility(popupCard);
        removePopupVisibility(popupImage);
    }

}


formElement.addEventListener('submit', formSubmitHandler);
formCardElement.addEventListener('submit', formCardSubmit);
profileEditButton.addEventListener('click', updatePopupData);
addCardButton.addEventListener('click', () => {
    addPopupVisibility(popupCard)
});
popupCloseButton.addEventListener('click', () => {
    removePopupVisibility(popup)
});

popupCardCloseButton.addEventListener('click', () => {
    removePopupVisibility(popupCard)
});

popupImageCloseButton.addEventListener('click', () => {
    removePopupVisibility(popupImage)
});

popups.forEach((item) => {// закрытие попаов на оверлей
    item.addEventListener('click', function (evt) {
        if (evt.target === evt.currentTarget) {
            removePopupVisibility(evt.target);
        }
    });
});

//подключение валидации
const editPopupValidation = new FormValidator(defaultFormConfig, formElement);
editPopupValidation.enableValidation();

const addPopupValidation = new FormValidator(defaultFormConfig, formCardElement);
addPopupValidation.enableValidation();

export {addPopupVisibility, popupImage, defaultFormConfig};