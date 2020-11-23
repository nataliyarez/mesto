let profileeditbutton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formButton = document.querySelector('.form__button');

let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');
profileeditbutton.addEventListener('click', togglePopupVisibility);
profileeditbutton.addEventListener('click', assignValueInput);
popupCloseButton.addEventListener('click', togglePopupVisibility);

function assignValueInput() {
    let nameInput = document.getElementById('name');
    let jobInput = document.getElementById('job');
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;

}

function togglePopupVisibility() {
    popup.classList.toggle('popup_visible');
}

let formElement = document.querySelector('.form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = document.getElementById('name');
    let jobInput = document.getElementById('job');
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    togglePopupVisibility();
}

formElement.addEventListener('submit', formSubmitHandler);