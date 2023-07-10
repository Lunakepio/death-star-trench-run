import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  SoftShadows,
  Stars,
  Lightformer,
  Float,
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
import { useControls } from "leva";

export const Experience = () => {
  const finalValue = 500.502;
  const { gameStarted, setGameStarted, setup, particles } =
    useContext(GameContext);
  return (
    <>
      <directionalLight intensity={0.3} position={[-10, 10, 0]} />
      {/* <ambientLight intensity={0.5} /> */}
      <fog
        attach="fog"
        args={["#1b2e43", 80, 100]}
        color={[0.0015, 0.0015, 0.0025]}
      />
      <Stars
        radius={1000}
        depth={50}
        count={30000}
        factor={20}
        saturation={0}
        fade
      />
      {/* {particles.map((particle, index) => (
        <Particles
          key={index}
          position={particle.position}
          scale={particle.scale}
        />
      ))} */}
      <group position={[0, 60, -20]}>{/* <Opening /> */}</group>
      {/* <Enemies /> */}
      <World />
      <Player />
      {/* <Lightformers /> */}
      <Environment resolution={256}>
        <Lightformers />
      </Environment>
      {/* <OrbitControls /> */}
      <Composer />
    </>
  );
};

function Lightformers() {
  return (
    <>
      <Lightformer
        intensity={0.3}
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 10, 0]}
        scale={[20000, 20000, 20000]}
      />
    </>
  );
}

function World() {
  const visible = false;
  const ref = useRef();
  const left = useRef();
  const right = useRef();
  const [position, setPosition] = useState(2000);

  return (
    <group>
      <TrenchTurret />

      <RigidBody type="fixed" name="floor" position={[4.2, -2.5, position]}>
        <mesh>
          <boxGeometry args={[1, 10, 4000]} />
          <meshBasicMaterial color="red" visible={visible} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" name="floor" position={[-4.3, -2.5, position]}>
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

  const graphics = setup.graphics;

  const multisamplingValues = [0, 0, 8];

  return (
    <EffectComposer
      multisampling={multisamplingValues[graphics]}
      disableGamma
      disableNormalPass
    >
      <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
      {/* <LUT lut={texture} /> */}
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
};
