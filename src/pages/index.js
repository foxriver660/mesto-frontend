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


function getInfo() {
  return Promise.all([api.getUserInfo(), api.getCards()]);
}

getInfo()
  .then(([userData, cardsData]) => {
    currentUser.setUserInfo(userData);
    const section = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          const card = new Card(
            "#photo-template",
            currentUser.userId,
            item,
            {
              hadleDeleteCard: (cardElement, cardId) => {
                api.deleteUserCard(cardId).then((item) => {
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
            }
          );
          //console.log(card);
          const cardElement = card.generate();
          section.addItem(cardElement);
        },
      },
      ".photo-grid"
    );
    section.renderItems();
  })
  .catch((err) => console.log(err));


  const popupProfile = new PopupWithForm('.profile-popup', {
    callbackFormSubmit: (data) => api.updateUserProfile(data)
  })
  console.log(popupProfile)
profileBtn.addEventListener('click', () => {
  popupProfile.openPopup()
  popupProfile.setEventListener()
})