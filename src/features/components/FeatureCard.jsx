function FeatureCard({ title, body, icon }) {
  return (
    <div className="rounded-lg border-1 border-accent text-left p-10">
      <div className="w-fit p-2 bg-base-200 border-1 border-accent rounded-lg">
        {icon}
      </div>
      <h1 className="mt-2 text-xl font-semibold">{title}</h1>
      <p className="mt-4 text-gray-400">{body}</p>
    </div>
  );
}

export default FeatureCard;
