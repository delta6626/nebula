import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function MathEquationModal({ addMathToEditor }) {
  const [latex, setLatex] = useState("");

  function handleInsertClick() {
    addMathToEditor(latex);
    document.getElementById(APP_CONSTANTS.MATH_EQUATION_MODAL).close();
  }

  return (
    <dialog id={APP_CONSTANTS.MATH_EQUATION_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Insert math</h3>
        <p className="mt-2 text-gray-400">
          Craft math with LaTeX—perfect for equations, formulas, and beyond.
          Expressions with known values can be evaluated with a click.
        </p>

        <input
          className={"input focus:input-primary w-full mt-4"}
          placeholder="Type your LaTeX code"
          value={latex}
          onChange={(e) => {
            setLatex(e.target.value);
          }}
        />

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleInsertClick}>
            {APP_CONSTANTS.INSERT}
          </button>
          <button
            className="btn"
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.MATH_EQUATION_MODAL)
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

export default MathEquationModal;
