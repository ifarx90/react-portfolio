import { useState, useRef, useEffect } from 'react';

const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [shadow, setShadow] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Deteksi mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handler untuk desktop (mouse move)
  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posisi X mouse relatif ke card
    const y = e.clientY - rect.top; // posisi Y mouse relatif ke card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Hitung rotasi (maksimal 5 derajat)
    const rotateX = ((y - centerY) / centerY) * -5; // -5 sampai 5 derajat
    const rotateY = ((x - centerX) / centerX) * 5; // -5 sampai 5 derajat
    
    // Shadow effect - bergeser berlawanan arah mouse
    const shadowX = ((x - centerX) / centerX) * 20;
    const shadowY = ((y - centerY) / centerY) * 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setShadow(`${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.3)`);
  };

  // Handler untuk mouse leave - reset posisi
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShadow('0px 0px 30px rgba(0,0,0,0.2)');
  };

  // Handler untuk mobile (tap effect)
  const handleTapStart = () => {
    if (!isMobile) return;
    setIsTapped(true);
  };

  const handleTapEnd = () => {
    if (!isMobile) return;
    setIsTapped(false);
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTapStart}
      onTouchEnd={handleTapEnd}
      onTouchCancel={handleTapEnd}
      style={{
        transform: isMobile ? (isTapped ? 'scale(0.98)' : 'scale(1)') : transform,
        boxShadow: isMobile ? 'none' : shadow,
        transition: isMobile 
          ? 'transform 0.2s ease' 
          : 'transform 0.1s ease, box-shadow 0.1s ease',
        transformOrigin: 'center center',
        willChange: 'transform, box-shadow',
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;