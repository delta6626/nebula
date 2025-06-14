import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";

function ThemeChanger() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute("data-theme", theme ?? localStorage.getItem("theme"));
  }, [theme]);

  function handleThemeChange() {
    if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      className="btn btn-square border-accent"
      onClick={handleThemeChange}
    >
      {theme == "light" ? (
        <Moon className=""></Moon>
      ) : theme == "dark" ? (
        <Sun></Sun>
      ) : (
        ""
      )}
    </button>
  );
}

export default ThemeChanger;
