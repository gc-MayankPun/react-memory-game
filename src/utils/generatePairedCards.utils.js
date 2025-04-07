import baseEmojis from "../api/foods.json";
import baseFoods from "../api/foods.json";
import baseSpace from "../api/space.json";

export const generatePairedCards = (theme, pairCount) => {
  let pairedCards;
  let stackedCards;

  switch (theme) {
    case "Emojis":
      stackedCards = [...baseEmojis].slice(0, pairCount);
      pairedCards = [...stackedCards, ...stackedCards];
      break;
    case "Foods":
      stackedCards = [...baseFoods].slice(0, pairCount);
      pairedCards = [...stackedCards, ...stackedCards];
      break;
    case "Space":
      stackedCards = [...baseSpace].slice(0, pairCount);
      pairedCards = [...stackedCards, ...stackedCards];
      break;
  }

  pairedCards = [...stackedCards, ...stackedCards];
  return pairedCards;
};
