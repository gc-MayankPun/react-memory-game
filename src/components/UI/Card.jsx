import { useContext, useEffect, useRef } from "react";
import "../../stylesheets/card.css";

import gsap from "gsap";
import { GameContext } from "../../context/gameContext";
import { playSound } from "../../utils/playSound.utils";

// Card component: represents each individual memory card
const Card = ({
  cardStyle, // CSS styles for the card
  cardIndex, // Index of this card in the card array
  cardValue, // Actual value/icon of the card
  cards, // Full array of cards
  flippedCardIndexes, // Currently flipped cards
  setFlippedCardIndexes, // Function to update flipped cards
  matchedCardIndexes, // Cards that have been matched
  setMatchedCardIndexes, // Function to update matched cards
  disableClick, // Boolean to prevent clicks during animations
  setDisableClick, // Function to toggle click blocking
}) => {
  // Ref to animate this card
  const cardRef = useRef(null);

  // Access game context for delay and score/moves logic
  const { gameSettingsValue, setInitialGameSettings } = useContext(GameContext);
  const { currentDelay } = gameSettingsValue();

  // Determine whether the card should be flipped (either matched or clicked)
  const shouldFlip =
    flippedCardIndexes.includes(cardIndex) ||
    matchedCardIndexes.includes(cardIndex);

  // Animate flip using GSAP when `shouldFlip` changes
  useEffect(() => {
    gsap.to(cardRef.current, {
      rotateY: shouldFlip ? "180deg" : "0deg",
      duration: 0.8,
      ease: "power2.out",
    });
  }, [shouldFlip]);

  // Handles logic when the card is clicked
  const handleCardClick = () => {
    // Prevent click if it's currently disabled (e.g., during matching animation)
    if (disableClick) return;

    // Play flip sound
    playSound("Card Flip");

    // Prevent re-clicking the same card or an already matched card
    if (
      flippedCardIndexes.includes(cardIndex) ||
      matchedCardIndexes.includes(cardIndex)
    )
      return;

    // Add this card to the flipped cards array
    const newFlippedCardIndexes = [...flippedCardIndexes, cardIndex];
    setFlippedCardIndexes(newFlippedCardIndexes);

    // If this is the second card flipped
    if (newFlippedCardIndexes.length === 2) {
      // Block further clicking until check is resolved
      setDisableClick(true);

      // Decrease the remaining moves
      setInitialGameSettings((prev) => ({
        ...prev,
        moves: prev.moves - 1,
      }));

      // Extract the two flipped card indexes
      const [firstCardIndex, secondCardIndex] = newFlippedCardIndexes;

      // Check if both flipped cards are a match
      if (cards[firstCardIndex] === cards[secondCardIndex]) {
        // Play success sound
        playSound("Correct Match");

        // Mark both cards as matched
        setMatchedCardIndexes([
          ...matchedCardIndexes,
          firstCardIndex,
          secondCardIndex,
        ]);

        // Increase score for a successful match
        setInitialGameSettings((prev) => ({
          ...prev,
          score: prev.score + 1,
        }));

        // Reset flipped cards and re-enable clicking after a short delay
        setTimeout(() => {
          setFlippedCardIndexes([]);
          setDisableClick(false);
        }, 500); // fast feedback for correct match
      } else {
        // Play wrong match sound
        playSound("Wrong Match");

        // Wait for some time before resetting flip (based on difficulty)
        setTimeout(() => {
          setFlippedCardIndexes([]);
          setDisableClick(false);
        }, currentDelay);
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
      {/* Card front: shows icon/value when flipped */}
      <div className="card-front">{cardValue}</div>

      {/* Card back: visible when card is not flipped */}
      <div className="card-back"></div>
    </div>
  );
};

export default Card;
