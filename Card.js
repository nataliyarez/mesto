import {showPopup, removePopupVisibility, form, formCardElement, popupCard, popupImage} from './index.js'


const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');
//const popupPhoto = document.getElementById('image_popup');
//const formCardElement = document.querySelector('.form_card');

const cardContainer = document.querySelector('.elements');
//const cardTemplate = document.querySelector('#card-template').content;

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
    constructor(link, name, cardTemplate) {
        this._link = link;
        this._name = name;
        this._cardTemplate = cardTemplate;
        //this._photo = popupPhoto;






    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .cloneNode(true);


        return cardElement;
    }

    _setEventListeners() {
        const basketButton = this._element.querySelector(`.button_type_basket`);
        basketButton.addEventListener('click', this._removeCard);
        //this._element.querySelector(.button_type_basket).addEventListener('click', this._removeCard)
        //const likeButton = this._element.querySelector(`.element__like`);
        //likeButton.addEventListener('click', this._handleLikeIcon);
        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);
        const image = this._element.querySelector(`.element__image`);
        image.addEventListener('click', this._openImage.bind(this));

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();



        this._element.getElementById('image_card').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.getElementById('image_card').alt = this._name;
        this._photo = document.getElementById('image_popup');


        //cardContainer.prepend(this._element);

        return this._element;
    }
    
    _removeCard() { // удаление карточек
        //const oneCard = document.querySelector('.element');
        const oneCard = this.closest('.element');
        oneCard.remove();
    }

    _handleLikeIcon(evt) {//переключаем класс лайк на анлайк
        //this.classList.toggle('element__like_active');
        //this._element.querySelector('.element__like').classList.toggle('element__like_active');
        if (evt.target === evt.currentTarget) {
            evt.target.classList.toggle('element__like_active');
        }

    }

    _openImage() {// открытие попапа с фото
       //const popupPhoto = document.getElementById('image_popup');

        this._photo.src = this._link;
        this._photo.alt = this._name;
        document.querySelector('.popup__title').textContent = this._name;
        // popupImage.classList.add('popup_visible');
        showPopup(popupImage);
    }

}

initialCards.forEach((item) => {
    const card = new Card(item.link, item.name,'.card-template');
    const cardElement = card.generateCard();
    cardContainer.prepend(cardElement);

    document.querySelector('.elements').append(cardElement);

});


export {Card, imageInput, titleInput};