import { useMemo } from "react";
import { generatePairedCards } from "../utils/generatePairedCards.utils";
import { shuffleArray } from "../utils/shuffleArray.utils";

export function useCards(theme, pairCount) {
  const cards = useMemo(() => {
    const pairs = generatePairedCards(theme, pairCount);
    return shuffleArray(pairs);
  }, [theme, pairCount]); // ✅ Only shuffle on game config change

  return cards;
}
