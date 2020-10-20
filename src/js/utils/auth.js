import {
  regPopup,
  regFormElement,
  authPopup,
  authFormElement,
  successPopup,
  api,
  header,
} from '../constants/constants';

regFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  api.signUp(regFormElement)
    .then(() => successPopup.open())
    .then(regPopup.close());
});

authFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  api.signIn(authFormElement)
    .then((res) => {
      const { token } = res;
      localStorage.setItem('token', token);
    });
  header.renderHeader();
  authPopup.close();
});
