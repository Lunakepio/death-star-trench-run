import { Suspense, useMemo, useState, useContext } from "react";

import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import {
  KeyboardControls,
  Loader,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { Web } from "./Web";
import "./globals.scss";
import { Landing } from "./Landing";
import { GameContext } from "./main";
import { LoadingScreen } from "./LoadingScreen";

export const Controls = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  boost: "boost",
  shoot: "shoot",
  slow: "slow",
  reset : "reset",
};

function App() {
  const [count, setCount] = useState(0);
  const {status, setStatus} = useContext(GameContext);


  return (
    <div className="" style={{ width: "100vw", height: "100vh" }}>
      {status !== "done" ? <Landing /> : <Game />}
      <LoadingScreen />
    </div>
  );
}

function Game(){
  const map = useMemo(
    () => [
      { name: Controls.up, keys: ["KeyW", "ArrowUp"] },
      { name: Controls.down, keys: ["KeyS", "ArrowDown"] },
      { name: Controls.left, keys: ["KeyA", "ArrowLeft"] },
      { name: Controls.right, keys: ["KeyD", "ArrowRight"] },
      { name: Controls.boost, keys: ["Space"] },
      { name: Controls.slow, keys: ["Shift"] },
      { name: Controls.shoot, keys: ["KeyE", "Click"] },
      { name: Controls.reset, keys: ["KeyR"] },
    ],
    []
  );
  return (
    
    <Canvas
        dpr={[1, 1]}
        gl={{ antialias: false, stencil: false,depth: false }}
        // style={{ cursor: "none"}}
  >
    <color attach="background" args={[0.0015, 0.0015, 0.0025]} />
    <Suspense>
      <Physics gravity={[0, 0, 0]}>
        <KeyboardControls map={map}>
          <Experience />
        </KeyboardControls>
      </Physics>
      {/* <Preload all /> */}
    </Suspense>
  </Canvas>
  )
}

export default App;
