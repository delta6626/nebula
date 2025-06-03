import { Link } from "react-router-dom";
import XIcon from "../../assets/XIcon";
import GithubIcon from "../../assets/GithubIcon";

function Footer() {
  return (
    <div className="w-full border-t-1 border-accent px-80 py-10 flex justify-between">
      <div className="flex flex-col gap-10">
        <Link className="text-xl font-jakarta font-bold" to={"/"}>
          Nebula
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
            className=""
            onClick={() => {
              const f = document.getElementById("features");
              f.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Features
          </Link>
          <Link
            className=""
            onClick={() => {
              const f = document.getElementById("faq");
              f.scrollIntoView({ behavior: "smooth" });
            }}
          >
            FAQ
          </Link>
          <Link className="" to={"https://ko-fi.com/hasan04"} target="_blank">
            Donate
          </Link>
          <Link
            className=""
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
          <Link className="" to={"/terms-of-service"}>
            Terms of Service
          </Link>
          <Link className="" to={"/privacy-policy"}>
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-jakarta font-bold">Contact</h1>
        <div className="flex flex-col gap-2 text-gray-400">
          <Link className="" to={"https://"} target="_blank">
            Developer site
          </Link>
          <Link
            className=""
            to={"mailto:hasan04.asm@gmail.com"}
            target="_blank"
          >
            Mail
          </Link>
          <Link className="" to={"https://x.com/delta6626"} target="_blank">
            X
          </Link>
          <Link
            className=""
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
