export default class Popup {
  constructor(container) {
    this.container = container;
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
}
