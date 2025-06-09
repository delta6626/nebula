import GenericModal from "../components/GenericModal";
import EditNoteModal from "../components/EditNoteModal";
import CreateNotebookModal from "../components/CreateNotebookModal";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useMessageStore } from "../../store/messageStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import { useNotebookSearchTermStore } from "../../store/notebookSearchTermStore";
import { Search, Table, LayoutGrid, BookPlus } from "lucide-react";
import { useEffect, useState } from "react";
import GridNotebook from "../components/GridNotebook";
import TableNotebook from "../components/TableNotebook";
import EditNotebookModal from "../components/EditNotebookModal";
import { useUserStore } from "../../store/userStore";
import ViewSwitcher from "../components/ViewSwitcher";

function NotebooksArea() {
  const { message } = useMessageStore();
  const { notebooks } = useNotebooksStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { userVerified } = useUserVerifiedStore();
  const { user } = useUserStore();
  const { notebookSearchTerm, setNotebookSearchTerm } =
    useNotebookSearchTermStore();

  const filteredNotebooks = notebooks.filter((notebook) => {
    if (
      notebookSearchTerm.startsWith("tag:") ||
      notebookSearchTerm.startsWith("tags:")
    ) {
      // Search by tag

      const thisNotebookTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchedTags = notebookSearchTerm
        .split(":")[1]
        .toLowerCase()
        .trim()
        .replace(/ {2,}/g, " ")
        .split(" ");

      if (user.preferences.strictTagMatching) {
        return searchedTags.every((tag) => thisNotebookTags.includes(tag));
      } else {
        return searchedTags.some((tag) => thisNotebookTags.includes(tag));
      }
    } else {
      const lowerName = notebook.name.toLowerCase();
      const lowerTags = notebook.tags.map((tag) => tag.toLowerCase());
      const searchTerms = notebookSearchTerm.toLowerCase().split(/\s+/); // split by spa
      return (
        lowerName.includes(notebookSearchTerm.toLowerCase()) ||
        searchTerms.some((term) => lowerTags.includes(term))
      );
    }
  });

  function handleSearch(e) {
    setNotebookSearchTerm(e.target.value);
  }

  // This feature was moved to the sidebar

  // function handleNewNotebookButtonClick() {
  //   document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
  // }

  useEffect(() => {
    if (notesView == APP_CONSTANTS.VIEW_NOTE_EDITOR) {
      setNotesView(APP_CONSTANTS.VIEW_GRID);
    }
  }, []);

  return (
    <div className="flex-1 bg-base-300 h-[100vh] font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin py-4">
      <div className="flex items-center justify-between px-8 relative">
        <h1 className="text-3xl font-bold">Notebooks</h1>
        <div className="flex absolute left-1/2 -translate-x-1/2">
          <div className="w-2xl input focus-within:input-primary">
            <Search className="text-secondary" />
            <input
              className=""
              placeholder="Search notebooks"
              type="text"
              value={notebookSearchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* This feature was moved to the sidebar */}

          {/* <div
            className={!userVerified ? "tooltip tooltip-right" : ""}
            data-tip={APP_CONSTANTS.VERIFY_EMAIL}
          >
            <div className="tooltip tooltip-bottom" data-tip={"New notebook"}>
              <button
                className="btn btn-primary btn-square ml-2"
                disabled={!userVerified}
                onClick={handleNewNotebookButtonClick}
              >
                <BookPlus />
              </button>
            </div>
          </div> */}
        </div>

        <ViewSwitcher />
      </div>

      <div className="divider"></div>

      <div className="px-8">
        {notebookSearchTerm === "" && filteredNotebooks.length !== 0 ? (
          <h3 className="text-xl font-semibold">
            All notebooks ({filteredNotebooks.length})
          </h3>
        ) : notebookSearchTerm !== "" && filteredNotebooks.length !== 0 ? (
          <h3 className="text-xl font-semibold">
            Results for “{notebookSearchTerm}” — {filteredNotebooks.length}{" "}
            found
          </h3>
        ) : (
          ""
        )}

        {notesView === APP_CONSTANTS.VIEW_GRID ? (
          filteredNotebooks.length > 0 ? (
            <div className="flex gap-5 flex-wrap mt-4">
              {filteredNotebooks.map((notebook, id) => (
                <GridNotebook key={id} notebookObject={notebook} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
              <p className="whitespace-pre-line text-center">
                {APP_CONSTANTS.NO_NOTEBOOKS}
              </p>
            </div>
          )
        ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
          filteredNotebooks.length > 0 ? (
            <div className="mt-4">
              {filteredNotebooks.map((notebook, id) => (
                <TableNotebook key={id} id={id} notebookObject={notebook} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-secondary mt-4 select-none">
              <p className="whitespace-pre-line text-center">
                {APP_CONSTANTS.NO_NOTEBOOKS}
              </p>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default NotebooksArea;
