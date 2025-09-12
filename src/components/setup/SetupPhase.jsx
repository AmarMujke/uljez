import { useState, useRef } from "react";

export default function SetupPhase({ onStart }) {
  const [language, setLanguage] = useState("english");
  const [newPlayer, setNewPlayer] = useState("");
  const [playerNames, setPlayerNames] = useState([]);
  const listRef = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
        Uljez
      </h1>

      {/* SETUP CARD */}
      <div className="relative bg-gradient-to-br from-yellow-300/90 to-yellow-500/80 backdrop-blur-md rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6 w-full max-w-md flex flex-col gap-4 border border-purple-800/60">
        <div className="absolute inset-0 rounded-3xl border-2 border-purple-600/50 shadow-[inset_0_0_25px_rgba(128,0,128,0.5)] pointer-events-none"></div>

        {/* SELECT LANGUAGE */}
        <select
          className="p-3 border-2 border-purple-700 bg-purple-900/70 text-yellow-200 rounded-lg text-lg focus:outline-none shadow-inner"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="english">English</option>
          <option value="bosnian">Bosnian</option>
          <option value="german">German</option>
        </select>

        {/* ADD PLAYER INPUT */}
        <input
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          placeholder="Enter player name"
          className="p-3 border-2 border-purple-700 bg-purple-900/70 text-yellow-200 placeholder-yellow-300 rounded-lg text-lg w-full focus:outline-none shadow-inner"
        />

        {/* ADD PLAYER BUTTON */}
        <button
          onClick={() => {
            if (newPlayer.trim()) {
              setPlayerNames([...playerNames, newPlayer.trim()]);
              setNewPlayer(""); // clear input
              listRef.current?.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
          className="bg-purple-800 text-yellow-300 py-3 rounded-lg font-bold shadow-[0_5px_15px_rgba(128,0,128,0.6)] hover:bg-purple-700 transition"
        >
          Add Player
        </button>

        {/* START GAME */}
        <button
          onClick={() => onStart(playerNames, language)}
          className="bg-purple-900 text-yellow-300 py-3 rounded-lg font-bold shadow-[0_5px_20px_rgba(0,0,0,0.6)] hover:bg-purple-800 transition mt-2"
        >
          Start Game
        </button>
      </div>

      {/* PLAYERS LIST */}
      <div
        ref={listRef}
        className="mt-6 w-full max-w-md h-84 overflow-y-auto flex flex-col gap-3 p-3 rounded-2xl bg-purple-950/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.7)] border border-yellow-500/40"
      >
        {playerNames.length === 0 ? (
          <p className="text-center text-yellow-300/70 uppercase italic">
            Please add players
          </p>
        ) : (
          playerNames.map((name, i) => (
            <div
              key={i}
              className="flex justify-between uppercase items-center bg-gradient-to-r from-purple-800 to-purple-900 text-yellow-200 px-4 py-3 rounded-xl shadow-md border border-yellow-400"
            >
              <span className="font-semibold">{name}</span>
              <button
                onClick={() =>
                  setPlayerNames(playerNames.filter((_, idx) => idx !== i))
                }
                className="text-red-400 hover:text-red-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
