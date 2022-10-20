export default class Card {
  constructor(
    selector,
    usedId,
    data,
    hadleDeleteCard,
    handleAddLike,
    handleOpenPopup
  ) {
    this._selector = selector;
    this._cardName = data.name;
    this._likes = data.likes;
    this._imageLink = data.link;
    this._imageDescription = data.name;
    this._cardId = data._id;
    this._owner = data.owner;
    this._userId = usedId;
    this._hadleDeleteCard = hadleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleOpenPopup = handleOpenPopup;
  }
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".photo-grid__item")
      .cloneNode(true);
    return cardElement;
  }

  _isLiked() {
    return this._likes.some((item) => {
      item._id === this._userId
    })
  }

  _setLike() {
    this._likeCounter.textContent = this._likes.length;
    this._isLiked() ? this._likeBtn.classList.add('.photo-grid__like-button_active') : this._likeBtn.classList.remove('.photo-grid__like-button_active');
  }

  toggleLike(likeData) {
    this._likes = likeData.likes;
    this._setLike();
  }

  _checkForDeletion() {
    if (!(this._owner._id === this._userId)) {
      this._deleteBtn.classList.add("photo-grid__delete-button_disabled");
    }
  }

  // КОЛЛБЕК ЛИСТЕНЕРОВ ВЕРНУТСЯ
  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._handleAddLike(this.__isLiked(), this._cardId));
    this._deleteBtn.addEventListener("click", () =>  this._hadleDeleteCard(this._cardId));
    this._cardImage.addEventListener("click", () => this._handleOpenPopup({link:this._imageLink, name:this._cardName}));    
  }
  // !---------
  // _handleLikeCard(isLiked, cardId) => {
/* api.setLike(isLiked, cardId)
.then((cardData) => {
  card.toggleLike(cardData)
})
 */



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

    this._likeBtn = this._element.querySelector(".photo-grid__like-button");

    this._deleteBtn = this._element.querySelector(".photo-grid__delete-button");

    this._likeCounter = this._element.querySelector(".photo-grid__like-count");

    this._cardImage = this._element.querySelector(".photo-grid__image");

    this._element.querySelector(".photo-grid__place-name").textContent =
      this._cardName;      
    
    this._element.querySelector(".photo-grid__image").alt =
      this._imageDescription;

    this._cardImage.src = this._imageLink;

    this._checkForDeletion();
    this._setLike();
    this._setEventListeners()
    return this._element;
  }
}

// ! СОЗДАНИЕ ТЕМПЛЕЙТА КАРТОЧКИ
// function getTemplate() {
//   return photoTemplate.querySelector(".photo-grid__item").cloneNode(true);
// }
// ! ОБЩАЯ ФУНКЦИЯ ЦСТАНОВКИ СЛУШАТЕЛЕЙ НА ЭЛЕМЕНТЫ КНОПКИ
/* function setEventListeners(element, callback) {
  element.addEventListener("click", callback);
} */
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
