import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useCurrentEditor } from "@tiptap/react";

function EditorLinkModal({ addLinkToEditor }) {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  const { editor } = useCurrentEditor();
  const [urlText, setUrlText] = useState();
  const [isValid, setIsValid] = useState(true);

  function validateURL(url) {
    return urlRegex.test(url);
  }

  function addLink() {
    if (!validateURL(urlText)) {
      setIsValid(false);
    } else {
      setIsValid(true);
      addLinkToEditor(urlText);
      document.getElementById(APP_CONSTANTS.EDITOR_LINK_MODAL).close();
    }
  }

  return (
    <dialog id={APP_CONSTANTS.EDITOR_LINK_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Insert a link</h3>
        <input
          className={
            !isValid
              ? "input input-error w-full mt-4"
              : "input focus:input-primary w-full mt-4"
          }
          type="url"
          value={urlText}
          onChange={(e) => {
            setUrlText(e.target.value);
          }}
          placeholder="Paste or type a link"
        />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={addLink}>
            {APP_CONSTANTS.INSERT}
          </button>
          <button
            className="btn"
            onClick={() => {
              document.getElementById(APP_CONSTANTS.EDITOR_LINK_MODAL).close();
            }}
          >
            {APP_CONSTANTS.CANCEL}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EditorLinkModal;
