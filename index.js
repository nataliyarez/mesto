import {Card, imageInput, titleInput} from './Card.js'
import {FormValidator, obj} from './FormValidator.js'


const profileeditbutton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.button_type_add-card')
const popups = document.querySelectorAll('.popup');
const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_card');
const popupImage = document.querySelector('.popup_image');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');
const popupImageCloseButton = document.querySelector('.popup__close-button_image');
const formButton = document.querySelector('.form__button');
const formButtonCad = document.querySelector('.form__button_card');

const cardText = document.querySelector('.element__text');
const formElement = document.querySelector('.form');
const formCardElement = document.querySelector('.form_card');
const form = document.forms.form__card;
let currentPopup;


const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');

//const titleInput = document.getElementById('title');
//const imageInput = document.getElementById('image');

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const imageElement = document.querySelector('.element__image');
const textElement = document.querySelector('.element__text');


function formCardSubmit(evt) { // добавление новой карточки через кнопку
    evt.preventDefault();
    const card = new Card(imageInput.value, titleInput.value);
    // addCard(card);
    const cardElement = card.generateCard();
    form.reset();
    removePopupVisibility(popupCard);
}


function showPopup(popup, button, form) { // делаем попап видимым
    popup.classList.add('popup_visible');
    currentPopup = popup;
    document.addEventListener('keydown', keyHandler);
    if (form) {
        const validation = new FormValidator(obj);
        validation.setButtonState(button, form.checkValidity(), obj);
    }

}

function updatePopupData() { // забираем контент со страницы в попап длаем попап видимым
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    showPopup(popup, formButton, formElement);
}

function removePopupVisibility(popup) { // делаем попап не видимым
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', keyHandler);
}

function formSubmitHandler(evt) { // добовляем значения из попапа на страницу закрываем попап
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    removePopupVisibility(popup);
}

function keyHandler(evt) {
    if (evt.key === 'Escape') removePopupVisibility(currentPopup);

}

formElement.addEventListener('submit', formSubmitHandler);
formCardElement.addEventListener('submit', formCardSubmit);
profileeditbutton.addEventListener('click', updatePopupData);
addCardButton.addEventListener('click', () => {
    showPopup(popupCard, formButtonCad, formCardElement)
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
        if (evt.target === this) {
            // evt.target.classList.toggle('popup_visible');
            removePopupVisibility(this);
        }
    });
});


export {showPopup, removePopupVisibility, form, formCardElement, popupCard, popupImage};