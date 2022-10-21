import "../index.css";
import {
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
} from "../components/variables.js";
import Api from "../components/api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const api = new Api(apiConfig);

console.log(api)
