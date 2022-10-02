export { createCard, checkForDeletion, checkForUserLike };
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
      pushLike(cardElementId)
        .then((res) => {
          evt.target.classList.add("photo-grid__like-button_active");
          cardElementLikeCount.textContent++;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(cardElementId)
        .then((res) => {
          evt.target.classList.remove("photo-grid__like-button_active");
          cardElementLikeCount.textContent--;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  // ДЕЛИТ КНОПКА
  setEventListeners(cardElementDeleteBtn, () => {
    deleteUserCard(cardElementId)
      .then((res) => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
  setEventListeners(cardElementImage, () => openImagePopup(initialCard));

  return cardElement;
}

// СВЕРКА ID ПОЛЬЗОВАТЕЛЯ и ID СОЗДАТЕЛЯ КАРТОЧКИ
function checkForDeletion(card, user) {
  const cardDeleteBtn = document.querySelector(".photo-grid__delete-button");
  if (!(card.owner._id == user)) {
    cardDeleteBtn.classList.add("photo-grid__delete-button_disabled");
  }
}
// СВЕРКА ID ПОЛЬЗОВАТЕЛЯ и ID ЛАЙКА КАРТОЧКИ
function checkForUserLike(cardLike, user) {
  const cardLikeBtn = document.querySelector(".photo-grid__like-button");
  if (cardLike._id == user) {
    cardLikeBtn.classList.add("photo-grid__like-button_active");
  }
}
