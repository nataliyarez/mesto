import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.button_type_add-card')
const formElement = document.querySelector('.form');
const formCardElement = document.querySelector('.form_card');

const nameInfo = document.querySelector('#name');
const jobInfo = document.querySelector('#job');

// картинки
import headerLogo from '../images/header_logo.svg';
import basket from '../images/elements_basket.svg';
import like from '../images/elements_like.svg';

import close_btn from '../images/popup_close_btn.svg';
import kusto from '../images/profile_kusto.jpg';
import pencil from '../images/profile_pencil.svg';
import plus from '../images/profile_plus.svg';

import './index.css';

//карточки
const cardListSelector = '.elements';
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
function createCard(item) {
    const card = new Card(item.link, item.name, cardTemplate, (src,alt)=>{
        popupPhoto.open(src,alt);
    });
    return card.generateCard();
}


const cardList = new Section({
    items: initialCards, renderer: (item) => {
        return createCard(item);
    }
}, cardListSelector);



function formCardSubmit(getInput) {
    const cardElement = createCard({name: getInput.title, link: getInput.image})
    cardList.addItem(cardElement);
}


// откртие попапов
const popupPhoto = new PopupWithImage('.popup_image');
popupPhoto.setEventListeners();

const popupInfoForm = new PopupWithForm('.popup', formSubmitHandler);
popupInfoForm.setEventListeners();
const popupCarForm = new PopupWithForm('.popup_card',formCardSubmit);
popupCarForm.setEventListeners();

const userInfo = new UserInfo ({name:'.profile__title', job:'.profile__subtitle'});



function updatePopupData() { // забираем контент со страницы в попап длаем попап видимым
    const contentInfo = userInfo.getUserInfo();
    popupInfoForm.open();
    nameInfo.value = contentInfo.name;
    jobInfo.value = contentInfo.job;
    editPopupValidation.toggleButtonState();
    editPopupValidation.resetValidation();
}



function formSubmitHandler(getInput) { // добовляем значения из попапа на страницу закрываем попап
    userInfo.setUserInfo(getInput.name, getInput.job);
    popupInfoForm.close();
}


profileEditButton.addEventListener('click', updatePopupData);
addCardButton.addEventListener('click', () => {
    popupCarForm.open()
    addPopupValidation.toggleButtonState();
    addPopupValidation.resetValidation();
});

//подключение валидации
const editPopupValidation = new FormValidator(defaultFormConfig, formElement);
editPopupValidation.enableValidation();

const addPopupValidation = new FormValidator(defaultFormConfig, formCardElement);
addPopupValidation.enableValidation();

