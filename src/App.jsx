import React, { useLayoutEffect, useRef, useState } from "react";
import HomeScreen from "./components/Layout/HomeScreen";
import GameScreen from "./components/Layout/GameScreen";
import { GameProvider } from "./context/gameContext";

import gsap from "gsap";

const App = () => {
  const [start, setStart] = useState(false);
  const screenRef = useRef(null);

  const toggleGameScreen = () => {
    gsap.to(screenRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      duration: 0.5,
      onComplete: () => {
        setStart((prev) => !prev);
      },
    });
  };
  
  useLayoutEffect(() => {
    gsap.to(screenRef.current, {
      opacity: 1,
      ease: "power2.inOut",
      duration: 0.5,
    });
  }, [start]);

  return (
    <GameProvider>
      <div ref={screenRef} className="screen">
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
