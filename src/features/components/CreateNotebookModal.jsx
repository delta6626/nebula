import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import Tag from "../components/Tag";
import { addNotebookToDatabase } from "../../firebase/services";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useMessageStore } from "../../store/messageStore";
import { toTimestamp } from "../../utils/toTimestamp";

function CreateNotebookModal() {
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { message, setMessage } = useMessageStore();

  const [notebookName, setNotebookName] = useState("");
  const [creatingNotebook, setCreatingNotebook] = useState(false);
  const [tags, setTags] = useState([]);

  function resetState() {
    setNotebookName(""); // Reset notebook name
    setTags([]); // Reset tags
    setCreatingNotebook(false); // Reset creating state
  }

  function handleNotebookNameChange(e) {
    setNotebookName(e.target.value);
  }

  function handleTagChange(e) {
    if (e.code === "Enter" || e.code === "Space") {
      let tagContent = e.target.value.trim();
      e.target.value = "";
      if (tagContent && tags.length < APP_CONSTANTS.TAG_LIMIT) {
        setTags([...tags, tagContent]);
      }
    }
  }

  function handleCreateButtonClick() {
    setCreatingNotebook(true);
    addNotebookToDatabase(
      notebookName == "" ? "Untitled notebook" : notebookName,
      tags
    )
      .then((doc) => {
        const notebookObject = {
          id: doc.id,
          name: notebookName == "" ? "Untitled notebook" : notebookName,
          tags: tags,
          creationDate: toTimestamp(new Date()),
          lastEditDate: toTimestamp(new Date()),
        };

        setNotebooks([...notebooks, notebookObject]);
        setCreatingNotebook(false);
        document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).close();
      })
      .catch((error) => {
        setCreatingNotebook(false);
        document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).close();
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
      })
      .finally(() => {
        resetState();
      });
  }

  function handleCloseButtonClick() {
    resetState();
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).close();
  }

  return (
    <dialog id={APP_CONSTANTS.CREATE_NOTEBOOK_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Create a new notebook</h3>
        <input
          type="text"
          className="input focus:input-primary w-full mt-4"
          placeholder="Notebook name"
          maxLength={100}
          value={notebookName}
          onChange={handleNotebookNameChange}
        />
        <input
          className="input focus:input-primary w-full mt-2"
          placeholder="Tag your notebook (write something and press space)"
          maxLength={30}
          onKeyDown={handleTagChange}
        ></input>
        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden mt-4">
          {tags.map((tagContent, id) => {
            return (
              <Tag
                id={id}
                tags={tags}
                setTags={setTags}
                onDeleteClick={(tagId) => {
                  const newTags = tags.filter((_, index) => index !== tagId);
                  setTags(newTags);
                }}
                tagText={tagContent}
                showTagIcon={false}
                showDeleteIcon={true}
                darkBackground={true}
              ></Tag>
            );
          })}
        </div>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleCreateButtonClick}
            disabled={creatingNotebook}
          >
            {!creatingNotebook ? (
              APP_CONSTANTS.CREATE
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

export default CreateNotebookModal;
