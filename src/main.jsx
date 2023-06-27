import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const initialContext = {
    gameStarted: false,
    setGameStarted: () => {},
    gameStopped: false,
}

const GameContext = createContext(initialContext);

const GameProvider = ({ children }) => {
  const [gameStopped, setGameStopped] = useState(false);
  const [gameStarted, setGameStarted] = useState(true);
  const [graphicsQuality, setGraphicsQuality] = useState(1);
  const [mouseControls, setMouseControls] = useState(false);
  const [projectiles, setProjectiles] = useState([]);

  const restartGame = () => {
  setGameStarted(true);
  setGameStopped(false);
    };

  return(
    <GameContext.Provider value={{ gameStarted, setGameStarted, graphicsQuality, setGraphicsQuality, mouseControls, setMouseControls, projectiles, setProjectiles, gameStopped, restartGame }}>
      {children}
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