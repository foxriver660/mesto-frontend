export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListener()
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  _handleEscClose(evt) {
    if (this._popup.classList.contains("popup_opened") && evt.key === "Escape") {      
      this.close();
      console.log(evt.key)
    }
  }

  _handleClose(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  }

  _removeEventListener(){
    this._popup.removeEventListener("mousedown", (evt) => this._handleClose(evt));
    // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ НА ESC
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
  }

  setEventListener() {
    this._popup.addEventListener("mousedown", (evt) => this._handleClose(evt));
    // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ НА ESC
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
}
