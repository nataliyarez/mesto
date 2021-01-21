import {addPopupVisibility, popupImage} from './index.js'


class Card {
    constructor(link, name, cardTemplate) {
        this._link = link;
        this._name = name;
        this._cardTemplate = cardTemplate;
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
        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);
        const image = this._element.querySelector(`.element__image`);
        image.addEventListener('click', this._openImage.bind(this));

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();


        this._element.querySelector('#image_card').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('#image_card').alt = this._name;
        this._photo = document.querySelector('#image_popup');

        return this._element;
    }

    _removeCard() { // удаление карточек
        const oneCard = this.closest('.element');
        oneCard.remove();
    }

    _handleLikeIcon(evt) {//переключаем класс лайк на анлайк
        if (evt.target === evt.currentTarget) {
            evt.target.classList.toggle('element__like_active');
        }

    }

    _openImage() {// открытие попапа с фото
        this._photo.src = this._link;
        this._photo.alt = this._name;
        document.querySelector('.popup__title').textContent = this._name;
        addPopupVisibility(popupImage);
    }

}

export {Card};