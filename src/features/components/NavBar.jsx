import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 flex justify-between py-5 px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80">
      <div className="">
        <Link className="text-xl font-jakarta font-bold" to={"/"}>
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
        <div className="md:hidden absolute top-20 left-0 w-full h-full bg-base-100 py-5 px-5 sm:px-10 z-10">
          <div className="flex flex-col gap-5">
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
            <Link className="text-xl btn btn-primary" to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
