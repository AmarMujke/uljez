import { useState, useEffect } from "react";
import Button from "../button/Button";
import { useLanguage } from "../../hooks/useLanguage";

export default function CountdownCircle({
  duration = 180,
  onComplete,
  starter,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [preCountdown, setPrecountdown] = useState(3);
  const [active, setActive] = useState(false);
  const { t } = useLanguage();

  // PRE-COUNTDOWN
  useEffect(() => {
    if (preCountdown > 0) {
      const timer = setTimeout(() => setPrecountdown((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setActive(true);
    }
  }, [preCountdown]);

  // MAIN COUNTDOWN
  useEffect(() => {
    if (!active) return;
    if (timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      onComplete();
    }
  }, [active, timeLeft, onComplete]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = ((duration - timeLeft) / duration) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-900 to-yellow-700 p-6">
      {!active ? (
        // PRE-COUNTDOWN SCREEN
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4 uppercase">{starter} {t.starter}</h2>
          <p className="text-6xl font-extrabold animate-pulse">
            {preCountdown}
          </p>
        </div>
      ) : (
        // MAIN COUNTDOWN
        <div className="relative w-40 h-40 text-center">
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
              <linearGradient
                id="purple-gold"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
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

          {/* SKIP button */}
          <Button
            onClick={onComplete}
            className="px-6 py-3 bg-gradient-to-r from-purple-800 to-purple-600 
                       text-white font-bold rounded-xl shadow-lg 
                       hover:scale-105 transition"
          >
            {t.voteNow}
          </Button>
        </div>
      )}
    </div>
  );
}
