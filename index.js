let profileeditbutton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');


let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');

let nameElement = document.querySelector('.profile__title');
let jobElement = document.querySelector('.profile__subtitle');


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
popupCloseButton.addEventListener('click', togglePopupVisibility);