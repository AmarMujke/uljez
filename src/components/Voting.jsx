import { useState, useEffect } from "react";

export default function Voting({ players, onVoteEnd }) {
  const [votes, setVotes] = useState({});
  const [timer, setTimer] = useState(180); // 3 minutes

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      onVoteEnd(votes);
    }
  }, [timer, votes, onVoteEnd]);

  const vote = (voter, target) => {
    setVotes(prev => ({ ...prev, [voter]: target }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-200 to-purple-200 p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 drop-shadow-md">
        Voting Phase
      </h2>
      <p className="mb-4 text-lg text-gray-800">Time left: {timer}s</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {players.map(p => (
          <div
            key={p.name}
            className="bg-white rounded-2xl shadow-xl p-4 flex justify-between items-center"
          >
            <span className="text-xl font-semibold">{p.name}</span>
            <select
              onChange={e => vote(p.name, e.target.value)}
              className="p-2 border rounded-lg text-lg"
            >
              <option value="">Vote</option>
              {players.filter(t => t.name !== p.name).map(target => (
                <option key={target.name} value={target.name}>{target.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={() => onVoteEnd(votes)}
        className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
      >
        Submit Votes
      </button>
    </div>
  );
}
