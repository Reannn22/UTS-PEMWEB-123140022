import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../utils/translations';
import AppLink from '../common/AppLink';

export default function NotFound() {
  const { isDark } = useTheme();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const t = translations[lang]?.notFound;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center px-4">
        <h1 className={`text-6xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t.title}
        </h1>
        <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t.message}
        </p>
        <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {t.redirecting} {countdown} {t.seconds}...
        </p>
        <AppLink
          to="/"
          className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors
            ${isDark 
              ? 'bg-cyan-600 text-white hover:bg-cyan-700' 
              : 'bg-cyan-500 text-white hover:bg-cyan-600'
            }`}
        >
          {t.goHome}
        </AppLink>
      </div>
    </div>
  );
}
