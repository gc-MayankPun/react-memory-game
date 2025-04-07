export const getHighScore = (difficulty) => {
  return parseInt(
    localStorage.getItem(`memorygame_highScore_${difficulty}`) || 0
  );
};

export const setHighScore = (difficulty, score) => {
  localStorage.setItem(`memorygame_highScore_${difficulty}`, score);
};
