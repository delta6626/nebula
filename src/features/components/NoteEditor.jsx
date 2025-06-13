import MathExtension from "@aarkue/tiptap-math-extension";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import { memo } from "react";
import { Markdown } from "tiptap-markdown";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import EditorMenu from "./EditorMenu";

const MemoizedEditorMenu = memo(EditorMenu);

function NoteEditor() {
  const lowlight = createLowlight(all);
  const { editTargetNote } = useEditTargetNoteStore();

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
