export default class Header {
  constructor(options, api) {
    this.options = options;
    this.token = localStorage.getItem('token');
    this.api = api;
    this.getUserName = this.getUserName.bind(this);
  }

  renderHeader() {
    if (!this.token) {
      this.options.authButtonOpen.removeAttribute('hidden');
      this.options.linkToArticles.setAttribute('hidden', true);
      this.options.logOutMain.setAttribute('hidden', true);
    } else {
      this.options.authButtonOpen.setAttribute('hidden', true);
      this.options.linkToArticles.removeAttribute('hidden');
      this.options.logOutMain.removeAttribute('hidden');
      this.getUserName();
    }
  }

  getUserName() {
    this.api.getUserData()
      .then((res) => {
        this.options.logOutMain.textContent = res.data.name;
      });
  }
}
