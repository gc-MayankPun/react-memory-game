import { setHighScore } from "./localStorage.utils";

const difficultyEasterEggs = {
  Easy: { perfect: "🧠", near: "🎖️" },
  Med: { perfect: "🤔", near: "🎖️🎖️" },
  Hard: { perfect: "🤖", near: "🫡" },
};

const easterEggMovesLeft = {
  Easy: 14,
  Med: 23,
  Hard: 27,
};

export function saveHighScore(difficulty, score, currentHighScore, movesLeft, totalPairs) {
  if (score > currentHighScore) {
    setHighScore(difficulty, score);
  }

  const isPerfect = score === totalPairs;
  const isNearPerfect = movesLeft >= easterEggMovesLeft[difficulty];

  const easterKey = `easter_egg_${difficulty}`;

  if (isPerfect) {
    localStorage.setItem(easterKey, difficultyEasterEggs[difficulty].perfect);
  } else if (isNearPerfect) {
    localStorage.setItem(easterKey, difficultyEasterEggs[difficulty].near);
  } else {
    localStorage.removeItem(easterKey);
  }
}
