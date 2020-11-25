/* eslint-disable no-underscore-dangle */
export default class Header {
  constructor(options, api) {
    this.options = options;
    this.api = api;
    this._setEventListeners();
  }

  renderMobileMenu() {
    const linksContainer = this.options.headerElement.querySelector('.header__links');
    const links = this.options.headerElement.querySelectorAll('.header__link');
    console.log(links);
    linksContainer.style.display = (linksContainer.style.display === 'block') ? 'none' : 'block';
    const menu = this.options.headerElement.querySelector('.header__menu');

    if (this.options.page.includes('index.html')) {
      menu.classList.toggle('header__menu_open-black');
    }

    if (this.options.page.includes('articles.html')) {
      menu.classList.toggle('header__menu_open-white');
      this.options.logo.classList.toggle('header__logo_black');
      this.options.logo.classList.toggle('header__logo_white');
      for (let i = 0; i < links.length; i += 1) {
        links[i].classList.toggle('header__link_black');
        links[i].classList.toggle('header__link_white');
      }
      this.options.logOutMain.classList.toggle('auth-button_black');
      this.options.logOutMain.classList.toggle('auth-button_white');
      this.options.logOutMain.classList.toggle('auth-button_logged-in_black');
      this.options.logOutMain.classList.toggle('auth-button_logged-in_white');
    }
    menu.classList.toggle('header__menu_close-black');
  }

  renderHeader(boolean) {
    if (boolean) {
      if (this.options.authButtonOpen) {
        this.options.authButtonOpen.style.display = 'none';
      }
      this.options.linkToArticles.style.display = 'inline';
      this.options.logOutMain.style.display = 'inline';
      this.getUserName();
    }

    if (!boolean) {
      if (this.options.authButtonOpen) {
        this.options.authButtonOpen.style.display = 'inline';
      }
      this.options.linkToArticles.style.display = 'none';
      this.options.logOutMain.style.display = 'none';
      this.options.logOutMain.textContent = '';
    }
  }

  getUserName() {
    this.api.getUserData(localStorage.getItem('token'))
      .then((res) => {
        this.options.logOutMain.textContent = res.data.name;
      })
      .catch((err) => new Error({ message: err }));
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
