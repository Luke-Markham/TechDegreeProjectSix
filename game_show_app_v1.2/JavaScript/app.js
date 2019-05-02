const qwertyKeyboard = document.querySelector("#qwerty");
const startGame = document.querySelector(".btn__reset");
const button = document.querySelectorAll("button");
const overlay = document.querySelector("#overlay");
let missed = 0;
const phraseDiv = document.querySelector("#phrase");
const phraseUl = phraseDiv.firstElementChild;
const phrases = [
  "five fruits a day",
  "an eye for an eye",
  "do not judge a book by its cover",
  "elbows off the table",
  "wait till your father gets home"
];

// startGame.addEventListener("click", () => {
//   overlay.style.display = "none";
// });

overlay.style.display = "none";

// random number function to get a number for random array function

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (5 - 0)) + 0;
};
const randomNumber = getRandomNumber(0, 5);

/* 
function that gets a random phrase from the phrases array 
then splits it into a new array of individual characters 
*/

const getRandomPhraseAsArray = arr => {
  const randomPhrase = arr[randomNumber];
  const randomPhraseSplit = randomPhrase.split("", randomPhrase.length);
  return randomPhraseSplit;
};

const phraseArray = getRandomPhraseAsArray(phrases);

//  function that appends the each letter of the array as li in the ul under the class "letter"

const addPhraseToDisplay = arr => {
  for (i = 0; i < arr.length; i++) {
    const eachLetter = document.createElement("li");
    eachLetter.innerText = arr[i];
    phraseUl.appendChild(eachLetter);
    if (eachLetter.innerText !== "") {
      eachLetter.className = "letter";
    }
  }
};

addPhraseToDisplay(phraseArray);

// Check letter function

const checkLetter = buttonChoosen => {
  letters = document.querySelectorAll(".letter");
  for (let i = 0; i < letters.length; i++) {
    if (buttonChoosen.innerText === letters[i].innerText) {
      const correct = letters[i];
      correct.className = "show";
      return correct;
    } else {
      return null;
    }
  }
};

qwertyKeyboard.addEventListener("click", e => {
  const buttonChoosen = e.target;
  if (buttonChoosen.tagName === "BUTTON") {
    buttonChoosen.className = "choosen";
    // buttonChoosen.setAttribute("disabled", "");
    buttonChoosen.style.backgroundColor = "#37474F";
    buttonChoosen.style.color = "white";
    console.log(buttonChoosen);
  }
  checkLetter(buttonChoosen);
  if (checkLetter(buttonChoosen) === null) {
    missed += 1;
    console.log(missed);
  }
});
