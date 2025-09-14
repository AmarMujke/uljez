import PlayerCard from "./components/viewing/PlayerCard.jsx";
import Voting from "./components/voting/Voting.jsx";
import CountdownCircle from "./components/countdown/CountDownCircle.jsx";
import SetupPhase from "./components/setup/SetupPhase.jsx";
import Results from "./components/results/Results.jsx";

import { LanguageProvider } from "./context/LanguageProvider.jsx";
import { useGameLogic } from "./hooks/useGameLogic.js";

export default function App() {
  const {
    players,
    leaderboard,
    phase,
    currentIndex,
    votes,
    setPhase,
    setPlayers,
    countdownDuration,
    startGame,
    nextPlayer,
    handleVotes,
    updateLeaderboard,
    resetGame,
    nextRound,
    exitGame,
  } = useGameLogic();

  return (
    <LanguageProvider>
      {phase === "setup" && <SetupPhase onStart={startGame} />}
      {phase === "viewing" && (
        <PlayerCard player={players[currentIndex]} onNext={nextPlayer} onExit={exitGame} setPlayers={setPlayers} />
      )}
      {phase === "countdown" && (
        <CountdownCircle duration={countdownDuration * 60} onComplete={() => setPhase("voting")} starter={players[0].name}/>
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
