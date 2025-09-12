export default function Results({ players, votes }) {
  const impostor = players.find((player) => player.role === "imposter");
  const votedOut = Object.values(votes);
  const impostorCaught = votedOut.includes(impostor.name);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 p-6">
      <div className="bg-gradient-to-br from-purple-700 to-purple-500 text-gold-400 rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border-4 border-yellow-400">
        <h2 className="text-4xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
          Game Over!
        </h2>

        <p
          className={`text-2xl font-bold text-center mb-6 ${
            impostorCaught ? "text-green-300" : "text-red-400"
          }`}
        >
          {impostorCaught
            ? "✅ You caught the impostor!"
            : "❌ The impostor wins!"}
        </p>

        <div className="bg-purple-800 text-yellow-300 w-full rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">The Impostor Was:</h3>
          <p className="text-2xl font-bold">{impostor.name}</p>
        </div>
      </div>
    </div>
  );
}
