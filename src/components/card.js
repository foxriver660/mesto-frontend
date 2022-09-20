export {createCard, addCard, handleAddformSubmit}
import {popups, profilePopup, addPlacePopup, uncoverImagePopup, profileBtn, addCardBtn, closeBtns, formProfile, userName, userStatus, formPlace, nameInput, jobInput, placeInput, placeUrlInput, photoTemplate, photoContainer, imagePopup, placeNamePopup, initialCards} from './utils'
import {openImagePopup} from './modal'
// СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function createCard(item) {
  const cardElement = photoTemplate.querySelector(".photo-grid__item").cloneNode(true);
cardElement.querySelector(".photo-grid__place-name").textContent = item.name;
cardElement.querySelector(".photo-grid__image").src = item.link;
cardElement.querySelector(".photo-grid__image").alt = item.name;
cardElement.querySelector(".photo-grid__like-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("photo-grid__like-button_active");
  });
  cardElement.querySelector(".photo-grid__delete-button").addEventListener("click", function () {
    cardElement.remove();
  });
  
 // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
cardElement.querySelector(".photo-grid__image").addEventListener("click", () => openImagePopup());
return cardElement
};

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function addCard(item) {
  photoContainer.prepend(createCard(item));
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА
function handleAddformSubmit (evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const placeUrlValue = placeUrlInput.value;
  addCard({ name: placeValue, link: placeUrlValue })
    closePopup(addPlacePopup);
  evt.target.reset()
  };