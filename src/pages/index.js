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

const currentUser = new UserInfo(
  ".profile__user-name",
  ".profile__user-status",
  ".profile__user-image"
);

const createCard = (cardData, cardSelector) => {  
  const card = new Card(cardSelector, currentUser.userId, cardData, {
    hadleDeleteCard: (cardElement, cardId) => {
      api.deleteUserCard(cardId).then(() => {
        card.removeCard(cardElement);
      });
    },

    handleLikeCard: (isLiked, cardId) => {
      api.setLike(isLiked, cardId).then((item) => {
        card.toggleLike(item);
      });
    },

    handleCardClick: ({ link, name }) => {
      const popupWithImage = new PopupWithImage(".open-image-popup");
      popupWithImage.setEventListener();
      popupWithImage.openPopup({ link, name });
    },
  });
  return card.generate();
};

function getInfo() {
  return Promise.all([api.getUserInfo(), api.getCards()]);
}

let section;

getInfo()
  .then(([userData, cardsData]) => {
    currentUser.setUserInfo(userData);
    section = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          section.addItem(createCard(item, "#photo-template"));
        },
      },
      ".photo-grid"
    );
    section.renderItems();
  })
  .catch((err) => console.log(err));

const popupProfile = new PopupWithForm(".profile-popup", {
  callbackFormSubmit: (data) =>
    api
      .updateUserProfile({ name: data[0], about: data[1] })
      .then((res) => {
        currentUser.setUserInfo(res);
        popupProfile.close();
      })
      .catch((err) => console.log(err)),
});
profileBtn.addEventListener("click", () => {
  popupProfile.openPopup();
  popupProfile.setEventListener();
});

const profileValidation = new FormValidator(
  validationConfig,
  popupProfile.form
);
profileValidation.enableValidation();

const popupAvatar = new PopupWithForm(".change-avatar-popup", {
  callbackFormSubmit: (data) =>
    api
      .updateUserAvatar({ link: data[0] })
      .then((res) => {
        currentUser.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => console.log(err)),
});

const avatarValidation = new FormValidator(validationConfig, popupAvatar.form);
avatarValidation.enableValidation();

const popupCard = new PopupWithForm(".add-place-popup", {
  callbackFormSubmit: (data) =>
    api
      .updateUserCard({ name: data[0], link: data[1] })
      .then((res) => {
        section.addItem(createCard(res, "#photo-template"));
        popupCard.close();
      })
      .catch((err) => console.log(err)),
});

popupAvatar.setEventListener();

popupCard.setEventListener();

changeAvatarBtn.addEventListener("click", () => {
  popupAvatar.openPopup();
});

addCardBtn.addEventListener("click", () => {
  popupCard.openPopup();
});
