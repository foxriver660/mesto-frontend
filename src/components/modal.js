export {
  closePopup,
  closeOverlayPopup,
  closeEscPopup,
  openPopup,
  openProfilePopup,
  openImagePopup,
};
import {
  profilePopup,
  uncoverImagePopup,
  userName,
  userStatus,
  nameInput,
  jobInput,
  imagePopup,
  placeNamePopup,
  validationConfig,
  } from "./utils";
  import {
    enableValidation,
    } from './validate'
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    // УДАЛЕНИЯ СЛУШАТЕЛя НА ОВЕРЛЕЙ
    popup.removeEventListener("click", closeOverlayPopup);
    // УДАЛЕНИЯ СЛУШАТЕЛя НА ESC
    document.removeEventListener("keydown", closeEscPopup);
};

// ЗАКРЫТИЕ КЛИКОМ ГА ОВЕРЛЕЙ
function closeOverlayPopup(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_opened");
    }
  }
}
// ЗАКРЫТИЕ КЛИКОМ НА ESC
function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_opened");
    }
  }
}
// ОТКРЫТИЕ ПОПАПА
function openPopup(popup) {
  popup.classList.add("popup_opened");
  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ НА ОВЕРЛЕЙ
  popup.addEventListener("mousedown", closeOverlayPopup);
  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ НА ESC
  document.addEventListener("keydown", closeEscPopup);
  enableValidation(validationConfig)
}

// ОТКРЫТИЕ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = userName.textContent;
  jobInput.value = userStatus.textContent;
}
// ОТКРЫТИЕ ПОПАПА КАРТИНКИ ФУУЛ САЙЗ
function openImagePopup(item) {
  openPopup(uncoverImagePopup);
  imagePopup.src = item.link;
  imagePopup.alt = item.name;
  placeNamePopup.textContent = item.name;
}

