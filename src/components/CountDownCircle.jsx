import { useState, useEffect } from "react";

export default function CountdownCircle({ duration = 180, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = ((duration - timeLeft) / duration) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-yellow-700 p-6">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#FFD700"
            strokeWidth="12"
            fill="transparent"
          />
          <defs>
            <linearGradient id="purple-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#purple-gold)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-500 ease-linear filter drop-shadow-lg"
          />
        </svg>

        <p className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-yellow-200">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
