import {Popup} from "./Popup";
import {api} from '../components/Api.js'

class Card {
    constructor(link, name, likes, owner, id, cardTemplate, handleCardClick, handleBasketClick) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._owner = owner;
        this._id = id;
        this._cardTemplate = cardTemplate;
        this.handleCardClick = handleCardClick;
        this.handleBasketClick = handleBasketClick;
        this.numderLikes = this._likes.length ;

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);


        return cardElement;
    }

    _setEventListeners() {

        this.basketButton = this._element.querySelector(`.button_type_basket`);
        this.basketButton.addEventListener('click', () => this.handleBasketClick(() => {
            this._removeCard();
        }));

        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeIcon.bind(this));
        const image = this._element.querySelector(`.element__image`);
        image.addEventListener('click', () => this.handleCardClick(this._link, this._name));

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._handleNumberLikes();
        this._handleBasketButton();


        this._element.querySelector('#image_card').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('#image_card').alt = this._name;

        this.like = this._element.querySelector('.element__like');
        const isLiked = this._likes.find(({_id}) => {
            return _id === '35f6ebae748768e91241472c';
        })
        if (isLiked) {
            this.like.classList.add('element__like_active')

        }

        return this._element;
    }

    _removeCard() { // удаление карточек
        this._element.remove();
        this._element = null;
        api.deleteCard(this._id);

    }

    _handleLikeIcon(evt) {//переключаем класс лайк на анлайк
        const isLike = evt.target.classList.contains('element__like_active');
        evt.target.classList.toggle('element__like_active');
        api.likeCard(isLike, this._id);
        if (isLike===false) {
            this.numderLikes =  this.numderLikes + 1;
            this._element.querySelector('.element__likes').textContent = this.numderLikes;
        } else {
            this.numderLikes =  this.numderLikes - 1;
            this._element.querySelector('.element__likes').textContent = this.numderLikes;
        }

    }

    _handleNumberLikes() {
        this._element.querySelector('.element__likes').textContent = this.numderLikes;

    }

    _handleBasketButton() {

        if (this._owner === '35f6ebae748768e91241472c') {
            this.basketButton.classList.add('button_type_basket_visible')
        }

    }

}

export {Card};