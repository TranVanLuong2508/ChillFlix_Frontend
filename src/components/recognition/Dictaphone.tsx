"use client";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (listening) {
      setInputValue(transcript);
    }
  }, [transcript, listening]);

  if (typeof window !== "undefined" && !browserSupportsSpeechRecognition) {
    return <p>Trình duyệt không hỗ trợ Speech Recognition.</p>;
  }

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <>
      <div className="bg-white">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-2 py-1"
          placeholder="Nói gì đó..."
        />

        <button onClick={handleStartListening}>🎤 Bắt đầu</button>
        <button onClick={handleStopListening}>⛔ Dừng</button>
      </div>
    </>
  );
};
export default Dictaphone;
