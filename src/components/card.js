export { createCard, checkForDeletion, checkForUserLike };
import { photoTemplate, handleLikeCard, handleDeleteCard } from "./utils";
import { openImagePopup } from "./modal";

// ! СОЗДАНИЕ ТЕМПЛЕЙТА КАРТОЧКИ
function getTemplate() {
  return photoTemplate.querySelector(".photo-grid__item").cloneNode(true);
}
// ! ОБЩАЯ ФУНКЦИЯ ЦСТАНОВКИ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КНОПКИ
function setEventListeners(element, callback) {
  element.addEventListener("click", callback);
}
// ! СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function createCard(initialCard) {
  const cardElement = getTemplate();
  let cardElementId = "";
  const cardElementImage = cardElement.querySelector(".photo-grid__image");
  const cardElementName = cardElement.querySelector(".photo-grid__place-name");
  const cardElementLikeBtn = cardElement.querySelector(
    ".photo-grid__like-button"
  );
  const cardElementLikeCount = cardElement.querySelector(
    ".photo-grid__like-count"
  );
  const cardElementDeleteBtn = cardElement.querySelector(
    ".photo-grid__delete-button"
  );
  cardElementName.textContent = initialCard.name;
  cardElementLikeCount.textContent = initialCard.likes.length;
  cardElementImage.src = initialCard.link;
  cardElementImage.alt = initialCard.name;
  cardElementId = initialCard._id;
  // СЛУЩАТЕЛЬ ЛАЙК КНОПКИ
  setEventListeners(cardElementLikeBtn, () =>
    handleLikeCard(cardElementLikeBtn, cardElementLikeCount, cardElementId)
  );
  // СЛУШАТЕЛЬ ДЕЛИТ КНОПКИ
  setEventListeners(cardElementDeleteBtn, () =>
    handleDeleteCard(cardElement, cardElementId)
  );
  // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
  setEventListeners(cardElementImage, () => openImagePopup(initialCard));

  return cardElement;
}

// СВЕРКА ID ПОЛЬЗОВАТЕЛЯ и ID СОЗДАТЕЛЯ КАРТОЧКИ (DELETE)
function checkForDeletion(card, user) {
  const cardDeleteBtn = document.querySelector(".photo-grid__delete-button");
  if (!(card.owner._id === user)) {
    cardDeleteBtn.classList.add("photo-grid__delete-button_disabled");
  }
}
// СВЕРКА ID ПОЛЬЗОВАТЕЛЯ и ID ЛАЙКА ПОЛЬЗОВАТЕЛЯ
function checkForUserLike(card, user) {
  const cardLikeBtn = document.querySelector(".photo-grid__like-button");
  if (card._id === user) {
    cardLikeBtn.classList.add("photo-grid__like-button_active");
  }
}
