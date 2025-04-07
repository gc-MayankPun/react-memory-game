import React, { useContext, useEffect, useRef } from "react";
import "../../stylesheets/card.css";

import gsap from "gsap";
import { GameContext } from "../../context/gameContext";
import { playSound } from "../../utils/playSound.utils";

const Card = ({
  cardStyle,
  cardIndex,
  cardValue,
  cards,
  flippedCardIndexes,
  setFlippedCardIndexes,
  matchedCardIndexes,
  setMatchedCardIndexes,
  disableClick,
  setDisableClick,
  gameOver,
}) => {
  const cardRef = useRef(null);

  const { gameSettingsValue, setInitialGameSettings } = useContext(GameContext);
  const { currentDelay } = gameSettingsValue();

  // It the card is flipped or matched then it remains flipped
  const shouldFlip =
    flippedCardIndexes.includes(cardIndex) ||
    matchedCardIndexes.includes(cardIndex);

  useEffect(() => {
    gsap.to(cardRef.current, {
      rotateY: shouldFlip ? "180deg" : "0deg",
      duration: 0.8,
      ease: "power2.out",
    });
  }, [shouldFlip]);

  const handleCardClick = () => {
    // If Game is over then disable clicking
    if (gameOver) return;

    if (disableClick) return;

    // Play Card flipping sound
    playSound("Card Flip");

    // Checking if the card is already flipped or matched
    if (
      flippedCardIndexes.includes(cardIndex) ||
      matchedCardIndexes.includes(cardIndex)
    )
      return;

    // Storing clicked cards
    const newFlippedCardIndexes = [...flippedCardIndexes, cardIndex];
    setFlippedCardIndexes(newFlippedCardIndexes);

    // If two different cards are clicked
    if (newFlippedCardIndexes.length === 2) {
      // Making sure the user can't click thrice
      setDisableClick(true);

      // Decerementing moves after each moves
      setInitialGameSettings((prev) => ({
        ...prev,
        moves: prev.moves - 1,
      }));

      // Destructuring current and previous card index
      const [firstCardIndex, secondCardIndex] = newFlippedCardIndexes;

      // If both the cards are same then push it to matchCards
      if (cards[firstCardIndex] === cards[secondCardIndex]) {
        // Play Correct card match sound
        playSound("Correct Match");

        setMatchedCardIndexes([
          ...matchedCardIndexes,
          firstCardIndex,
          secondCardIndex,
        ]);

        // Incrementing score on every successful pair
        setInitialGameSettings((prev) => ({
          ...prev,
          score: prev.score + 1,
        }));

        // Emptying flippedCards and enabling clicking
        setTimeout(() => {
          setFlippedCardIndexes([]);
          setDisableClick(false);
        }, 500); // Giving small delay allowing for fast recovery
      } else {
        // Play Wrong card match sound
        playSound("Wrong Match");

        // Emptying flippedCards and enabling clicking
        setTimeout(() => {
          setFlippedCardIndexes([]);
          setDisableClick(false);
        }, currentDelay); // Custom delay based on the difficulty level
      }
    }
  };

  return (
    <div
      style={cardStyle}
      ref={cardRef}
      className="card"
      onClick={handleCardClick}
    >
      <div className="card-front">{cardValue}</div>
      <div className="card-back"></div>
    </div>
  );
};

export default Card;
