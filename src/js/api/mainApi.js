export default class MainApi {
  constructor(url) {
    this.url = url;
    this.token = localStorage.getItem('token');
    this.signUp = this.signUp.bind(this);
    this.apiKey = '539da84807fe48c19eabd7665a65b8d1';
  }

  signUp(form) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.elements.email.value,
        password: form.elements.password.value,
        name: form.elements.text.value,
      }),
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  signIn(form) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: form.elements.email.value,
        password: form.elements.password.value,
      }),
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  saveArticle(data) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  deleteArticle(id) {
    return fetch(`${this.url}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => Promise.reject(new Error(err.message)));
  }
}
