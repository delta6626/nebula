import { Link } from "react-router-dom";
import XIcon from "../../assets/XIcon";
import GithubIcon from "../../assets/GithubIcon";
import Logo from "../../assets/Logo";

function Footer() {
  return (
    <div className="w-full border-t-1 border-accent py-10 px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-50 flex flex-wrap justify-between gap-15">
      <div className="flex flex-col gap-10">
        <Link
          className="flex items-center gap-2 text-xl font-jakarta font-bold"
          to={"/"}
        >
          <Logo /> Nebula
        </Link>
        <p className="text-gray-400">
          Built for thinkers, dreamers, <br />
          and doers.
        </p>
        <div className="flex gap-4">
          <Link to={"https://github.com/delta6626/"} target="_blank">
            <GithubIcon />
          </Link>
          <Link to={"https://x.com/delta6626"} target="_blank">
            <XIcon />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-jakarta font-bold">Product</h1>
        <div className="flex flex-col gap-2 text-gray-400">
          <Link
            to={"#features"}
            className="hover:text-primary"
            onClick={() => {
              const f = document.getElementById("features");
              f.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </Link>
          <Link
            className="hover:text-primary"
            to={"#faq"}
            onClick={() => {
              const f = document.getElementById("faq");
              f.scrollIntoView({ behavior: "smooth" });
            }}
          >
            FAQ
          </Link>
          <Link
            className="hover:text-primary"
            to={"https://ko-fi.com/hasan04"}
            target="_blank"
          >
            Donate
          </Link>
          <Link
            className="hover:text-primary"
            to={"https://github.com/delta6626/nebula"}
            target="_blank"
          >
            Source code
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-jakarta font-bold">Legal</h1>
        <div className="flex flex-col gap-2 text-gray-400">
          <Link className="hover:text-primary" to={"/terms-of-service"}>
            Terms of Service
          </Link>
          <Link className="hover:text-primary" to={"/privacy-policy"}>
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-jakarta font-bold">Contact</h1>
        <div className="flex flex-col gap-2 text-gray-400">
          <Link className="hover:text-primary" to={"https://"} target="_blank">
            Developer site
          </Link>
          <Link
            className="hover:text-primary"
            to={"mailto:hasan04.asm@gmail.com"}
            target="_blank"
          >
            Mail
          </Link>
          <Link
            className="hover:text-primary"
            to={"https://x.com/delta6626"}
            target="_blank"
          >
            X
          </Link>
          <Link
            className="hover:text-primary"
            to={"https://github.com/delta6626"}
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
