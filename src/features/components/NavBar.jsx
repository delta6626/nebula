import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";

function NavBar() {
  return (
    <div className="navbar bg-base-100 flex justify-between px-80 py-5">
      <div className="">
        <Link className="text-xl font-jakarta font-bold" to={"/"}>
          Nebula
        </Link>
      </div>
      <div className="">
        <Link className="btn bg-transparent border-none" to={"/#features"}>
          Features
        </Link>
        <Link className="btn bg-transparent border-none" to={"/#about"}>
          About
        </Link>
        <Link className="btn bg-transparent border-none" to={"/#contact"}>
          Contact
        </Link>
        <Link className="btn bg-transparent border-none" to={"/login"}>
          Log In
        </Link>
        <Link className="btn btn-primary border-none mx-2" to={"/signup"}>
          Sign Up
        </Link>
        <ThemeChanger></ThemeChanger>
      </div>
    </div>
  );
}

export default NavBar;
