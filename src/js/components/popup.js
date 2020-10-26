/* eslint-disable no-underscore-dangle */
export default class Popup {
  constructor(container) {
    this.container = container;
    this._setEventListeners();
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
  }

  closeOnEscapeOrCover(event) {
    if (event.key === 'Escape' || event.target.classList.contains('popup_is-opened')) {
      this.close();
    }
  }

  _setEventListeners() {
    const closeButton = this.container.querySelector('.popup__close');
    closeButton.addEventListener('click', this.close.bind(this));
    document.addEventListener('click', this.closeOnEscapeOrCover.bind(this));
    document.addEventListener('keydown', this.closeOnEscapeOrCover.bind(this));
  }
}
