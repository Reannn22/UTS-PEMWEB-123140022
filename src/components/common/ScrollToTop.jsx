import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import chevronUp from "../../assets/icons/chevron-up.svg";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled 100px
      setIsVisible(window.scrollY > 100);

      // Check if we're near footer
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsNearFooter(footerTop - windowHeight < 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed right-6 p-2 rounded-full shadow-lg transition-all duration-300 z-50
        ${
          isDark
            ? "bg-gray-800/80 hover:bg-gray-700/80"
            : "bg-white/80 hover:bg-gray-50/80"
        }
        ${
          !isVisible
            ? "opacity-0 pointer-events-none translate-y-4"
            : "opacity-100"
        }
        ${isNearFooter ? "bottom-24" : "bottom-6"}
        backdrop-blur-sm
      `}
      aria-label="Scroll to top"
    >
      <img src={chevronUp} alt="Scroll to top" className="w-6 h-6" />
    </button>
  );
}
