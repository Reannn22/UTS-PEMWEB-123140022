import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import logoImage from "../../assets/images/logo/CryptoTracker.png";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";
import { useLocation } from "react-router-dom";
import AppLink from "../common/AppLink";

// Logo component matching header style
function Logo({ isDark }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8">
        <img
          src={logoImage}
          alt="CryptoTracker"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-xl font-bold">
        <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>
          Crypto
        </span>
        <span className={isDark ? "text-cyan-400" : "text-cyan-600"}>
          Tracker
        </span>
      </div>
    </div>
  );
}

const SocialIcon = ({ href, icon, label }) => {
  const { isDark } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isDark
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      aria-label={label}
    >
      {icon}
    </a>
  );
};

const Footer = ({ authorName = "Reyhan Capri Moraga", nim = "123140022" }) => {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const location = useLocation();
  const t = translations[lang]?.footer || {};

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  const resourceLinks = [
    { to: "/", text: t.resources.home },
    { to: "/cryptocurrencylist", text: t.resources.cryptoList },
    { to: "/portfoliocalculator", text: t.resources.portfolio },
  ];

  const companyLinks = [
    { to: "/about", text: t.company.about },
    { to: "/contact", text: t.company.contact },
    { to: "/privacy", text: t.company.privacy },
    { to: "/terms", text: t.company.terms },
  ];

  return (
    <footer
      className={`
        relative mt-auto py-12 
        before:absolute before:inset-x-0 before:top-0 before:h-8
        before:bg-gradient-to-b before:from-cyan-500/20 before:to-transparent
        ${
          isDark
            ? "bg-black shadow-[0_-1px_15px_rgb(0,0,0,0.4)]"
            : "bg-white shadow-[0_-1px_15px_rgb(0,0,0,0.1)]"
        }
      `}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="md:pr-8">
            <Logo isDark={isDark} />
            <p
              className={`mt-4 text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.about.description}
            </p>
          </div>

          {/* Resources Section */}
          <div className="md:px-4">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.resources.title}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map(({ to, text }) => (
                <li key={text}>
                  <AppLink
                    to={to}
                    className={`text-sm ${
                      isDark
                        ? isActive(to)
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                        : isActive(to)
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {text}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="md:px-4">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.company.title}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map(({ to, text }) => (
                <li key={text}>
                  <AppLink
                    to={to}
                    className={`text-sm ${
                      isDark
                        ? isActive(to)
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                        : isActive(to)
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {text}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="md:pl-8">
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.connect}
            </h3>
            <div className="flex space-x-4 mb-6">
              <SocialIcon
                href="https://github.com/Reannn22"
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
                label="GitHub"
              />
              <SocialIcon
                href="https://www.linkedin.com/in/reyhancm/"
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
                label="LinkedIn"
              />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className={`my-8 h-px ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
        />

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="text-sm text-gray-500">
            {t.copyright}{" "}
            <a
              href="https://github.com/Reannn22"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-700 hover:text-gray-900"
            >
              {authorName}
            </a>
            , {nim}
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className={`text-sm ${
                isDark ? "text-gray-400 hover:text-white" : "text-gray-600"
              }`}
            >
              {t.privacy}
            </a>
            <a
              href="#"
              className={`text-sm ${
                isDark ? "text-gray-400 hover:text-white" : "text-gray-600"
              }`}
            >
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  authorName: PropTypes.string,
  nim: PropTypes.string,
};

export default Footer;
