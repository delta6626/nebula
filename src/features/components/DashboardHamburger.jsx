import {
  XIcon,
  LayoutPanelTop,
  File,
  Book,
  Pin,
  Clock,
  Tag,
} from "lucide-react";
import UntaggedIcon from "../../assets/UntaggedIcon";
import { useDashboardHamburgerStore } from "../../store/dashboardHamburgerStore";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useHotkeys } from "react-hotkeys-hook";

function DashboardHamburger() {
  const { dashboardHamburgerOpen, setDashboardHamburgerOpen } =
    useDashboardHamburgerStore();

  function handleMenuClose() {
    setDashboardHamburgerOpen(false);
  }

  function handleLogoClick() {
    handleMenuClose();
  }

  function handleDashboardClick() {}

  function handleNotesClick() {}

  function handleNotebooksClick() {}

  function handlePinnedClick() {}

  function handleRecentClick() {}

  function handleTaggedClick() {}

  function handleUntaggedClick() {}

  useHotkeys("esc", handleMenuClose, {
    enableOnFormTags: false,
  });

  return (
    <div
      className={`absolute ${!dashboardHamburgerOpen ? "hidden" : ""} w-full z-10 h-90 bg-base-100 px-8 py-4`}
    >
      <div className="">
        <div className="flex items-center justify-between text-2xl font-bold gap-2">
          <Link
            className="flex items-center gap-2 text-xl font-jakarta font-bold text-center"
            to={"/home"}
            onClick={handleLogoClick}
          >
            <Logo />
            Nebula
          </Link>
          <button className="btn btn-square" onClick={handleMenuClose}>
            <XIcon />
          </button>
        </div>
        <div className="mt-4">
          <button
            className="flex mb-2 font-semibold"
            onClick={handleDashboardClick}
          >
            Dashboard
          </button>
          <button
            className="flex mb-2 font-semibold"
            onClick={handleNotesClick}
          >
            Notes
          </button>
          <button
            className="flex mb-2 font-semibold"
            onClick={handleNotebooksClick}
          >
            Notebooks
          </button>
          <button
            className="flex mb-2 font-semibold"
            onClick={handlePinnedClick}
          >
            Pinned
          </button>
          <button
            className="flex mb-2 font-semibold"
            onClick={handleRecentClick}
          >
            Recent
          </button>
          <button
            className="flex mb-2 font-semibold"
            onClick={handleTaggedClick}
          >
            Tagged
          </button>
          <button
            className="flex mb-2 font-semibold"
            onClick={handleUntaggedClick}
          >
            Untagged
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHamburger;
