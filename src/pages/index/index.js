import './index.css';
import MainApi from '../../js/api/mainApi';
import Header from '../../js/components/header';
import Popup from '../../js/components/popup';
import Form from '../../js/components/form';
import FormValidator from '../../js/components/validation';
import Card from '../../js/components/card';
import NewsApi from '../../js/api/newsApi';
import renderLoading from '../../js/utils/utils';
import Cardlist from '../../js/components/cardlist';

// Constants
import {
  authButtonOpen, linkToArticles, logOutMain,
  headerElement, page, regFormElement, errorsReg,
  authFormElement, authSubmit, regSubmit,
  authRegOpen, regButtonOpen, authSuccessOpen,
  errorsAuth, search, articlesContainer,
} from '../../js/constants/constants';

// API
const url = 'http://localhost:3000';
const newsApi = new NewsApi();
const api = new MainApi(url);
const header = new Header({
  authButtonOpen, linkToArticles, logOutMain, headerElement, page,
}, api);
const resltsNotFound = document.querySelector('.not-found');

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

const token = localStorage.getItem('token');

header.renderHeader(token);

const createCard = (data, keyword) => {
  const card = new Card(api);
  return card.create(data, keyword);
};

search.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = search.querySelector('.search__bar');
  resltsNotFound.style.display = 'none';
  articlesContainer.closest('.results').style.display = 'none';
  const keyword = input.value;
  if (keyword) {
    renderLoading(true);
    newsApi.searchArticles(keyword)
      .then((res) => {
        const cardList = new Cardlist(articlesContainer, createCard, res.articles, keyword);
        cardList.clearResultsContainer();
        if (res.articles.length) {
          articlesContainer.closest('.results').style.display = 'block';
          cardList.render();
        }
        if (!res.articles.length) {
          resltsNotFound.style.display = 'block';
        }
      })
      .catch((err) => Promise.reject(new Error(err.message)))
      .finally(() => {
        renderLoading(false);
        search.reset();
      });
    input.placeholder = 'Введите ключевое слово';
  }
  if (!keyword) {
    input.placeholder = 'Нужно ввести ключевое слово';
  }
});

logOutMain.addEventListener('click', () => {
  localStorage.removeItem('token');
  header.logOutRender();
});

regFormElement.addEventListener('input', () => {
  errorsReg.regError.textContent = '';
});

regFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  api.signUp(regFormElement)
    .then((res) => {
      if (res.ok) {
        successPopup.open();
        regPopup.close();
      }
      if (res.status === 409) {
        errorsReg.regError.textContent = 'Такой пользователь уже есть';
        errorsReg.regError.classList.add('popup__input-required_shown');
      }
    })
    .catch((err) => Promise.reject(new Error(err.message)));
});

authFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  api.signIn(authFormElement)
    .then(() => {
      localStorage.setItem('token', token);
    })
    .then(() => header.renderHeader('token'))
    .then(() => authPopup.close())
    .catch((err) => Promise.reject(new Error(err.message)));
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

  successPopup.close(successPopup);
  authPopup.open();
});
