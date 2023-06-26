import React, { useRef, useState} from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { PositionalAudio } from "@react-three/drei";


export const Projectile = ({ position, rotation, forwardVector, enemy }) => {
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
      ref.current.applyImpulse(forwardVector.clone().multiplyScalar(0.1));
    }

    if (frameCount.current > 300) {
      setShouldRemove(true);
    }
  });

  return (
    <>
      {shouldRemove ? null : (
        <RigidBody
          ref={ref}
          gravityScale={0}
          type="Dynamic"
          position={realPosition}
          rotation={rotation}
          name={"projectile"}
          restitution={0}
          onCollisionEnter={(otherObject) => {
            setShouldRemove(true);
          }}
        >
          <mesh ref={meshRef} raycast={(e) => {
            console.log(e);
          }}>
            <boxGeometry args={[0.05, 0.05, 2]} ref={geometryRef} />
            <meshPhongMaterial
              emissive={!enemy ? "#fc6f03" : "#00FF00"}
              emissiveIntensity={4}
              toneMapped={false}
              position={realPosition}
              rotation={rotation}
            />
            <PositionalAudio
              url={!enemy ? "/sounds/Blaster3.wav" : "/sounds/tieBlaster.wav"}
              distance={40}
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