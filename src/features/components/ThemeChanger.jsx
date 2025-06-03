import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";

function ThemeChanger() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute("data-theme", theme);
  }, [theme]);

  function handleThemeChange() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <button className="btn border-accent" onClick={handleThemeChange}>
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
