import Popup from '../components/popup';
import FormValidator from '../components/validation';
import Form from '../components/form';
import Header from '../components/header';
import MainApi from '../api/mainApi';

const url = 'http://localhost:3000';
//  signIn elements
const authButtonOpen = document.querySelector('#authOpen');
const authPopupClose = document.querySelector('#authClose');
const authFormElement = document.querySelector('#authForm');
const authSubmit = document.querySelector('#authSubmit');
const errorsAuth = {
  email: authFormElement.querySelector('#error-email'),
  password: authFormElement.querySelector('#error-password'),
};

// signUp elements
const regButtonOpen = document.querySelector('#regOpen');
const regPopupClose = document.querySelector('#regClose');
const regFormElement = document.querySelector('#regForm');
const regSubmit = document.querySelector('#regSubmit');
const errorsReg = {
  email: regFormElement.querySelector('#error-email-reg'),
  password: regFormElement.querySelector('#error-password-reg'),
  name: regFormElement.querySelector('#error-text-reg'),
};
const authRegOpen = regFormElement.querySelector('#authRegOpen');

// success form elements
const successFormElement = document.querySelector('#successForm');
const authSuccessOpen = document.querySelector('#authSuccessOpen');
const successPopupClose = document.querySelector('#successClose');

const page = window.location.href;
// classes

// Popups
const authPopup = new Popup(document.querySelector('#authPopup'));
const regPopup = new Popup(document.querySelector('#registerPopup'));
const successPopup = new Popup(document.querySelector('#successPopup'));

// Validators
const authValidator = new FormValidator(authFormElement, authSubmit);
const regValidator = new FormValidator(regFormElement, regSubmit);

// Forms
const authForm = new Form(errorsAuth, authFormElement, authSubmit);
const regForm = new Form(errorsReg, regFormElement, regSubmit);

// API
const api = new MainApi(url);

// Header
const linkToArticles = document.querySelector('#linkToArticles');
const logOutMain = document.querySelector('#userName');
const header = new Header({ authButtonOpen, linkToArticles, logOutMain }, api);

export {
  authButtonOpen,
  authPopupClose,
  authFormElement,
  authSubmit,
  errorsAuth,
  regButtonOpen,
  regPopupClose,
  regFormElement,
  regSubmit,
  errorsReg,
  authRegOpen,
  authPopup,
  regPopup,
  authValidator,
  regValidator,
  authForm,
  regForm,
  successFormElement,
  authSuccessOpen,
  successPopup,
  successPopupClose,
  header,
  api,
  page,
};
