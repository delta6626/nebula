import { useState, useEffect } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useEditTargetNotebookStore } from "../../store/editTargetNotebookStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useNotesStore } from "../../store/notesStore";
import Tag from "./Tag";
import { useMessageStore } from "../../store/messageStore";
import { updateNotebook } from "../../firebase/services";
import { toTimestamp } from "../../utils/toTimestamp";

function EditNotebookModal() {
  const { editTargetNotebook, setEditTargetNotebook } =
    useEditTargetNotebookStore();
  const { notes, setNotes } = useNotesStore();
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { setMessage } = useMessageStore();

  const [notebookName, setNotebookName] = useState("");
  const [tags, setTags] = useState([]);
  const [editingNotebook, setEditingNotebook] = useState(false);

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
    setEditingNotebook(true);
    const notebookId = editTargetNotebook.id;
    const oldNotebookName = editTargetNotebook.name;
    const newNotebookNameClean = notebookName.trim() || "Untitled notebook";
    const newTagListClean = tags;

    const noChanges =
      newNotebookNameClean === editTargetNotebook.name &&
      JSON.stringify(newTagListClean) ===
        JSON.stringify(editTargetNotebook.tags);

    if (noChanges) {
      setEditingNotebook(false);
      document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).close();
      return;
    }

    const newLastEditDate = new Date();

    updateNotebook(
      notebookId,
      oldNotebookName,
      newNotebookNameClean,
      newTagListClean,
      newLastEditDate
    )
      .then(() => {
        const updatedNotebook = {
          ...editTargetNotebook,
          name: newNotebookNameClean,
          tags: newTagListClean,
          lastEditDate: toTimestamp(newLastEditDate),
        };

        setEditTargetNotebook(updatedNotebook);

        setNotebooks(
          notebooks.map((notebook) =>
            notebook.id === updatedNotebook.id ? updatedNotebook : notebook
          )
        );

        setNotes(
          notes.map((note) =>
            note.assignedTo[0] === notebookId &&
            note.assignedTo[1] === oldNotebookName
              ? { ...note, assignedTo: [notebookId, newNotebookNameClean] }
              : note
          )
        );

        setEditingNotebook(false);
        document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).close();
      })
      .catch((error) => {
        setEditingNotebook(false);
        document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).close();
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
    document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).close();
  }

  useEffect(() => {
    if (editTargetNotebook?.id) {
      setNotebookName(editTargetNotebook.name || "");
      setTags(editTargetNotebook.tags || []);
    }
  }, [editTargetNotebook]);

  return (
    <dialog id={APP_CONSTANTS.EDIT_NOTEBOOK_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit notebook</h3>

        <input
          type="text"
          className="input focus:input-primary w-full mt-4"
          placeholder="New name"
          maxLength={100}
          value={notebookName}
          onChange={(e) => setNotebookName(e.target.value)}
        />

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
            disabled={editingNotebook}
          >
            {!editingNotebook ? (
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

export default EditNotebookModal;
