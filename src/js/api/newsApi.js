import formatDate from '../utils/getDate';

export default class NewsApi {
  constructor() {
    this.apiKey = '853b80cc2e9e4ffbbe1759f7f134033c';
  }

  searchArticles(data) {
    const url = 'https://nomoreparties.co/news/v2/everything?'
      + `q=${data}&`
      + `from=${formatDate()}&`
      + 'sortBy=popularity&'
      + `apiKey=${this.apiKey}`;
    return fetch(url, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }
}
