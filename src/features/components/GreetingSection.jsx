import { useUserStore } from "../../store/userStore";
import { greet } from "../../utils/greet";

function GreetingSection() {
  const { user } = useUserStore();

  return (
    <div className="text-xl font-semibold">{greet() + ", " + user?.name}</div>
  );
}

export default GreetingSection;
