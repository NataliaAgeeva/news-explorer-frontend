import './index.css';
import MainApi from '../../js/api/mainApi';
import Header from '../../js/components/header';
import Popup from '../../js/components/popup';
import Form from '../../js/components/form';
import FormValidator from '../../js/components/validation';

import '../../js/utils/search';

// Constants
import {
  authButtonOpen, linkToArticles, logOutMain,
  headerElement, page, regFormElement, errorsReg,
  authFormElement, authSubmit, regSubmit, baseUrl,
  authRegOpen, regButtonOpen, authSuccessOpen,
  errorsAuth,
} from '../../js/constants/constants';

// API

const api = new MainApi(baseUrl);
const header = new Header({
  authButtonOpen, linkToArticles, logOutMain, headerElement, page,
}, api);

// Popups
const authPopup = new Popup(document.querySelector('#authPopup'));
const regPopup = new Popup(document.querySelector('#registerPopup'));
const successPopup = new Popup(document.querySelector('#successPopup'));

// Validators
// eslint-disable-next-line no-unused-vars
const authValidator = new FormValidator(authFormElement, authSubmit);
// eslint-disable-next-line no-unused-vars
const regValidator = new FormValidator(regFormElement, regSubmit);

// Forms
const authForm = new Form(errorsAuth, authFormElement, authSubmit);
const regForm = new Form(errorsReg, regFormElement, regSubmit);

header.renderHeader(localStorage.getItem('token'));

logOutMain.addEventListener('click', () => {
  localStorage.removeItem('token');
  header.logOutRender();
  window.location.href = 'index.html';
});

regFormElement.addEventListener('input', () => {
  errorsReg.regError.textContent = '';
});

regFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  api.signUp(regFormElement)
    .then(() => {
      regPopup.close();
      successPopup.open();
      regFormElement.reset();
    })
    .catch((err) => {
      if (err.status === 409) {
        errorsReg.regError.textContent = 'Такой пользователь уже есть';
        errorsReg.regError.style.display = 'inline';
        return new Error({ message: err });
      }
      if (err.status === 400) {
        errorsReg.regError.textContent = 'Что-то пошло не так :( Проверьте e-mail и пароль';
        errorsReg.regError.style.display = 'inline';
        return new Error({ message: err });
      }
      errorsReg.regError.textContent = 'Что-то пошло не так :(';
      errorsReg.regError.style.display = 'inline';
      return new Error({ message: err });
    });
});

authFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  api.signIn(authFormElement)
    .then((res) => {
      const { token } = res;
      localStorage.setItem('token', token);
      header.renderHeader(true);
      authPopup.close();
      authFormElement.reset();
    })
    .catch((err) => {
      if (err.status === 400 || err.status === 401) {
        errorsAuth.email.textContent = 'Неправильное имя пользователя или пароль';
        errorsAuth.email.style.display = 'inline';
        errorsAuth.password.textContent = 'Неправильное имя пользователя или пароль';
        errorsAuth.password.style.display = 'inline';
      }
      return new Error({ message: err });
    });
});

authButtonOpen.addEventListener('click', () => {
  authForm.clearForm();

  regPopup.close(regPopup);
  authPopup.open();
});

authRegOpen.addEventListener('click', () => {
  authForm.clearForm();

  regPopup.close(regPopup);
  authPopup.open();
});

regButtonOpen.addEventListener('click', () => {
  authPopup.close(authPopup);
  regForm.clearForm();
  regPopup.open();
});

authSuccessOpen.addEventListener('click', () => {
  regForm.clearForm();
  authForm.clearForm();
  successPopup.close(successPopup);
  authPopup.open();
});
