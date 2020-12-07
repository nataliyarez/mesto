const profileeditbutton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.button_type_add-card')
const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_card');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');
const cardContainer = document.querySelector('.elements');
const cardText = document.querySelector('.element__text');
const formElement = document.querySelector('.form');
const formCardElement = document.querySelector('.form_card');

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

initialCards.forEach(function (item) { // проходим массив с карточками
addCard(item.link, item.name)
});

function addCard (imageValue, textValue) { // добавляем карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElemtnt = cardTemplate.cloneNode(true);
    cardElemtnt.getElementById('1').src = imageValue;
    cardElemtnt.querySelector('.element__text').textContent = textValue;
    cardElemtnt.getElementById('1').alt= textValue;
    const basketButton = cardElemtnt.querySelector(`.button_type_basket`);
    basketButton.addEventListener('click', removeCard);
    const likeButton = cardElemtnt.querySelector(`.element__like`);
    likeButton.addEventListener('click', likeCard);
    //cardContainer.append(cardElemtnt);

    cardContainer.prepend(cardElemtnt);


}

function formCardSubmit (evt) { // добавление новой карточки через кнопку
    evt.preventDefault();
    addCard(imageInput.value,titleInput.value);
    togglePopupCardVisibility ();
}

function removeCard () { // удаление карточек
    //const oneCard = document.querySelector('.element');
    const oneCard = this.closest('.element');
    oneCard.remove();
}

 function likeCard () {
    //this.style.backgroundImage = "url('./images/elements_like_aktive.svg')";
     this.classList.toggle('element__like_active');
     console.log('hj');
}


function assignCardValueInput () { // делаем видимым попап с карточками
    popupCard.classList.add('popup_visible');
}

function togglePopupCardVisibility () { // делаем не видимым попап с карточками
    popupCard.classList.toggle('popup_visible');
}

function assignValueInput() { // забираем контент со страницы в попап длаем попап видимым
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    popup.classList.add('popup_visible');

}

function togglePopupVisibility() { //  длаем попап не видимым
    popup.classList.toggle('popup_visible');
}



function formSubmitHandler(evt) { // добовляем значения из попапа на страницу закрываем попап
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    togglePopupVisibility();
}

formElement.addEventListener('submit', formSubmitHandler);
formCardElement.addEventListener('submit', formCardSubmit);
profileeditbutton.addEventListener('click', assignValueInput);
addCardButton.addEventListener('click', assignCardValueInput);
popupCloseButton.addEventListener('click', togglePopupVisibility);
popupCardCloseButton.addEventListener('click', togglePopupCardVisibility);
//basketButton.addEventListener('click', removeCard);