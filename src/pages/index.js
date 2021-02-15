import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupDeleteCard} from '../components/PopupDeleteCard.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {api} from '../components/Api.js'

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.button_type_add-card')
const formElement = document.querySelector('.form');
const formCardElement = document.querySelector('.form_card');
const formAvatar = document.querySelector('.form_avatar');

const formInfoButton = document.querySelector('.form__button');
const formCardButton = document.querySelector('.form__button_card');
const formCardAvatar = document.querySelector('.form__button_avatar');


const avatar = document.querySelector('.profile__image-wrapper');

const nameInfo = document.querySelector('#name');
const jobInfo = document.querySelector('#job');


const titleInfo = document.querySelector('.profile__title');
const subtitleInfo = document.querySelector('.profile__subtitle');
const imageInfo = document.querySelector('.profile__image');


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

let cardList;
api.getInitialCards().then((data)=>{
    cardList = new Section({
        items: data, renderer: (item) => {
            return createCard(item);
        }
    }, cardListSelector);
});

api.getInitialInfo().then((data)=>{ // вставляем данные пользователя на сраницу
    titleInfo.textContent = data.name;
    subtitleInfo.textContent = data.about;
    imageInfo.src = data.avatar;
});


// валиадация
const defaultFormConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};
function createCard(item) {
    const card = new Card(item.link, item.name, item.likes, item.owner._id, item._id, cardTemplate, (src,alt)=>{
        popupPhoto.open(src,alt);
    }, (removeCallback)=>{
        popupBasketButton.open(removeCallback);
    });
    return card.generateCard();
}


function formCardSubmit(getInput) {
    const cardElement = createCard({name: getInput.title, link: getInput.image, likes:[], owner:{_id:'35f6ebae748768e91241472c'}})
    cardList.addItemNew(cardElement);
    formCardButton.textContent = 'Сохранение...';
    api.addCard(getInput.title, getInput.image).then(()=>{
        popupCarForm.close();
        formCardButton.textContent = 'Создать';
    });

}


// откртие попапов
const popupPhoto = new PopupWithImage('.popup_image');
popupPhoto.setEventListeners();

const popupInfoForm = new PopupWithForm('.popup', formSubmitHandler);
popupInfoForm.setEventListeners();
const popupCarForm = new PopupWithForm('.popup_card',formCardSubmit);
popupCarForm.setEventListeners();
const popupBasketButton = new PopupDeleteCard ('.popup_delete');
popupBasketButton.setEventListeners();
const popupAvatar = new PopupWithForm('.popup_avatar',formAvatarHandler);
popupAvatar.setEventListeners();

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
    //сдесь написать "Сохранение..."
    formInfoButton.textContent ='Сохранение...';
    api.editInfo(getInput.name, getInput.job).then(()=>{
        //здесь закрыть форму
        popupInfoForm.close();
        formInfoButton.textContent ='Сохранить';
    })

}
function formAvatarHandler(getInput){
    formCardAvatar.textContent = 'Сохранение...';
api.editAvatar(getInput.image).then(()=>{
    popupAvatar.close();
    formCardAvatar.textContent = 'Сохраненить';
});
   avatar.src = getInput.image;

}

profileEditButton.addEventListener('click', updatePopupData);
addCardButton.addEventListener('click', () => {
    popupCarForm.open()
    addPopupValidation.toggleButtonState();
    addPopupValidation.resetValidation();
});
avatar.addEventListener('click', () => {
    popupAvatar.open()
    avatarPopupValidation.toggleButtonState();
    avatarPopupValidation.resetValidation();
});


//подключение валидации
const editPopupValidation = new FormValidator(defaultFormConfig, formElement);
editPopupValidation.enableValidation();

const addPopupValidation = new FormValidator(defaultFormConfig, formCardElement);
addPopupValidation.enableValidation();

const avatarPopupValidation = new FormValidator(defaultFormConfig, formAvatar);
avatarPopupValidation.enableValidation();

