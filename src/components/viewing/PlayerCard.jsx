import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../button/Button";
import ExitModal from "./ExitModal";

export default function PlayerCard({ player, onNext, onExit, setPlayers }) {
  const [flipped, setFlipped] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setHasBeenFlipped(!!player.hasBeenFlipped);
  }, [player]);

  const handleFlip = () => {
    setFlipped(!flipped);

    if (!player.hasBeenFlipped) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.name === player.name ? { ...p, hasBeenFlipped: true } : p
        )
      );
    }
    setShowWord(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-yellow-600 p-4 transition-colors duration-700">
      {/* EXIT button */}
      <div
        onClick={() => setShowExitModal(true)}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white text-2xl font-bold cursor-pointer
             bg-white/10 backdrop-blur-md border border-white/30 rounded-full shadow-lg hover:bg-white/20  transition active:scale-95 active:translate-y-1"
        title="Exit"
      >
        ×
      </div>

      {/* EXIT MODAL */}
      {showExitModal && (
        <ExitModal
          onConfirm={onExit}
          onCancel={() => setShowExitModal(false)}
        />
      )}

      <h2 className="text-2xl/7 font-bold uppercase text-white mb-4">
        {player.name}
      </h2>

      {/* CARD */}
      <div
        className="relative w-72 h-44 mb-8 cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            flipped ? "rotate-y-180 scale-105" : ""
          }`}
          style={{ willChange: "transform" }}
        >
          {/* FRONT OF THE CARD */}
          <div
            className={`absolute w-full h-full uppercase text-center rounded-2xl flex items-center justify-center text-white text-2xl font-bold backface-hidden
              border-4 shadow-lg
              bg-gradient-to-br from-yellow-700/40 to-yellow-400/30 backdrop-blur-lg
              ${
                hasBeenFlipped
                  ? "border-red-500 shadow-red-500/60"
                  : "border-green-500 shadow-green-500/60"
              }`}
          >
            {t.tapToSee}
          </div>

          {/* BACK OF THE CARD */}
          <div
            className={`absolute w-full h-full uppercase rounded-2xl flex items-center justify-center text-white text-2xl font-bold border-4 backface-hidden rotate-y-180
              bg-gradient-to-br from-yellow-700/40 to-yellow-600/30 backdrop-blur-lg shadow-lg border-yellow-300`}
          >
            {showWord ? player.word : ""}
          </div>
        </div>
      </div>

      {/* TEXT AND button */}
      <div className="flex flex-col items-center">
        <p
          className={`text-lg text-white text-center transition-opacity duration-300 ${
            !flipped && hasBeenFlipped
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {t.wordSeen} <br /> {t.handPhone}
        </p>

        <Button
          onClick={onNext}
          className={`mt-2 uppercase bg-gradient-to-l from-purple-800 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform ${
            !flipped && hasBeenFlipped
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {t.next}
        </Button>
      </div>
    </div>
  );
}
