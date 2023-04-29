/* eslint-disable import/extensions */
import keyboardEng from './assets/keyboard_en.js';
import keyboardRu from './assets/keyboard_ru.js';

// Realize class Virtualkeyboard
class Virtualkeyboard {
  constructor() {
    this.buttonClick = '';
    this.keyNumberBtn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace'];
    this.keyFirstLineEng = ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'];
    this.keySecondLineEng = ['CapsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'];
    this.keyThirdLineEng = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', 'Up'];
    this.keyFourthLineEng = ['Ctrl', 'win', 'Alt', 'Space', 'Alt', 'Ctrl', 'left', 'bottom', 'right'];
    this.btn = document.createElement('button');
    this.btn.classList.add('key-btn');
  }

  static init() {
    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', 'en');
      document.body.innerHTML = keyboardEng;
    } else if (localStorage.getItem('lang') === 'en') {
      document.body.innerHTML = keyboardEng;
    } else {
      document.body.innerHTML = keyboardRu;
    }
  }

  static changeLang() {
    if (localStorage.getItem('lang') === 'en') {
      localStorage.setItem('lang', 'ru');
      document.body.innerHTML = keyboardRu;
    } else {
      localStorage.setItem('lang', 'en');
      document.body.innerHTML = keyboardEng;
    }
  }
}

const virtKeyboard = new Virtualkeyboard();

Virtualkeyboard.init();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Alt' && virtKeyboard.buttonClick === 'Shift') {
    Virtualkeyboard.changeLang();
    virtKeyboard.buttonClick = '';
  } else if (event.key === 'Shift' && virtKeyboard.buttonClick === 'Alt') {
    Virtualkeyboard.changeLang();
    virtKeyboard.buttonClick = '';
  } else {
    virtKeyboard.buttonClick = event.key;
  }
});
