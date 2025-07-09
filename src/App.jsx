import { useLayoutEffect, useRef, useState } from "react";
import HomeScreen from "./components/Layout/HomeScreen"; // Home page UI
import GameScreen from "./components/Layout/GameScreen"; // Main gameplay UI
import { GameProvider } from "./context/gameContext"; // Global game state provider

import gsap from "gsap"; // Animation library for transitions

const App = () => {
  const [start, setStart] = useState(false); // Controls whether to show Home or Game screen
  const screenRef = useRef(null); // Ref to the main screen wrapper (used for animation)

  // Handles toggling between HomeScreen and GameScreen with animation
  const toggleGameScreen = () => {
    gsap.to(screenRef.current, {
      opacity: 0, // Fade out the screen
      ease: "power2.inOut",
      duration: 0.5,
      onComplete: () => {
        // Once fade out completes, toggle the screen
        setStart((prev) => !prev);
      },
    });
  };

  // When the screen changes (Home ↔ Game), animate the fade in
  useLayoutEffect(() => {
    gsap.to(screenRef.current, {
      opacity: 1, // Fade in the screen
      ease: "power2.inOut",
      duration: 0.5,
    });
  }, [start]);

  return (
    // Wrap everything with GameProvider to share global state/context
    <GameProvider>
      <div ref={screenRef} className="screen">
        {/* Show HomeScreen if game hasn't started; else show GameScreen */}
        {!start ? (
          <HomeScreen toggleGameScreen={toggleGameScreen} />
        ) : (
          <GameScreen toggleGameScreen={toggleGameScreen} />
        )}
      </div>
    </GameProvider>
  );
};

export default App;
