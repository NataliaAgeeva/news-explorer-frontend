/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Card {
  constructor(api) {
    this.element = document.createElement('div');
    this.api = api;
    this._setEventListeners = this._setEventListeners.bind(this);
    // eslint-disable-next-line no-unused-expressions
    this._id;
  }

  _checkImage(url) {
    if (!url) {
      return '../images/unnamed.gif';
    }
    return url;
  }

  _modifyDateForCard(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const createDate = new Date(date);
    const convertDate = new Intl.DateTimeFormat('ru-RU', options).format(createDate);

    return convertDate;
  }

  _save() {
    const options = {
      keyword: this.element.querySelector('.card__keyword').textContent,
      title: this.element.querySelector('.card__header').textContent,
      text: this.element.querySelector('.card__paragraph').textContent,
      source: this.element.querySelector('.card__source').textContent,
      date: this.element.querySelector('.card__date').textContent,
      link: this.element.querySelector('.card__link').getAttribute('href'),
      image: this.element.querySelector('.card__image').getAttribute('src'),
    };

    const { ...rest } = options;

    if (localStorage.getItem('token')) {
      this.api.saveArticle({ ...rest })
        .then((res) => {
          this._id = res.data._id;
          return this._id;
        })
        .then(() => this.element.querySelector('.card__save-flag').classList.add('card__save-flag_marked'))
        .catch((err) => new Error({ message: err }));
    }
  }

  _delete() {
    if (localStorage.getItem('token')) {
      this.api.deleteArticle(this._id)
        .then(() => this.element.querySelector('.card__save-flag').classList.remove('card__save-flag_marked'))
        .catch((err) => new Error({ message: err }));
    }
  }

  _deleteSavedArticle() {
    if (localStorage.getItem('token')) {
      this.api.deleteArticle(this._id)
        .then(() => {
          this.element.remove();
        })
        .catch((err) => new Error({ message: err }));
    }
  }

  createSavedCard(data) {
    this._id = data._id;
    this.element.classList.add('card');
    this.element.insertAdjacentHTML('beforeend', `
                             <span class="card__keyword">`
                             + `${data.keyword}`
                             + `</span>
                             <button class="card__delete-card"></button>
                             <a href=`
                             + `${data.link}`
                             + ` class="card__link" target="_blank">
                             <img class="card__image" src=`
                             + `${this._checkImage(data.image)}`
                             + `>
                             <div class="card__text-data">
                               <span class="card__date">`
                               + `${data.date}`
                               + `</span>
                               <h3 class="card__header">`
                               + `${data.title}`
                               + `</h3>
                               <p class="card__paragraph">`
                               + `${data.text}`
                               + `</p>
                               <span class="card__source">`
                               + `${data.source}`
                               + `</span>
                             </div>
                             </a>`);
    this._setEventListeners();
    this.element.style.visibility = 'visible';
    return this.element;
  }

  create(template, keyword) {
    this.element.classList.add('card');
    this.element.insertAdjacentHTML('beforeend', `
                             <span class="card__keyword">`
                             + `${keyword}`
                             + `</span>
                             <button class="card__save-flag card__save-flag_not-logged-in"></button>
                             <a href=`
                             + `${template.url}`
                             + ` class="card__link" target="_blank">
                             <img class="card__image" src=`
                             + `${this._checkImage(template.urlToImage)}`
                             + `>
                             <div class="card__text-data">
                               <span class="card__date">`
                               + `${this._modifyDateForCard(template.publishedAt)}`
                               + `</span>
                               <h3 class="card__header">`
                               + `${template.title}`
                               + `</h3>
                               <p class="card__paragraph">`
                               + `${template.description}`
                               + `</p>
                               <span class="card__source">`
                               + `${template.source.name}`
                               + `</span>
                             </div>
                             </a>`);
    this._setEventListeners();
    this.element.style.visibility = 'visible';
    return this.element;
  }

  _setHoverState(event) {
    if (localStorage.getItem('token')) {
      event.target.classList.remove('card__save-flag_not-logged-in');
    }
    if (!localStorage.getItem('token')) {
      event.target.classList.add('card__save-flag_not-logged-in');
    }
  }

  _setEventListeners() {
    if (window.location.href.includes('index')) {
      this.element.querySelector('.card__save-flag').addEventListener('click', (event) => {
        if (event.target.classList.contains('card__save-flag_marked')) {
          this._delete();
        } else {
          this._save();
        }
      });
      this.element.querySelector('.card__save-flag').addEventListener('mouseover', (event) => {
        this._setHoverState(event);
      });
    }
    if (window.location.href.includes('articles')) {
      this.element.querySelector('.card__delete-card').addEventListener('click', () => {
        this._deleteSavedArticle();
      });
    }
  }
}
