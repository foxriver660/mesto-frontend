

function showInputError (formType, inputType, errorMessage) {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.add('form__item_type_error');
  errorType.classList.add('form__input-error_active');
  errorType.textContent = errorMessage;
};

function hideInputError (formType, inputType) {
  const errorType = formType.querySelector(`.${inputType.id}-error`);
  inputType.classList.remove('form__item_type_error');
  errorType.classList.remove('form__input-error_active');
  errorType.textContent = "";
};

function isValid (formType, inputType) {
  if (inputType.validity.patternMismatch) {
     inputType.setCustomValidity(inputType.dataset.errorMessage);
} else {
    inputType.setCustomValidity("");
}
  if (!inputType.validity.valid) {
     showInputError(formType, inputType, inputType.validationMessage);
  } else {
     hideInputError(formType, inputType);
  }
};
// ОТБИРАЕТ ВСЕ ИНПУТЫ
function setEventListeners (formType) {
  const inputList = Array.from(formType.querySelectorAll('.form__item'));
  const buttonElement = formType.querySelector('.form__button');
  buttonState(inputList, buttonElement)
  inputList.forEach((inputType) => {
    inputType.addEventListener('input', () => {
         isValid(formType, inputType)
         buttonState(inputList, buttonElement)
    });
  });
}; 

// ОТБИРАЕТ ВСЕ ФОРМЫ
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formType) => {
    formType.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formType);
  });
};

enableValidation(); 


function hasInvalidInput(inputList) {
  return inputList.some((inputType) => {
           return !inputType.validity.valid;
 }) 
}

function buttonState (inputList, buttonElement) {
if (hasInvalidInput(inputList)) {
buttonElement.setAttribute('disabled', 'disabled');
} else {
  buttonElement.removeAttribute('disabled');
  }
 }; 

