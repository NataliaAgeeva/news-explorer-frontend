import {
  authButtonOpen,
  authPopupClose,
  regButtonOpen,
  regPopupClose,
  authRegOpen,
  authPopup,
  regPopup,
  authValidator,
  regValidator,
  authForm,
  regForm,
  authSuccessOpen,
  successPopup,
  successPopupClose,
} from '../constants/constants';

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

  successPopup.close(successPopup);
  authPopup.open();
});

authValidator.setEventListeners();
regValidator.setEventListeners();

authPopupClose.addEventListener('click', authPopup.close.bind(authPopup));
regPopupClose.addEventListener('click', regPopup.close.bind(regPopup));
successPopupClose.addEventListener('click', successPopup.close.bind(successPopup));
document.addEventListener('click', authPopup.closeOnEscapeOrCover.bind(authPopup));
document.addEventListener('keydown', authPopup.closeOnEscapeOrCover.bind(authPopup));
document.addEventListener('click', regPopup.closeOnEscapeOrCover.bind(regPopup));
document.addEventListener('keydown', regPopup.closeOnEscapeOrCover.bind(regPopup));
document.addEventListener('click', successPopup.closeOnEscapeOrCover.bind(successPopup));
document.addEventListener('keydown', successPopup.closeOnEscapeOrCover.bind(successPopup));
