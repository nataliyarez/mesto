const profileeditbutton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.button_type_add-card')
const popup = document.querySelector('.popup');
const popupCard = document.querySelector('.popup_card');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCardCloseButton = document.querySelector('.popup__close-button_card');


const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

function assignCardValueInput () {
    popupCard.classList.add('popup_visible');
}

function togglePopupCardVisibility () {
    popupCard.classList.toggle('popup_visible');
}

function assignValueInput() {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    popup.classList.add('popup_visible');

}

function togglePopupVisibility() {
    popup.classList.toggle('popup_visible');
}

let formElement = document.querySelector('.form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    togglePopupVisibility();
}

formElement.addEventListener('submit', formSubmitHandler);
profileeditbutton.addEventListener('click', assignValueInput);
addCardButton.addEventListener('click', assignCardValueInput);
popupCloseButton.addEventListener('click', togglePopupVisibility);
popupCardCloseButton.addEventListener('click', togglePopupCardVisibility);