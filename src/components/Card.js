import {Popup} from "./Popup";


class Card {
    constructor(link, name, likes, owner, cardId, api, cardTemplate, handleCardClick,  handleBasketClick, userId) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._owner = owner;
        this._userId = userId;
        this._cardId = cardId;
        this._api = api;
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
            return this._removeCard();
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
            return _id === this._userId;
        })
        if (isLiked) {
            this.like.classList.add('element__like_active')

        }

        return this._element;
    }

    _removeCard() { // удаление карточек
       return  this._api.deleteCard(this._cardId)
            .then(() => {
                this._element.remove();
                this._element = null;
            })
            .catch((err)=>{
                console.log(err);
            })


    }

    _handleLikeIcon(evt) {//переключаем класс лайк на анлайк
        const isLike = evt.target.classList.contains('element__like_active');
        this._api.likeCard(isLike, this._cardId)
            .then(()=>{
                evt.target.classList.toggle('element__like_active');
                if (isLike===false) {
                    this.numderLikes =  this.numderLikes + 1;
                    this._element.querySelector('.element__likes').textContent = this.numderLikes;
                } else {
                    this.numderLikes =  this.numderLikes - 1;
                    this._element.querySelector('.element__likes').textContent = this.numderLikes;
                }
            })
            .catch((err)=>{
                console.log(err);
            })


    }

    _handleNumberLikes() {
        this._element.querySelector('.element__likes').textContent = this.numderLikes;

    }

    _handleBasketButton() {

        if (this._owner === this._userId) {
            this.basketButton.classList.add('button_type_basket_visible')
        }

    }

}

export {Card};