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
const cardContainer = document.querySelector('.elements');
const cardText = document.querySelector('.element__text');
const formElement = document.querySelector('.form');
const formCardElement = document.querySelector('.form_card');
const form = document.forms.form__card;
let currentPopup;

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


const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');

const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const imageElement = document.querySelector('.element__image');
const textElement = document.querySelector('.element__text');

class Card {
    constructor(link, name) {
       // this._link = data.link;
       // this._name = data.name;
        //this.imageValue = imageValue;
        //this.textValue = textValue;
        this._link = link;
        this._name = name;

    }
    _getTemplate() {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.cloneNode(true);

        return cardElement;
    }
    _setEventListeners() {
        const basketButton = this._element.querySelector(`.button_type_basket`);
        basketButton.addEventListener('click', this._removeCard);
        const likeButton = this._element.querySelector(`.element__like`);
        likeButton.addEventListener('click', this._likeCard);
        const image = this._element.querySelector(`.element__image`);
        image.addEventListener('click', this._openImage);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();


        this._element.getElementById('image_card').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.getElementById('image_card').alt = this._name;


        cardContainer.prepend(this._element);

        return this._element;
    }
    //addCard (){
       // this._card = this.generateCard();
       // cardContainer.prepend(this._card);
    //}
  _removeCard () { // удаление карточек
        //const oneCard = document.querySelector('.element');
        const oneCard = this.closest('.element');
        oneCard.remove();
    }
    _likeCard () {//переключаем класс лайк на анлайк
        this.classList.toggle('element__like_active');
    }

    _openImage () {// открытие попапа с фото
        const popupPhoto = document.getElementById('image_popup');
        popupPhoto.src = this.src;
        popupPhoto.alt = this.alt;
        document.querySelector('.popup__title').textContent = this.alt;
        // popupImage.classList.add('popup_visible');
        showPopup (popupImage);
    }

}

initialCards.forEach((item) => {
    const card = new Card(item.link, item.name);
    const cardElement = card.generateCard();

    // Добавляем в DOM
    document.querySelector('.elements').append(cardElement);
});

function formCardSubmit (evt) { // добавление новой карточки через кнопку
    evt.preventDefault();
    const card = new Card(imageInput.value, titleInput.value);
    // addCard(card);
    const cardElement = card.generateCard();
    form.reset();
    removePopupVisibility(popupCard);
}


// то что не относиться к довлению карточки


function showPopup(popup,button, form) { // делаем попап видимым
   popup.classList.add('popup_visible');
    currentPopup = popup;
    document.addEventListener('keydown', keyHandler );
   if (form) {
       const validation = new Validation(obj);
       validation.setButtonState(button, form.checkValidity(), obj);
   }

}

function updatePopupData (){ // забираем контент со страницы в попап длаем попап видимым
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    showPopup (popup, formButton, formElement);
}

function removePopupVisibility(popup) { // делаем попап не видимым
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', keyHandler );
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
addCardButton.addEventListener('click', () => {showPopup (popupCard, formButtonCad, formCardElement)});
popupCloseButton.addEventListener('click', () => {
    removePopupVisibility(popup)
});

popupCardCloseButton.addEventListener('click', () => {
    removePopupVisibility(popupCard)
});

popupImageCloseButton.addEventListener('click', () => {
    removePopupVisibility(popupImage)
});

popups.forEach ((item) => {// закрытие попаов на оверлей
    item.addEventListener('click', function (evt) {
        if (evt.target === this) {
           // evt.target.classList.toggle('popup_visible');
            removePopupVisibility(this);
        }
    });
});
