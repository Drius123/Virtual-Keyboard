/* eslint-disable import/extensions */
import keyboardEng from './assets/keyboard_en.js';
import keyboardRu from './assets/keyboard_ru.js';

// Realize class Virtualkeyboard
class Virtualkeyboard {
  constructor() {
    this.keyNumberBtn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'Backspace'];
    this.keyFirstLineEng = ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'];
    this.keySecondLineEng = ['CapsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'];
    this.keyThirdLineEng = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', 'Up'];
    this.keyFourthLineEng = ['Ctrl', 'win', 'Alt', 'Space', 'Alt', 'Ctrl', 'left', 'bottom', 'right'];
    this.btn = document.createElement('button');
    this.btn.classList.add('key-btn');
  }

  init() {
    document.body.insertAdjacentHTML('afterbegin', keyboardEng);
  }

  addBtn() {
    this.keyNumberBtn.forEach(item => document.body.children[1].append((this.btn)));
  }
}

const virtKeyboard = new Virtualkeyboard();

virtKeyboard.init();

virtKeyboard.addBtn();
