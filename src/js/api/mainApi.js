export default class MainApi {
  constructor(url) {
    this.url = url;
    this.token = localStorage.getItem('token');
    this.signUp = this.signUp.bind(this);
  }

  signUp(form) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
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
      .then((res) => res)
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
}
