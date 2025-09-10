import { useEffect, useState } from "react";

export default function PlayerCard({ player, onNext }) {
  const [flipped, setFlipped] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-purple-400 p-4">
      {/* Player name */}
      <h2 className="text-2xl/7 font-bold uppercase text-white mb-4">
        {player.name}
      </h2>

      {/* Card and wrapper*/}
      <div
        className="relative w-72 h-44 mb-8 cursor-pointer perspective"
        onClick={handleFlip}
      >
        <div
          className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180 scale-105" : ""
          }`}
        >
          {/* Front */}
          <div
            className={`absolute w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold backface-hidden border-4 ${
              hasBeenFlipped
                ? "border-red-500 shadow-lg shadow-red-500"
                : "border-green-500 shadow-lg shadow-green-500"
            }`}
          >
            Tap to see your word
          </div>

          {/* Back */}
          <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg backface-hidden rotate-y-180">
            {showWord ? player.word : ""}
          </div>
        </div>
      </div>

      {/* Text and button container */}
      <div className="flex flex-col items-center">
        <p
          className={`text-lg text-white text-center transition-opacity duration-300 ${
            !flipped && hasBeenFlipped
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          Word has been seen! <br /> Hand the phone to next player.
        </p>

        <button
          onClick={onNext}
          className={`mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform ${
            !flipped && hasBeenFlipped
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          Next Player
        </button>
      </div>
    </div>
  );
}
