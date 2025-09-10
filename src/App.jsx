import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import Voting from "./components/Voting";
import words from "./words.json";
import { assignRoles, assignWords } from "./gameLogic.js";

export default function App() {
  const [language, setLanguage] = useState("english");
  const [playerNames, setPlayerNames] = useState([""]);
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("setup"); // setup, viewing, voting, results
  const [newPlayer, setNewPlayer] = useState([]);

  const startGame = () => {
    const roles = assignRoles(playerNames.map((name) => ({ name })));
    const wordsAssigned = assignWords(roles, words.food); // choose category
    setPlayers(wordsAssigned);
    setPhase("viewing");
  };

  const nextPlayer = () => {
    if (currentIndex + 1 < players.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("voting");
    }
  };

  const handleVotes = (votes) => {
    console.log("Votes:", votes);
    setPhase("results");
  };

  if (phase === "setup") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-purple-400 p-4">
        <h1 className="text-4xl font-extrabold mb-6 text-purple-800 drop-shadow-lg">
          Uljez
        </h1>
        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md flex flex-col gap-4">
          <select
            className="p-3 border rounded-lg text-lg"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="bosnian">Bosnian</option>
            <option value="german">German</option>
          </select>

          <input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Enter player name"
            className="p-3 border rounded-lg text-lg w-full"
          />

          <button
            onClick={() => {
              if (newPlayer.trim()) {
                setPlayerNames([...playerNames, newPlayer.trim()]);
                setNewPlayer(""); // clear input
              }
            }}
            className="bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 font-bold transition"
          >
            Add Player
          </button>

          <ul className="list-disc ml-4 mt-2">
            {playerNames
            .filter(name => name.trim() !== "")
            .map((name, i) => (
              <li key={i} className="flex justify-between items-center">
                {name}
                <button
                  onClick={() =>
                    setPlayerNames(playerNames.filter((_, idx) => idx !== i))
                  }
                  className="text-red-500 ml-2"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={startGame}
            className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-bold transition mt-2"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (phase === "viewing") {
    return <PlayerCard player={players[currentIndex]} onNext={nextPlayer} />;
  }

  if (phase === "voting") {
    return <Voting players={players} onVoteEnd={handleVotes} />;
  }

  if (phase === "results") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="w-full max-w-xs bg-white rounded-3xl shadow-xl p-4 flex flex-col items-center">
          <div className="flex flex-col items-center min-h-screen justify-center bg-gradient-to-b from-gray-200 to-gray-400 p-4">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
              <pre>{JSON.stringify(players, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
