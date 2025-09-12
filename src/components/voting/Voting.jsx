import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";

export default function Voting({ players, onVoteEnd }) {
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(180);
  const { t } = useLanguage();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      if (selected) onVoteEnd({ imposter: selected });
    }
  }, [timer, selected, onVoteEnd]);

  const handleSubmit = () => {
    if (selected) {
      onVoteEnd({ imposter: selected });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-900 to-yellow-700 p-6 text-white">
      <h2 className="text-3xl font-extrabold mb-2 text-yellow-300 drop-shadow-md">
        {t.votingPhase}
      </h2>
      <p className="mb-6 text-lg">
        {t.timeLeft} {timer}s
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {players.map((p) => (
          <div
            key={p.name}
            onClick={() => setSelected(p.name)}
            className={`cursor-pointer rounded-2xl p-6 text-center font-bold text-xl shadow-lg transition transform hover:scale-105 
              ${
                selected === p.name
                  ? "bg-yellow-400 text-purple-900 border-4 border-purple-800"
                  : "bg-purple-700 text-yellow-200 border-2 border-yellow-500"
              }`}
          >
            {p.name}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selected}
        className={`mt-8 px-8 py-3 rounded-full font-bold shadow-xl transition-transform ${
          selected
            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-900 hover:scale-105"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        {t.confirmVote}
      </button>
    </div>
  );
}
