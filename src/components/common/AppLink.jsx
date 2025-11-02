import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AppLink({ to, children, className }) {
  // Get current URL parameters
  const params = new URLSearchParams(window.location.search);
  const currentLang =
    params.get("lang") || localStorage.getItem("lang") || "en";
  const currentTheme =
    params.get("theme") || localStorage.getItem("theme") || "light";

  // Construct new URL with parameters
  const newUrl = `${to}?lang=${currentLang}&theme=${currentTheme}`;

  return (
    <Link to={newUrl} className={className}>
      {children}
    </Link>
  );
}

AppLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
