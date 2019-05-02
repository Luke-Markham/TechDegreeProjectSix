const qwertyKeyboard = document.querySelector("#qwerty");
const startGame = document.querySelector(".btn__reset");
const button = document.querySelectorAll("button");
const overlay = document.querySelector("#overlay");
const title = document.querySelector(".title");
let missed = 0;
const phraseDiv = document.querySelector("#phrase");
const phraseUl = phraseDiv.firstElementChild;
const phrases = [
  "Five fruits a day",
  "An eye for an eye",
  "Do not judge a book by its cover",
  "Elbows off the table",
  "Wait till your father gets home"
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

const checkLetter = buttonChoosen => {
  letters = document.querySelectorAll(".letter");
  let found = null;
  for (let i = 0; i < letters.length; i++) {
    if (
      buttonChoosen.innerText.toUpperCase() ===
      letters[i].innerText.toUpperCase()
    ) {
      const correct = letters[i];
      correct.classList.add("show");
      found = true;
    }
  }
  return found;
};

// Check win function

const checkWin = () => {
  const show = document.querySelectorAll(".show");
  const letters = document.querySelectorAll(".letter");

  if (show.length === letters.length) {
    overlay.className = "win";
    overlay.style.display = "flex";
    for (let i = 0; i < letters.length; i++) {
      letters[i].style.backgroundColor = "white";
    }
    phraseUl.style.transition = "background-color 5s ease;";
    phraseUl.style.marginBottom = "450px";
    qwertyKeyboard.style.display = "none";
    title.textContent = "Success!";
    title.style.marginTop = "100px";
    startGame.textContent = "Play again?";
  } else if (missed === 4) {
    lastHeart = document.querySelector(".tries");
    lastHeart.style.transition = "transform .2s ease-in";
    lastHeart.style.transform = "scale(1.5)";
  } else if (missed >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    phraseUl.style.display = "none";
    qwertyKeyboard.style.display = "none";
    title.textContent = "I'm not angry... I'm just dissapointed.";
    startGame.textContent = "Try again?";
  }
};

//  Event listener to listen to the button choosen. If a match, button displayed. If not, heart taken from scoreboard.

qwertyKeyboard.addEventListener("click", e => {
  const buttonChoosen = e.target;
  if (buttonChoosen.tagName === "BUTTON") {
    buttonChoosen.className = "choosen";
    buttonChoosen.setAttribute("disabled", "");
    buttonChoosen.style.backgroundColor = "#37474F";
    buttonChoosen.style.color = "white";
  } else if (buttonChoosen.tagName !== "BUTTON") {
    return null;
  }

  const letterChecked = checkLetter(buttonChoosen);
  if (letterChecked === null) {
    const scoreboard = document.querySelector("#scoreboard");
    const ol = scoreboard.firstElementChild;
    const li = ol.firstElementChild;
    ol.removeChild(li);
    missed += 1;
  }

  let delayInMilliseconds = 750;

  setTimeout(function() {
    checkWin();
  }, delayInMilliseconds);
});

// reset game after win or lose

startGame.addEventListener("click", e => {
  if (e.target.innerText === "Play again?" || "Try again?") {
    location.reload();
  }
});
overlay.style.display = "none";
