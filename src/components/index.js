import "../index.css";
import { enableValidation } from "./validate";
import { createCard } from "./card";
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
  userName,
  userStatus,
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
  deleteUserCard,
  pushLike,
  deleteLike,
  getCards,
  getUserID,
  updateUserProfile,
  updateUserAvatar,
  updateUserCard,
  renderLoading,
  checkForDeletion,
} from "./api";
export { addCard };

// СЕРВЕР: инициализация карточек
getCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((dataCards) => {
    console.log(dataCards[0])
    dataCards.reverse().forEach((dataCard) => {
      addCard(dataCard);
      checkForDeletion(dataCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// СЕРВЕР: инициализация данных пользователя
getUserID()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    console.log(data);
    userName.textContent = data.name;
    userStatus.textContent = data.about;
    profileUserImage.src = data.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

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
  userName.textContent = nameInput.value;
  userStatus.textContent = jobInput.value;
  // апдейт профиля на сервере
  updateUserProfile(nameInput.value, jobInput.value)
    .then((res) => {
      if (res.ok) {
        closePopup(profilePopup);
      }
      else {return Promise.reject(`Ошибка: ${res.status}`);}
    })
    .catch((err) => {
      console.log(err);
    });
  renderLoading(true);
  // closePopup(profilePopup);
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ПРОФИЛЯ
formProfile.addEventListener("submit", handleProfileFormSubmit);

//  ! ЗАМЕНА АВАТРА ПОЛЬЗОВАТЕЛЯ В ПРОФИЛЕ
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  profileUserImage.src = avatarInput.value;
  updateUserAvatar(avatarInput.value)
    .then((res) => {
      console.log(res.ok)
      if (res.ok) {
        closePopup(avatarPopup);
      } else {return Promise.reject(`Ошибка: ${res.status}`);}
    })
    .catch((err) => {
      console.log(err);
    });
  renderLoading(true);
  // closePopup(avatarPopup);
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА АВАТАРА
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

// ! ДОБАВЛЕНИЕ КАРТОЧЕК В ДОМ
function addCard(initialCard) {
  photoContainer.prepend(createCard(initialCard));
}
// ! ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ ИЗ ПОПАПА и ОТПРАВКА НА СЕРВ
function handleAddformSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const placeUrlValue = placeUrlInput.value;
  const newUserCard = { name: placeValue, link: placeUrlValue, likes: [] };
  addCard(newUserCard);
  // апдейт карточки на сервере
  updateUserCard(placeValue, placeUrlValue)
    .then((res) => {
      if (res.ok) {
        closePopup(addPlacePopup);
      }
      else {return Promise.reject(`Ошибка: ${res.status}`);}
    })
    .catch((err) => {
      console.log(err);
    });
  renderLoading(true);
  // closePopup(addPlacePopup);
  evt.target.reset();
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
formPlace.addEventListener("submit", handleAddformSubmit);

//-----ВЫЗОВ ЕДИНОЙ ФУНКЦИИ ВАЛИДАЦИИ------
enableValidation(validationConfig);
