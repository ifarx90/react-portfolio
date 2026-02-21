import { useContext } from 'react';
import { HackerModeContext } from '../context/HackerModeContext';

export const useHackerMode = () => {
  const context = useContext(HackerModeContext);
  if (!context) {
    throw new Error('useHackerMode must be used within HackerModeProvider');
  }
  return context;
};