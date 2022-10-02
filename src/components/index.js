import "../index.css";
import { enableValidation } from "./validate";
import { createCard, checkForDeletion, checkForUserLike } from "./card";
import {
  closePopup,
  openPopup,
  openProfilePopup,
  openAvatarPopup,
} from "./modal";
import {
  profilePopup,
  addPlacePopup,
  profileBtn,
  addCardBtn,
  closeBtns,
  formProfile,
  formPlace,
  nameInput,
  jobInput,
  placeInput,
  placeUrlInput,
  photoContainer,
  validationConfig,
  profileUserImage,
  avatarPopup,
  avatarInput,
  formAvatar,
  changeAvatarBtn,
} from "./utils";
import {
  getCards,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
  updateUserCard,
} from "./api";
import { renderLoading, setUserInfo } from "./utils";
export { addCard };

// СЕРВЕР: инициализация данных пользователя
function updateData() {
  getUserInfo()
    .then((data) => {
      const usedId = data._id;
      setUserInfo(data.name, data.about);
      profileUserImage.src = data.avatar;
      // СЕРВЕР: закрузка карточек после загрузки данных пользователя
      getCards()
        .then((dataCards) => {
          dataCards.reverse().forEach((dataCard) => {
            addCard(dataCard);
            checkForDeletion(dataCard, usedId);
            dataCard.likes.forEach((like) => checkForUserLike(like, usedId));
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
updateData();
// СЛУШАТЕЛЬ ЗАКРЫТИЯ ПОПАПОВ НА КРЕСТИК
closeBtns.forEach((closeBtn) => {
  const selectedPopup = closeBtn.closest(".popup");
  closeBtn.addEventListener("click", () => closePopup(selectedPopup));
});

// СЛУШАТЕЛИ ОТКРЫТИЯ ПОПАПОВ НА КНОПКАХ
profileBtn.addEventListener("click", () => openProfilePopup());
addCardBtn.addEventListener("click", () => openPopup(addPlacePopup));
changeAvatarBtn.addEventListener("click", () => openAvatarPopup(avatarPopup));

// ! ЗАМЕНА ДАННЫХ ВВЕДЕНЫХ ПОЛЬЗОВАТЕЛЕМ В ПРОФИЛЕ
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // апдейт профиля на сервере
  updateUserProfile(nameInput.value, jobInput.value)
    .then((res) => {
      setUserInfo(nameInput.value, jobInput.value);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false);
    });
  renderLoading(true);
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ПРОФИЛЯ
formProfile.addEventListener("submit", handleProfileFormSubmit);

//  ! ЗАМЕНА АВАТРА ПОЛЬЗОВАТЕЛЯ В ПРОФИЛЕ
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  updateUserAvatar(avatarInput.value)
    .then((res) => {
      profileUserImage.src = avatarInput.value;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false);
    });
  renderLoading(true);
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА АВАТАРА
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

// ! ДОБАВЛЕНИЕ КАРТОЧЕК В ДОМ
function addCard(initialCard) {
  photoContainer.prepend(createCard(initialCard));
}
// ! ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА и ОТПРАВКА НА СЕРВ
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const placeUrlValue = placeUrlInput.value;
  const newUserCard = { name: placeValue, link: placeUrlValue, likes: [] };
  // апдейт карточки на сервере
  updateUserCard(newUserCard)
    .then((dataCard) => {
      newUserCard._id = dataCard._id;
      addCard(newUserCard);
      closePopup(addPlacePopup);
    })

    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false);
    });

  renderLoading(true);
  evt.target.reset();
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
formPlace.addEventListener("submit", handlePlaceFormSubmit);

//-----ВЫЗОВ ЕДИНОЙ ФУНКЦИИ ВАЛИДАЦИИ------
enableValidation(validationConfig);
