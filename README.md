# Uljez 🎭

A small practice project built with **React + Vite**.  
It’s a party-style game where players try to spot the **impostor** who doesn’t know the correct word.

👉 Live Demo: [https://uljez.onrender.com/](https://uljez.onrender.com/)

---

## 📖 About the Project
This project was created as a **practice exercise** to improve my skills with React, hooks, and component-based architecture.  
It’s not a commercial product, but a fun demo that shows:
- State management with custom hooks
- Local storage persistence (to handle accidental refreshes)
- Multilingual support (English, Bosnian, German)
- Interactive UI with TailwindCSS
- Game logic: role assignment, voting, leaderboard, and impostor detection

---

## 🛠️ Tech Stack
- **React** (Vite setup)
- **TailwindCSS** for styling
- **Context API** for language handling
- **Custom hooks** for game logic
- **Render** for deployment

---

## 🚀 Features
- Add players and assign roles automatically
- Random categories & words each round
- Built-in card reveal logic to minimize cheating
- Countdown timer before voting
- Voting phase with results
- Leaderboard that persists across rounds
- Works in multiple languages 🇬🇧 🇧🇦 🇩🇪

---

## 📦 Running Locally
```bash
# install dependencies
npm install

# start development server
npm run dev

# build for production
npm run build
