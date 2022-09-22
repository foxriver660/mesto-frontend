export {
  popups,
  profilePopup,
  addPlacePopup,
  uncoverImagePopup,
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
  photoTemplate,
  photoContainer,
  imagePopup,
  placeNamePopup,
  initialCards,
  validationConfig
};
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".profile-popup");
const addPlacePopup = document.querySelector(".add-place-popup");
const uncoverImagePopup = document.querySelector(".open-image-popup");
const profileBtn = document.querySelector(".profile__eddit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const closeBtns = document.querySelectorAll(".popup__close-button");
const formProfile = document.querySelector(".form-profile");
const userName = document.querySelector(".profile__user-name");
const userStatus = document.querySelector(".profile__user-status");
const formPlace = document.querySelector(".form-place");
const nameInput = document.querySelector(".form__item_el_user-name");
const jobInput = document.querySelector(".form__item_el_user-status");
const placeInput = document.querySelector(".form__item_el_user-place");
const placeUrlInput = document.querySelector(".form__item_el_user-place-url");
const photoTemplate = document.querySelector("#photo-template").content;
const photoContainer = document.querySelector(".photo-grid");
const imagePopup = document.querySelector(".photo-grid__image_popup");
const placeNamePopup = document.querySelector(".photo-grid__place-name_popup");
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
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__input-error_active",
}