import { Suspense, useMemo, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, Loader, Preload, Stats } from "@react-three/drei";
import { XR, XRButton } from "@react-three/xr";

export const Controls = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
  boost: "boost",
  shoot: "shoot",
  slow: "slow",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.up, keys: ["KeyW", "ArrowUp"] },
      { name: Controls.down, keys: ["KeyS", "ArrowDown"] },
      { name: Controls.left, keys: ["KeyA", "ArrowLeft"] },
      { name: Controls.right, keys: ["KeyD", "ArrowRight"] },
      { name: Controls.boost, keys: ["Space"] },
      { name: Controls.slow, keys: ["Shift"] },
      { name: Controls.shoot, keys: ["KeyE", "Click"] },
    ],
    []
  );

  return (
    <div className='' style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        dpr={[1, 1]}
        gl={{
          powerPreference: "low-power",
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <XR>
          <color attach='background' args={[0.0015, 0.0015, 0.0025]} />
          <Suspense>
            <Physics gravity={[0, 0, 0]}>
              <KeyboardControls map={map}>
                <Experience />
              </KeyboardControls>
            </Physics>
            <Stats />
            <Preload all />
          </Suspense>
        </XR>
      </Canvas>
      <XRButton
        style={{
          position: "absolute",
          bottom: "50px",
          right: "50px",
          zIndex: "100",
        }}
        mode={"VR"}
      />
      <Loader />
    </div>
  );
}

export default App;
