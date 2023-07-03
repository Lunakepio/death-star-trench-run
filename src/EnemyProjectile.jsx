import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { PositionalAudio } from "@react-three/drei";

export const Projectile = ({
  position,
  rotation,
  forwardVector,
  setParticles,
}) => {
  const ref = useRef();
  const meshRef = useRef();
  const geometryRef = useRef();
  const realPosition = position
    .clone()
    .add(forwardVector.clone().multiplyScalar(+2));
  const frameCount = useRef(0);
  const [shouldRemove, setShouldRemove] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  useFrame(() => {
    frameCount.current++;
    if (!shouldRemove && frameCount.current < 15 && ref.current) {
      ref.current.applyImpulse(forwardVector.clone().multiplyScalar(0.2));
    }

    if (frameCount.current > 300) {
      setShouldRemove(true);
      setShouldHide(true);
    }
    if (shouldRemove) {
      if(meshRef.current) {
        meshRef.current.visible = false;
      }
    
    }
  });

  return shouldHide ? null : (
    <RigidBody
      ref={ref}
      gravityScale={0}
      type="Dynamic"
      position={realPosition}
      rotation={rotation}
      name="playerProjectile"
      restitution={0}
      onCollisionEnter={({ manifold }) => {
        const positionShot = manifold.solverContactPoint(0);
        setParticles((prev) => [
          ...prev,
          {
            position: positionShot,
            scale: 0.3,
          },
        ]);
        setShouldRemove(true);
      }}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[0.05, 0.05, 4]} ref={geometryRef} />
        <meshPhongMaterial
          emissive="#00FF00"
          emissiveIntensity={4}
          toneMapped={false}
        />
        <PositionalAudio
          url="/sounds/tieBlaster.wav"
          distance={10}
          volume={0.1}
          loop={false}
          autoplay={true}
        />
      </mesh>
    </RigidBody>
  );
};
