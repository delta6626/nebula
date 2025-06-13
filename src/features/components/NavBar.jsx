import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/Logo";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar font-jakarta bg-base-100 flex justify-between py-5 px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-50">
      <div className="">
        <Link className="flex items-center gap-2 text-xl font-bold" to={"/"}>
          <Logo />
          Nebula
        </Link>
      </div>
      {/* Desktop Links */}
      <div className="hidden md:flex">
        <Link
          to={"#features"}
          className="btn bg-transparent border-none hover:text-primary"
          onClick={() => {
            const f = document.getElementById("features");
            f.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Features
        </Link>
        <Link
          className="btn bg-transparent border-none hover:text-primary"
          to={"https://ko-fi.com/hasan04"}
          target="_blank"
        >
          Donate
        </Link>
        <Link
          to={"#faq"}
          className="btn bg-transparent border-none hover:text-primary"
          onClick={() => {
            const f = document.getElementById("faq");
            f.scrollIntoView({ behavior: "smooth" });
          }}
        >
          FAQ
        </Link>
        <Link
          className="btn bg-transparent border-none hover:text-primary"
          to={"/login"}
        >
          Log In
        </Link>
        <Link className="btn btn-primary border-none mx-2" to={"/signup"}>
          Sign Up
        </Link>
        <ThemeChanger></ThemeChanger>
      </div>

      {/* Mobile hamburger menu */}
      <div
        className="btn btn-square md:hidden"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? <X /> : <Menu />}
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-full bg-base-100 py-5 px-10 z-10 flex justify-between">
          <div className="flex justify-center flex-col w-fit gap-5">
            <Link
              className="text-xl font-bold"
              to={"/"}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              Nebula
            </Link>

            <Link
              className="text-xl hover:text-primary"
              onClick={() => {
                setMenuOpen(false);
                const f = document.getElementById("features");
                f.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Features
            </Link>
            <Link
              className="text-xl hover:text-primary"
              to={"https://ko-fi.com/hasan04"}
              target="_blank"
            >
              Donate
            </Link>
            <Link
              className="text-xl hover:text-primary"
              onClick={() => {
                setMenuOpen(false);
                const f = document.getElementById("faq");
                f.scrollIntoView({ behavior: "smooth" });
              }}
            >
              FAQ
            </Link>
            <Link className="text-xl hover:text-primary" to={"/login"}>
              Log In
            </Link>
            <Link className="text-xl hover:text-primary" to={"/signup"}>
              Sign Up
            </Link>
            <p className="flex items-center gap-2">
              Theme <ThemeChanger />
            </p>
          </div>
          <div
            className="btn btn-square"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
