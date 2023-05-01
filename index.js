/* eslint-disable import/extensions */
import keyboardEng from './assets/keyboard_en.js';
import keyboardRu from './assets/keyboard_ru.js';
import textArea from './assets/textarea.js';

// Realize class Virtualkeyboard
class Virtualkeyboard {
  constructor() {
    this.buttonClick = '';
    this.changeKeyboard = null;
  }

  // init keyboard
  static init() {
    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', 'en');
      document.body.insertAdjacentHTML('afterbegin', keyboardEng);
    } else if (localStorage.getItem('lang') === 'en') {
      document.body.insertAdjacentHTML('afterbegin', keyboardEng);
    } else {
      document.body.insertAdjacentHTML('afterbegin', keyboardRu);
    }
    document.body.insertAdjacentHTML('afterbegin', textArea);
    // eslint-disable-next-line no-use-before-define
    keyboardClick();
  }

  // realize change language
  static changeLang() {
    if (localStorage.getItem('lang') === 'en') {
      localStorage.setItem('lang', 'ru');
      document.body.removeChild(document.body.children[1]);
      document.body.removeChild(document.body.children[1]);
      document.body.children[0].insertAdjacentHTML('afterend', keyboardRu);
    } else {
      localStorage.setItem('lang', 'en');
      document.body.removeChild(document.body.children[1]);
      document.body.removeChild(document.body.children[1]);
      document.body.children[0].insertAdjacentHTML('afterend', keyboardEng);
    }
    // eslint-disable-next-line no-use-before-define
    keyboardClick();
  }

  // realize effect for buttons when click to keyboard
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
      } else if (key === 'Control' && code === 'ControlLeft') {
        document.querySelector('#Ctrl-left').classList.add('active');
      } else if (key === 'Control' && code === 'ControlRight') {
        document.querySelector('#Ctrl-right').classList.add('active');
      } else if (key === 'CapsLock') {
        document.querySelector('#CapsLk').classList.add('active');
      } else if (code === 'Space') {
        document.querySelector('#Space').classList.add('active');
      } else if (code === 'ArrowUp') {
        document.querySelector('#Top').classList.add('active');
      } else if (code === 'ArrowDown') {
        document.querySelector('#Bottom').classList.add('active');
      } else if (code === 'ArrowRight') {
        document.querySelector('#Right').classList.add('active');
      } else if (code === 'ArrowLeft') {
        document.querySelector('#Left').classList.add('active');
      } else if (key === 'Meta') {
        document.querySelector('#Win').classList.add('active');
      } else if (key === '`') {
        document.querySelector('#tilde').classList.add('active');
      } else if (document.body.children[2].children[0].children[0].children[i]
        .textContent.slice(-1).toUpperCase() === key.slice(-1).toUpperCase()) {
        document.body.children[2].children[0].children[0].children[i].classList.add('active');
      }
    }
  }

  // realize delete effect when release the button
  static deleteAff() {
    if (localStorage.getItem('lang') === 'en') {
      for (let i = 0; i < 63; i += 1) {
        document.body.children[2].children[0].children[0].children[i].classList.remove('active');
      }
    } else {
      for (let i = 0; i < 64; i += 1) {
        document.body.children[2].children[0].children[0].children[i].classList.remove('active');
      }
    }
  }

  // realize add text in textarea
  static addTextinTextArea(text) {
    document.querySelector('.textarea').value += text;
  }

  // realize delete text in textarea
  static deleteTextinTextArea() {
    document.querySelector('.textarea').value = document.querySelector('.textarea').value.slice(0, -1);
  }

  // realize Enter
  static addEnterinTextArea() {
    document.querySelector('.textarea').value += '\n';
  }

  // realize add Arrow
  static addTopArrow() {
    document.querySelector('.textarea').value += '⇧';
  }

  // realize add Arrow
  static addBottomArrow() {
    document.querySelector('.textarea').value += '⇩';
  }

  // realize add Arrow
  static addLeftArrow() {
    document.querySelector('.textarea').value += '⇦';
  }

  // realize add Arrow
  static addRightArrow() {
    document.querySelector('.textarea').value += '⇨';
  }
}

const virtKeyboard = new Virtualkeyboard();

Virtualkeyboard.init();

function keyDown() {
  document.addEventListener('keydown', (event) => {
    document.querySelector('.textarea').focus();
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

function keyUp() {
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
}

keyDown();

keyUp();

function keyboardClick() {
  document.querySelector('#keyboard').addEventListener('click', (event) => {
    document.querySelector('.textarea').focus();
    if (event.target.id === 'Top') {
      Virtualkeyboard.addTopArrow();
    } else if (event.target.id === 'Bottom') {
      Virtualkeyboard.addBottomArrow();
    } else if (event.target.id === 'Left') {
      Virtualkeyboard.addLeftArrow();
    } else if (event.target.id === 'Right') {
      Virtualkeyboard.addRightArrow();
    } else if (event.target.textContent.length < 2) {
      Virtualkeyboard.addTextinTextArea(event.target.textContent);
    } else if (event.target.textContent === 'Backspace') {
      Virtualkeyboard.deleteTextinTextArea();
    } else if (event.target.textContent === 'Enter') {
      Virtualkeyboard.addEnterinTextArea();
    } else if (event.target.children[0] === undefined) {
      Virtualkeyboard.addTextinTextArea(
        event.target.parentNode.textContent[event.target.textContent.length],
      );
    } else {
      Virtualkeyboard.addTextinTextArea(
        event.target.textContent[event.target.textContent.length - 1],
      );
    }
  });
}
