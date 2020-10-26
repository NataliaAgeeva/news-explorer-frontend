import formatDate from '../utils/getDate';

export default class NewsApi {
  constructor() {
    this.apiKey = '853b80cc2e9e4ffbbe1759f7f134033c';
  }

  searchArticles(data) {
    const url = 'https://nomoreparties.co/news/v2/everything?'
      + `q=${data}&`
      + `from=${formatDate()}&`
      + `apiKey=${this.apiKey}&`
      + 'pageSize=100';
    return fetch(url, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }
}
