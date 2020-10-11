const authButtonOpen = document.querySelector('#authOpen');
const authPopupClose = document.querySelector('#authClose');
const authForm = document.querySelector('#authForm');
const authSubmit = document.querySelector('#authSubmit');
const errorsAuth = {
  email: authForm.querySelector('#errorAuthEmail'),
  password: authForm.querySelector('#errorAuthPassword'),
};
const regButtonOpen = document.querySelector('#regOpen');
const regPopupClose = document.querySelector('#regClose');
const regForm = document.querySelector('#regForm');
const regSubmit = document.querySelector('#regSubmit');
const errorsReg = {
  email: regForm.querySelector('#errorRegEmail'),
  password: regForm.querySelector('#errorRegPassword'),
  name: regForm.querySelector('#errorRegName'),
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
