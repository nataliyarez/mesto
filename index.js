const profileeditbutton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const formButton = document.querySelector('.form__button');


profileeditbutton.addEventListener('click', togglePopupVisibility);
popupCloseButton.addEventListener('click', togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle('popup_visible');
}

const formElement = document.querySelector('.form')

function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameInput = document.getElementById('name');
    const jobInput = document.getElementById('job');

    const nameElement = document.querySelector('.profile__title')
    const jobElement = document.querySelector('.profile__subtitle')
    nameElement.textContent=nameInput.value;
    jobElement.textContent=jobInput.value;
    togglePopupVisibility();

}
formElement.addEventListener('submit', formSubmitHandler);