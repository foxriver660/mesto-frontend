export {
  showInputError,
  hideInputError,
  isValid,
  setEventListeners,
  enableValidation,
  hasInvalidInput,
  buttonState,
};

// ПОКАЗАТЬ ОШИБКУ
const showInputError = (formType, inputType, errorMessage, objectValid) => {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.add(objectValid.inputErrorClass);
  errorType.classList.add(objectValid.errorClass);
  errorType.textContent = errorMessage;
};

// СКРЫТЬ ОШИБКУ
function hideInputError(formType, inputType, objectValid) {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.remove(objectValid.inputErrorClass);
  errorType.classList.remove(objectValid.errorClass);
  errorType.textContent = "";
}

// ПРОВЕРКА КАЖДОГО ИМПУТА
function isValid(formType, inputType, objectValid) {
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
}

// СЛУШАТЕЛЬ НА ВСЕ ИНПУТЫ
function setEventListeners(formType, objectValid) {
  const inputList = Array.from(
    formType.querySelectorAll(objectValid.inputSelector)
  );
  const buttonElement = formType.querySelector(
    objectValid.submitButtonSelector
  );
  buttonState(inputList, buttonElement, objectValid);
  inputList.forEach((inputType) => {
    inputType.addEventListener("input", () => {
      isValid(formType, inputType, objectValid);
      buttonState(inputList, buttonElement, objectValid);
    });
  });
}

// ЕДИНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ
function enableValidation(objectValid) {
  const formList = Array.from(
    document.querySelectorAll(objectValid.formSelector)
  );
  formList.forEach((formType) => {
    formType.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formType, objectValid);
  });
}

// ПРОВЕРКА МАССИВА ПОЛЕЙ ФОМЫ НА ВАЛИДНОСТЬ
function hasInvalidInput(inputList) {
  return inputList.some((inputType) => {
    return !inputType.validity.valid;
  });
}

// СОСТОЯНИЕ КНОПКИ САБМИТ
function buttonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.removeAttribute("disabled");
  }
}
