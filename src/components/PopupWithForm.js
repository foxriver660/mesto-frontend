import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._form = super._popup.querySelector(".form");
  }

  _getInputValues() {
    this._arrayInput = this._form.querySelectorAll(".form__item").value;
  }

  close() {
    super.closePopup();
    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._arrayInput);
    });
  }
}
