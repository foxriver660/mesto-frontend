export { createCard };
import { photoTemplate } from "./utils";
import { openImagePopup } from "./modal";

// СОЗДАНИЕ ТЕМПЛЕЙТА КАРТОЧКИ
function getTemplate() {
  return photoTemplate.querySelector(".photo-grid__item").cloneNode(true);
}
// СЛУШАТЕЛИ НА ЭЛЕМЕНТЫ КНОПКИ
function setEventListeners(element, callback) {
  element.addEventListener("click", callback);
}
// СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function createCard(initialCard) {
  const cardElement = getTemplate();
  const cardElementImage = cardElement.querySelector(".photo-grid__image");
  const cardElementName = cardElement.querySelector(".photo-grid__place-name");
  const cardElementLikeBtn = cardElement.querySelector(
    ".photo-grid__like-button"
  );
  const cardElementDeleteBtn = cardElement.querySelector(
    ".photo-grid__delete-button"
  );
  cardElementName.textContent = initialCard.name;
  cardElementImage.src = initialCard.link;
  cardElementImage.alt = initialCard.name;
  // ЛАЙК КНОПКА
  setEventListeners(cardElementLikeBtn, (evt) =>
    evt.target.classList.toggle("photo-grid__like-button_active")
  );
  // ДЕЛИТ КНОПКА
  setEventListeners(cardElementDeleteBtn, () => cardElement.remove());
  // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
  setEventListeners(cardElementImage, () => openImagePopup(initialCard));

  return cardElement;
}


