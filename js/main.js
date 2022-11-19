
const randomGenNumb = genArrNumUniciRandomMinMax(5, 1, 99);
const userInputsArr = [];
const arrOfStr = [];
const uniqueFilteredArray = [];
const timerOn = document.querySelector('.timer');
const inputs = document.querySelector('.inputs');

// Number inputs generated dynamically 
//========================================================================
for (let x = 0; x < 5; x++) {
  let formClass = document.querySelector(".inputs");
  let genFormClass = `<input class="ms_styled userInputsArr" type="text">`;
  formClass.innerHTML += genFormClass;
};

// Number boxes generated dynamically 
//========================================================================
for (let i = 0; i < 5; i++) {
  let rowClass = document.querySelector(".group");
  let genClass = `<div class="genNum ms_styled">
<div class="unshown">?</div></div`;
  rowClass.innerHTML += genClass;
};
const generatedNumbers = document.querySelectorAll('.genNum');

// Buttons functions initialization
//========================================================================
timerOn.innerHTML = "Avrai 30 sec. per memorizzare i numeri";
document.getElementById("start").addEventListener('click', () => {
  generateNumbers();
  arrConvert();
  gameStart();
});

inputs.classList.add('hidden');
document.getElementById("verify").addEventListener('click', () => {
  userInputs();
  areEqual();
});

document.getElementById("restart").addEventListener('click', () => {
  resetGame();
});

// Reloading the page to reset game (can be optimized)
//========================================================================
function resetGame() {
  window.location.reload();
};

// Filters the array to show matching memorized numbers
//========================================================================
function areEqual() {
  const filteredArray = userInputsArr.filter(value => arrOfStr.includes(value));
  const uniqueFilteredArray = [...new Set(filteredArray)];
  for (let i = 0; i < uniqueFilteredArray.length; i++) {
    if (i === 0) {
      timerOn.innerHTML = "Hai indovinato 1 numero";
    } else if (i > 0) {
      timerOn.innerHTML = "Hai indovinato " + `${i + 1}` + " numeri";
    }
  }
  console.log("Numeri indovinati " + uniqueFilteredArray);
};

// Converts generated array of numbers to string
//========================================================================
function arrConvert() {
  randomGenNumb.forEach(num => {
    arrOfStr.push(String(num));
  });
  console.log("Numeri da memorizzare " + arrOfStr);
};

// User number inputs into array
//========================================================================
function userInputs() {
  const inputs = document.getElementsByClassName("userInputsArr");
  for (let i = 0; i < inputs.length; i++) {
    userInputsArr.push(inputs[i].value);
    inputs[i].value = '';
  }
  console.log("Numeri memorizzati " + userInputsArr);
};

// Set the timer when the game starts
//========================================================================
function gameStart() {
  let seconds = 3;
  let timer = setInterval(() => {
    if (seconds === 0) {
      clearInterval(timer);
      timerOn.innerHTML = "Inserisci i numeri memorizzati qua sotto";
      document.querySelector('.group').classList.add('hidden');
      inputs.classList.remove('hidden');
    } else {
      timerOn.innerHTML = `Timer: ${seconds}`;
      seconds--;
    }
  }, 1000);
};

// Adding generated numbers into page
//========================================================================
function generateNumbers() {
  for (let i = 0; i < randomGenNumb.length; i++) {
    generatedNumbers[i].innerHTML = randomGenNumb[i];
  }
};

// Generate random numbers
//========================================================================
function randomInteger(min, max) {
  return (Math.floor(Math.random() * ((max + 1) - min) + min));
};

// Generate numbers quantity with a range
//========================================================================
function genArrNumUniciRandomMinMax(howMany, minNum, maxNum) {
  const newArr = [];

  while (newArr.length < howMany) {
    let newNumber = randomInteger(minNum, maxNum);

    if (!newArr.includes(newNumber)) {
      newArr.push(newNumber);
    }
  }
  return newArr;
};

