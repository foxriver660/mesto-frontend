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

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
// }

// closeBtns.forEach(function(button){
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });

function closePopup() {
  popups.forEach((popup) => {popup.classList.remove('popup_opened'); 
  popup.removeEventListener('click', closeOverlayPopup)})
  ;
}
closeBtns.forEach((closeBtn) =>  closeBtn.addEventListener("click", () => closePopup()));

// ____________________________________________
function closeOverlayPopup(evt) {
  if (evt.target === evt.currentTarget) {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
          openedPopup.classList.remove('popup_opened');
      }
  }
}

function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
          openedPopup.classList.remove('popup_opened');
      }
  }
} 
// ____________________________________________________
document.addEventListener('keydown', closeEscPopup);




function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeOverlayPopup);
  }

function openProfilePopup(){
  openPopup(profilePopup)
  nameInput.value = userName.textContent;
  jobInput.value = userStatus.textContent;
}
profileBtn.addEventListener("click", () => openProfilePopup());
addCardBtn.addEventListener("click", () => openPopup(addPlacePopup));

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userStatus.textContent = jobInput.value;
  closePopup(profilePopup)
};
formProfile.addEventListener("submit", handleProfileFormSubmit);

function createCard(item) {
    const cardElement = photoTemplate.querySelector(".photo-grid__item").cloneNode(true);
  cardElement.querySelector(".photo-grid__place-name").textContent = item.name;
  cardElement.querySelector(".photo-grid__image").src = item.link;
  cardElement.querySelector(".photo-grid__image").alt = item.name;

  cardElement.querySelector(".photo-grid__like-button").addEventListener("click", function (evt) {
      evt.target.classList.toggle("photo-grid__like-button_active");
    });

    cardElement.querySelector(".photo-grid__delete-button").addEventListener("click", function () {
      cardElement.remove();
    });

    const openImagePopup = function () {
      openPopup(uncoverImagePopup);
      imagePopup.src = item.link;
      imagePopup.alt = item.name;
      placeNamePopup.textContent = item.name;
    };
    cardElement.querySelector(".photo-grid__image").addEventListener("click", () => openImagePopup());
  return cardElement
};

function addCard(item) {
   photoContainer.prepend(createCard(item));
}

initialCards.forEach((item) => { 
    addCard(item); 
});

const handleAddformSubmit = function (evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const placeUrlValue = placeUrlInput.value;
  addCard({ name: placeValue, link: placeUrlValue })
    closePopup(addPlacePopup);
  evt.target.reset()
  };
formPlace.addEventListener("submit", handleAddformSubmit);





//-------------------------------------------- ВАЛИДАЦИЯ






function showInputError (formType, inputType, errorMessage, objectValid) {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.add(objectValid.inputErrorClass);
  errorType.classList.add(objectValid.errorClass);
  errorType.textContent = errorMessage;
};

function hideInputError (formType, inputType, objectValid) {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.remove(objectValid.inputErrorClass);
  errorType.classList.remove(objectValid.errorClass);
  errorType.textContent = "";
};

function isValid (formType, inputType, objectValid) {
  if (inputType.validity.patternMismatch) {
     inputType.setCustomValidity(inputType.dataset.errorMessage);
} else {
    inputType.setCustomValidity("");
}
  if (!inputType.validity.valid) {
     showInputError(formType, inputType, inputType.validationMessage, objectValid);
  } else {
     hideInputError(formType, inputType, objectValid);
  }
};
// ОТБИРАЕТ ВСЕ ИНПУТЫ
function setEventListeners (formType, objectValid) {
  const inputList = Array.from(formType.querySelectorAll(objectValid.inputSelector));
  const buttonElement = formType.querySelector(objectValid.submitButtonSelector);
  buttonState(inputList, buttonElement, objectValid)
  inputList.forEach((inputType) => {
    inputType.addEventListener('input', () => {
         isValid(formType, inputType, objectValid)
         buttonState(inputList, buttonElement, objectValid)
    });
  });
}; 

// ОТБИРАЕТ ВСЕ ФОРМЫ
function enableValidation (objectValid) {
  const formList = Array.from(document.querySelectorAll(objectValid.formSelector));
  formList.forEach((formType) => {
    formType.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formType, objectValid);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputType) => {
           return !inputType.validity.valid;
 }) 
}

function buttonState (inputList, buttonElement) {
if (hasInvalidInput(inputList)) {
buttonElement.setAttribute('disabled', 'disabled');
} else {
  buttonElement.removeAttribute('disabled');
  }
 }; 

 enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}); 

