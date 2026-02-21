import { useHackerMode } from '../hooks/useHackerMode';

const HackerModeStyles = ({ children }) => {
  const { isHackerMode, flicker, showMessage } = useHackerMode();

  return (
    <>
      {flicker && (
        <div
          className="fixed inset-0 bg-black z-50 pointer-events-none"
          style={{
            animation: 'flicker 0.3s ease-in-out'
          }}
        />
      )}

      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className="bg-black/90 text-green-400 p-8 rounded-lg font-mono text-center border border-green-500"
            style={{
              animation: 'fadeInOut 2.5s ease-in-out forwards',
              boxShadow: '0 0 20px rgba(0,255,0,0.3)'
            }}
          >
            <p className="text-2xl mb-2">Access Granted...</p>
            <p className="text-xl">Welcome Rafii 🤡</p>
          </div>
        </div>
      )}

      <div className={isHackerMode ? 'hacker-mode' : ''}>
        {children}
      </div>

      {/* Perbaikan: Gunakan <style> tanpa atribut jsx */}
      <style>
        {`
          @keyframes flicker {
            0% { opacity: 0; }
            50% { opacity: 0.9; }
            100% { opacity: 0; }
          }
          
          @keyframes fadeInOut {
            0% { opacity: 0; transform: scale(0.9); }
            10% { opacity: 1; transform: scale(1); }
            80% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.9); }
          }
        `}
      </style>
    </>
  );
};

export default HackerModeStyles;