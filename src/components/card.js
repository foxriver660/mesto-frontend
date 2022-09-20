export { createCard, addCard, handleAddformSubmit };
import {
  addPlacePopup,
  placeInput,
  placeUrlInput,
  photoTemplate,
  photoContainer,
  } from "./utils";
import { openImagePopup, closePopup } from "./modal";
// СОЗДАНИЕ НОВОЙ КАРТОЧКИ
function createCard(initialCard) {
  const cardElement = photoTemplate
    .querySelector(".photo-grid__item")
    .cloneNode(true);
  cardElement.querySelector(".photo-grid__place-name").textContent =
    initialCard.name;
  cardElement.querySelector(".photo-grid__image").src = initialCard.link;
  cardElement.querySelector(".photo-grid__image").alt = initialCard.name;
  cardElement
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-grid__like-button_active");
    });
  cardElement
    .querySelector(".photo-grid__delete-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
  cardElement
    .querySelector(".photo-grid__image")
    .addEventListener("click", () => openImagePopup(initialCard));

  return cardElement;
}

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
