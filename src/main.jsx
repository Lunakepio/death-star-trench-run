import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { useRef } from "react";
import TimerComponent from "./Timer";

const initialContext = {
  gameStarted: false,
  setGameStarted: () => {},
};

const GameContext = createContext(initialContext);

const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const [setup, setSetup] = useState({
    mouse: true,
    invertLook: false,
    graphics: 1,
    sound: true,
  });

  const [reset, setReset] = useState(false);
  const [playerAlive, setPlayerAlive] = useState(true);
  //change status to done to work on the actual game
  const [status, setStatus] = useState("done");

  const [particles, setParticles] = useState([]);

  const playerHealth = useRef(100);

  const [health, setHealth] = useState(100);
  const healthCount = useRef(null);

  const quotes = [
    "Do, or do not. There is no try.",
    "The Force will be with you. Always.",
    "Never tell me the odds!",
    "I find your lack of faith disturbing.",
    "The greatest teacher, failure is.",
    "We have hope. Rebellions are built on hope!",
    "I am one with the Force. The Force is with me.",
    "Every time you fall get back up again.",
    "Stay on target!",
    "Great, kid. Don't get cocky.",
  ];

  const authors = [
    "Yoda",
    "Obi-Wan Kenobi",
    "Han Solo",
    "Darth Vader",
    "Yoda",
    "Jyn Erso",
    "Chirrut Îmwe",
    "Ahsoka Tano",
    "Gold Five",
    "Han Solo",
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const randomAuthor = authors[randomIndex];
  function HealthBar() {
    const healthBarRef = useRef(null);

    useEffect(() => {
      // Update the width of the health bar based on playerHealth
      const healthBar = healthBarRef.current;
      if (health !== playerHealth.current) {
        setHealth(playerHealth.current);
      }
      if (health < 100) {
        healthCount.current.style.color = "#e4e4e470";
      }
      const width = `${health}%`;
      healthBar.style.width = width;
    }, [playerHealth.current, health]);

    return <div className="healthBar" ref={healthBarRef}></div>;
  }


  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        setup,
        setSetup,
        status,
        setStatus,
        reset,
        setReset,
        playerAlive,
        setPlayerAlive,
        particles,
        setParticles,
        playerHealth,
      }}
    >
      {children}
      {gameStarted ? (
        <div className="hud">
          {playerAlive ? (
            <>
              <div className="health">
                <p ref={healthCount}>{health}</p>
                <HealthBar />
                <div className="cols">
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="gameOver">
              <h1>YOU DIED</h1>
              <p>
                The battle is not over yet, will you rise again to save the
                galaxy?
              </p>
                <div className="quotes">
                <p className="quote">"{randomQuote}"</p>
                <p className="author">- {randomAuthor}</p>
              </div>
              <button onClick={() => setReset(true)}>RETRY</button>
            </div>
          )}
        </div>
      ) : null}
    </GameContext.Provider>
  );
};

const container = document.getElementById("root");

ReactDOM.createRoot(container).render(
  <GameProvider>
    <App />
  </GameProvider>
);

export { GameContext, GameProvider };
