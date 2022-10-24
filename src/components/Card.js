export default class Card {
  constructor(
    selector,
    userId, //Подумать над sessionStorage
    data,
    { hadleDeleteCard, handleLikeCard, handleCardClick }
  ) {
    this._selector = selector;
    this._cardName = data.name;
    this._likes = data.likes;
    this._imageLink = data.link;
    this._cardId = data._id;
    this._owner = data.owner;
    this._userId = userId;
    this._hadleDeleteCard = hadleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleCardClick = handleCardClick;
    this._element = this._getElement();
    this._likeBtn = this._element.querySelector(".photo-grid__like-button");
    this._deleteBtn = this._element.querySelector(".photo-grid__delete-button");
    this._likeCounter = this._element.querySelector(".photo-grid__like-count");
    this._cardImage = this._element.querySelector(".photo-grid__image");
    this._cardDescription = this._element.querySelector(
      ".photo-grid__place-name"
    );
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".photo-grid__item")
      .cloneNode(true);
  }

  _isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _setLike() {
    this._likeCounter.textContent = this._likes.length;
    this._isLiked()
      ? this._likeBtn.classList.add("photo-grid__like-button_active")
      : this._likeBtn.classList.remove("photo-grid__like-button_active");
  }

  removeCard(item) {
    item.remove();
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

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeCard(this._isLiked(), this._cardId);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._hadleDeleteCard(this._element, this._cardId);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ link: this._imageLink, name: this._cardName });
    });
  }

  generate() {
    this._cardDescription.textContent = this._cardName;

    this._cardImage.alt = this._cardName;

    this._cardImage.src = this._imageLink;

    this._checkForDeletion();

    this._setLike();

    this._setEventListeners();

    return this._element;
  }
}
