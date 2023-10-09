import * as urlVisa from './img/visa.png';
import * as urlMasterCard from './img/mastercard.png';
import * as urlUnionpay from './img/unionpay.png';
import * as urlAmericanExpress from './img/american-express.png';

export default class CardWiget {
  constructor(elementContainer) {
    this.activeCard = 0;

    this._elementContainer = elementContainer;
    this._elementContainer.innerHTML = CardWiget.getComponentHTML;
    this.submitEvent = this.submitEvent.bind(this);

    this._elementContainer.querySelector('.check-form').addEventListener('submit', this.submitEvent);
  }

  static get getComponentHTML() {
    return `<div class="card-chose">
              <img class="card-image" data-number="1" src="${urlVisa.default}"/>
              <img class="card-image" data-number="2" src="${urlMasterCard.default}"/>
              <img class="card-image" data-number="3" src="${urlUnionpay.default}"/>
              <img class="card-image" data-number="4" src="${urlAmericanExpress.default}"/>
            </div>
            <form class="check-form" action="">
              <input class="check-input" type="number" name="nubmer">
              <button class="check-button">Click to validate</button>
            </form>
            <div><span class="result-message"></span></div>`;
  }

  static calc(e) {
    return (e * 2 < 10) ? e * 2 : e * 2 - 9;
  }

  static isValid(card) {
    return card.split('')
      .map((e, i) => ((i % 2 === 0) ? CardWiget.calc(e) : parseInt(e, 10)))
      .reduce((prv, cur) => prv + cur) % 10 === 0;
  }

  serActiveCard(nubmerCard) {
    if (this.activeCard !== 0) {
      const pastActiveCard = this._elementContainer.querySelector(`.card-image[data-number="${this.activeCard}"]`);
      pastActiveCard.classList.remove('active-image');
    }

    if (nubmerCard !== 0) {
      const currentActiveCard = this._elementContainer.querySelector(`.card-image[data-number="${nubmerCard}"]`);
      currentActiveCard.classList.add('active-image');
    }

    this.activeCard = nubmerCard;
  }

  submitEvent(e) {
    e.preventDefault();
    const result = this._elementContainer.querySelector('.check-input').value;
    const message = this._elementContainer.querySelector('.result-message');

    if (result.length === 16) {
      if (CardWiget.isValid(result)) {
        message.textContent = 'Это валидный номер карты!';
        if (result[0] === '4') {
          this.serActiveCard(1);
        } else if (['51', '52', '53', '54', '55'].indexOf(result.slice(0, 2)) !== -1) {
          this.serActiveCard(2);
        } else if (['34', '37'].indexOf(result.slice(0, 2)) !== -1) {
          this.serActiveCard(4);
        } else if (result[0] === '6') {
          this.serActiveCard(3);
        }
      } else {
        message.textContent = 'Номер карты не валиден';
      }
    } else {
      message.textContent = 'Ошибка! номер карты должен состоять из 16 цифр';
    }
  }
}
