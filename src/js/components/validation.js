/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class FormValidator {
  constructor(form, submit) {
    this.form = form;
    this.submit = submit;
    this._setEventListeners();
  }

  activateError(errorElement) {
    errorElement.classList.add('popup__input-required_shown');
  }

  resetError(errorElement) {
    errorElement.classList.remove('popup__input-required_shown');
    /* eslint no-param-reassign: "error" */
    errorElement.textContent = '';
  }

  checkForm(inputElement) {
    if (inputElement.validity.valid) {
      return true;
    }
    return false;
  }

  checkInputValidity(inputElement) {
    const MIN_LENGTH_NAME = 2;
    const MAX_LENGTH_NAME = 30;
    const MIN_LENGTH_PASSWORD = 8;
    const MAX_LENGTH_PASSWORD = 12;
    const NO_SYMBOLS = '';

    const errorElement = this.form.querySelector(`span[id="error-${inputElement.id}"]`);

    if (inputElement.value === NO_SYMBOLS) {
      errorElement.textContent = 'Поле обязательно для заполнения';
      this.activateError(errorElement);
      return false;
    }

    if (inputElement.name === 'text') {
      if (inputElement.value.length < MIN_LENGTH_NAME
        || inputElement.value.length > MAX_LENGTH_NAME) {
        errorElement.textContent = 'От 2 до 30 символов';
        this.activateError(errorElement);
        return false;
      }
    }

    if (inputElement.name === 'password') {
      if (inputElement.value.length < MIN_LENGTH_PASSWORD
        || inputElement.value.length > MAX_LENGTH_PASSWORD) {
        errorElement.textContent = 'От 8 до 12 символов';
        this.activateError(errorElement);
        return false;
      }
    } else if (inputElement.name === 'email') {
      if (inputElement.validity.typeMismatch || inputElement.validity.patternMismatch) {
        errorElement.textContent = 'Неправильный формат email';
        this.activateError(errorElement);
        return false;
      }
    }

    this.resetError(errorElement);
    return true;
  }

  setSubmitButtonState(boolean) {
    if (!boolean) {
      this.submit.classList.remove('popup__button_enabled');
      this.submit.classList.add('popup__button_disabled');
      this.submit.setAttribute('disabled', true);
    } else {
      this.submit.classList.remove('popup__button_disabled');
      this.submit.classList.add('popup__button_enabled');
      this.submit.removeAttribute('disabled', true);
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this.form.elements);

    this.form.addEventListener('input', (e) => {
      let isValid = true;
      this.checkInputValidity(e.target);
      inputs.forEach((inputElement) => {
        if ((inputElement.type !== 'submit' && inputElement.type !== 'button') && !this.checkForm(inputElement)) {
          isValid = false;
        }
      });
      this.setSubmitButtonState(isValid);
    });
  }
}
