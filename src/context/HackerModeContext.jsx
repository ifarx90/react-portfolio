/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const HackerModeContext = createContext();

export const HackerModeProvider = ({ children }) => {
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const playBeepSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext())();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = "sine";
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log("Audio tidak bisa diputar:", error);
    }
  };

  const toggleHackerMode = () => {
    setFlicker(true);
    playBeepSound();
    setShowMessage(true);

    setTimeout(() => {
      setIsHackerMode((prev) => !prev);
    }, 150);

    setTimeout(() => {
      setFlicker(false);
    }, 300);

    setTimeout(() => {
      setShowMessage(false);
    }, 2500);
  };

  return (
    <HackerModeContext.Provider
      value={{
        isHackerMode,
        toggleHackerMode,
        showMessage,
        flicker,
      }}
    >
      {children}
    </HackerModeContext.Provider>
  );
};
