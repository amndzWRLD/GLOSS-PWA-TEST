import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
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
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun size={18} />
          <span>Light</span>
        </>
      )}
    </button>
  );
}