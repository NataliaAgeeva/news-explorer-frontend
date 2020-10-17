/* eslint-disable no-param-reassign */
import './index.css';
import {
  authButtonOpen,
  authPopupClose,
  authForm,
  authSubmit,
  errorsAuth,
  regButtonOpen,
  regPopupClose,
  regForm,
  regSubmit,
  errorsReg,
  authRegOpen,
} from '../../js/constants/constants';
import Popup from '../../js/components/popup';
import FormValidator from '../../js/components/validation';

const authPopup = new Popup(document.querySelector('#authPopup'));
const regPopup = new Popup(document.querySelector('#registerPopup'));
const authValidator = new FormValidator(authForm, authSubmit);
const regValidator = new FormValidator(regForm, regSubmit);

const clearForm = (errors, form, submit) => {
  errors.email.textContent = '';
  errors.password.textContent = '';
  form.elements.email.value = '';
  form.elements.password.value = '';
  submit.classList.add('popup__button_disabled');
  submit.setAttribute('disabled', true);
};

authButtonOpen.addEventListener('click', () => {
  clearForm(errorsAuth, authForm, authSubmit);

  regPopup.close(regPopup);
  authPopup.open();
});

authRegOpen.addEventListener('click', () => {
  clearForm(errorsAuth, authForm, authSubmit);

  regPopup.close(regPopup);
  authPopup.open();
});

regButtonOpen.addEventListener('click', () => {
  authPopup.close(authPopup);
  clearForm(errorsReg, regForm, regSubmit);

  errorsReg.name.textContent = '';
  errorsReg.name.textContent = '';

  regPopup.open();
});

authValidator.setEventListeners();
regValidator.setEventListeners();

authPopupClose.addEventListener('click', authPopup.close.bind(authPopup));
regPopupClose.addEventListener('click', regPopup.close.bind(regPopup));
document.addEventListener('click', authPopup.closeOnEscapeOrCover.bind(authPopup));
document.addEventListener('keydown', authPopup.closeOnEscapeOrCover.bind(authPopup));
document.addEventListener('click', authPopup.closeOnEscapeOrCover.bind(regPopup));
document.addEventListener('keydown', authPopup.closeOnEscapeOrCover.bind(regPopup));
