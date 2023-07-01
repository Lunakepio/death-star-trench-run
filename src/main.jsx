import React, { createContext, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { useRef } from 'react'
import gsap from 'gsap'

const initialContext = {
    gameStarted: false,
    setGameStarted: () => {},
}

const GameContext = createContext(initialContext);

const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(true);

  const [setup, setSetup] = useState({
    mouse: false,
    invertLook: false,
    graphics: 1,
    sound: true,
  });

  const [reset, setReset] = useState(false);
  const [playerAlive, setPlayerAlive] = useState(true);

  const [status, setStatus] = useState("done");

  const [particles, setParticles] = useState([]);

  const playerHealth = useRef(100);

  function HealthBar() {
    const healthBarRef = useRef(null);
  
    useEffect(() => {
      // Update the width of the health bar based on playerHealth
      const healthBar = healthBarRef.current;
      const width = `${playerHealth.current}%`;
      healthBar.style.width = width;
      
    }, [playerHealth.current]);
  
    return <div className="healthBar" ref={healthBarRef}></div>;
  }
  return(
    <GameContext.Provider value={{ gameStarted, setGameStarted, setup, setSetup, status, setStatus, reset, setReset, playerAlive, setPlayerAlive, particles, setParticles, playerHealth }}>
      {children}
      <div className="hud">
      <div className="health">
        <HealthBar />
      </div>
    </div>
    </GameContext.Provider>
  )
}

const container = document.getElementById('root')

ReactDOM.createRoot(container).render(
  <GameProvider>
    <App />
  </GameProvider>
)

export { GameContext, GameProvider}