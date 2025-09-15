import { useState, useRef } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import Button from "../button/Button.jsx";
import InfoModal from "./InfoModal";

export default function SetupPhase({ onStart }) {
  const [newPlayer, setNewPlayer] = useState("");
  const [playerNames, setPlayerNames] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const listRef = useRef(null);
  const [countdownMinutes, setCountdownMinutes] = useState(3);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-6">
      {/* INFO button */}
      <div
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-yellow-300 text-2xl font-bold cursor-pointer
                   bg-purple-800/50 backdrop-blur-md border border-yellow-400/40 rounded-full shadow-lg hover:bg-purple-700/60 transition active:scale-95 active:translate-y-1"
        onClick={() => {
          setTimeout(() => {
            setShowInfo(true);
          }, 200);
        }}
        title="How to play"
      >
        ?
      </div>

      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
        ULJEZ
      </h1>

      {/* SETUP CARD */}
      <div className="relative bg-gradient-to-br from-yellow-300/90 to-yellow-500/80 backdrop-blur-md rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6 w-full max-w-md flex flex-col gap-4 border border-purple-800/60">
        <div className="absolute inset-0 rounded-3xl border-2 border-purple-600/50 shadow-[inset_0_0_25px_rgba(128,0,128,0.5)] pointer-events-none"></div>

        {/* SELECT LANGUAGE */}
        <select
          className="p-3 rounded-lg text-lg w-full
             bg-purple-900/40 backdrop-blur-md text-white 
             border border-yellow-400/30
             shadow-[inset_0_0_12px_rgba(0,0,0,0.4)]
             focus:outline-none focus:ring-2 focus:ring-yellow-400/60
             focus:scale-[0.98] transition-all duration-200"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="english">English 🇬🇧</option>
          <option value="bosnian">Bosanski 🇧🇦</option>
          <option value="german">Deutsch 🇩🇪</option>
        </select>

        {/* COUNTDOWN DURATION */}
        <select
          className="p-3 rounded-lg text-lg w-full
            bg-purple-900/40 backdrop-blur-md text-white 
            border border-yellow-400/30
            shadow-[inset_0_0_12px_rgba(0,0,0,0.4)]
            focus:outline-none focus:ring-2 focus:ring-yellow-400/60
            focus:scale-[0.98] transition-all duration-200"
          value={countdownMinutes}
          onChange={(e) => setCountdownMinutes(Number(e.target.value))}
        >
          <option value={3}>{t.duration3}</option>
          <option value={5}>{t.duration5}</option>
          <option value={7}>{t.duration7}</option>
        </select>

        {/* ADD PLAYER INPUT */}
        <input
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder={t.enterPlayerName}
          className="p-3 rounded-lg text-lg w-full
             bg-purple-900/40 backdrop-blur-md text-white placeholder-white
             border border-yellow-400/30
             shadow-[inset_0_0_12px_rgba(0,0,0,0.4)]
             focus:outline-none focus:ring-2 focus:ring-yellow-400/60
             focus:scale-[0.98] transition-all duration-200"
        />

        {/* ADD PLAYER button */}
        <Button
          onClick={() => {
            if (newPlayer.trim()) {
              setPlayerNames([...playerNames, newPlayer.trim()]);
              setNewPlayer("");
              listRef.current?.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
          className="bg-purple-800 text-yellow-300 py-3 rounded-lg font-bold shadow-[0_5px_15px_rgba(128,0,128,0.6)] hover:bg-purple-700 transition"
        >
          {t.addPlayer}
        </Button>

        {/* START GAME */}
        <Button
          onClick={() => onStart(playerNames, language, countdownMinutes)}
          disabled={playerNames.length < 3}
          className={`bg-purple-900 text-yellow-300 py-3 rounded-lg font-bold shadow-[0_5px_20px_rgba(0,0,0,0.6)]
                      hover:bg-purple-800 transition active:translate-y-1 active:scale-95 mt-2
                      ${
                        playerNames.length < 3
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
        >
          {t.startGame}
        </Button>
      </div>

      {/* PLAYERS LIST */}
      <div
        ref={listRef}
        className="mt-6 w-full max-w-md h-84 overflow-y-auto flex flex-col gap-3 p-3 rounded-2xl bg-purple-950/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border border-yellow-500/40"
      >
        {playerNames.length === 0 ? (
          <p className="text-center text-yellow-300/70 uppercase italic">
            {t.pleaseAddPlayers}
          </p>
        ) : (
          playerNames.map((name, i) => (
            <div
              key={i}
              className="flex justify-between uppercase items-center bg-gradient-to-r from-purple-800 to-purple-900 text-yellow-200 px-4 py-3 rounded-xl shadow-md border border-yellow-400"
            >
              <span className="font-semibold">{name}</span>
              <Button
                onClick={() =>
                  setPlayerNames(playerNames.filter((_, idx) => idx !== i))
                }
                className="font-bold text-xs"
              >
                ✕
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
