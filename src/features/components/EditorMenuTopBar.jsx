import { useCurrentEditor } from "@tiptap/react";
import debounce from "lodash.debounce";
import {
  CheckCircle2,
  CheckIcon,
  Ellipsis,
  FileUp,
  FileWarning,
  Layout,
  PencilLine,
  RectangleEllipsis,
  Save,
  X,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { updateNoteFromEditor } from "../../firebase/services";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useMessageStore } from "../../store/messageStore";
import { useNotesStore } from "../../store/notesStore";
import { useToolBarVisibilityStore } from "../../store/toolBarVisibilityStore";
import { useUserStore } from "../../store/userStore";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { toTimestamp } from "../../utils/toTimestamp";
import NotebookChip from "./NotebookChip";

const MemoizedFileWarning = memo(FileWarning);
const MemoizedSave = memo(Save);
const MemoizedX = memo(X);
const MemoizedFileUp = memo(FileUp);
const MemoizedEllipsis = memo(Ellipsis);
const MemoizedCheckCircle2 = memo(CheckCircle2);
const MemoizedLayout = memo(Layout);
const MemoizedCheckIcon = memo(CheckIcon);
const MemoizedMenuBar = memo(RectangleEllipsis);
const MemoizedPencilLine = memo(PencilLine);
const MemoizedNotebookChip = memo(NotebookChip);

function EditorMenuTopBar() {
  const widthOptions = [
    APP_CONSTANTS.COMPACT,
    APP_CONSTANTS.MEDIUM,
    APP_CONSTANTS.LARGE,
    APP_CONSTANTS.ULTRA_LARGE,
  ];

  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();
  const { setNotesView } = useCurrentNotesViewStore();
  const { notes, setNotes } = useNotesStore();
  const { editor } = useCurrentEditor();
  const { user } = useUserStore();
  const { setMessage } = useMessageStore();
  const { toolBarVisible, setToolBarVisible } = useToolBarVisibilityStore();

  const [noteName, setNoteName] = useState("");
  const [noteContentDelta, setnoteContentDelta] = useState(false);
  const [noteNameDelta, setNoteNameDelta] = useState(false);
  const [editorWidth, setEditorWidth] = useState();
  const [editorWidthDelta, setEditorWidthDelta] = useState(false);
  const [editable, setEditable] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  function handleNoteNameChange(e) {
    setNoteName(e.target.value);
    if (e.target.value !== editTargetNote.name) {
      setNoteNameDelta(true);
    } else {
      setNoteNameDelta(false);
    }
  }

  function handleEditorWidthChange(newWidth) {
    setEditorWidth(newWidth);
    if (newWidth !== editTargetNote.editorWidth) {
      setEditorWidthDelta(true);
    } else {
      setEditorWidthDelta(false);
    }
  }

  function handleSaveButtonClick(closeOnSave) {
    if (!noteContentDelta && !noteNameDelta && !editorWidthDelta) return; // Nothing to save

    setSaving(true);
    const date = new Date();

    // Build the object to update Firestore
    const updatedNotePropertiesObject = {
      lastEditDate: date,
    };

    if (noteNameDelta) {
      updatedNotePropertiesObject.name = noteName;
    }

    if (noteContentDelta) {
      updatedNotePropertiesObject.content = editor.getHTML();
    }

    if (editorWidthDelta) {
      updatedNotePropertiesObject.editorWidth = editorWidth;
    }

    updateNoteFromEditor(editTargetNote.id, updatedNotePropertiesObject)
      .then(() => {
        // Build the updated local note object
        const updatedNote = {
          ...editTargetNote,
          lastEditDate: toTimestamp(date),
        };

        if (noteNameDelta) {
          updatedNote.name = noteName;
        }

        if (noteContentDelta) {
          updatedNote.content = editor.getHTML();
        }

        if (editorWidthDelta) {
          updatedNote.editorWidth = editorWidth;
        }

        setEditTargetNote(updatedNote);
        setNotes(
          notes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note,
          ),
        );
        setNoteNameDelta(false);
        setnoteContentDelta(false);
        setEditorWidthDelta(false);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setSaving(false);
        if (closeOnSave != null && closeOnSave) {
          setNotesView(APP_CONSTANTS.VIEW_GRID);
        }
      });
  }

  function handleMarkDownExport() {
    setExporting(true);
    const markdown = editor.storage.markdown.getMarkdown();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${noteName}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setExporting(false);
  }

  function handleCloseButtonClick() {
    if (!noteContentDelta && !noteNameDelta && !editorWidthDelta) {
      setNotesView(APP_CONSTANTS.VIEW_GRID);
    } else {
      setMessage({
        title: APP_CONSTANTS.UNSAVED_CHANGES,
        textContent: APP_CONSTANTS.UNSAVED_CHANGES_TEXT_CONTENT,
        firstButtonClassName: "btn btn-primary",
        secondButtonClassName: "btn btn-error",
        firstButtonText: APP_CONSTANTS.SAVE,
        secondButtonText: APP_CONSTANTS.CLOSE,
        firstButtonOnClick: function () {
          handleSaveButtonClick(true);
          document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
        },
        secondButtonOnClick: function () {
          setNotesView(APP_CONSTANTS.VIEW_GRID);
          document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
        },
      });
      document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
    }
  }

  useHotkeys(
    `alt+${user?.shortcuts.CLOSE}`,
    () => {
      handleCloseButtonClick();
    },
    {
      preventDefault: true,
      enableOnContentEditable: true,
      enableOnFormTags: true,
    },
  );

  // Hard coded shortcut for save. Will be customizable in the future (maybe).

  useHotkeys(
    `ctrl+s`,
    () => {
      if (!saving) {
        handleSaveButtonClick();
      }
    },
    {
      preventDefault: true,
      enableOnContentEditable: true,
      enableOnFormTags: true,
    },
  );

  useEffect(() => {
    if (!editor) return;

    function updateFunction({ editor }) {
      const html = editor.getHTML();
      const original = editTargetNote.content;

      if ((html === "<p></p>" && original === "") || html === original) {
        setnoteContentDelta(false);
      } else {
        setnoteContentDelta(true);
      }

      const text = editor.getText();

      if (text === "") {
        setWordCount(0);
      } else {
        setWordCount(text.trim().split(/[ \n]+/).length);
      }
    }

    const debouncedUpdate = debounce(updateFunction, 300); // Make sure the update function runs 300ms after the user stops typing
    editor.on("update", debouncedUpdate);

    return () => {
      editor.off("update", debouncedUpdate);
      debouncedUpdate.cancel(); // clean up pending calls
    };
  }, [editor, editTargetNote]);

  useEffect(() => {
    let text = editor.getText();
    if (text == "") {
      setWordCount(0);
      return;
    } else {
      setWordCount(text.trim().split(" ").length);
    }
  }, [editor]);

  useEffect(() => {
    setNoteName(editTargetNote.name);
    setEditorWidth(editTargetNote.editorWidth.toLowerCase());
    document
      .querySelectorAll(".tiptap")[0]
      .setAttribute("auto-spacing", user.preferences.autoSpacing);
  }, [
    editTargetNote.editorWidth,
    editTargetNote.name,
    user.preferences.autoSpacing,
  ]);

  useEffect(() => {
    document
      .querySelectorAll(".tiptap")[0]
      .setAttribute("auto-spacing", user.preferences.autoSpacing);
  }, [user.preferences.autoSpacing]);

  useEffect(() => {
    const editor = document.querySelectorAll(".tiptap")[0];
    editor.classList.remove("compact", "medium", "large");
    editor.classList.add(editorWidth);
  }, [editorWidth]);

  return (
    <div className="">
      <div className="flex justify-between px-8">
        <div className="flex-grow">
          <input
            type="text"
            className="input bg-base-300 shadow-none border-none w-full text-2xl font-bold pl-0 focus:outline-none focus:shadow-none"
            placeholder="Untitled note"
            value={noteName}
            maxLength={150}
            onChange={handleNoteNameChange}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-square"
            onClick={() => {
              handleSaveButtonClick(false);
            }}
            disabled={saving}
          >
            {saving ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <MemoizedSave />
            )}
          </button>

          <button className="btn btn-square" onClick={handleCloseButtonClick}>
            <MemoizedX />
          </button>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-square">
              {exporting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <MemoizedEllipsis />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-1 w-44 p-2 shadow-sm mt-2"
            >
              <div className="dropdown dropdown-left dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn flex justify-start"
                >
                  <MemoizedLayout size={20} />
                  Editor width
                </div>
                <ul
                  tabIndex={1}
                  className="dropdown-content menu bg-base-200 rounded-box z-1 w-42 p-2 shadow-sm mt-2"
                >
                  {widthOptions.map((option, id) => {
                    return (
                      <button
                        key={id}
                        className="btn flex justify-between"
                        onClick={() => {
                          handleEditorWidthChange(option);
                        }}
                      >
                        {option[0].toUpperCase() + option.substring(1)}
                        {editorWidth === option.toLowerCase() ? (
                          <MemoizedCheckIcon size={20} />
                        ) : (
                          ""
                        )}
                      </button>
                    );
                  })}
                </ul>
              </div>

              <div className="dropdown dropdown-left dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn flex justify-start"
                >
                  <MemoizedPencilLine size={20} />
                  Editor mode
                </div>
                <ul
                  tabIndex={1}
                  className="dropdown-content menu bg-base-200 rounded-box z-1 w-42 p-2 shadow-sm mt-2"
                >
                  <button
                    className="btn flex justify-start"
                    onClick={() => {
                      editor.setEditable(true);
                      setEditable(true);
                    }}
                  >
                    Edit
                    {editable ? <MemoizedCheckIcon size={20} /> : ""}
                  </button>
                  <button
                    className="btn flex justify-start"
                    onClick={() => {
                      editor.setEditable(false);
                      setEditable(false);
                    }}
                  >
                    Read
                    {editable === false ? <MemoizedCheckIcon size={20} /> : ""}
                  </button>
                </ul>
              </div>

              <button
                className="btn flex justify-start"
                onClick={() => {
                  setToolBarVisible(!toolBarVisible);
                }}
              >
                <MemoizedMenuBar size={20} />
                {toolBarVisible ? "Hide toolbar" : "Show toolbar"}
              </button>

              <button
                className="btn flex justify-start"
                onClick={handleMarkDownExport}
              >
                <MemoizedFileUp className="shrink-0" size={20} />
                Export MD
              </button>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-8">
        <div className="text-secondary flex items-center gap-4 mt-2 max-w-2xl">
          <MemoizedNotebookChip
            bookIcon={true}
            notebookName={editTargetNote.assignedTo[1]}
            source={APP_CONSTANTS.VIEW_NOTE_EDITOR}
          ></MemoizedNotebookChip>

          <p> • </p>

          <p className="min-w-fit">
            {"Last edited " +
              dateDistanceFromNow(objectToDate(editTargetNote.lastEditDate))}
          </p>

          <p> • </p>

          <div className="min-w-fit">
            {!noteContentDelta && !noteNameDelta && !editorWidthDelta ? (
              <p className="flex items-center gap-2">
                Up to date <MemoizedCheckCircle2 className="text-primary" />
              </p>
            ) : (
              <p className="flex items-center gap-2">
                Unsaved changes{" "}
                <MemoizedFileWarning className="animate-pulse text-warning" />
              </p>
            )}
          </div>
        </div>
        <div className="text-secondary flex items-center gap-4 mt-2">
          <p>{wordCount + " " + (wordCount == 1 ? "word" : "words")}</p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default EditorMenuTopBar;
