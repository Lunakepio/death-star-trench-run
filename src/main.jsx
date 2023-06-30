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

  const [setup, setSetup] = useState({
    mouse: false,
    invertLook: false,
    graphics: "medium",
    sound: true,
  });

  const [status, setStatus] = useState("");

  return(
    <GameContext.Provider value={{ gameStarted, setGameStarted, setup, setSetup, status, setStatus }}>
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