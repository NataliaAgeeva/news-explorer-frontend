import './articles.css';
import MainApi from '../../js/api/mainApi';
import Header from '../../js/components/header';
import Cardlist from '../../js/components/cardlist';
import Card from '../../js/components/card';
import keywordsCounter from '../../js/utils/keywordsCounter';
import {
  authButtonOpen, linkToArticles, token,
  logOutMain, headerElement, page, baseUrl,
  articlesContainer, userName, atriclesCounter,
} from '../../js/constants/constants';

// API
const api = new MainApi(baseUrl);
// Constants

const header = new Header({
  authButtonOpen, linkToArticles, logOutMain, headerElement, page,
}, api);

const createCard = (data) => {
  const card = new Card(api);
  return card.createSavedCard(data);
};

if (!token) {
  window.location.replace('index.html');
}

let cardsArray = [];
const cardList = new Cardlist(articlesContainer);

header.renderHeader(token);

api.getArticles()
  .then((res) => {
    if (res.data.length === 0) {
      articlesContainer.textContent = 'Вы не сохранили еще ни одной статьи';
    }
    articlesContainer.closest('.results').style.display = 'block';
    atriclesCounter.textContent = res.data.length;

    cardsArray = res.data.map((item) => {
      const {
        date,
        image,
        keyword,
        link,
        source,
        text,
        title,
        _id,
      } = item;
      const newsCard = createCard({
        date,
        image,
        keyword,
        link,
        source,
        text,
        title,
        _id,
      });

      return newsCard;
    });

    cardList.renderAll(cardsArray);
  })
  .catch((err) => new Error(err.message));

api.getUserData(token)
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
