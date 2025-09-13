export default function Leaderboard({
  leaderboard,
  highlight
}) {
  const rows = Object.entries(leaderboard)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className={`w-full max-w-md`}>
      <div className="bg-gradient-to-br from-purple-800 to-purple-700 rounded-2xl p-3 shadow-xl border-2 border-yellow-400/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-yellow-300 font-extrabold text-lg">
            Leaderboard
          </h4>
          <span className="text-sm text-yellow-200/80">
            {rows.length} players
          </span>
        </div>

        <div className="bg-purple-900/60 rounded-lg divide-y divide-yellow-500/20 overflow-hidden max-h-56">
          {rows.length === 0 ? (
            <div className="p-4 text-center text-yellow-200/70 italic">
              No scores yet
            </div>
          ) : (
            rows.map((r, i) => {
              const isTop = i === 0;
              const isHighlight = highlight && highlight === r.name;
              return (
                <div
                  key={r.name}
                  className={`flex items-center justify-between px-4 py-3 transition-colors group ${
                    isTop ? "bg-purple-800/60" : "bg-transparent"
                  } ${isHighlight ? "ring-2 ring-yellow-400/60" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
                        isTop
                          ? "bg-yellow-400 text-purple-900"
                          : "bg-purple-700 text-yellow-200"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-yellow-100 font-semibold leading-tight">
                        {r.name}
                      </div>
                      <div className="text-yellow-200/70 text-xs">
                        {isTop ? "Leader" : `#${i + 1}`}
                      </div>
                    </div>
                  </div>

                  <div className="text-yellow-200 font-bold text-lg min-w-[48px] text-right">
                    {r.score}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-3 text-xs text-yellow-200/70">
          Tip: top player is highlighted. Scores persist between rounds.
        </div>
      </div>
    </div>
  );
}
