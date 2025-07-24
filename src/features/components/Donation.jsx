import { DollarSign, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

function Donation() {
  return (
    <div className="bg-transparent border-1 border-accent mt-4 md:w-full lg:w-70 2xl:w-90 mx-auto rounded-lg p-4">
      <div className="flex justify-between text-secondary">
        <h1 className="flex items-center gap-2 font-semibold">
          <DollarSign />
          Support Nebula
        </h1>
      </div>
      <div className="mt-4">
        <p className="">
          Nebula is free and open source but it does cost to run. Support if you
          can.
        </p>
        <Link
          className="btn mt-2"
          target="_blank"
          to={"https://ko-fi.com/hasan04"}
        >
          Donate <HeartHandshake size={20} />
        </Link>
      </div>
    </div>
  );
}

export default Donation;
