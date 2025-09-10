export function assignRoles(players) {
  const imposterIndex = Math.floor(Math.random() * players.length);
  return players.map((player, index) => ({
    ...player,
    role: index === imposterIndex ? "imposter" : "player",
  }));
}

export function assignWords(players, categoryWords) {
  const wordObj = categoryWords[Math.floor(Math.random() * categoryWords.length)];
  return players.map(player => ({
    ...player,
    word: player.role === "imposter" ? wordObj.imposter : wordObj.normal
  }));
}
