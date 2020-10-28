/* eslint-disable no-underscore-dangle */
export default class CardList {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.addButton = document.querySelector('.results__button');
    this._setEventListeners();
  }

  _addCard(template) {
    this.container.appendChild(template);
  }

  renderAll(array) {
    this.array = array;
    for (let i = 0; i < this.array.length; i += 1) {
      this._addCard(this.array[i]);
    }
  }

  render(array) {
    this.array = array;
    this._addThreeCards();
  }

  _addThreeCards() {
    let threeCards = this.array.splice(0, 3);
    threeCards.forEach((item) => {
      this._addCard(item);
    });
    if (this.array.length === 0) {
      this.addButton.style.display = 'none';
    } else {
      this.addButton.style.display = 'block';
    }
    threeCards = [];
  }

  clearResultsContainer() {
    const cardsToRemove = this.container.querySelectorAll('.card');
    cardsToRemove.forEach((item) => {
      item.remove();
    });
  }

  _setEventListeners() {
    if (this.addButton) {
      this.addButton.addEventListener('click', this._addThreeCards.bind(this));
    }
  }
}
