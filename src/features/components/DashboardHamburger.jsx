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
import { useActiveTabStore } from "../../store/activeTabStore";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import { useHotkeys } from "react-hotkeys-hook";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function DashboardHamburger() {
  const { dashboardHamburgerOpen, setDashboardHamburgerOpen } =
    useDashboardHamburgerStore();
  const { setActiveTab } = useActiveTabStore();

  function handleMenuClose() {
    setDashboardHamburgerOpen(false);
  }

  function handleLogoClick() {
    handleMenuClose();
  }

  function handleDashboardClick() {
    setActiveTab(APP_CONSTANTS.DASHBOARD_PAGE);
    handleMenuClose();
  }

  function handleNotesClick() {
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
    handleMenuClose();
  }

  function handleNotebooksClick() {
    setActiveTab(APP_CONSTANTS.NOTEBOOKS_PAGE);
    handleMenuClose();
  }

  function handlePinnedClick() {
    setActiveTab(APP_CONSTANTS.PINNED_ITEMS);
    handleMenuClose();
  }

  function handleRecentClick() {
    setActiveTab(APP_CONSTANTS.RECENT_ITEMS);
    handleMenuClose();
  }

  function handleTaggedClick() {
    setActiveTab(APP_CONSTANTS.TAGGED_ITEMS);
    handleMenuClose();
  }

  function handleUntaggedClick() {
    setActiveTab(APP_CONSTANTS.UNTAGGED_ITEMS);
    handleMenuClose();
  }

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
