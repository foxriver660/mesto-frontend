import "../index.css";
import {
  changeAvatarBtn,
  profileBtn,
  addCardBtn,
  apiConfig,
  validationConfig,
} from "../utils/variables.js";
import Api from "../components/Api.js";
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
      api
        .deleteUserCard(cardId)
        .then(() => {
          card.removeCard(cardElement);
        })
        .catch((err) => console.log(err));
    },

    handleLikeCard: (isLiked, cardId) => {
      api
        .setLike(isLiked, cardId)
        .then((item) => {
          card.toggleLike(item);
        })
        .catch((err) => console.log(err));
    },

    handleCardClick: ({ link, name }) => {
      popupWithImage.open({ link, name });
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

const popupWithImage = new PopupWithImage(".open-image-popup");

const popupProfile = new PopupWithForm(".profile-popup", {
  callbackFormSubmit: (data) =>
    api
      .updateUserProfile(data)
      .then((res) => {
        currentUser.setUserInfo(res);
        popupProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupProfile.renderLoading(false);
      }),
});

const profileValidation = new FormValidator(
  validationConfig,
  popupProfile.form
);

const popupAvatar = new PopupWithForm(".change-avatar-popup", {
  callbackFormSubmit: (data) =>
    api
      .updateUserAvatar(data)
      .then((res) => {
        currentUser.setUserInfo(res);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAvatar.renderLoading(false);
      }),
});

const avatarValidation = new FormValidator(validationConfig, popupAvatar.form);

const popupCard = new PopupWithForm(".add-place-popup", {
  callbackFormSubmit: (data) =>
    api
      .updateUserCard(data)
      .then((res) => {
        section.addItem(createCard(res, "#photo-template"));
        popupCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupCard.renderLoading(false);
      }),
});

const cardValidation = new FormValidator(validationConfig, popupCard.form);

profileValidation.enableValidation();
avatarValidation.enableValidation();
cardValidation.enableValidation();

popupCard.setEventListener();
popupProfile.setEventListener();
popupAvatar.setEventListener();
popupWithImage.setEventListener();

profileBtn.addEventListener("click", () => {
  popupProfile.setInputValues(currentUser.getUserInfo());
  profileValidation.resetValidation();

  popupProfile.open();
});

changeAvatarBtn.addEventListener("click", () => {
  avatarValidation.resetValidation();
  popupAvatar.open();
});

addCardBtn.addEventListener("click", () => {
  cardValidation.resetValidation();

  popupCard.open();
});
