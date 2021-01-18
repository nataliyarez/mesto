import {showPopup, removePopupVisibility, form, formCardElement, popupCard, popupImage} from './index.js'


const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');
//const formCardElement = document.querySelector('.form_card');

const cardContainer = document.querySelector('.elements');

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

class Card {
    constructor(link, name) {
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
    
    _removeCard() { // удаление карточек
        //const oneCard = document.querySelector('.element');
        const oneCard = this.closest('.element');
        oneCard.remove();
    }

    _likeCard() {//переключаем класс лайк на анлайк
        this.classList.toggle('element__like_active');
    }

    _openImage() {// открытие попапа с фото
        const popupPhoto = document.getElementById('image_popup');
        popupPhoto.src = this.src;
        popupPhoto.alt = this.alt;
        document.querySelector('.popup__title').textContent = this.alt;
        // popupImage.classList.add('popup_visible');
        showPopup(popupImage);
    }

}

initialCards.forEach((item) => {
    const card = new Card(item.link, item.name);
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
});


export {Card, imageInput, titleInput};