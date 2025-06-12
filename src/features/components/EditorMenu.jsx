import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { useToolBarVisibilityStore } from "../../store/toolBarVisibilityStore";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListChecks,
  Code,
  SquareCode,
  TextQuote,
  Table,
  Video,
  Link,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  PaintBucket,
  TableCellsMerge,
  TableCellsSplit,
  SquareX,
  SquareFunction,
  Mic,
} from "lucide-react";
import AddRowIcon from "../../assets/AddRowIcon";
import AddColumnIcon from "../../assets/AddColumnIcon";
import DeleteRowIcon from "../../assets/DeleteRowIcon";
import DeleteColumnIcon from "../../assets/DeleteColumnIcon";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import EditorLinkModal from "../components/EditorLinkModal";
import EditorYouTubeLinkModal from "../components/EditorYouTubeLinkModal";
import GenericModal from "../components/GenericModal";
import EditorMenuTopBar from "./EditorMenuTopBar";
import MathEquationModal from "./MathEquationModal";
import SpeechRecognitionModal from "./SpeechRecognitionModal";

function EditorMenu() {
  const fonts = [
    "Plus Jakarta Sans",
    "Arial",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Monospace",
    "Sans serif",
    "Serif",
  ];

  const { editor } = useCurrentEditor();
  const { toolBarVisible } = useToolBarVisibilityStore();

  // Editor optimization
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      // Text styles
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isUnderline: editor.isActive("underline"),
      isStrike: editor.isActive("strike"),
      isSubscript: editor.isActive("subscript"),
      isSuperscript: editor.isActive("superscript"),
      isBlockquote: editor.isActive("blockquote"),
      isCode: editor.isActive("code"),
      isCodeBlock: editor.isActive("codeBlock"),
      isMath: editor.isActive("inlineMath"),

      // Headings
      isH1: editor.isActive("heading", { level: 1 }),
      isH2: editor.isActive("heading", { level: 2 }),
      isH3: editor.isActive("heading", { level: 3 }),
      isH4: editor.isActive("heading", { level: 4 }),
      isH5: editor.isActive("heading", { level: 5 }),
      isH6: editor.isActive("heading", { level: 6 }),

      // Lists
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isTaskList: editor.isActive("taskList"),

      // Alignment
      isAlignLeft: editor.isActive({ textAlign: "left" }),
      isAlignCenter: editor.isActive({ textAlign: "center" }),
      isAlignRight: editor.isActive({ textAlign: "right" }),
      isAlignJustify: editor.isActive({ textAlign: "justify" }),

      // Embeds
      isLink: editor.isActive("link"),
      isYouTube: editor.isActive("youtube"),

      // Table
      isTable: editor.isActive("table"),

      // Font family
      activeFont: getActiveFont(editor),

      // History
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  function Section({ title, children, className }) {
    return (
      <div className="w-fit">
        <h3 className="font-bold mb-2 text-secondary">{title}</h3>
        <div className={className}>{children}</div>
      </div>
    );
  }

  function getActiveFont(editor) {
    for (let font of fonts) {
      if (editor.isActive("textStyle", { fontFamily: font })) {
        return font; // Return the first active font
      }
    }
    return fonts[0]; // Default to the first font if none is active
  }

  function addLinkToEditor(url) {
    if (editor.view.state.selection.empty) {
      const domain = url.split("//")[1].split("/")[0];
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .insertContent(domain)
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }

  function addYouTubeLinkToEditor(youtubeURL) {
    editor.commands.setYoutubeVideo({ src: youtubeURL });
  }

  function addMathToEditor(latexExpression) {
    editor.commands.insertContent({
      type: "inlineMath",
      attrs: { latex: latexExpression },
    });
  }

  function addSpeechContent(speechContent) {
    editor.commands.insertContent(speechContent);
  }

  return (
    <div className="">
      <EditorLinkModal addLinkToEditor={addLinkToEditor}></EditorLinkModal>
      <EditorYouTubeLinkModal
        addYouTubeLinkToEditor={addYouTubeLinkToEditor}
      ></EditorYouTubeLinkModal>
      <MathEquationModal addMathToEditor={addMathToEditor} />
      <SpeechRecognitionModal addSpeechContent={addSpeechContent} />
      <GenericModal></GenericModal>
      <EditorMenuTopBar></EditorMenuTopBar>
      <div
        className={
          toolBarVisible
            ? "flex flex-wrap justify-between w-full select-none px-8"
            : "hidden"
        }
      >
        {/* Headings */}
        <Section
          title="Headings"
          className={"grid grid-cols-3 grid-rows-2 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            title="Cmd + Alt + 1"
            className={
              editorState.isH1 ? "btn btn-primary btn-square" : "btn btn-square"
            }
          >
            <Heading1></Heading1>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            title="Cmd + Alt + 2"
            className={
              editorState.isH2 ? "btn btn-primary btn-square" : "btn btn-square"
            }
          >
            <Heading2 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            title="Cmd + Alt + 3"
            className={
              editorState.isH3 ? "btn btn-primary btn-square" : "btn btn-square"
            }
          >
            <Heading3 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
            }}
            title="Cmd + Alt + 4"
            className={
              editorState.isH4 ? "btn btn-primary btn-square" : "btn btn-square"
            }
          >
            <Heading4 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
            }}
            title="Cmd + Alt + 5"
            className={
              editorState.isH5 ? "btn btn-primary btn-square" : "btn btn-square"
            }
          >
            <Heading5 />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
            }}
            title="Cmd + Alt + 6"
            className={
              editorState.isH6 ? "btn btn-primary btn-square" : "btn btn-square"
            }
          >
            <Heading6 />
          </button>
        </Section>

        {/* Font */}
        <Section title="Font styles" className={"grid gap-1"}>
          <select
            className="select w-fit bg-base-200"
            value={editorState.activeFont}
            onChange={(e) => {
              editor.chain().focus().setFontFamily(e.target.value).run();
            }}
          >
            {fonts.map((font, id) => {
              return (
                <option key={id} value={font}>
                  {font}
                </option>
              );
            })}
          </select>
          {/* <button className="btn btn-square"> // Implement later.
            <PaintBucket />
          </button> */}
        </Section>

        {/* Text Formatting */}
        <Section
          title="Text Formatting"
          className={"grid grid-cols-4 grid-rows-2 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
            title="Cmd + B"
            className={
              editorState.isBold
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Bold />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleItalic().run();
            }}
            title="Cmd + I"
            className={
              editorState.isItalic
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Italic />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleUnderline().run();
            }}
            title="Cmd + U"
            className={
              editorState.isUnderline
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Underline />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleStrike().run();
            }}
            title="Cmd + Shift + S"
            className={
              editorState.isStrike
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Strikethrough />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleSubscript().run();
            }}
            title="Cmd + ,"
            className={
              editorState.isSubscript
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Subscript />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleSuperscript().run();
            }}
            title="Cmd + ."
            className={
              editorState.isSuperscript
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Superscript />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleBlockquote().run();
            }}
            title="Cmd + Shift + B"
            className={
              editorState.isBlockquote
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <TextQuote />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setHorizontalRule().run();
            }}
            className={"btn btn-square"}
          >
            <Minus />
          </button>
        </Section>

        {/* Lists */}
        <Section title="Lists" className={"grid grid-cols-2 grid-rows-1 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
            title="Cmd + Shift + 7"
            className={
              editorState.isOrderedList
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <ListOrdered />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
            title="Cmd + Shift + 8"
            className={
              editorState.isBulletList
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <List />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleTaskList().run();
            }}
            title="Cmd + Shift + 9"
            className={
              editorState.isTaskList
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <ListChecks />
          </button>
        </Section>

        {/* Alignment */}
        <Section
          title="Alignment"
          className={"grid grid-cols-2 grid-rows-2 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("left").run();
            }}
            title="Cmd + Shift + L"
            className={
              editorState.isAlignLeft
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignLeft />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("center").run();
            }}
            title="Cmd + Shift + E"
            className={
              editorState.isAlignCenter
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignCenter />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("right").run();
            }}
            title="Cmd + Shift + R"
            className={
              editorState.isAlignRight
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignRight />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setTextAlign("justify").run();
            }}
            title="Cmd + Shift + J"
            className={
              editorState.isAlignJustify
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <AlignJustify />
          </button>
        </Section>

        {/* Table */}
        <Section title="Table" className={"grid grid-cols-4 grid-rows-2 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor
                .chain()
                .focus()
                .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
                .run();
            }}
            className={
              editorState.isTable
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Table />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().addRowAfter().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <AddRowIcon></AddRowIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().addColumnAfter().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <AddColumnIcon></AddColumnIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().deleteRow().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <DeleteRowIcon></DeleteRowIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().deleteColumn().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <DeleteColumnIcon></DeleteColumnIcon>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().mergeCells().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <TableCellsMerge></TableCellsMerge>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().splitCell().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <TableCellsSplit></TableCellsSplit>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().deleteTable().run();
            }}
            className={"btn btn-square"}
            disabled={!editorState.isTable}
          >
            <SquareX></SquareX>
          </button>
        </Section>

        {/* Embeds */}
        <Section title="Links" className={"grid grid-cols-2 grid-rows-1 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.EDITOR_LINK_MODAL)
                .showModal();
            }}
            className={
              editorState.isLink
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Link></Link>
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.EDITOR_YOUTUBE_LINK_MODAL)
                .showModal();
            }}
            className={
              editorState.isYouTube
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Video></Video>
          </button>
        </Section>

        {/* Code, Math*/}
        <Section title="Other" className={"grid grid-cols-2 grid-rows-2 gap-1"}>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleCode().run();
            }}
            title="Cmd + E"
            className={
              editorState.isCode
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <Code />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
            title="Cmd + Alt + C"
            className={
              editorState.isCodeBlock
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <SquareCode />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.MATH_EQUATION_MODAL)
                .showModal();
            }}
            className={
              editorState.isMath
                ? "btn btn-primary btn-square"
                : "btn btn-square"
            }
          >
            <SquareFunction />
          </button>

          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.SPEECH_RECOGNITION_MODAL)
                .showModal();
            }}
            className="btn btn-square"
          >
            <Mic />
          </button>
        </Section>

        {/* History */}
        <Section
          title="History"
          className={"grid grid-cols-2 grid-rows-1 gap-1"}
        >
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().undo().run();
            }}
            title="Cmd + Z"
            className={"btn btn-square"}
            disabled={!editorState.canUndo}
          >
            <Undo />
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().redo().run();
            }}
            title="Cmd + Shift + Z"
            className={"btn btn-square"}
            disabled={!editorState.canRedo}
          >
            <Redo />
          </button>
        </Section>
      </div>
      <div className={toolBarVisible ? "divider" : "hidden"}></div>
    </div>
  );
}

export default EditorMenu;
