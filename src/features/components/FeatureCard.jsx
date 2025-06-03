import { useRef } from "react";

function FeatureCard({ title, body, icon }) {
  const cardRef = useRef(null);

  function handleMouseMove() {}

  return (
    <div
      className="border-tracker-card bg-base-100 rounded-lg border-1 border-accent text-left"
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      <div className="p-10">
        <div className="w-fit p-2 border-1 border-accent rounded-lg">
          {icon}
        </div>
        <h1 className="mt-2 text-xl font-semibold">{title}</h1>
        <p className="mt-4 text-gray-400">{body}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
