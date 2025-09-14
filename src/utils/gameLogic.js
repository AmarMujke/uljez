// GAME LOGIC HELPER FUNCTIONS
export function assignRoles(players) {
  const shuffledArray = shuffleArray(players).map((player) => ({ ...player }));
  const imposterIndex = Math.floor(Math.random() * shuffledArray.length);
  return shuffledArray.map((player, index) => ({
    ...player,
    role: index === imposterIndex ? "imposter" : "player",
  }));
}

// FISHER-YATES TO CREATE EQUAL PROBABILITY FOR EACH PLAYER
function shuffleArray(array) {
  const helperArray = [...array];
  for (let i = helperArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [helperArray[i], helperArray[j]] = [helperArray[j], helperArray[i]];
  }
  return helperArray;
}

export function assignWords(players, categoryWords) {
  const wordObj =
    categoryWords[Math.floor(Math.random() * categoryWords.length)];
  return players.map((player) => ({
    ...player,
    word: player.role === "imposter" ? wordObj.imposter : wordObj.normal,
  }));
}
