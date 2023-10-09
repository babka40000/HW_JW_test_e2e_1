import CardWiget from '../card-wiget';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
let dom = '';
let cardWiget = '';

test('length', () => {
  dom = new JSDOM('<div class="container"></div>');
  const container = dom.window.document.querySelector('.container');

  cardWiget = new CardWiget(container);
  cardWiget._elementContainer.querySelector('.check-input').value = 122312444444;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.result-message').textContent).toBe('Ошибка! номер карты должен состоять из 16 цифр');
});

test('is valid', () => {
  dom = new JSDOM('<div class="container"></div>');
  const container = dom.window.document.querySelector('.container');

  cardWiget = new CardWiget(container);
  cardWiget._elementContainer.querySelector('.check-input').value = 1928374651628394;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.result-message').textContent).toBe('Это валидный номер карты!');
});

test('isn`t valid', () => {
  dom = new JSDOM('<div class="container"></div>');
  const container = dom.window.document.querySelector('.container');

  cardWiget = new CardWiget(container);
  cardWiget._elementContainer.querySelector('.check-input').value = 1928374651628397;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.result-message').textContent).toBe('Номер карты не валиден');
});

test('visa card', () => {
  dom = new JSDOM('<div class="container"></div>');
  const container = dom.window.document.querySelector('.container');

  cardWiget = new CardWiget(container);

  cardWiget._elementContainer.querySelector('.check-input').value = 4276690011073910;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.card-image[data-number="1"]').classList.contains('active-image')).toBe(true);
});

test('mastercard', () => {
  cardWiget._elementContainer.querySelector('.check-input').value = 5268397534783283;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.card-image[data-number="2"]').classList.contains('active-image')).toBe(true);
});

test('union pay', () => {
  cardWiget._elementContainer.querySelector('.check-input').value = 6954382178958349;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.card-image[data-number="3"]').classList.contains('active-image')).toBe(true);
});

test('AE', () => {
  cardWiget._elementContainer.querySelector('.check-input').value = 3485921823478925;
  cardWiget._elementContainer.querySelector('.check-button').click();

  expect(cardWiget._elementContainer.querySelector('.card-image[data-number="4"]').classList.contains('active-image')).toBe(true);
});
