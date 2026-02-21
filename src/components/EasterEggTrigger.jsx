import { useEffect, useRef } from 'react';
import { useHackerMode } from '../hooks/useHackerMode';

const EasterEggTrigger = ({ children }) => {
  const { toggleHackerMode } = useHackerMode();
  const keyBuffer = useRef('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      keyBuffer.current += e.key.toLowerCase();
      
      if (keyBuffer.current.length > 5) {
        keyBuffer.current = keyBuffer.current.slice(-5);
      }
      
      if (keyBuffer.current === 'rafii') {
        toggleHackerMode();
        keyBuffer.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleHackerMode]);

  return <>{children}</>;
};

export default EasterEggTrigger;