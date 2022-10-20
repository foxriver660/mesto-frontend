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

// !  ПОКАЗАТЬ ОШИБКУ
/* const showInputError = (formType, inputType, errorMessage, objectValid) => {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.add(objectValid.inputErrorClass);
  errorType.classList.add(objectValid.errorClass);
  errorType.textContent = errorMessage;
}; */

// ! СКРЫТЬ ОШИБКУ
/* function hideInputError(formType, inputType, objectValid) {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.remove(objectValid.inputErrorClass);
  errorType.classList.remove(objectValid.errorClass);
  errorType.textContent = "";
} */

// ! ПРОВЕРКА КАЖДОГО ИМПУТА
/* function isValid(formType, inputType, objectValid) {
  if (inputType.validity.patternMismatch) {
    inputType.setCustomValidity(inputType.dataset.errorMessage);
  } else {
    inputType.setCustomValidity("");
  }
  if (!inputType.validity.valid) {
    showInputError(
      formType,
      inputType,
      inputType.validationMessage,
      objectValid
    );
  } else {
    hideInputError(formType, inputType, objectValid);
  }
} */

// ! УСТАНОВКА ВСЕХ СЛУШАТЕЛЕЙ НА ВАЛИДНОСТЬ
/* function setEventListeners(formType, objectValid) {
  const inputList = Array.from(
    formType.querySelectorAll(objectValid.inputSelector)
  );
  const buttonElement = formType.querySelector(
    objectValid.submitButtonSelector
  );
  changebuttonState(inputList, buttonElement, objectValid);
  // слушатели при открытии попапов
  inputList.forEach((inputType) => {
    profileBtn.addEventListener("click", () => {
      isValid(formType, inputType, objectValid);
      changebuttonState(inputList, buttonElement);
    });
    addCardBtn.addEventListener("click", () => {
      hideInputError(formType, inputType, objectValid);
      changebuttonState(inputList, buttonElement);
    });
    changeAvatarBtn.addEventListener("click", () => {
      hideInputError(formType, inputType, objectValid);
      changebuttonState(inputList, buttonElement);
    });
    // слушатель инпутов
    inputType.addEventListener("input", () => {
      isValid(formType, inputType, objectValid);
      changebuttonState(inputList, buttonElement, objectValid);
    });
  });
} */

// ! ЕДИНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ
/* function enableValidation(objectValid) {
  const formList = Array.from(
    document.querySelectorAll(objectValid.formSelector)
  );
  formList.forEach((formType) => {
    formType.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formType, objectValid);
  });
} */

// ! ПРОВЕРКА ВСЕХ ПОЛЕЙ ФОРМЫ НА ВАЛИДНОСТЬ
/* function hasInvalidInput(inputList) {
  return inputList.some((inputType) => {
    return !inputType.validity.valid;
  });
} */

// ! СОСТОЯНИЕ КНОПКИ САБМИТ
/* function changebuttonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.removeAttribute("disabled");
  }
} */
