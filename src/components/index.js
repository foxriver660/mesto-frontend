import "../index.css";
import {
  enableValidation,
  } from "./validate";
import { createCard} from "./card";
import {
  closePopup,
  openPopup,
  openProfilePopup,
} from "./modal";
import {
  profilePopup,
  addPlacePopup,
  profileBtn,
  addCardBtn,
  closeBtns,
  formProfile,
  userName,
  userStatus,
  formPlace,
  nameInput,
  jobInput,
  placeInput,
  placeUrlInput,
  photoContainer,
  initialCards,
  validationConfig
} from "./utils";

// ПЕРЕБОР КНОПКИ КРЕСТИК ДЛЯ ЗАКРЫТИЯ БЛИЖАЙШЕГО ПОПАПА
closeBtns.forEach((closeBtn) => { 
  const selectedPopup = closeBtn.closest('.popup'); 
  closeBtn.addEventListener('click', () => closePopup(selectedPopup)); 
})

// СЛУШАТЕЛЬ НА ESC
// document.addEventListener("keydown", closeEscPopup);

// СЛУШАТЕЛИ ОТКРЫТИЯ ПОПАПОВ
profileBtn.addEventListener("click", () => openProfilePopup());
addCardBtn.addEventListener("click", () => openPopup(addPlacePopup));

// ЗАМЕНА ДАННЫХ ВВЕДЕНЫХ ПОЛЬЗОВАТЕЛЕМ В ПРОФИЛЕ
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userStatus.textContent = jobInput.value;
  closePopup(profilePopup);
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ПРОФИЛЯ
formProfile.addEventListener("submit", handleProfileFormSubmit);

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function addCard(initialCard) {
  photoContainer.prepend(createCard(initialCard));
}
// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА
function handleAddformSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const placeUrlValue = placeUrlInput.value;
  addCard({ name: placeValue, link: placeUrlValue });
  closePopup(addPlacePopup);
  evt.target.reset();
}
// СОЗДАНИЕ КАРТОЧЕК ИЗ МАССИВА JS
initialCards.forEach((initialCard) => {
  addCard(initialCard);
});

// СЛУШАТЕЛЬ САБМИТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
formPlace.addEventListener("submit", handleAddformSubmit);

//----- ВАЛИДАЦИЯ------
enableValidation(validationConfig);
