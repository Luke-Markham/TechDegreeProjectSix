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
const createGameEnviroment = () => {
  let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (5 - 0)) + 0;
  };
  let randomNumber = getRandomNumber(0, 5);

  /* 
function that gets a random phrase from the phrases array 
then splits it into a new array of individual characters 
*/

  const getRandomPhraseAsArray = arr => {
    const randomPhrase = arr[randomNumber];
    const randomPhraseSplit = randomPhrase.split("", randomPhrase.length);
    return randomPhraseSplit;
  };

  let phraseArray = getRandomPhraseAsArray(phrases);

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
};

createGameEnviroment();

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
    overlay.style.zIndex = "100";
    for (let i = 0; i < letters.length; i++) {
      letters[i].style.backgroundColor = "white";
    }
    phraseUl.style.transition = "background-color 5s ease;";

    phraseDiv.style.zIndex = "101";

    title.textContent = "Success!";
    title.style.marginTop = "250px";
    startGame.textContent = "Play again?";
    lastHeart = document.querySelector(".tries");
  } else if (missed === 4) {
    lastHeart = document.querySelector(".tries");
    lastHeart.style.transition = "transform .2s ease-in";
    lastHeart.style.transform = "scale(1.5)";
  } else if (missed >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    overlay.style.zIndex = "102";
    title.textContent = "I'm not angry... I'm just dissapointed.";
    startGame.textContent = "Try again?";
    title.style.marginTop = "100px";
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

// make new hearts
const makeNewHearts = () => {
  const scoreboard = document.querySelector("#scoreboard");
  const ol = scoreboard.firstElementChild;
  const li = ol.firstElementChild;
  const newHeart1 = document.createElement("li");
  newHeart1.style.marginRight = ".25em";
  const newHeart2 = document.createElement("li");
  newHeart2.style.marginRight = ".25em";
  const newHeart3 = document.createElement("li");
  newHeart3.style.marginRight = ".25em";
  const newHeart4 = document.createElement("li");
  newHeart4.style.marginRight = ".25em";
  const newHeart5 = document.createElement("li");

  newHeart1.innerHTML =
    '<img src="images/liveHeart.png" height="35px" width="30px">';
  newHeart1.className = "tries";

  newHeart2.innerHTML =
    '<img src="images/liveHeart.png" height="35px" width="30px">';
  newHeart2.className = "tries";

  newHeart3.innerHTML =
    '<img src="images/liveHeart.png" height="35px" width="30px">';
  newHeart3.className = "tries";

  newHeart4.innerHTML =
    '<img src="images/liveHeart.png" height="35px" width="30px">';
  newHeart4.className = "tries";

  newHeart5.innerHTML =
    '<img src="images/liveHeart.png" height="35px" width="30px">';
  newHeart5.className = "tries";

  ol.appendChild(newHeart1);
  ol.appendChild(newHeart2);
  ol.appendChild(newHeart3);
  ol.appendChild(newHeart4);
  ol.appendChild(newHeart5);
};

// reset game after win or lose

startGame.addEventListener("click", e => {
  if (
    e.target.innerText.toLowerCase() === "play again?" ||
    e.target.innerText.toLowerCase() === "try again?"
  ) {
    missed = 0;
    phraseUl.style.marginBottom = "10px";
    for (i = 0; i < button.length; i++) {
      button[i].classList.remove("choosen");
      button[i].removeAttribute("disabled");
      button[i].style.color = "black";
      button[i].style.backgroundColor = " var(--color-keys-light)";
    }

    while (phraseUl.firstChild) {
      phraseUl.removeChild(phraseUl.firstChild);
    }

    let ol = document.querySelector("ol");
    while (ol.firstChild) {
      ol.removeChild(ol.firstChild);
    }
    createGameEnviroment();
    makeNewHearts();
  }
});
