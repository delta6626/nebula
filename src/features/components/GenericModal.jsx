function GenericModal({
  id,
  title,
  textContent,
  firstButtonClassName,
  secondButtonClassName,
  firstButtonOnClick,
  secondButtonOnClick,
  firstButtonText,
  secondButtonText,
}) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{textContent}</p>
        <div className="modal-action">
          <button className={firstButtonClassName} onClick={firstButtonOnClick}>
            {firstButtonText}
          </button>
          <button
            className={secondButtonClassName}
            onClick={secondButtonOnClick}
          >
            {secondButtonText}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default GenericModal;
