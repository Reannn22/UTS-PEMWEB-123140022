import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function AppLink({
  to,
  children,
  className,
  preserveParams = true,
}) {
  if (!preserveParams) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // Get current URL parameters
  const params = new URLSearchParams(window.location.search);
  const currentLang =
    params.get("lang") || localStorage.getItem("lang") || "en";
  const currentTheme =
    params.get("theme") || localStorage.getItem("theme") || "light";

  // Handle coin routes
  const isCoinRoute = to.startsWith("/coin/");
  const baseUrl = isCoinRoute ? to : to.split("?")[0];

  // Construct new URL with parameters
  const newUrl = `${baseUrl}?lang=${currentLang}&theme=${currentTheme}`;

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
  preserveParams: PropTypes.bool,
};
