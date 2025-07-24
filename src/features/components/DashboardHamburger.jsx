import {
  XIcon,
  LayoutPanelTop,
  File,
  Book,
  Pin,
  Clock,
  Tag,
  Settings,
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

  function handleSettingsClick() {
    setActiveTab(APP_CONSTANTS.SETTINGS_PAGE);
    handleMenuClose();
  }

  useHotkeys("esc", handleMenuClose, {
    enableOnFormTags: false,
  });

  return (
    <div
      className={`absolute ${!dashboardHamburgerOpen ? "hidden" : ""} w-full z-10 bg-base-100 px-8 py-4`}
    >
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
      <div className="divider"></div>
      <div className="grid grid-cols-2 place-items-start mt-4">
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleDashboardClick}
        >
          <LayoutPanelTop />
          Dashboard
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleNotesClick}
        >
          <File />
          Notes
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleNotebooksClick}
        >
          <Book />
          Notebooks
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handlePinnedClick}
        >
          <Pin />
          Pinned
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleRecentClick}
        >
          <Clock />
          Recent
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleTaggedClick}
        >
          <Tag />
          Tagged
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleUntaggedClick}
        >
          <UntaggedIcon />
          Untagged
        </button>
        <button
          className="flex gap-2 mb-4 font-semibold cursor-pointer "
          onClick={handleSettingsClick}
        >
          <Settings />
          Settings
        </button>
      </div>
    </div>
  );
}

export default DashboardHamburger;
