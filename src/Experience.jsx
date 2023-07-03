import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  SoftShadows,
  Stars,
} from "@react-three/drei";
import { Trench } from "./Death_star_trench_run";
import { Xwing } from "./X-wing";
import {
  Bloom,
  EffectComposer,
  BrightnessContrast,
  LUT,
  HueSaturation,
  SSR,
  SMAA,
  SSAO,
  N8AO,
  GodRays,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction, LUTCubeLoader } from "postprocessing";
import { useLoader, useFrame } from "@react-three/fiber";
import { Player } from "./Player";
import { RigidBody } from "@react-three/rapier";
import { Opening } from "./Opening";
import { GameContext } from "./main";
import { useContext, useRef, useState } from "react";
import { Enemies } from "./Enemies";
import { TrenchTurret } from "./Trench";
import Particles from "./Particles";

export const Experience = () => {
  const finalValue = 500.5020;
  const { gameStarted, setGameStarted, setup, particles } = useContext(GameContext);
  return (
    <>
      <directionalLight position-y={100} intensity={0.3} />
      {/* <ambientLight intensity={0.5} /> */}
      <fog attach="fog" args={["#1b2e43",80, 100]} color={[0.0015,0.0015,0.0025]}/>
      <Stars
        radius={1000}
        depth={50}
        count={30000}
        factor={20}
        saturation={0}
        fade
      />
      <group position={[0,60,-20]}>
      {/* <Opening /> */}
      </group>
      {/* <Enemies /> */}
      {particles.map((particle, index) => ( // Render HitParticles on each hit.
          <Particles key={index} position={particle.position} scale={0.3}  />
        ))}
        <World setup={setup}/>
      <Player setup={setup} /> 
      {/* <OrbitControls /> */}
      {/* <SoftShadows /> */}
      {/* <OrbitControls/> */}
      <Environment preset="night"  />

      <Composer setup={setup} />
    </>
  );
};

function World() {
  const visible = false;
  const ref = useRef();
  const left = useRef();
  const right = useRef();
  const [position, setPosition] = useState(2000);

  return (
    <group>
      <TrenchTurret />

       <RigidBody type="fixed" name="floor" position={[4.2, -2.5,position]}>
        <mesh>
          <boxGeometry args={[1, 10, 4000]} />
          <meshBasicMaterial color="red" visible={visible} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" name="floor" position={[-4.2, -2.5, position]}>
        <mesh>
          <boxGeometry args={[1, 10, 4000]} />
          <meshBasicMaterial color="green" visible={visible} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" name="floor" position={[0, -10, position]}>
        <mesh>
          <boxGeometry args={[10, 10, 4000]} />
          <meshBasicMaterial color="blue" visible={visible} />
        </mesh>
      </RigidBody> 
    </group>
  );
}
export const Composer = () => {
  const { gameStarted, setGameStarted, setup } = useContext(GameContext);

  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");
  const all = {
    enabled: true,
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    DITHERING: false,
    temporalResolveMix: 0.9,
    temporalResolveCorrectionMix: 0.4,
    maxSamples: 0,
    resolutionScale: 1,
    blurMix: 0.2,
    blurKernelSize: 8,
    BLUR_EXPONENT: 10,
    rayStep: 0.5,
    intensity: 2.5,
    maxRoughness: 1,
    jitter: 0.13,
    jitterSpread: 0.25,
    jitterRough: 0.01,
    roughnessFadeOut: 1,
    rayFadeOut: 0,
    MAX_STEPS: 30,
    NUM_BINARY_SEARCH_STEPS: 6,
    maxDepthDifference: 5,
    maxDepth: 1,
    thickness: 3,
    ior: 1.45
  };

  const graphics = setup.graphics;

  const multisamplingValues = [0, 0, 8];

  return (
    <EffectComposer multisampling={multisamplingValues[graphics]} disableGamma disableNormalPass>
      <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
      <LUT lut={texture} />
      <BrightnessContrast brightness={0} contrast={0.1} />
      <HueSaturation hue={0} saturation={-0.25} />
      {graphics === 2 ? (
        <>
        <SMAA />
      <N8AO aoRadius={8} distanceFalloff={0.2} intensity={10} />
      <Noise opacity={0.03} />
        </>
      ) : null}
    </EffectComposer>
  );
}
