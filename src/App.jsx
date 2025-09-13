import { useEffect, useState } from "react";
import PlayerCard from "./components/viewing/PlayerCard.jsx";
import Voting from "./components/voting/Voting.jsx";
import CountdownCircle from "./components/countdown/CountDownCircle.jsx";
import SetupPhase from "./components/setup/SetupPhase.jsx";
import { assignRoles, assignWords } from "./utlis/gameLogic.js";
import Results from "./components/results/Results.jsx";

import wordsEn from "./data/words-en.json";
import wordsBs from "./data/words-bs.json";
import wordsDe from "./data/words-de.json";
import { LanguageProvider } from "./context/LanguageProvider.jsx";

const wordPacks = {
  english: wordsEn,
  bosnian: wordsBs,
  german: wordsDe,
};

export default function App() {
  const [players, setPlayers] = useState(
    () => JSON.parse(localStorage.getItem("players")) || []
  );
  const [leaderboard, setLeaderboard] = useState(
    () => JSON.parse(localStorage.getItem("leaderboard")) || {}
  );
    const [roundLanguage, setRoundLanguage] = useState(
    () => localStorage.getItem("roundLangauge") || "english"
  );
  
  const [phase, setPhase] = useState(localStorage.getItem("phase") || "setup"); // existing phases: setup, viewing, countdown, voting, results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState(null);


  const startGame = (playerNames, language) => {
    setRoundLanguage(language);
    const roles = assignRoles(playerNames.map((name) => ({ name })));
    const wordsAssigned = assignWords(roles, wordPacks[language].food);
    setPlayers(wordsAssigned);
    setCurrentIndex(0);
    setVotes(null);
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

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("phase", phase);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    localStorage.setItem("roundLanguage", roundLanguage);
  }, [players, phase, leaderboard, roundLanguage]);

  const updateLeaderboard = (impostorName) => {
    setLeaderboard((prev) => ({
      ...prev,
      [impostorName]: (prev[impostorName] || 0) + 1,
    }));
  };

  const resetGame = () => {
    setPlayers([]);
    setVotes({});
    setLeaderboard({});
    setPhase("setup");
    setCurrentIndex(0);
    setRoundLanguage("english");
    localStorage.removeItem("leaderboard");
  };

  const nextRound = () => {
    if (!players || players.length === 0){
      setPhase("setup");
      return;
    }

    const names = players.map((player) => player.name);
    const roles = assignRoles(names.map((name) => ({name})));
    const wordsAssigned = assignWords(roles, wordPacks[roundLanguage].food);

    setPlayers(wordsAssigned);
    setCurrentIndex(0);
    setVotes(null);
    setPhase("viewing");
  }

  return (
    <LanguageProvider>
      {phase === "setup" && <SetupPhase onStart={startGame} />}
      {phase === "viewing" && (
        <PlayerCard player={players[currentIndex]} onNext={nextPlayer} />
      )}
      {phase === "countdown" && (
        <CountdownCircle duration={3} onComplete={() => setPhase("voting")} />
      )}
      {phase === "voting" && (
        <Voting players={players} onVoteEnd={handleVotes} />
      )}
      {phase === "results" && (
        <Results
          players={players}
          votes={votes}
          leaderboard={leaderboard}
          updateLeaderboard={updateLeaderboard}
          nextRound={nextRound}
          resetGame={resetGame}
        />
      )}
    </LanguageProvider>
  );
}
