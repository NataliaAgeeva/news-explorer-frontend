import Card from '../components/card';
import NewsApi from '../api/newsApi';
import renderLoading from './utils';
import Cardlist from '../components/cardlist';
import MainApi from '../api/mainApi';

// Constants
import {
  search, articlesContainer, baseUrl,
} from '../constants/constants';

const resltsNotFound = document.querySelector('.not-found');
const newsApi = new NewsApi();
const api = new MainApi(baseUrl);

const createCard = (data, keyword) => {
  const card = new Card(api);
  return card.create(data, keyword);
};

const cardList = new Cardlist(articlesContainer);
let cardsArray = [];

search.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = search.querySelector('.search__bar');
  resltsNotFound.style.display = 'none';
  articlesContainer.closest('.results').style.display = 'none';
  const keyword = input.value;

  if (keyword) {
    renderLoading(true);

    articlesContainer.textContent = '';

    newsApi.searchArticles(keyword)
      .then((res) => {
        cardsArray = res.articles.map((item) => {
          const {
            title,
            description,
            publishedAt,
            url,
            urlToImage,
            source,
          } = item;
          const newsCard = createCard({
            title,
            description,
            publishedAt,
            url,
            urlToImage,
            source,
          }, keyword);

          return newsCard;
        });
        cardList.clearResultsContainer();

        if (res.articles.length) {
          articlesContainer.closest('.results').style.display = 'block';
          cardList.render(cardsArray);
        }

        if (!res.articles.length) {
          resltsNotFound.style.display = 'block';
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          articlesContainer.closest('.results').style.display = 'block';
          articlesContainer.textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
          cardList.hideButton();
        }
        return new Error({ message: err });
      })
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
