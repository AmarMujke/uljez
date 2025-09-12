import { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";

export default function PlayerCard({ player, onNext }) {
  const [flipped, setFlipped] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setHasBeenFlipped(false);
  }, [player]);

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!hasBeenFlipped) setHasBeenFlipped(true);
    setTimeout(() => {
      setShowWord(true);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-yellow-600 p-4 transition-colors duration-700">
      <h2 className="text-2xl/7 font-bold uppercase text-white mb-4">
        {player.name}
      </h2>

      <div
        className="relative w-72 h-44 mb-8 cursor-pointer perspective"
        onClick={handleFlip}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180 scale-105" : ""
          }`}
        >
          {/* FRONT OF THE CARD */}
          <div
            className={`absolute w-full h-full uppercase text-center rounded-2xl bg-linear-to-r from-yellow-900 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold backface-hidden border-4 ${
              hasBeenFlipped
                ? "border-red-500 shadow-lg shadow-red-500"
                : "border-green-500 shadow-lg shadow-green-500"
            }`}
          >
            {t.tapToSee}
          </div>

          {/* BACK OF THE CARD */}
          <div className="absolute w-full h-full uppercase rounded-2xl bg-linear-to-r from-yellow-900 to-yellow-600  flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg backface-hidden rotate-y-180">
            {showWord ? player.word : ""}
          </div>
        </div>
      </div>

      {/* TEXT AND BUTTON */}
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

        <button
          onClick={onNext}
          className={`mt-2 uppercase bg-gradient-to-l from-purple-800 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform ${
            !flipped && hasBeenFlipped
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {t.next}
        </button>
      </div>
    </div>
  );
}
