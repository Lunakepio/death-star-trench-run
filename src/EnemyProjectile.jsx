import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { PositionalAudio } from "@react-three/drei";

export const Projectile = ({ position, rotation, forwardVector }) => {
  const ref = useRef();
  const realPosition = position
    .clone()
    .add(forwardVector.clone().multiplyScalar(+2));
  const frameCount = useRef(0);
  const shouldHide = useRef(false);
  useFrame(() => {
    if (!shouldHide.current && ref.current) {
      frameCount.current++;
      if (frameCount.current < 15) {
        ref.current.applyImpulse(forwardVector.clone().multiplyScalar(0.8));
      }
    }
  });

  return (
    <>
      {!shouldHide.current && (
        <RigidBody
          ref={ref}
          gravityScale={0}
          type="Dynamic"
          position={realPosition}
          rotation={rotation}
          name="enemyProjectile"
          restitution={0}
          onCollisionEnter={() => {
            shouldHide.current = true;
          }}
        >
          <mesh>
            <boxGeometry args={[0.05, 0.05, 6]} />
            <meshPhongMaterial
              emissive="#00FF00"
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>
        </RigidBody>
      )}
    </>
  );
};
