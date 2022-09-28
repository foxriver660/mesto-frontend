export { createCard };
import { photoTemplate } from "./utils";
import { openImagePopup } from "./modal";
import { deleteUserCard, pushLike, deleteLike } from "./api";

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
  let cardElementId = "";
  const cardElement = getTemplate();
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
  // ЛАЙК КНОПКА
  setEventListeners(cardElementLikeBtn, (evt) => {
    if (
      !cardElementLikeBtn.classList.contains("photo-grid__like-button_active")
    ) {
      evt.target.classList.add("photo-grid__like-button_active");
      cardElementLikeCount.textContent++;
      pushLike(cardElementId);
    } else {
      evt.target.classList.remove("photo-grid__like-button_active");
      cardElementLikeCount.textContent--;
      deleteLike(cardElementId);
    }
  });
   // ДЕЛИТ КНОПКА
    setEventListeners(cardElementDeleteBtn, () => {
    cardElement.remove();
    deleteUserCard(cardElementId);
  });
  // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
  setEventListeners(cardElementImage, () => openImagePopup(initialCard));

  return cardElement;
}
