import { MenuIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useMessageStore } from "../../store/messageStore";
import { useDashboardHamburgerStore } from "../../store/dashboardHamburgerStore";
import CreateNotebookModal from "../components/CreateNotebookModal";
import CreateNoteModal from "../components/CreateNoteModal";
import DigitalClock from "../components/DigitalClock";
import Donation from "../components/Donation";
import EditNotebookModal from "../components/EditNotebookModal";
import EditNoteModal from "../components/EditNoteModal";
import GenericModal from "../components/GenericModal";
import GreetingSection from "../components/GreetingSection";
import NoteEditor from "../components/NoteEditor";
import PinnedNotes from "../components/PinnedNotes";
import QuickActions from "../components/QuickActions";
import Quote from "../components/Quote";
import UserStatistics from "../components/UserStatistics";
import ViewSwitcher from "../components/ViewSwitcher";

function DashboardArea() {
  const { message } = useMessageStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { setDashboardHamburgerOpen } = useDashboardHamburgerStore();

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleMenuOpen() {
    setDashboardHamburgerOpen(true);
  }

  // These functions were moved to the dashboard page

  // function handleNewNotebookButtonClick() {}
  // function handleNewNoteButtonClick() {}

  useEffect(() => {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
  }, [setNotesView]);

  return (
    <div className="flex-1 bg-base-300 h-[100vh] font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin py-4">
      {notesView === APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor></NoteEditor>
      ) : (
        <div className="">
          <div className="flex items-center justify-between px-8 relative">
            <div className="flex items-center text-2xl font-bold gap-2">
              <button
                className="xl:hidden btn btn-square"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </button>
              Dashboard
            </div>
            <div className="flex justify-center">
              <div className="hidden lg:flex lg:w-lg xl:w-xl 2xl:w-2xl input focus-within:input-primary">
                <Search className="text-secondary"></Search>
                <input
                  className=""
                  placeholder="Search anything"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* This feature was moved to the sidebar */}

              {/* <div
                className={!userVerified ? "tooltip tooltip-right" : ""}
                data-tip={APP_CONSTANTS.VERIFY_EMAIL}
              >
                <div className="tooltip tooltip-bottom" data-tip={"New note"}>
                  <button
                    className="btn btn-primary btn-square ml-2"
                    disabled={!userVerified}
                    onClick={handleNewNoteButtonClick}
                  >
                    <FilePlus></FilePlus>
                  </button>
                </div>
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={"New notebook"}
                >
                  <button
                    className="btn btn-primary btn-square ml-2"
                    disabled={!userVerified}
                    onClick={handleNewNotebookButtonClick}
                  >
                    <BookPlus></BookPlus>
                  </button>
                </div>
              </div> */}
            </div>

            <ViewSwitcher />
          </div>

          <div className="divider" />
          <div className="px-8">
            <GreetingSection />
            <div className="flex mt-2 w-full lg:hidden input focus-within:input-primary">
              <Search className="text-secondary"></Search>
              <input
                className=""
                placeholder="Search anything"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex justify-between">
              <div className="w-full">
                <QuickActions />
                <div className="lg:hidden">
                  <UserStatistics />
                </div>
                <PinnedNotes />
                <div className="lg:hidden">
                  <Quote />
                  <Donation />
                </div>
              </div>
              <div className="hidden lg:block ml-8">
                <DigitalClock />
                <UserStatistics />
                <Quote />
                <Donation />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardArea;
