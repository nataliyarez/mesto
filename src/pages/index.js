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
// картинки
import headerLogo from '../images/header_logo.svg';
import basket from '../images/elements_basket.svg';
import like from '../images/elements_like.svg';

import close_btn from '../images/popup_close_btn.svg';
import kusto from '../images/profile_kusto.jpg';
import pencil from '../images/profile_pencil.svg';
import plus from '../images/profile_plus.svg';

const whoIsTheGoat = [
    // меняем исходные пути на переменные
    { name: 'headerLogo', image: headerLogo },
    { name: 'basket', image: basket },
    { name: 'like', image: like },
    { name: 'close_btn', image: close_btn },
    { name: 'kusto', image: kusto },
    { name: 'pencil', image: pencil },
    { name: 'plus', image: plus },

];
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



const cardList = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item.link, item.name, cardTemplate, (src,alt)=>{
            popupPhoto.open(src,alt);
        });
        return card.generateCard();
    }
}, cardListSelector);



function formCardSubmit(getInput) {
    const card = new Card(getInput.image, getInput.title, cardTemplate, (src,alt)=>{
        popupPhoto.open(src,alt);
    });
    const cardElement = card.generateCard();
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
    popupInfoForm.open(contentInfo.name, contentInfo.job);
    editPopupValidation.toggleButtonState();
}



function formSubmitHandler() { // добовляем значения из попапа на страницу закрываем попап
    userInfo.setUserInfo();
    popupInfoForm.close();
}


profileEditButton.addEventListener('click', updatePopupData);
addCardButton.addEventListener('click', () => {
    popupCarForm.open()
    addPopupValidation.toggleButtonState();
});

//подключение валидации
const editPopupValidation = new FormValidator(defaultFormConfig, formElement);
editPopupValidation.enableValidation();

const addPopupValidation = new FormValidator(defaultFormConfig, formCardElement);
addPopupValidation.enableValidation();

