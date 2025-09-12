import { useState } from "react";
import PlayerCard from "./components/viewing/PlayerCard.jsx";
import Voting from "./components/voting/Voting.jsx";
import CountdownCircle from "./components/countdown/CountDownCircle.jsx";
import SetupPhase from "./components/setup/SetupPhase.jsx";
import { assignRoles, assignWords } from "./utlis/gameLogic.js";
import Results from "./components/results/Results.jsx";

import wordsEn from "./data/words-en.json";
import wordsBs from "./data/words-bs.json";
import wordsDe from "./data/words-de.json";
import {LanguageProvider} from "./context/LanguageProvider.jsx";

const wordPacks = {
  english: wordsEn,
  bosnian: wordsBs,
  german: wordsDe,
};

export default function App() {
  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState("setup"); // setup, viewing, countdown, voting, results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState(null);

  const startGame = (playerNames, language) => {
    const roles = assignRoles(playerNames.map((name) => ({ name })));
    const wordsAssigned = assignWords(roles, wordPacks[language].food);
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

  return (
    <LanguageProvider>
      {phase === "setup" && <SetupPhase onStart={startGame} />}
      {phase === "viewing" && (
        <PlayerCard player={players[currentIndex]} onNext={nextPlayer} />
      )}
      {phase === "countdown" && (
        <CountdownCircle duration={10} onComplete={() => setPhase("voting")} />
      )}
      {phase === "voting" && (
        <Voting players={players} onVoteEnd={handleVotes} />
      )}
      {phase === "results" && <Results players={players} votes={votes} />}
    </LanguageProvider>
  );
}
