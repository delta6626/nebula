import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useCurrentEditor } from "@tiptap/react";

function EditorYouTubeLinkModal({ addYouTubeLinkToEditor }) {
  const [urlText, setUrlText] = useState();

  function addYouTubeLink() {
    addYouTubeLinkToEditor(urlText);
    document.getElementById(APP_CONSTANTS.EDITOR_YOUTUBE_LINK_MODAL).close();
  }

  return (
    <dialog id={APP_CONSTANTS.EDITOR_YOUTUBE_LINK_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Insert a YouTube Video</h3>
        <input
          className={"input focus:input-primary w-full mt-4"}
          type="url"
          value={urlText}
          onChange={(e) => {
            setUrlText(e.target.value);
          }}
          placeholder="Paste a youtube link"
        />
        <div className="modal-action">
          <button className="btn btn-primary" onClick={addYouTubeLink}>
            {APP_CONSTANTS.INSERT}
          </button>
          <button
            className="btn"
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.EDITOR_YOUTUBE_LINK_MODAL)
                .close();
            }}
          >
            {APP_CONSTANTS.CANCEL}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default EditorYouTubeLinkModal;
