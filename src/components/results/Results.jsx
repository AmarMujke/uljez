import { useEffect, useRef } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../button/Button";

import Leaderboard from "./Leaderboard";

export default function Results({
  players,
  votes,
  leaderboard = {},
  updateLeaderboard,
  resetGame,
  nextRound,
}) {
  const { t } = useLanguage();
  const impostor = players.find((p) => p.role === "imposter");
  const votedOut = Object.values(votes || {});
  const impostorCaught = votedOut.includes(impostor?.name);
  const hasUpdateLeaderboard = useRef(false);

  useEffect(() => {
    if (!impostor || hasUpdateLeaderboard.current) return;

    if (!impostorCaught) {
      updateLeaderboard?.(impostor.name);
      hasUpdateLeaderboard.current = true;
    }
  }, [impostor, impostorCaught, updateLeaderboard]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-600 p-6">
      <div className="w-full max-w-2xl grid grid-cols-1 gap-6">
        <div className="bg-gradient-to-br from-purple-700 to-purple-500 rounded-3xl shadow-2xl p-6 border-4 border-yellow-400">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-4 text-center">
            {t.gameOver}
          </h2>

          <p
            className={`text-xl text-center font-bold mb-4 ${
              impostorCaught ? "text-green-300" : "text-red-400"
            }`}
          >
            {impostorCaught ? t.impostorCaught : t.impostorWins}
          </p>

          <div className="bg-purple-800 text-yellow-300 rounded-xl shadow-lg p-4 mb-4">
            <h3 className="text-lg mb-2 text-center">{t.impostorWas}</h3>
            <p className="text-3xl font-bold uppercase text-center">
              {impostor?.name}
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={nextRound}
              className="flex-1 min-w-[120px] whitespace-nowrap bg-purple-800 text-yellow-300 h-12 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              {t.playAgain || "Next Round"}
            </Button>

            <Button
              onClick={() => {
                resetGame?.();
                if (!resetGame) window.location.reload();
              }}
              className="flex-1 min-w-[120px] whitespace-nowrap bg-red-600 text-white h-12 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              {t.endGame || "End Game"}
            </Button>
          </div>
        </div>

        <Leaderboard leaderboard={leaderboard} highlight={impostor?.name} />
      </div>
    </div>
  );
}
