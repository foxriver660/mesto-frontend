import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this.form = this._popup.querySelector(".form");
  }

  _getInputValues() {
    this._inputList = Array.from(this.form.querySelectorAll(".form__item"));
    return Object.assign({}, this._inputList.map((item) => item.value));
  }

  close() {
    super.closePopup();
    this.form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();      
      /* console.log(this._getInputValues()); */
      this._callbackFormSubmit(this._getInputValues());
    });
  }
}
