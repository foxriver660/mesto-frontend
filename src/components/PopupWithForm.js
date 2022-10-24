import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this.form = this._popup.querySelector(".form");
    this._inputList = Array.from(this.form.querySelectorAll(".form__item"));
    this._submitButton = this.form.querySelector(".form__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setInputValues(value) {
    for (let i = 0; i < this._inputList.length; i++) {
      this._inputList[i].value = value[i];
    }
  }

  close() {
    super.close();
    this.form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._callbackFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
