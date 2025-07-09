import { setHighScore } from "./localStorage.utils";

export function saveHighScore(difficulty, score, currentHighScore) {
  if (score > currentHighScore) {
    setHighScore(difficulty, score);
  }
}