let profileeditbutton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let formButton = document.querySelector('.form__button');


profileeditbutton.addEventListener('click', togglePopupVisibility);
popupCloseButton.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle('popup_visible');
}

let formElement = document.querySelector('.form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = document.getElementById('name');
    let jobInput = document.getElementById('job');

    let nameElement = document.querySelector('.profile__title');
    let jobElement = document.querySelector('.profile__subtitle');
    nameInput.value.textContent=nameElement;
    console.log(nameElement);
    //nameElement.textContent=nameInput.value;
    console.log(nameInput.value);
    //jobElement.textContent=jobInput.value;
    togglePopupVisibility();

}
formElement.addEventListener('submit', formSubmitHandler);