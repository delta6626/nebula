import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function ResourceNotFound() {
  return (
    <div className="font-jakarta w-screen min-h-screen flex flex-col">
      <NavBar />
      <div
        className="px-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              flex flex-col items-center justify-center gap-8 sm:gap-10 lg:flex-row 
              min-w-[250px] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-[800px]"
      >
        <h1 className="font-extrabold text-9xl">404</h1>
        <div className="text-left text-2xl">
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
