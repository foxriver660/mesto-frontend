export default class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inputErrorClass,
      errorClass,
    },
    form
  ) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;
    this._errorType = this._form.querySelector(
      `.${this._inputSelector.id}-error`
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._changebuttonState(inputList, buttonElement);
    // слушатели при открытии попапов
    inputList.forEach((inputType) => {
      // слушатель инпутов
      inputType.addEventListener("input", () => {
        this._isValid();
        this._changebuttonState(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputType) => {
      return !inputType.validity.valid;
    });
  }

  _changebuttonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.removeAttribute("disabled");
    }
  }

  _isValid() {
    if (this._inputSelector.validity.patternMismatch) {
      this._inputSelector.setCustomValidity(
        this._inputSelector.dataset.errorMessage
      );
    } else {
      this._inputSelector.setCustomValidity("");
    }
    if (!this._inputSelector.validity.valid) {
      this._showInputError(this._inputSelector.validationMessage);
    } else {
      this._hideInputError();
    }
  }

  _showInputError = (errorMessage) => {
    this._inputSelector.classList.add(this._inputErrorClass);
    this._errorType.classList.add(this._errorClass);
    this._errorType.textContent = errorMessage;
  };

  _hideInputError() {
    this._inputSelector.classList.remove(this._inputErrorClass);
    this._errorType.classList.remove(this._errorClass);
    this._errorType.textContent = "";
  }
}
