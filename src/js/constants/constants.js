const authButtonOpen = document.querySelector('#authOpen');
const authPopupClose = document.querySelector('#authClose');
const authForm = document.querySelector('#authForm');
const authSubmit = document.querySelector('#authSubmit');
const errorsAuth = {
  email: authForm.querySelector('#error-email'),
  password: authForm.querySelector('#error-password'),
};
const regButtonOpen = document.querySelector('#regOpen');
const regPopupClose = document.querySelector('#regClose');
const regForm = document.querySelector('#regForm');
const regSubmit = document.querySelector('#regSubmit');
const errorsReg = {
  email: regForm.querySelector('#error-email-reg'),
  password: regForm.querySelector('#error-password-reg'),
  name: regForm.querySelector('#error-text-reg'),
};
const authRegOpen = regForm.querySelector('#authRegOpen');

export {
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
};
