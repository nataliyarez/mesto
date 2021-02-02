
class Card  {
    constructor(link, name, cardTemplate, handleCardClick) {
        this._link = link;
        this._name = name;
        this._cardTemplate = cardTemplate;
        this.handleCardClick= handleCardClick;
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
        const basketButton = this._element.querySelector(`.button_type_basket`);
        basketButton.addEventListener('click', ()=>this._removeCard());
        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);
        const image = this._element.querySelector(`.element__image`);
        image.addEventListener('click', ()=>this.handleCardClick(this._link, this._name));

    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();


        this._element.querySelector('#image_card').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('#image_card').alt = this._name;


        return this._element;
    }

    _removeCard() { // удаление карточек
        this._element.remove();
        this._element = null;
    }

    _handleLikeIcon(evt) {//переключаем класс лайк на анлайк
        evt.target.classList.toggle('element__like_active');

    }


}

export {Card};