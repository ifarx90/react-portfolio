import { useState, useEffect, useRef } from "react";
import { useHackerMode } from "../hooks/useHackerMode";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { toggleHackerMode } = useHackerMode();
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTitleClick = () => {
    // Hanya aktif di mobile (max-width: 768px)
    if (window.innerWidth > 768) return;
    
    clickCount.current += 1;
    
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }
    
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1000);
    
    if (clickCount.current === 5) {
      toggleHackerMode();
      clickCount.current = 0;
      clearTimeout(clickTimer.current);
    }
  };

  return (
    <div className="navbar py-7 flex items-center justify-between">
      <div className="logo">
        <h1 
          className="text-3xl font-bold bg-transparent text-white cursor-pointer" 
          onClick={handleTitleClick}
        >
          Portfolio <i class="ri-emotion-line"></i>
        </h1>
      </div>
      <ul
        className={`menu flex items-center sm:gap-10 gap-4 md:static fixed left-1/2 -translate-x-1/2 md:translate-x-0 md:opacity-100 bg-white/30 backdrop-blur-md p-4 rounded-br-2xl rounded-bl-2xl md:bg-transparent transition-all md:transition-none z-40  ${active ? "top-0 opacity-100" : "-top-10 opacity-0"}`}
      >
        <li>
          <a href="#beranda" className="sm:text-lg font-medium">
            Beranda
          </a>
        </li>
        <li>
          <a href="#tentang" className="sm:text-lg text-base font-medium">
            Tentang
          </a>
        </li>
        <li>
          <a href="#proyek" className="sm:text-lg text-base font-medium">
            Proyek
          </a>
        </li>
        <li>
          <a href="#kontak" className="sm:text-lg text-base font-medium">
            Kontak
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;