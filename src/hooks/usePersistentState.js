import { useState, useEffect } from "react";

export function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);

    if (stored === null) return defaultValue;

    try {
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
