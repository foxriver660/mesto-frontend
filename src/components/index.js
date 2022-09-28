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
  submitBtns
} from "./utils";
import { deleteUserCard, pushLike, deleteLike,  getCards, getUserID, updateUserProfile, updateUserAvatar, updateUserCard, renderLoading } from "./api"
export {addCard}
// -----------------------------------------------------ВЗАИМОДЕЙСТВИЕ С СЕРВЕРОМ


getCards();

getUserID();

// ____________________________________________________________________________________

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
  updateUserProfile(nameInput.value, jobInput.value);
  closePopup(profilePopup);
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ПРОФИЛЯ
formProfile.addEventListener("submit", handleProfileFormSubmit);

//  ! ЗАМЕНА АВАТРА ПОЛЬЗОВАТЕЛЯ В ПРОФИЛЕ
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  profileUserImage.src = avatarInput.value;
  updateUserAvatar(avatarInput.value)
  closePopup(avatarPopup);
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
  updateUserCard(placeValue, placeUrlValue);
  closePopup(addPlacePopup);
  evt.target.reset();
}
// СЛУШАТЕЛЬ САБМИТА ПОПАПА ДОБАВЛЕНИЯ КАРТОЧКИ
formPlace.addEventListener("submit", handleAddformSubmit);

//-----ВЫЗОВ ЕДИНОЙ ФУНКЦИИ ВАЛИДАЦИИ------
enableValidation(validationConfig);
