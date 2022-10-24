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
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  resetValidation() {
    this._inputList.forEach((inputType) => this._hideInputError(inputType));
    this._changebuttonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
     this._changebuttonState();
    // слушатели при открытии попапов
    this._inputList.forEach((inputType) => {
      // слушатель инпутов
      inputType.addEventListener("input", () => {
        this._isValid(inputType);
        this._changebuttonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputType) => {
      return !inputType.validity.valid;
    });
  }

  _changebuttonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _isValid(inputType) {
    if (inputType.validity.patternMismatch) {
      inputType.setCustomValidity(inputType.dataset.errorMessage);
    } else {
      inputType.setCustomValidity("");
    }
    if (!inputType.validity.valid) {
      this._showInputError(inputType, inputType.validationMessage);
    } else {
      this._hideInputError(inputType);
    }
  }

  _showInputError = (inputType, errorMessage) => {
    this._errorType = this._form.querySelector(`.${inputType.id}-error`);
    inputType.classList.add(this._inputErrorClass);
    this._errorType.classList.add(this._errorClass);
    this._errorType.textContent = errorMessage;
  };

  _hideInputError(inputType) {
    this._errorType = this._form.querySelector(`.${inputType.id}-error`);
    inputType.classList.remove(this._inputErrorClass);
    this._errorType.classList.remove(this._errorClass);
    this._errorType.textContent = "";
  }
}
