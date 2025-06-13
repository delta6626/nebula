import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import EditorMenu from "./EditorMenu";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { memo } from "react";
import { Markdown } from "tiptap-markdown";
import MathExtension from "@aarkue/tiptap-math-extension";

const MemoizedEditorMenu = memo(EditorMenu);

function NoteEditor() {
  const lowlight = createLowlight(all);
  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();

  const extensions = [
    StarterKit.configure({
      dropcursor: false,
      codeBlock: false,
      heading: false,
      gapcursor: true,
      code: {
        HTMLAttributes: {
          spellcheck: false,
        },
      },
    }),
    Markdown,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    Placeholder.configure({
      placeholder: APP_CONSTANTS.NOTE_EDITOR_PLACEHOLDER,
    }),
    Underline,
    Subscript,
    Superscript,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight: lowlight,
      HTMLAttributes: {
        spellcheck: false,
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    Link.configure({
      openOnClick: true,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["https", "http"],
      HTMLAttributes: {
        spellcheck: false,
      },
    }),
    Youtube.configure({
      nocookie: true,
    }),
    TextStyle,
    FontFamily,
    MathExtension.configure({
      evaluation: true,
    }),
  ];

  return (
    <div className="flex flex-col h-full">
      <EditorProvider
        content={editTargetNote.content}
        extensions={extensions}
        slotBefore={<MemoizedEditorMenu></MemoizedEditorMenu>}
        autofocus={true}
        shouldRerenderOnTransaction={false}
        editorContainerProps={{
          className: "prose text-xl min-w-full flex-grow-1 min-h-0",
        }}
      ></EditorProvider>
    </div>
  );
}

export default NoteEditor;
