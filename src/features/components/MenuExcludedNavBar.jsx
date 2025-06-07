import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
import Logo from "../../assets/Logo";

function MenuExcludedNavBar() {
  return (
    <div className="font-jakarta bg-base-100 flex items-center justify-between py-5 px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-50">
      <Link className="flex items-center gap-2 text-xl font-bold" to={"/"}>
        <Logo />
        Nebula
      </Link>
      <ThemeChanger />
    </div>
  );
}

export default MenuExcludedNavBar;
