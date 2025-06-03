import { Disc, LoaderIcon, Mic } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";

function SpeechRecognitionModal({ addSpeechContent }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  function handleInsertClick() {
    addSpeechContent(transcript);
    resetTranscript();
  }

  return (
    <dialog id={APP_CONSTANTS.SPEECH_RECOGNITION_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="flex text-lg font-bold items-center gap-2">
          Smart dictation
          {listening === true ? (
            <Disc size={20} className="text-error animate-pulse" />
          ) : (
            ""
          )}
        </h3>
        {browserSupportsSpeechRecognition ? (
          <div className="mt-2">
            <p
              className={
                transcript.length === 0
                  ? "text-gray-400"
                  : "" + " max-h-[300px] overflow-y-auto"
              }
            >
              {transcript
                ? transcript
                : "Speak your thoughts and we'll capture it for you."}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-gray-400">
            Sorry, your browser doesn't support speech recognition. Please
            switch to Google Chrome or Microsoft Edge if you would like to use
            this feature.
          </p>
        )}
        <div className="modal-action">
          <button
            className={"btn btn-primary"}
            disabled={!browserSupportsSpeechRecognition}
            onClick={
              listening
                ? SpeechRecognition.stopListening
                : SpeechRecognition.startListening
            }
          >
            {listening === true ? "Stop listening" : "Start listening"}
          </button>
          <button
            className="btn btn-primary"
            disabled={transcript.length === 0}
            onClick={handleInsertClick}
          >
            {APP_CONSTANTS.INSERT}
          </button>
          <button
            className="btn"
            onClick={() => {
              resetTranscript();
              document
                .getElementById(APP_CONSTANTS.SPEECH_RECOGNITION_MODAL)
                .close();
            }}
          >
            {APP_CONSTANTS.CLOSE}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default SpeechRecognitionModal;
