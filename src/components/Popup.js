export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _handleClose() {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.closePopup();
    }
  }
  setEventListener() {
    this._popup.addEventListener("mousedown", this._handleClose);
    // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ НА ESC
    document.addEventListener("keydown", this._handleEscClose);
  }
}
