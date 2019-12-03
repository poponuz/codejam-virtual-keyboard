let symbols = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  '\\',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'Enter',
  'Shift',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  'Up',
  'Shift',
  'Control',
  'Win',
  'Alt',
  'Space',
  'Alt',
  'Left',
  'Down',
  'Right',
  'Del'
];

let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];

let numbersWithShift = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '+'
];

let englishLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];
let capitalEnglishLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

function findProperKey(e) {
  // if you can't find symbols like @ in symbols array
  // use event.code to extract the last character to find the
  // element in the array eg. @ => Digit2 => 2
  // (there is element with class "2", no element with class "@")
  // Use toLowerCase for block letters KeyS => s
  let properKey = symbols.includes(e.key)
    ? e.key
    : e.code.slice(-1).toLowerCase();
  if (e.key === 'Meta') properKey = 'Win';
  if (e.code === 'Space') properKey = 'Space ';
  if (e.key === 'ArrowLeft') properKey = 'Left';
  if (e.key === 'ArrowUp') properKey = 'Up';
  if (e.key === 'ArrowDown') properKey = 'Down';
  if (e.key === 'ArrowRight') properKey = 'Right';
  if (e.key === 'Delete') properKey = 'Del';
  elem = document.getElementsByClassName(properKey)[0];
  return elem;
}

function turnNumbersIntoChars() {
  numbers.forEach((number, index) => {
    // replace the textContent of an element with the 'shift' variant
    // eg. 2 => @
    let numberChar = document.getElementsByClassName(number)[0];
    numberChar.textContent = numbersWithShift[index];
  });
}

function makeEnglishLettersUppercase() {
  englishLetters.forEach((letter, index) => {
    document.getElementsByClassName(letter)[0].textContent =
      capitalEnglishLetters[index];
  });
}

function turnCharsIntoNumbers() {
  numbers.forEach((number, index) => {
    // restore the default values of the keys before shift was pressed eg. @ => 2
    document.getElementsByClassName(number)[0].textContent = numbers[index];
  });
}

function makeEnglishLettersLowercase() {
  englishLetters.forEach((letter, index) => {
    document.getElementsByClassName(letter)[0].textContent =
      englishLetters[index];
  });
}

let capsLock = false;

function handleShift() {
  turnNumbersIntoChars();
  makeEnglishLettersUppercase();
}

function handleCapsLock() {
  if (!capsLock) {
    makeEnglishLettersUppercase();
    capsLock = true;
  } else {
    makeEnglishLettersLowercase();
    capsLock = false;
  }
}

function handleSpace() {
  inputField.textContent += ' ';
}

function handleBackspace() {
  inputField.textContent = inputField.textContent.slice(0, -1);
}

function handleTab() {
  inputField.textContent += '    ';
}

function giveProperResponseOnKeyDown(e) {
  e.preventDefault();

  if (e.code === 'Space') {
    handleSpace();
    return;
  }

  if (e.key === 'Backspace') {
    inputField.textContent = inputField.textContent.slice(0, -1);
    return;
  }

  if (e.key === 'Tab') {
    inputField.textContent += '    ';
    return;
  }

  // check if 'CapsLock' key was pressed and capsLock status variable
  // is set to false: if true turn all letters uppercase otherwise
  // turn letters lowercase
  if (e.key === 'CapsLock') {
    handleCapsLock();
    return;
  }

  if (e.key === 'Shift') {
    handleShift();
    return;
  }

  // default e.target for keydown is body, so first find out
  // the key that was pressed, then add its value to the inputField
  let pressedKey = document.getElementsByClassName(e.key)[0];
  inputField.textContent += pressedKey.textContent;
}

function giveProperResponseOnKeyUp(e) {
  if (e.key === 'Shift') {
    turnCharsIntoNumbers();
    makeEnglishLettersLowercase();
  }
}

function addClassKeyPressed(elem) {
  elem.classList.add('key-pressed');
}

function removeClassKeyPressed(elem) {
  elem.classList.remove('key-pressed');
}

// check if 'CapsLock' key was pressed on a virtual keyboard
// and capsLock status variable
// is set to false: if true turn all letters uppercase otherwise
// turn letters lowercase
function giveProperResponseOnMouseDown(e) {
  addClassKeyPressed(e.target);

  if (e.target.textContent === 'Space') {
    handleSpace();
    return;
  }

  if (e.target.textContent === 'Backspace') {
    handleBackspace();
    return;
  }

  if (e.target.textContent === 'Tab') {
    handleTab();
    return;
  }

  if (e.target.textContent === 'CapsLock') {
    handleCapsLock();
    return;
  }

  if (e.target.textContent === 'Shift') {
    handleShift();
    return;
  }

  inputField.textContent += e.target.textContent;
}

function giveProperResponseOnMouseUp(e) {
  removeClassKeyPressed(e.target);

  if (e.target.textContent === 'Shift') {
    makeEnglishLettersLowercase();
    turnCharsIntoNumbers();
    return;
  }
}

let content = document.querySelector('.content');

let inputField = document.createElement('textarea');
inputField.setAttribute('rows', '10');
content.appendChild(inputField);

let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');

document.addEventListener('keydown', e => {
  let myKey = findProperKey(e);
  giveProperResponseOnKeyDown(e);
  addClassKeyPressed(myKey);
});

document.addEventListener('keyup', e => {
  let myKey = findProperKey(e);
  giveProperResponseOnKeyUp(e);
  removeClassKeyPressed(myKey);
});

symbols.forEach(key => {
  // add class name to each key element that equals to its name.
  // use split and join to make class name for keys: 'Caps lock' etc.
  let keyClass = key.split(' ').join('-');
  let newKey = document.createElement('div');
  newKey.classList.add('key', keyClass);
  newKey.textContent = key;

  keyboard.appendChild(newKey);

  newKey.addEventListener('mousedown', giveProperResponseOnMouseDown);

  newKey.addEventListener('mouseup', giveProperResponseOnMouseUp);
});

content.appendChild(keyboard);
