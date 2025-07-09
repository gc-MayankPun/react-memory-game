import { useMemo, useEffect, useState } from "react";
import { generatePairedCards } from "../utils/generatePairedCards.utils";
import { shuffleArray } from "../utils/shuffleArray.utils";

export function useCards(theme, pairCount, resetTrigger) {
  // Pair generation
  const paired = useMemo(
    () => generatePairedCards(theme, pairCount),
    [theme, pairCount]
  );

  // Shuffled cards
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(shuffleArray(paired));
  }, [paired, resetTrigger]);

  return cards;
}
