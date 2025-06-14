import {
  ArrowLeft,
  Book,
  BookPlus,
  Clock,
  File,
  FilePlus,
  LayoutPanelTop,
  Pin,
  Settings,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo";
import UntaggedIcon from "../../assets/UntaggedIcon";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import {
  getAllNotebooks,
  getAllNotes,
  getAuthenticatedUser,
  getUserData,
} from "../../firebase/services";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useMessageStore } from "../../store/messageStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useNotesStore } from "../../store/notesStore";
import { useQuoteStore } from "../../store/quoteStore";
import { useUserStore } from "../../store/userStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import fetchAllQuotes from "../../utils/fetchAllQuotes";
import CreateNoteModal from "../components/CreateNoteModal";
import CreateNotebookModal from "../components/CreateNotebookModal";
import EditNoteModal from "../components/EditNoteModal";
import EditNotebookModal from "../components/EditNotebookModal";
import GenericModal from "../components/GenericModal";
import DashboardArea from "./DashboardArea";
import NotebooksArea from "./NotebooksArea";
import NotesArea from "./NotesArea";
import PinnedArea from "./PinnedArea";
import RecentArea from "./RecentArea";
import SettingsArea from "./SettingsArea";
import TaggedArea from "./TaggedArea";
import UntaggedArea from "./UntaggedArea";

function DashboardPage() {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();
  const { setNotebooks } = useNotebooksStore();
  const { setNotes } = useNotesStore();
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { message } = useMessageStore();
  const { setQuotes } = useQuoteStore();
  const { setNotesView } = useCurrentNotesViewStore();

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  function handleCollapse() {
    setSideBarCollapsed(!sideBarCollapsed);
  }

  function handleNewNoteButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  function handleNewNotebookButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
    setActiveTab(APP_CONSTANTS.NOTEBOOKS_PAGE);
  }

  function handleDashboardButtonClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
    setActiveTab(APP_CONSTANTS.DASHBOARD_PAGE);
  }

  function handleNotesButtonClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  function handleNotebooksButtonClick() {
    setActiveTab(APP_CONSTANTS.NOTEBOOKS_PAGE);
  }

  function handleTaggedClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
    setActiveTab(APP_CONSTANTS.TAGGED_ITEMS);
  }

  function handleUntaggedClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
    setActiveTab(APP_CONSTANTS.UNTAGGED_ITEMS);
  }

  function handlePinnedClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
    setActiveTab(APP_CONSTANTS.PINNED_ITEMS);
  }

  function handleRecentClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
    setActiveTab(APP_CONSTANTS.RECENT_ITEMS);
  }

  function handleSettingsButtonClick() {
    setActiveTab(APP_CONSTANTS.SETTINGS_PAGE);
  }

  useHotkeys(
    `ctrl+shift+${user?.shortcuts.DASHBOARD_PAGE}`,
    () => {
      handleDashboardButtonClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `ctrl+shift+${user?.shortcuts.NOTES_PAGE}`,
    () => {
      handleNotesButtonClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `ctrl+shift+${user?.shortcuts.NOTEBOOKS_PAGE}`,
    () => {
      handleNotebooksButtonClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `ctrl+shift+${user?.shortcuts.SETTINGS_PAGE}`,
    () => {
      handleSettingsButtonClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.PINNED_PAGE}`,
    () => {
      handlePinnedClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.RECENT_PAGE}`,
    () => {
      handleRecentClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.TAGGED_PAGE}`,
    () => {
      handleTaggedClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.UNTAGGED_PAGE}`,
    () => {
      handleUntaggedClick();
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.NEW_NOTE}`,
    () => {
      if (userVerified) {
        handleNotesButtonClick();
        document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
      } else {
        return;
      }
    },
    {
      preventDefault: true,
    },
  );

  useHotkeys(
    `shift+${user?.shortcuts.NEW_NOTE_BOOK}`,
    () => {
      if (userVerified) {
        handleNotebooksButtonClick();
        document
          .getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL)
          .showModal();
      } else {
        return;
      }
    },
    {
      preventDefault: true,
    },
  );

  useEffect(() => {
    getAuthenticatedUser().then((user) => {
      if (user == APP_CONSTANTS.UNAUTHENTICATED) {
        navigate("/login");
      } else {
        setUserVerified(user.emailVerified);
        return;
      }
    });
  }, [navigate, setUserVerified]);

  useEffect(() => {
    getUserData().then((userData) => {
      if (userData == null) {
        // Handle this error later
      } else {
        setUser(userData);
      }
    });
  }, [setUser]);

  useEffect(() => {
    getAllNotebooks().then((notebooksSnapshot) => {
      const allNotebooksData = [];
      notebooksSnapshot.forEach((notebook) => {
        if (notebook.data().deleted == null) {
          allNotebooksData.push({ ...notebook.data(), id: notebook.id });
        }
      });
      setNotebooks(allNotebooksData);
    });
  }, [setNotebooks]);

  useEffect(() => {
    getAllNotes().then((notesSnapshot) => {
      const allNotesData = [];
      notesSnapshot.forEach((note) => {
        if (note.data().deleted == null) {
          allNotesData.push({ ...note.data(), id: note.id });
        }
      });
      setNotes(allNotesData);
    });
  }, [setNotes]);

  useEffect(() => {
    fetchAllQuotes().then((response) => {
      response.json().then((quotesArray) => {
        setQuotes(quotesArray);
      });
    });
  }, [setQuotes]);

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute("data-theme", user?.preferences.theme);
  }, [user?.preferences.theme]);

  // Temporary fix

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div className="flex font-jakarta">
      <CreateNoteModal></CreateNoteModal>
      <CreateNotebookModal></CreateNotebookModal>
      <GenericModal
        id={APP_CONSTANTS.GENERIC_MODAL}
        title={message.title}
        textContent={message.textContent}
        firstButtonClassName={message.firstButtonClassName}
        secondButtonClassName={message.secondButtonClassName}
        firstButtonOnClick={message.firstButtonOnClick}
        secondButtonOnClick={message.secondButtonOnClick}
        firstButtonText={message.firstButtonText}
        secondButtonText={message.secondButtonText}
      ></GenericModal>
      <EditNoteModal></EditNoteModal>
      <EditNotebookModal></EditNotebookModal>
      <div
        className={
          "sideBar h-[100vh] bg-base-300 py-4 flex flex-col ease-in-out duration-200" +
          (sideBarCollapsed ? " w-20" : " w-60")
        }
      >
        <div className="logo flex items-center justify-between px-4">
          <h1
            className={
              "flex items-center gap-2 text-xl font-jakarta font-bold text-center" +
              (sideBarCollapsed ? " hidden" : "")
            }
          >
            <Logo />
            Nebula
          </h1>
          <button
            className={
              "btn btn-square bg-transparent" +
              (sideBarCollapsed ? " btn-wide rotate-180" : "")
            }
            onClick={handleCollapse}
          >
            <ArrowLeft></ArrowLeft>
          </button>
        </div>
        <div className="divider"></div>
        <div className="mainButtons flex-1 px-4">
          <button
            className={`btn btn-wide ${
              sideBarCollapsed ? "justify-center" : "justify-start"
            } flex items-center`}
            disabled={!userVerified}
            onClick={handleNewNoteButtonClick}
          >
            {sideBarCollapsed ? (
              <FilePlus className="shrink-0" />
            ) : (
              <>
                <FilePlus className="shrink-0" />
                <p className="text-nowrap">New note</p>
              </>
            )}
          </button>

          <button
            className={`btn btn-wide mt-2 ${
              sideBarCollapsed ? "justify-center" : "justify-start"
            } flex items-center`}
            disabled={!userVerified}
            onClick={handleNewNotebookButtonClick}
          >
            {sideBarCollapsed ? (
              <BookPlus className="shrink-0" />
            ) : (
              <>
                <BookPlus className="shrink-0" />
                <p className="text-nowrap">New notebook</p>
              </>
            )}
          </button>

          <div className="divider"></div>

          <button
            className={
              activeTab == APP_CONSTANTS.DASHBOARD_PAGE
                ? `btn btn-wide btn-primary ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleDashboardButtonClick}
          >
            {sideBarCollapsed ? (
              <LayoutPanelTop className="shrink-0" />
            ) : (
              <>
                <LayoutPanelTop className="shrink-0" />
                <p>Dashboard</p>
              </>
            )}
          </button>

          <button
            className={
              activeTab == APP_CONSTANTS.NOTES_PAGE
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleNotesButtonClick}
          >
            {sideBarCollapsed ? (
              <File className="shrink-0" />
            ) : (
              <>
                <File className="shrink-0" />
                <p>Notes</p>
              </>
            )}
          </button>

          <button
            className={
              activeTab == APP_CONSTANTS.NOTEBOOKS_PAGE
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleNotebooksButtonClick}
          >
            {sideBarCollapsed ? (
              <Book className="shrink-0" />
            ) : (
              <>
                <Book className="shrink-0" />
                <p>Notebooks</p>
              </>
            )}
          </button>

          <div className="divider"></div>

          <button
            className={
              activeTab == APP_CONSTANTS.PINNED_ITEMS
                ? `btn btn-wide btn-primary ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handlePinnedClick}
          >
            {sideBarCollapsed ? (
              <Pin className="shrink-0" />
            ) : (
              <>
                <Pin className="shrink-0" />
                <p>Pinned</p>
              </>
            )}
          </button>
          <button
            className={
              activeTab == APP_CONSTANTS.RECENT_ITEMS
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleRecentClick}
          >
            {sideBarCollapsed ? (
              <Clock className="shrink-0" />
            ) : (
              <>
                <Clock className="shrink-0" />
                <p>Recent</p>
              </>
            )}
          </button>
          <button
            className={
              activeTab == APP_CONSTANTS.TAGGED_ITEMS
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleTaggedClick}
          >
            {sideBarCollapsed ? (
              <Tag className="shrink-0" />
            ) : (
              <>
                <Tag className="shrink-0" />
                <p>Tagged</p>
              </>
            )}
          </button>

          <button
            className={
              activeTab == APP_CONSTANTS.UNTAGGED_ITEMS
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleUntaggedClick}
          >
            {sideBarCollapsed ? (
              <UntaggedIcon className={"shrink-0"} />
            ) : (
              <>
                <UntaggedIcon className={"shrink-0"} />
                <p>Untagged</p>
              </>
            )}
          </button>
        </div>
        <div className="bottomButtons flex flex-col justify-between px-4">
          <div className="divider"></div>

          <button
            className={
              activeTab == APP_CONSTANTS.SETTINGS_PAGE
                ? `btn btn-wide btn-primary ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide bg-transparent ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleSettingsButtonClick}
          >
            {sideBarCollapsed ? (
              <Settings className="shrink-0" />
            ) : (
              <>
                <Settings className="shrink-0" />
                <p>Settings</p>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="divider divider-horizontal m-0"></div>
      {activeTab == APP_CONSTANTS.DASHBOARD_PAGE ? (
        <DashboardArea></DashboardArea>
      ) : activeTab == APP_CONSTANTS.NOTES_PAGE ? (
        <NotesArea></NotesArea>
      ) : activeTab == APP_CONSTANTS.NOTEBOOKS_PAGE ? (
        <NotebooksArea></NotebooksArea>
      ) : activeTab == APP_CONSTANTS.SETTINGS_PAGE ? (
        <SettingsArea></SettingsArea>
      ) : activeTab == APP_CONSTANTS.TAGGED_ITEMS ? (
        <TaggedArea></TaggedArea>
      ) : activeTab == APP_CONSTANTS.UNTAGGED_ITEMS ? (
        <UntaggedArea></UntaggedArea>
      ) : activeTab == APP_CONSTANTS.PINNED_ITEMS ? (
        <PinnedArea></PinnedArea>
      ) : activeTab == APP_CONSTANTS.RECENT_ITEMS ? (
        <RecentArea></RecentArea>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardPage;
