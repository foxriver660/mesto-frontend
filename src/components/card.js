export default class Card {
  constructor(selector, container, { name, likes, link, _id, owner }) {
    this._selector = selector;
    this._container = container;
    this._cardName = name;
    this._likesCount = likes.length;
    this._imageLink = link;
    this._imageDescription = name;
    this._id = _id;
    this._ownerId = owner._id;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".photo-grid__item")
      .cloneNode(true);
    return cardElement;
  }

  _checkForDeletion(ownerId, userId, deleteBtn) {
    if (!(ownerId === userId)) {
      deleteBtn.classList.add("photo-grid__delete-button_disabled");
    }
  }

  _checkForUserLike(ownerId, userId, likeBtn) {
    if (ownerId === userId) {
      likeBtn.classList.add("photo-grid__like-button_active");
    }
  }

  _setEventListeners() {
    this._element.addEventListener("click", () => {});

    this._element.addEventListener("click", () => {});
  }
  // !---------
  // _handleLikeCard(button, count, id) {
  //   if (!button.classList.contains("photo-grid__like-button_active")) {
      
  //     pushLike(id)
  //       .then((res) => {
  //         button.classList.add("photo-grid__like-button_active");
  //         count.textContent++;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     deleteLike(id)
  //       .then((res) => {
  //         button.classList.remove("photo-grid__like-button_active");
  //         count.textContent--;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  // _handleDeleteCard(card, id) {
  //   deleteUserCard(id)
  //     .then((res) => {
  //       card.remove();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  generate() {
    this._element = this._getElement();
    const cardElementImage = this._element.querySelector(".photo-grid__image");
    const cardElementName = this._element.querySelector(
      ".photo-grid__place-name"
    );

    const cardElementLikeCount = this._element.querySelector(
      ".photo-grid__like-count"
    );
    cardElementName.textContent = this._cardName;
    cardElementLikeCount.textContent = this._likesCount;
    cardElementImage.src = this._imageLink;
    cardElementImage.alt = this._imageDescription;
    let cardElementId = this._id;

    const cardElementLikeBtn = this._element.querySelector(
      ".photo-grid__like-button"
    );
    const cardElementDeleteBtn = this._element.querySelector(
      ".photo-grid__delete-button"
    );
    this._checkForDeletion(this._ownerId, user, cardElementDeleteBtn);
    this._checkForUserLike(this._ownerId, user, cardElementLikeBtn);

    return this._element;
  }
}

// ! СОЗДАНИЕ ТЕМПЛЕЙТА КАРТОЧКИ
// function getTemplate() {
//   return photoTemplate.querySelector(".photo-grid__item").cloneNode(true);
// }
// ! ОБЩАЯ ФУНКЦИЯ ЦСТАНОВКИ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КНОПКИ
function setEventListeners(element, callback) {
  element.addEventListener("click", callback);
}
// ! СОЗДАНИЕ НОВОЙ КАРТОЧКИ
// function createCard(initialCard) {
//   const cardElement = getTemplate();
//   let cardElementId = "";
//   const cardElementImage = cardElement.querySelector(".photo-grid__image");
//   const cardElementName = cardElement.querySelector(".photo-grid__place-name");
//   const cardElementLikeBtn = cardElement.querySelector(
//     ".photo-grid__like-button"
//   );
//   const cardElementLikeCount = cardElement.querySelector(
//     ".photo-grid__like-count"
//   );
//   const cardElementDeleteBtn = cardElement.querySelector(
//     ".photo-grid__delete-button"
//   );
//   cardElementName.textContent = initialCard.name;
//   cardElementLikeCount.textContent = initialCard.likes.length;
//   cardElementImage.src = initialCard.link;
//   cardElementImage.alt = initialCard.name;
//   cardElementId = initialCard._id;
//   // СЛУШАТЕЛЬ ЛАЙК КНОПКИ С ХЭНДЛЕРОМ ЛАЙКА
//   setEventListeners(cardElementLikeBtn, () =>
//     handleLikeCard(cardElementLikeBtn, cardElementLikeCount, cardElementId)
//   );
//   // СЛУШАТЕЛЬ ДЕЛИТ КНОПКИ С ХЭНДЛЕРОМ УДАЛЕНИЯ
//   setEventListeners(cardElementDeleteBtn, () =>
//     handleDeleteCard(cardElement, cardElementId)
//   );
//   // СЛУШАТЕЛЬ ОТКРЫТИЯ ФУУЛ САЙЗ ИЗОБРАЖЕНИЯ
//   setEventListeners(cardElementImage, () => openImagePopup(initialCard));

//   return cardElement;
// }

// // СВЕРКА ID ПОЛЬЗОВАТЕЛЯ и ID СОЗДАТЕЛЯ КАРТОЧКИ (DELETE)
// function checkForDeletion(card, user) {
//   const cardDeleteBtn = document.querySelector(".photo-grid__delete-button");
//   if (!(card.owner._id === user)) {
//     cardDeleteBtn.classList.add("photo-grid__delete-button_disabled");
//   }
// }
// // СВЕРКА ID ПОЛЬЗОВАТЕЛЯ и ID ЛАЙКА ПОЛЬЗОВАТЕЛЯ
// function checkForUserLike(card, user) {
//   const cardLikeBtn = document.querySelector(".photo-grid__like-button");
//   if (card._id === user) {
//     cardLikeBtn.classList.add("photo-grid__like-button_active");
//   }
// }
