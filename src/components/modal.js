export {closePopup, closeOverlayPopup, closeEscPopup, openPopup, openProfilePopup, handleProfileFormSubmit, openImagePopup}
import {popups, profilePopup, addPlacePopup, uncoverImagePopup, profileBtn, addCardBtn, closeBtns, formProfile, userName, userStatus, formPlace, nameInput, jobInput, placeInput, placeUrlInput, photoTemplate, photoContainer, imagePopup, placeNamePopup, initialCards} from './utils'
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function closePopup() {
  popups.forEach((popup) => {popup.classList.remove('popup_opened'); 
  popup.removeEventListener('click', closeOverlayPopup)})
  ;
}
// ЗАКРЫТИЕ КЛИКОМ ГА ОВЕРЛЕЙ
function closeOverlayPopup(evt) {
  if (evt.target === evt.currentTarget) {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
          openedPopup.classList.remove('popup_opened');
      }
  }
}
// ЗАКРЫТИЕ КЛИКОМ НА ESC
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
          openedPopup.classList.remove('popup_opened');
      }
  }
} 
// ОТКРЫТИЕ ПОПАПА
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeOverlayPopup);
  }

// ОТКРЫТИЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function openProfilePopup(){
  openPopup(profilePopup)
  nameInput.value = userName.textContent;
  jobInput.value = userStatus.textContent;
}
// ОТКРЫТИЕ ПОПАПА КАРТИНКИ ФУУЛ САЙЗ
function openImagePopup() {
  openPopup(uncoverImagePopup);
  imagePopup.src = item.link;
  imagePopup.alt = item.name;
  placeNamePopup.textContent = item.name;
};
// ЗАМЕНА ДАННЫХ ВВЕДЕНЫХ ПОЛЬЗОВАТЕЛЕМ В ПРОФИЛЕ
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userStatus.textContent = jobInput.value;
  closePopup(profilePopup)
};

