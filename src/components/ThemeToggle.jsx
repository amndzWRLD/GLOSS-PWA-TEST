import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        flex items-center
        gap-2
        rounded-full
        border
        border-gray-300
        dark:border-dark-border
        bg-white
        dark:bg-dark-card
        px-3
        py-2
        transition-all
        duration-300
        hover:scale-105
      "
    >
      {theme === "dark" ? (
        <>
          <Moon size={18} />
          <span>{t('theme.dark')}</span>
        </>
      ) : (
        <>
          <Sun size={18} />
          <span>{t('theme.light')}</span>
        </>
      )}
    </button>
  );
}