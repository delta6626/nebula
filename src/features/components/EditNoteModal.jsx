import { useState, useEffect } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useNotesStore } from "../../store/notesStore";
import { useMessageStore } from "../../store/messageStore";
import Tag from "./Tag";
import { updateNote } from "../../firebase/services";
import { toTimestamp } from "../../utils/toTimestamp";

function EditNoteModal() {
  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();
  const { notebooks } = useNotebooksStore();
  const { notes, setNotes } = useNotesStore();
  const { setMessage } = useMessageStore();
  const [editingNote, setEditingNote] = useState(false);

  const [noteName, setNoteName] = useState("");
  const [assignedTo, setAssignedTo] = useState("[]"); // stringified array
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (editTargetNote?.id) {
      setNoteName(editTargetNote.name || "");
      setAssignedTo(
        editTargetNote.assignedTo
          ? JSON.stringify(editTargetNote.assignedTo)
          : "[]"
      );
      setTags(editTargetNote.tags || []);
    }
  }, [editTargetNote]);

  function handleTagChange(e) {
    if (e.code === "Enter" || e.code === "Space") {
      let tagContent = e.target.value.trim();
      e.target.value = "";
      if (tagContent && tags.length < APP_CONSTANTS.TAG_LIMIT) {
        setTags([...tags, tagContent]);
      }
    }
  }

  function handleEditButtonClick() {
    setEditingNote(true);

    const noteId = editTargetNote.id;
    const newNoteNameClean = noteName.trim() || "Untitled";
    const newTagListClean = tags;

    let parsedAssignedTo;
    try {
      parsedAssignedTo = JSON.parse(assignedTo);
    } catch (err) {
      setEditingNote(false);
      setMessage({
        title: APP_CONSTANTS.ERROR_MODAL_TITLE,
        textContent:
          "An error occurred while reading the notebook selection.\n" + err,
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
      return;
    }

    // Check if assignedTo is valid
    if (!Array.isArray(parsedAssignedTo) || parsedAssignedTo.length === 0) {
      setEditingNote(false);
      return;
    }

    // Prevent update if no changes
    const noChanges =
      newNoteNameClean === editTargetNote.name &&
      JSON.stringify(parsedAssignedTo) ===
        JSON.stringify(editTargetNote.assignedTo) &&
      JSON.stringify(newTagListClean) === JSON.stringify(editTargetNote.tags);

    if (noChanges) {
      setEditingNote(false);
      document.getElementById(APP_CONSTANTS.EDIT_NOTE_MODAL).close();
      return;
    }

    const newLastEditDate = new Date();

    updateNote(
      noteId,
      newNoteNameClean,
      parsedAssignedTo,
      newTagListClean,
      newLastEditDate
    )
      .then(() => {
        const updatedNote = {
          ...editTargetNote,
          name: newNoteNameClean,
          assignedTo: parsedAssignedTo,
          tags: newTagListClean,
          lastEditDate: toTimestamp(newLastEditDate),
        };

        setEditTargetNote(updatedNote);
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );

        setEditingNote(false);
        document.getElementById(APP_CONSTANTS.EDIT_NOTE_MODAL).close();
      })
      .catch((error) => {
        setEditingNote(false);
        document.getElementById(APP_CONSTANTS.EDIT_NOTE_MODAL).close();
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

  function handleCloseButtonClick() {
    document.getElementById(APP_CONSTANTS.EDIT_NOTE_MODAL).close();
  }

  return (
    <dialog id={APP_CONSTANTS.EDIT_NOTE_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit note</h3>

        <input
          type="text"
          className="input focus:input-primary w-full mt-4"
          placeholder="New name"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
        />

        <select
          value={assignedTo}
          className={
            assignedTo !== "[]"
              ? "select focus:select-primary w-full mt-2"
              : "select select-error w-full mt-2"
          }
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="[]">Select a notebook</option>
          {notebooks.map((notebook) => (
            <option
              key={notebook.id}
              value={JSON.stringify([notebook.id, notebook.name])}
            >
              {notebook.name}
            </option>
          ))}
        </select>

        <input
          className="input focus:input-primary w-full mt-2"
          placeholder="Write a tag and press space"
          maxLength={30}
          onKeyDown={handleTagChange}
        />

        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden mt-4">
          {tags.map((tagContent, id) => (
            <Tag
              key={id}
              id={id}
              tags={tags}
              onDeleteClick={(tagId) =>
                setTags(tags.filter((_, index) => index !== tagId))
              }
              tagText={tagContent}
              showTagIcon={false}
              showDeleteIcon={true}
              darkBackground={true}
            />
          ))}
        </div>

        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleEditButtonClick}
            disabled={editingNote}
          >
            {!editingNote ? (
              APP_CONSTANTS.EDIT
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          <button className="btn" onClick={handleCloseButtonClick}>
            {APP_CONSTANTS.CANCEL}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EditNoteModal;
