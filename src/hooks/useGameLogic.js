// GAME LOGIC HOOK
import { usePersistentState } from "./usePersistentState.js";
import { assignRoles, assignWords } from "../utils/gameLogic.js";

import wordsEn from "../data/words-en.json";
import wordsBs from "../data/words-bs.json";
import wordsDe from "../data/words-de.json";

const wordPacks = {
  english: wordsEn,
  bosnian: wordsBs,
  german: wordsDe,
};

export function useGameLogic() {
  const [players, setPlayers] = usePersistentState("players", []);
  const [leaderboard, setLeaderboard] = usePersistentState("leaderboard", {});
  const [roundLanguage, setRoundLanguage] = usePersistentState(
    "roundLanguage",
    "english"
  );
  const [phase, setPhase] = usePersistentState("phase", "setup");
  const [currentIndex, setCurrentIndex] = usePersistentState("currentIndex", 0);
  const [votes, setVotes] = usePersistentState("votes", null);
  

  const startGame = (playerNames, language) => {
    setRoundLanguage(language);
    const roles = assignRoles(playerNames.map((name) => ({ name })));
    const wordsAssigned = assignWords(roles, wordPacks[language].food);
    const playersWithFlipped = wordsAssigned.map(p => ({ ...p, hasBeenFlipped: false }));
    setPlayers(playersWithFlipped);
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

    [
      "players",
      "votes",
      "leaderboard",
      "phase",
      "currentIndex",
      "roundLanguage",
    ].forEach((key) => localStorage.removeItem(key));
  };

  const nextRound = () => {
    if (!players || players.length === 0) {
      setPhase("setup");
      return;
    }

    const names = players.map((player) => player.name);
    const roles = assignRoles(names.map((name) => ({ name })));
    const wordsAssigned = assignWords(roles, wordPacks[roundLanguage].food);
    const playersWithFlipped = wordsAssigned.map(p => ({ ...p, hasBeenFlipped: false }));

    setPlayers(playersWithFlipped);
    setCurrentIndex(0);
    setVotes(null);
    setPhase("viewing");
  };

  const exitGame = () => {
    setPhase("setup");
    resetGame();
  };

  return {
    players,
    leaderboard,
    roundLanguage,
    phase,
    currentIndex,
    votes,
    setPlayers,
    setPhase,
    startGame,
    nextPlayer,
    handleVotes,
    updateLeaderboard,
    resetGame,
    nextRound,
    exitGame,
  };
}
