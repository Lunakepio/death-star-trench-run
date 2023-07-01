import React, { useRef, useState, useContext} from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { PositionalAudio } from "@react-three/drei";




export const Projectile = ({ position, rotation, forwardVector, enemy, setParticles }) => {
  const ref = useRef();
  const meshRef = useRef();
  const geometryRef = useRef();
  const [shouldRemove, setShouldRemove] = useState(false);
  const realPosition = position
    .clone()
    .add(forwardVector.clone().multiplyScalar(+2));
  const frameCount = useRef(0);
  useFrame(() => {
    frameCount.current++;
    if (!shouldRemove && frameCount.current < 15 && ref.current) {
      ref.current.applyImpulse(forwardVector.clone().multiplyScalar(0.2));
    }

    if (frameCount.current > 400) {
      setShouldRemove(true);
    }
  });

  function handleCollision(position){
    setParticles((prev) => [
      ...prev,
      {
        position: position,
        scale: 0.3,
      },
    ]);
    setShouldRemove(true);
  }

  return (
    <>
      {shouldRemove ? null : (
        <RigidBody
          ref={ref}
          gravityScale={0}
          type="Dynamic"
          position={realPosition}
          rotation={rotation}
          name={!enemy ? "playerProjectile" : "enemyProjectile"}
          restitution={0}
          onCollisionEnter={({ manifold, target, other}) => {
            handleCollision(manifold.solverContactPoint(0))
          }}
        >
          <mesh ref={meshRef} raycast={(e) => {
          }}>
            <boxGeometry args={[0.05, 0.05, 4]} ref={geometryRef} />
            <meshPhongMaterial
              emissive={!enemy ? "#fc6f03" : "#00FF00"}
              emissiveIntensity={4}
              toneMapped={false}
              position={realPosition}
              rotation={rotation}
            />
            <PositionalAudio
              url={!enemy ? "/sounds/Blaster3.wav" : "/sounds/tieBlaster.wav"}
              distance={10}
              volume={0.1}
              loop={false}
              autoplay={true}
            />
          </mesh>
        </RigidBody>
      )}
    </>
  );
}