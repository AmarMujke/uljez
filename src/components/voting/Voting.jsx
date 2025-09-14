import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../button/Button";

export default function Voting({ players, onVoteEnd }) {
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(180);
  const { t } = useLanguage();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } if (selected) {
      onVoteEnd({ imposter: selected || null});
    } else {
      const imposter = players.find((p) => p.role === "imposter");
      onVoteEnd({ imposter: imposter.name});
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
            className={`cursor-pointer rounded-2xl p-6 text-center font-bold text-xl transition transform hover:scale-105 backdrop-blur-2xl 
            ${
              selected === p.name
                ? "bg-yellow-400/70 text-purple-900 border-4 border-purple-700 shadow-[0_0_25px_rgba(255,215,0,0.6)]"
                : "bg-white/10 text-yellow-200 border border-white/20 hover:bg-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.15),0_8px_25px_rgba(0,0,0,0.5)]"
            }`}
          >
            {p.name}
          </div>
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!selected}
        className={`mt-8 px-8 py-3 rounded-full font-bold shadow-xl  backdrop-blur-2xl transition-transform shadow-[inset_0_0_15px_rgba(255,255,255,0.15),0_8px_25px_rgba(0,0,0,0.5)] ${
          selected
            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-purple-900 hover:scale-105"
            : "bg-white/10 text-yellow-600 cursor-not-allowed"
        }`}
      >
        {t.confirmVote}
      </Button>
    </div>
  );
}
