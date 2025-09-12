import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import Voting from "./components/Voting";
import CountdownCircle from "./components/CountDownCircle.jsx";
import SetUpPhase from "./components/SetUpPhase.jsx";
import { assignRoles, assignWords } from "./gameLogic.js";
import words from "./words.json";
import Results from "./components/Results.jsx";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState("setup"); // setup, viewing, countdown, voting, results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState(null);

  const startGame = (playerNames, language) => {
    const roles = assignRoles(playerNames.map((name) => ({ name })));
    const wordsAssigned = assignWords(roles, words.food); // TODO: use language for category selection
    setPlayers(wordsAssigned);
    setPhase("viewing");
  };

  const nextPlayer = () => {
    if (currentIndex + 1 < players.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("countdown");
    }
  };

  const handleVotes = (votes) => {
    setVotes(votes);
    setPhase("results");
  };

  if (phase === "setup") {
    return <SetUpPhase onStart={startGame} />;
  }

  if (phase === "viewing") {
    return <PlayerCard player={players[currentIndex]} onNext={nextPlayer} />;
  }

  if (phase === "countdown") {
    return (
      <CountdownCircle
        duration={10} 
        onComplete={() => setPhase("voting")}
      />
    );
  }

  if (phase === "voting") {
    return <Voting players={players} onVoteEnd={handleVotes} />;
  }

  if (phase === "results") {
    return <Results players={players} votes={votes} />;
  }
}
