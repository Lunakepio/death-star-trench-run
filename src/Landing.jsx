import { Suspense } from "react";
// import { Composer } from "./Experience";
import { LandingExperience } from "./LandingExperience";
import { Web } from "./Web";
import { Canvas } from "@react-three/fiber";
import { Composer } from "./Experience";

export const Landing = () => {
  return (
    <>
      <div className="" style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadows="basic"
          dpr={[1, 1]}
          gl={{
            antialias: false,
            stencil: false,
            depth: false,
          }}
        >
          <color attach="background" args={["#000"]} />
          <Suspense fallback={null}>
            <LandingExperience />
            </Suspense>
            <Composer />
        </Canvas>
        <Web />
      </div>
    </>
  );
};
