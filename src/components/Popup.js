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

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _handleClose(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.closePopup();
    }
  }

  setEventListener() {
    this._popup.addEventListener("mousedown", (evt) => this._handleClose(evt));
    // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ НА ESC
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
}
