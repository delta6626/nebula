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
import { useEditableStore } from "../../store/editableStore";

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
  const { editable } = useEditableStore();

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
            ? `flex flex-nowrap overflow-x-scroll mb-6 pb-6 border-b-1 border-base-200 lg:mb-0 lg:pb-0 lg:border-b-0 lg:overflow-hidden lg:flex lg:flex-wrap gap-5 justify-between w-full select-none px-8 ${!editable ? "opacity-30" : ""}`
            : "hidden"
        }
      >
        {/* Headings */}
        <Section
          title="Headings"
          className={"flex lg:grid grid-cols-3 grid-rows-2 gap-1"}
        >
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt + 1">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
              disabled={!editable}
              className={
                editorState.isH1
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Heading1></Heading1>
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt + 2">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
              disabled={!editable}
              className={
                editorState.isH2
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Heading2 />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt + 3">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
              }}
              disabled={!editable}
              className={
                editorState.isH3
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Heading3 />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt + 4">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 4 }).run();
              }}
              disabled={!editable}
              className={
                editorState.isH4
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Heading4 />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt + 5">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 5 }).run();
              }}
              disabled={!editable}
              className={
                editorState.isH5
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Heading5 />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt+ 6">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 6 }).run();
              }}
              disabled={!editable}
              className={
                editorState.isH6
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Heading6 />
            </button>
          </div>
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
          className={"flex lg:grid grid-cols-4 grid-rows-2 gap-1"}
        >
          <div className="tooltip tooltip-top" data-tip="Cmd + B">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleBold().run();
              }}
              className={
                editorState.isBold
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Bold />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + I">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleItalic().run();
              }}
              className={
                editorState.isItalic
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Italic />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + U">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleUnderline().run();
              }}
              className={
                editorState.isUnderline
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Underline />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + S">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleStrike().run();
              }}
              className={
                editorState.isStrike
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Strikethrough />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + ,">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleSubscript().run();
              }}
              className={
                editorState.isSubscript
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Subscript />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + .">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleSuperscript().run();
              }}
              className={
                editorState.isSuperscript
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Superscript />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + B">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleBlockquote().run();
              }}
              className={
                editorState.isBlockquote
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <TextQuote />
            </button>
          </div>
          {/* No tooltip for this button */}
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
        <Section
          title="Lists"
          className={"flex lg:grid grid-cols-2 grid-rows-1 gap-1"}
        >
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + 7">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleOrderedList().run();
              }}
              className={
                editorState.isOrderedList
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <ListOrdered />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + 8">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleBulletList().run();
              }}
              className={
                editorState.isBulletList
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <List />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + 9">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleTaskList().run();
              }}
              className={
                editorState.isTaskList
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <ListChecks />
            </button>
          </div>
        </Section>

        {/* Alignment */}
        <Section
          title="Alignment"
          className={"flex lg:grid grid-cols-2 grid-rows-2 gap-1"}
        >
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + L">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().setTextAlign("left").run();
              }}
              className={
                editorState.isAlignLeft
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <AlignLeft />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + E">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().setTextAlign("center").run();
              }}
              className={
                editorState.isAlignCenter
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <AlignCenter />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + R">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().setTextAlign("right").run();
              }}
              className={
                editorState.isAlignRight
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <AlignRight />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Shift + J">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().setTextAlign("justify").run();
              }}
              className={
                editorState.isAlignJustify
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <AlignJustify />
            </button>
          </div>
        </Section>

        {/* Table */}
        <Section
          title="Table"
          className={"flex lg:grid grid-cols-4 grid-rows-2 gap-1"}
        >
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
        <Section
          title="Links"
          className={"flex lg:grid grid-cols-2 grid-rows-1 gap-1"}
        >
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
        <Section
          title="Other"
          className={"flex lg:grid grid-cols-2 grid-rows-2 gap-1"}
        >
          <div className="tooltip tooltip-top" data-tip="Cmd + E">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleCode().run();
              }}
              className={
                editorState.isCode
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <Code />
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Cmd + Alt + C">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().toggleCodeBlock().run();
              }}
              className={
                editorState.isCodeBlock
                  ? "btn btn-primary btn-square"
                  : "btn btn-square"
              }
            >
              <SquareCode />
            </button>
          </div>
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
          className={"flex lg:grid grid-cols-2 grid-rows-1 gap-1"}
        >
          <div className="tooltip tooltip-top" data-tip="Cmd + Z">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().undo().run();
              }}
              className={"btn btn-square"}
              disabled={!editorState.canUndo}
            >
              <Undo />
            </button>
          </div>
          <div className="tooltip tooltip-left" data-tip="Cmd + Shift + Z">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus().redo().run();
              }}
              className={"btn btn-square"}
              disabled={!editorState.canRedo}
            >
              <Redo />
            </button>
          </div>
        </Section>
      </div>
      <div
        className={toolBarVisible ? "hidden lg:flex divider" : "hidden"}
      ></div>
    </div>
  );
}

export default EditorMenu;
