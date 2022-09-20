import "../index.css";
import {
  enableValidation,
  } from "./validate";
import { createCard, addCard, handleAddformSubmit } from "./card";
import {
  closePopup,
  closeEscPopup,
  openPopup,
  openProfilePopup,
  handleProfileFormSubmit,
} from "./modal";
import {
  addPlacePopup,
  profileBtn,
  addCardBtn,
  closeBtns,
  formProfile,
  formPlace,
  initialCards,
} from "./utils";

// ПЕРЕБОР КНОПКИ КРЕСТИК ДЛЯ ЗАКРЫТИЯ ПОПАПА
closeBtns.forEach((closeBtn) =>
  closeBtn.addEventListener("click", () => closePopup())
);

// СЛУШАТЕЛЬ НА ESC
document.addEventListener("keydown", closeEscPopup);

// СЛУШАТЕЛИ ОТКРЫТИЯ ПОПАПОВ
profileBtn.addEventListener("click", () => openProfilePopup());
addCardBtn.addEventListener("click", () => openPopup(addPlacePopup));

// СЛУШАТЕЛЬ САБМИТА ПОПАПА ПРОФИЛЯ
formProfile.addEventListener("submit", handleProfileFormSubmit);

// СОЗДАНИЕ КАРТОЧЕК ИЗ МАССИВА JS
initialCards.forEach((initialCard) => {
  addCard(initialCard);
});

// СЛУШАТЕЛЬ САБМИТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
formPlace.addEventListener("submit", handleAddformSubmit);

//----- ВАЛИДАЦИЯ------
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__input-error_active",
});
