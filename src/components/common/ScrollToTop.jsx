import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import chevronUp from "../../assets/icons/chevron-up.svg";

const ScrollToTop = () => {
  const { isDark } = useTheme();
  const [bottomPosition, setBottomPosition] = useState("2rem");

  useEffect(() => {
    const checkFooter = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const scrollButton = document.querySelector("#scroll-to-top");

        if (scrollButton) {
          const buttonHeight = scrollButton.offsetHeight;
          const buttonBottom = 32; // 2rem in pixels

          if (footerTop < windowHeight) {
            const newBottom = windowHeight - footerTop + buttonBottom;
            setBottomPosition(`${newBottom}px`);
          } else {
            setBottomPosition("2rem");
          }
        }
      }
    };

    window.addEventListener("scroll", checkFooter);
    window.addEventListener("resize", checkFooter);

    // Initial check
    checkFooter();

    return () => {
      window.removeEventListener("scroll", checkFooter);
      window.removeEventListener("resize", checkFooter);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="scroll-to-top"
      onClick={scrollToTop}
      style={{ bottom: bottomPosition }}
      className={`fixed right-8 p-3 rounded-full shadow-lg z-50 ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
          : "bg-white hover:bg-gray-100 text-gray-600"
      }`}
      aria-label="Scroll to top"
    >
      <img
        src={chevronUp}
        alt="Scroll to top"
        className={`w-6 h-6 ${isDark ? "filter invert" : ""}`}
      />
    </button>
  );
};

export default ScrollToTop;
