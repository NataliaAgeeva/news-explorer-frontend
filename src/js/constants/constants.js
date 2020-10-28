import '../../images/unnamed.gif';

//  signIn elements
export const authButtonOpen = document.querySelector('#authOpen');
export const authFormElement = document.querySelector('#authForm');
export const authSubmit = document.querySelector('#authSubmit');
export const errorsAuth = {
  email: document.querySelector('#error-email'),
  password: document.querySelector('#error-password'),
};

// signUp elements
export const regButtonOpen = document.querySelector('#regOpen');
export const regFormElement = document.querySelector('#regForm');
export const regSubmit = document.querySelector('#regSubmit');
export const errorsReg = {
  email: document.querySelector('#error-email-reg'),
  password: document.querySelector('#error-password-reg'),
  name: document.querySelector('#error-text-reg'),
  regError: document.querySelector('#error-signUp'),
};
export const authRegOpen = document.querySelector('#authRegOpen');

export const page = window.location.href;

// success form elements
export const successFormElement = document.querySelector('#successForm');
export const authSuccessOpen = document.querySelector('#authSuccessOpen');

// Search Form
export const search = document.querySelector('#search');

// Header
export const headerElement = document.querySelector('.header');
export const linkToArticles = document.querySelector('#linkToArticles');
export const logOutMain = document.querySelector('#userName');

export const articlesContainer = document.querySelector('.results__array');
export const userName = document.querySelector('#headerUserName');
export const atriclesCounter = document.querySelector('#articlesCounter');

export const baseUrl = 'https://api.explorenews.fun';
export const token = localStorage.getItem('token');
