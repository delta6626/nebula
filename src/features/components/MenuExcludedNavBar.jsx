import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";

function MenuExcludedNavBar() {
  return (
    <div className="font-jakarta bg-base-100 flex items-center justify-between py-5 px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80">
      <Link className="text-xl font-bold" to={"/"}>
        Nebula
      </Link>
      <ThemeChanger />
    </div>
  );
}

export default MenuExcludedNavBar;
