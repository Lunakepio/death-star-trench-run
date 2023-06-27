import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const initialContext = {
    gameStarted: false,
    setGameStarted: () => {},
}

const GameContext = createContext(initialContext);

const GameProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(true);
  const [graphicsQuality, setGraphicsQuality] = useState(1);
  const [mouseControls, setMouseControls] = useState(false);
  const [projectiles, setProjectiles] = useState([]);

  return(
    <GameContext.Provider value={{ gameStarted, setGameStarted, graphicsQuality, setGraphicsQuality, mouseControls, setMouseControls, projectiles, setProjectiles }}>
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