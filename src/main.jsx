import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";

import "remixicon/fonts/remixicon.css";
import Footer from "./components/Footer.jsx";
import PreLoader from "./PreLoader.jsx";

import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { HackerModeProvider } from "./context/HackerModeContext";
import HackerModeStyles from "./components/HackerModeStyles";
import EasterEggTrigger from "./components/EasterEggTrigger";

AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HackerModeProvider>
      <EasterEggTrigger>
        <PreLoader />
        <HackerModeStyles>
          <div className="container mx-auto px-4">
            <Navbar />
            <App />
            <Footer />
          </div>
        </HackerModeStyles>
      </EasterEggTrigger>
    </HackerModeProvider>
  </StrictMode>,
);