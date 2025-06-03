import { LayoutGrid, Table } from "lucide-react";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function ViewSwitcher() {
  const { notesView, setNotesView } = useCurrentNotesViewStore();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setNotesView(APP_CONSTANTS.VIEW_GRID)}
        className={
          "btn btn-square " +
          (notesView == APP_CONSTANTS.VIEW_GRID ? "btn-active" : "btn-ghost")
        }
      >
        <LayoutGrid></LayoutGrid>
      </button>

      <button
        onClick={() => setNotesView(APP_CONSTANTS.VIEW_TABLE)}
        className={
          "btn btn-square " +
          (notesView == APP_CONSTANTS.VIEW_TABLE ? "btn-active" : "btn-ghost")
        }
      >
        <Table></Table>
      </button>
    </div>
  );
}

export default ViewSwitcher;
