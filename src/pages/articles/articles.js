import './articles.css';
import MainApi from '../../js/api/mainApi';
import Header from '../../js/components/header';
import Cardlist from '../../js/components/cardlist';
import Card from '../../js/components/card';
import keywordsCounter from '../../js/utils/keywordsCounter';
import {
  authButtonOpen, linkToArticles,
  logOutMain, headerElement, page,
  articlesContainer, userName, atriclesCounter,
} from '../../js/constants/constants';

// API
const url = 'http://localhost:3000';
const api = new MainApi(url);
// Constants

const header = new Header({
  authButtonOpen, linkToArticles, logOutMain, headerElement, page,
}, api);

const createCard = (data) => {
  const card = new Card(api);
  return card.createSavedCard(data);
};

const token = localStorage.getItem('token');

if (!token) {
  window.location.replace('index.html');
}

header.renderHeader(token);

api.getArticles()
  .then((res) => {
    articlesContainer.closest('.results').style.display = 'block';
    atriclesCounter.textContent = res.data.length;
    const cardList = new Cardlist(articlesContainer, createCard, res.data);
    cardList.renderAll();
  })
  .catch((err) => Promise.reject(new Error(err.message)));

api.getUserData()
  .then((res) => {
    userName.textContent = res.data.name;
  })
  .catch((err) => Promise.reject(new Error(err.message)));

logOutMain.addEventListener('click', () => {
  localStorage.removeItem('token');
  header.logOutRender();
  window.location.replace('index.html');
});

keywordsCounter(api);
