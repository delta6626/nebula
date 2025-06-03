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
    </div>
  );
}

export default NavBar;
