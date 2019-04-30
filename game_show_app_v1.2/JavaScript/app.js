const qwertyKeyboard = document.querySelector("#qwerty");
const startGame = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const missed = 0;
const phraseDiv = document.querySelector("#phrase");
const phraseUl = phraseDiv.firstElementChild;
const phrases = [
  "an apple a day keeps the doctor away",
  "an eye for an eye",
  "do not judge a book by the cover",
  "elbows off the table",
  "wait till your father gets home"
];

startGame.addEventListener("click", () => {
  overlay.style.display = "none";
});

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

const checkLetter = keyGuessed => {
  const letters = document.querySelectorAll(".letter");
  for (i = 0; i < letters.length; i++) {
    if ((keyGuessed = letters[i])) {
      const showLetter = letters[i];
      showLetter.className = "show";
      return showLetter;
    } else {
      return null;
    }
  }
};

const keyEvent = qwertyKeyboard.parentNode;
keyEvent.addEventListener("keyup", e => {
  e.target.className = "choosen";
});
