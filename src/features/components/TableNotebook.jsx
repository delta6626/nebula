import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import Tag from "./Tag";
import { PinOff, Pin, FileEdit, Trash2 } from "lucide-react";
import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useMessageStore } from "../../store/messageStore";
import { useEditTargetNotebookStore } from "../../store/editTargetNotebookStore";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";
import {
  hardDeleteNotebookAndLinkedNotes,
  updateNotebookPinStatus,
} from "../../firebase/services";

function TableNotebook({ id, notebookObject }) {
  const { notes, setNotes } = useNotesStore();
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { message, setMessage } = useMessageStore();
  const { editTargetNotebook, setEditTargetNotebook } =
    useEditTargetNotebookStore();
  const { setActiveTab } = useActiveTabStore();
  const { setNoteSearchTerm } = useNoteSearchTermStore();

  const [updatingPin, setUpdatingPin] = useState(false);
  const [deletingNotebook, setDeletingNotebook] = useState(false);

  function handleNotebookPinAndUnpin() {
    setUpdatingPin(true);

    updateNotebookPinStatus(notebookObject.id, notebookObject.pinned)
      .then(() => {
        setNotebooks(
          notebooks.map((notebook) =>
            notebook.id == notebookObject.id
              ? { ...notebook, pinned: !notebook.pinned }
              : notebook
          )
        );
        setUpdatingPin(false);
      })
      .catch((error) => {
        setUpdatingPin(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function deleteCurrentNotebook() {
    hardDeleteNotebookAndLinkedNotes(notebookObject.id, notebookObject.name)
      .then(() => {
        setDeletingNotebook(false);
        setNotes(
          notes.filter(
            (note) =>
              !(
                note.assignedTo[0] === notebookObject.id &&
                note.assignedTo[1] === notebookObject.name
              )
          )
        );
        setNotebooks(
          notebooks.filter((notebook) => notebook.id !== notebookObject.id)
        );

        setMessage({
          title: APP_CONSTANTS.SUCCESS_MODAL_TITLE,
          textContent: APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNotebook(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function handleNotebookEditButtonClick(e) {
    e.stopPropagation();
    setEditTargetNotebook(notebookObject);
    document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).showModal();
  }

  function handleDeleteButtonClick(e) {
    e.stopPropagation();
    setMessage({
      title: APP_CONSTANTS.DELETE_NOTEBOOK_MODAL_TITLE,
      textContent: APP_CONSTANTS.DELETE_NOTEBOOK_MODAL_TEXT_CONTENT,
      firstButtonClassName: "btn btn-error",
      secondButtonClassName: "btn",
      firstButtonText: APP_CONSTANTS.DELETE,
      secondButtonText: APP_CONSTANTS.CANCEL,
      firstButtonOnClick: function () {
        deleteCurrentNotebook();
        setDeletingNotebook(true);
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
      secondButtonOnClick: function () {
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
    });
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
  }

  function handleNotebookClick() {
    setNoteSearchTerm("book: " + notebookObject.name);
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  return (
    <tr
      className="hover:bg-base-200 cursor-pointer"
      onClick={handleNotebookClick}
    >
      <th className="font-normal">{id + 1}</th>
      <td className="text-lg break-all" title={notebookObject.name}>
        {notebookObject.name}
      </td>

      <td>
        <div className="flex flex-wrap items-center gap-2 h-full">
          {notebookObject.tags.length === 0 ? (
            <p className="text-secondary">{APP_CONSTANTS.NO_TAGS}</p>
          ) : null}
          {notebookObject.tags.slice(0, 10).map((tag, index) => (
            <Tag
              key={index}
              tagText={tag}
              showTagIcon={false}
              source={APP_CONSTANTS.SOURCE_NOTEBOOK}
            />
          ))}
          {notebookObject.tags.length > 10 && (
            <Tag
              key="more"
              moreTag={true}
              tagText={`${notebookObject.tags.length - 10} more`}
            />
          )}
        </div>
      </td>

      <td className="text-secondary whitespace-nowrap">
        {formatDateDDMMYY(objectToDate(notebookObject.creationDate))}
      </td>

      <td className="text-secondary whitespace-nowrap">
        {dateDistanceFromNow(objectToDate(notebookObject.lastEditDate))}
      </td>

      <td>
        <div className="flex gap-2">
          <div
            className="tooltip"
            data-tip={
              notebookObject.pinned
                ? "Unpin from dashboard"
                : "Pin to dashboard"
            }
          >
            <button
              className="btn btn-square"
              disabled={updatingPin}
              onClick={(e) => {
                e.stopPropagation();
                handleNotebookPinAndUnpin(notebookObject.id);
              }}
            >
              {updatingPin ? (
                <span className="loading loading-spinner"></span>
              ) : notebookObject.pinned ? (
                <PinOff size={20} />
              ) : (
                <Pin size={20} />
              )}
            </button>
          </div>

          <div className="tooltip" data-tip="Edit details">
            <button
              className="btn btn-square"
              onClick={handleNotebookEditButtonClick}
            >
              <FileEdit size={20} />
            </button>
          </div>

          <div className="tooltip tooltip-error" data-tip="Delete notebook">
            <button
              className="btn btn-square text-error"
              disabled={deletingNotebook}
              onClick={handleDeleteButtonClick}
            >
              {deletingNotebook ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Trash2 size={20} />
              )}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableNotebook;
