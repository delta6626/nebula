import NavBar from "../components/NavBar";

function ResourceNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow flex gap-10 items-center justify-center px-6 md:px-20 lg:px-32 xl:px-40 2xl:px-50 text-center font-jakarta">
        <h1 className="font-extrabold mb-6 text-9xl">404</h1>
        <p className="text-left max-w-xl text-2xl">
          Well, this is awkward. The page you’re looking for isn’t here
          anymore—or maybe it never was. Try checking the URL, or head back home
          to find what you need.
        </p>
      </div>
    </div>
  );
}

export default ResourceNotFound;
