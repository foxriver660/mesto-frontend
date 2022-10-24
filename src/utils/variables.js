const profileUserImage = document.querySelector(".profile__user-image");
const changeAvatarBtn = document.querySelector(".profile__change-image-btn");
const submitBtns = document.querySelectorAll(".form__button");
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".profile-popup");
const addPlacePopup = document.querySelector(".add-place-popup");
const avatarPopup = document.querySelector(".change-avatar-popup");
const uncoverImagePopup = document.querySelector(".open-image-popup");
const profileBtn = document.querySelector(".profile__eddit-button");
const addCardBtn = document.querySelector(".profile__add-button");
const closeBtns = document.querySelectorAll(".popup__close-button");
const formProfile = document.querySelector(".form-profile");
const userName = document.querySelector(".profile__user-name");
const userStatus = document.querySelector(".profile__user-status");
const formPlace = document.querySelector(".form-place");
const formAvatar = document.querySelector(".form-avatar");
const nameInput = document.querySelector(".form__item_el_user-name");
const avatarInput = document.querySelector(".form__item_el_user-avatar");
const jobInput = document.querySelector(".form__item_el_user-status");
const placeInput = document.querySelector(".form__item_el_user-place");
const placeUrlInput = document.querySelector(".form__item_el_user-place-url");
const photoTemplate = document.querySelector("#photo-template").content;
const photoContainer = document.querySelector(".photo-grid");
const imagePopup = document.querySelector(".photo-grid__image_popup");
const placeNamePopup = document.querySelector(".photo-grid__place-name_popup");

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "a80c9fc1-0c23-4d33-8f6c-044abe54b54c",
    "Content-Type": "application/json",
  },
};

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__input-error_active",
};

export {
  profileUserImage,
  changeAvatarBtn,
  submitBtns,
  popups,
  profilePopup,
  addPlacePopup,
  avatarPopup,
  uncoverImagePopup,
  profileBtn,
  addCardBtn,
  closeBtns,
  formProfile,
  userName,
  userStatus,
  formPlace,
  formAvatar,
  nameInput,
  avatarInput,
  jobInput,
  placeInput,
  placeUrlInput,
  photoTemplate,
  photoContainer,
  imagePopup,
  placeNamePopup,
  apiConfig,
  validationConfig,
};
