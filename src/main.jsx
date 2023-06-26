import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


const GameContext = createContext();

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
ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
)

export { GameContext, GameProvider}