/* eslint-disable no-underscore-dangle */
export default class CardList {
  constructor(container, card, array, keyword) {
    this.container = container;
    this.array = array;
    this.card = card;
    this.keyword = keyword;
    this.addButton = document.querySelector('.results__button');
    this._setEventListeners();
  }

  addCard(template) {
    const cardtemp = this.card(template, this.keyword);
    this.container.appendChild(cardtemp);
  }

  addSavedCard(template) {
    const cardtemp = this.card(template);
    this.container.appendChild(cardtemp);
  }

  renderAll() {
    for (let i = 0; i < this.array.length; i += 1) {
      this.addSavedCard(this.array[i]);
    }
  }

  render() {
    const threeCards = this.array.splice(0, 3);
    for (let i = 0; i < 3; i += 1) {
      this.addCard(threeCards[i]);
    }
    if (this.array.length === 0) {
      this.addButton.style.display = 'none';
    } else {
      this.addButton.style.display = 'block';
    }
  }

  clearResultsContainer() {
    const cardsToRemove = this.container.querySelectorAll('.card');
    cardsToRemove.forEach((item) => {
      this.container.removeChild(item);
    });
  }

  _setEventListeners() {
    if (this.addButton) {
      this.addButton.addEventListener('click', this.render.bind(this));
    }
  }
}
