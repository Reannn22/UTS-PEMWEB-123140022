import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import logoImage from "../../assets/images/logo/CryptoTracker.png";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations"; // Adjust the path as necessary
import { Link, useLocation } from "react-router-dom";
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
    { to: "/portfolio", text: t.resources.portfolio },
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
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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
            <p
              className={`text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {t.created} {authorName}{" "}
              <span className="opacity-75">({nim})</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`mt-12 pt-8 border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          } text-center`}
        >
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            &copy; {new Date().getFullYear()} CryptoTracker. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

// PropTypes
Logo.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

SocialIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

Footer.propTypes = {
  authorName: PropTypes.string,
  nim: PropTypes.string,
};

export default Footer;
