import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function ResourceNotFound() {
  return (
    <div className="font-jakarta min-h-screen flex flex-col">
      <NavBar />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-10 items-center justify-center">
        <h1 className="font-extrabold mb-6 text-9xl">404</h1>
        <div className="text-left max-w-xl text-2xl">
          <p>
            Well, this is awkward. The page you’re looking for isn’t here
            anymore—or maybe it never was. Try checking the URL, or head back
            home to find what you need.
          </p>
          <Link className="btn btn-primary mt-4" to={"/"}>
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResourceNotFound;
