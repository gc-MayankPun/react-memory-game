const flipSound = new Audio("/sounds/card-flip.mp3");
const correctMatchSound = new Audio("/sounds/correct-match.mp3");
const wrongMatchSound = new Audio("/sounds/wrong-match.mp3");
const applaudSound = new Audio("/sounds/applaud.mp3");
const defeatSound = new Audio("/sounds/defeat.mp3");

export const playSound = (soundType) => {
  switch (soundType) {
    case "Card Flip":
      flipSound.currentTime = 0;
      flipSound.play();
      break;
    case "Correct Match":
      correctMatchSound.currentTime = 0;
      setTimeout(() => {
        correctMatchSound.play();
      }, 300);
      break;
    case "Wrong Match":
      wrongMatchSound.currentTime = 0;
      setTimeout(() => {
        wrongMatchSound.play();
      }, 400);
      break;
    case "Congrats":
      applaudSound.currentTime = 0;
      setTimeout(() => {
        applaudSound.play();
      }, 200);
      break;
    case "Defeat":
      defeatSound.currentTime = 0;
      setTimeout(() => {
        defeatSound.play();
      }, 200);
      break;
    default:
      break;
  }
};
