import { XIcon } from "lucide-react";
import { useDashboardHamburgerStore } from "../../store/dashboardHamburgerStore";

function DashboardHamburger() {
  const { dashboardHamburgerOpen, setDashboardHamburgerOpen } =
    useDashboardHamburgerStore();

  function handleMenuClose() {
    setDashboardHamburgerOpen(false);
  }

  return (
    <div
      className={`absolute ${!dashboardHamburgerOpen ? "hidden" : ""} w-full z-10 h-90 bg-base-100 px-8 py-4`}
    >
      <div className="">
        <div className="flex items-center text-2xl font-bold gap-2">
          <button className="btn btn-square" onClick={handleMenuClose}>
            <XIcon />
          </button>
          Menu
        </div>
      </div>
    </div>
  );
}

export default DashboardHamburger;
