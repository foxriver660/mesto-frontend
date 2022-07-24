const popup = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".profile__eddit-button");
const popupAddCard = document.querySelector(".profile__add-button");
const popupCloseBtn = document.querySelectorAll(".popup__close-button");
const popupContainer = document.querySelectorAll(".popup__container");

const formElement = document.querySelectorAll(".form");
const nameInput = document.querySelector(".form__item_el_user-name");
const jobInput = document.querySelector(".form__item_el_user-status");

const togglePopup = function (index) {
  popup[index].classList.toggle("popup_opened");
};
popupProfile.addEventListener("click", () => togglePopup(0));
popupAddCard.addEventListener("click", () => togglePopup(1));

const popupClose = function (index) {
  popupCloseBtn[index].addEventListener("click", () => togglePopup(index));
};
popupClose(0);
popupClose(1);
popupClose(2);

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  document.querySelector(".profile__user-name").textContent = nameInput.value;
  document.querySelector(".profile__user-status").textContent = jobInput.value;
  togglePopup(0);
};
formElement[0].addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",

    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const photoTemplate = document.querySelector("#photo-template").content;
const photoContainer = document.querySelector(".photo-grid");
const photoDefault = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

const add = () => {
  photoDefault.forEach(addCard);
};
const addCard = ({ name, link }) => {
  const photoElement = photoTemplate
    .querySelector(".photo-grid__item")
    .cloneNode(true);
  photoElement.querySelector(".photo-grid__place-name").textContent = name;
  photoElement.querySelector(".photo-grid__image").src = link;

  photoElement
    .querySelector(".photo-grid__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-grid__like-button_active");
    });

  photoElement
    .querySelector(".photo-grid__delete-button")
    .addEventListener("click", function () {
      photoElement.remove();
    });

  const togglePopupImage = function (index) {
    popup[index].classList.toggle("popup_opened");
    document.querySelector(".photo-grid__image_popup").src = link;
    document.querySelector(".photo-grid__place-name_popup").textContent = name;
  };
  photoElement
    .querySelector(".photo-grid__image")
    .addEventListener("click", () => togglePopupImage(2));

  photoContainer.prepend(photoElement);
};

add();

const placeInput = document.querySelector(".form__item_el_user-place");
const placeUrlInput = document.querySelector(".form__item_el_user-place-url");
const formSubmitAddHandler = function (evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const placeUrlValue = placeUrlInput.value;
  addCard({ name: placeValue, link: placeUrlValue });
  togglePopup(1);
};
formElement[1].addEventListener("submit", formSubmitAddHandler);
