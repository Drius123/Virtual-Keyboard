/* eslint-disable import/extensions */
import keyboardEng from './assets/keyboard_en.js';
import keyboardRu from './assets/keyboard_ru.js';

// Realize class Virtualkeyboard
class Virtualkeyboard {
  constructor() {
    this.buttonClick = '';
    this.changeKeyboard = null;
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

  static addEffectBtn(key, code) {
    for (let i = 0; i < 63; i += 1) {
      if (key === 'Shift' && code === 'ShiftLeft') {
        document.querySelector('#Shift-left').classList.add('active');
      } else if (key === 'Shift' && code === 'ShiftRight') {
        document.querySelector('#Shift-right').classList.add('active');
      } else if (key === 'Alt' && code === 'AltLeft') {
        document.querySelector('#Alt-left').classList.add('active');
      } else if (key === 'Alt' && code === 'AltRight') {
        document.querySelector('#Alt-right').classList.add('active');
      } else if (document.body.children[1].children[0].children[0].children[i]
        .textContent.toUpperCase() === key.toUpperCase()) {
        document.body.children[1].children[0].children[0].children[i].classList.add('active');
      } else if (key === 'Control' && code === 'ControlLeft') {
        document.querySelector('#Ctrl-left').classList.add('active');
      } else if (key === 'Control' && code === 'ControlRight') {
        document.querySelector('#Ctrl-right').classList.add('active');
      } else if (key === 'CapsLock') {
        document.querySelector('#CapsLk').classList.add('active');
      } else if (code === 'Space') {
        document.querySelector('#Space').classList.add('active');
      }
    }
  }

  static deleteAff() {
    for (let i = 0; i < 63; i += 1) {
      document.body.children[1].children[0].children[0].children[i].classList.remove('active');
    }
  }
}

const virtKeyboard = new Virtualkeyboard();

Virtualkeyboard.init();

function keyDown() {
  document.addEventListener('keydown', (event) => {
    Virtualkeyboard.addEffectBtn(event.key, event.code);
    if (event.key === 'Alt' && virtKeyboard.buttonClick === 'Shift') {
      virtKeyboard.changeKeyboard = true;
      virtKeyboard.buttonClick = '';
    } else if (event.key === 'Shift' && virtKeyboard.buttonClick === 'Alt') {
      virtKeyboard.changeKeyboard = true;
      virtKeyboard.buttonClick = '';
    } else {
      virtKeyboard.buttonClick = event.key;
    }
  });
}

keyDown();

document.addEventListener('keyup', () => {
  Virtualkeyboard.deleteAff();
  if (virtKeyboard.changeKeyboard) {
    Virtualkeyboard.changeLang();
    virtKeyboard.changeKeyboard = false;
  }
  setTimeout(() => {
    virtKeyboard.buttonClick = '';
  }, 300);
});
