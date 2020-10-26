/* eslint-disable no-underscore-dangle */
export default class Header {
  constructor(options, api) {
    this.options = options;
    this.api = api;
    this.getUserName = this.getUserName.bind(this);
    this._setEventListeners();
  }

  renderMobileMenu() {
    const links = this.options.headerElement.querySelector('.header__links');
    links.style.display = (links.style.display === 'block') ? 'none' : 'block';
    const menu = this.options.headerElement.querySelector('.header__menu');

    if (this.options.page.includes('index.html')) {
      menu.classList.toggle('header__menu_open-black');
    }

    if (this.options.page.includes('articles.html')) {
      menu.classList.toggle('header__menu_open-white');
    }
    menu.classList.toggle('header__menu_close-black');
  }

  renderHeader(token) {
    if (token) {
      if (this.options.authButtonOpen) {
        this.options.authButtonOpen.style.display = 'none';
      }
      this.options.linkToArticles.style.display = 'inline';
      this.options.logOutMain.style.display = 'inline';
      this.getUserName();
    }

    if (!token) {
      if (this.options.authButtonOpen) {
        this.options.authButtonOpen.style.display = 'inline';
      }
      this.options.linkToArticles.style.display = 'none';
      this.options.logOutMain.style.display = 'none';
      this.options.logOutMain.textContent = '';
    }
  }

  getUserName() {
    this.api.getUserData()
      .then((res) => {
        this.options.logOutMain.textContent = res.data.name;
      });
  }

  logOutRender() {
    this.renderHeader(false);
  }

  _setEventListeners() {
    this.options.headerElement.querySelector('.header__menu').addEventListener('click', (event) => {
      if (event.target.classList.contains('header__menu')) {
        this.renderMobileMenu();
      }
    });
  }
}
