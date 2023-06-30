import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Tie } from "./Tie";
import { Box, PositionalAudio,  } from "@react-three/drei";
import { Projectile } from "./Projectile";
import { useRef, useState, useEffect, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { Particles } from "./Particles";
import { GameContext } from "./main";

function handleMouse(ref, ringOne, ringTwo, shotsFired, setProjectiles, light) {
  const projectilePosition = ref.position.clone();
  const projectileRotation = ref.rotation.clone();
  projectilePosition.z += 4;
  if (shotsFired === 1) {
    projectilePosition.x = projectilePosition.x + 0.2;
    animateShoot(ringOne, light);
  } else if (shotsFired === 2) {
    projectilePosition.x = projectilePosition.x - 0.2;
    animateShoot(ringTwo, light);
  }

  const forwardVector = new THREE.Vector3(0, 0, 1).applyQuaternion(
    ref.quaternion
  );
  setProjectiles((prev) => [
    ...prev,
    {
      position: projectilePosition,
      rotation: projectileRotation,
      forwardVector: forwardVector,
      enemy: true,
    },
  ]);
}

function animateShoot(ref, light) {
  gsap.set(ref.scale, {
    x: 0,
    y: 0,
    z: 0,
  });
  gsap.set(light, {
    intensity: 0,
  });
  gsap.set(ref.material, {
    opacity: 1,
  });
  gsap.to(ref.scale, {
    x: 0.1,
    y: 0.1,
    z: 0.1,
    duration: 0.2,
    ease: "expo.out",
  });
  gsap.to(light, {
    intensity: 0.5,
    duration: 0.2,
    ease: "expo.out",
  });
  gsap.to(ref.material, {
    opacity: 0,
    duration: 0.2,
    ease: "expo.out",
  });
  gsap.to(light, {
    intensity: 0,
    duration: 0.3,
    delay: 0.2,
    ease: "expo.out",
  });
}

export const Enemies = () => {
  const ref = useRef();
  const [projectiles, setProjectiles] = useState([]);
  const ringOne = useRef();
  const ringTwo = useRef();
  const mousePressed = useRef(true);
  const lastShotTime = useRef(0);
  let frameCount = 0;
  const shotsFired = useRef(0);
  const speed = 0.2;
  const threshold = useRef(false);
  const health = useRef(100);
  const lightOne = useRef();
  const lightTwo = useRef();
  const [bodyPosition, setBodyPosition] = useState([0, 100, 100]);
  const [bodyRotation, setBodyRotation] = useState([0, 0, 0]);
  const body = useRef();
  const alive = useRef(true);
  const xOffset = Math.random() * 20 - 10;
  const sound = useRef();
  const shouldPlay = useRef(true);

  const { setup } = useContext(GameContext);
  useFrame(({ clock, camera }) => {

    if (alive.current) {
      const currentTime = clock.getElapsedTime();
      const wingPosition = camera.position.clone();
      wingPosition.z = wingPosition.z + 7;

      const distance = wingPosition.distanceTo(ref.current.position);

      setBodyPosition([
        ref.current.position.x,
        ref.current.position.y,
        ref.current.position.z,
      ]);
      setBodyRotation([
        ref.current.rotation.x,
        ref.current.rotation.y,
        ref.current.rotation.z,
      ]);
      // threshold.current = true ? ref.current.position.z += speed * 4 : null;
      if (threshold.current) {
        ref.current.position.z += speed;

        ref.current.lookAt(wingPosition);
        if (camera.position.z < ref.current.position.z) {
          ref.current.lookAt(0, 0, 3000);
        } else {
          ref.current.position.x = wingPosition.x;
          ref.current.position.y = wingPosition.y;
          if (shotsFired.current === 3) {
            if (currentTime - lastShotTime.current > 3) {
              shotsFired.current = 0;
            }
          }
          if (
            mousePressed.current &&
            currentTime - lastShotTime.current > 0.2 &&
            shotsFired.current < 3
          ) {
            handleMouse(
              ref.current,
              ringOne.current,
              ringTwo.current,
              1,
              setProjectiles,
              lightOne.current
            );
            handleMouse(
              ref.current,
              ringOne.current,
              ringTwo.current,
              2,
              setProjectiles,
              lightTwo.current
            );
            lastShotTime.current = currentTime;
            shotsFired.current += 1;
          }
        }
      }

      if (camera.position.z > ref.current.position.z + 10) {
        threshold.current = true;
      }
    } else {
      if (shouldPlay.current) {
        setup.sound && sound.current.play();
        shouldPlay.current = false;
      }
      gsap.to(ref.current.position, {
        y: 5,
        x: xOffset,
        z: ref.current.position.z + 10,
        duration: 10,
      });

      gsap.to(ref.current.rotation, {
        x: Math.PI * 4,
        y: -Math.PI * 4,
        z: Math.PI * 4,
        duration: 10,
      });
    }
  });

  return (
    <>
      <group>
        <RigidBody
          ref={body}
          type="dynamic"
          position={bodyPosition}
          rotation={bodyRotation}
          onCollisionEnter={(e) => {
            // if (e.colliderObject.name == "floor") {
            //   health.current -= 100;
            // }
            if(e.colliderObject.name === "projectile") {
              health.current -= 25;
            }
            if (health.current <= 0) {
              alive.current = false;
            }
          }}
        >
          <mesh>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshBasicMaterial color="red" visible={false} />
          </mesh>
        </RigidBody>
        <group ref={ref} position={[0, 100, 100]}>
          <Tie scale={0.12} />
          <PositionalAudio 
            url="/sounds/ennemyDown.wav"
            distance={100}
            ref={sound}
            loop={false}
          />
          <mesh
            ref={ringOne}
            position={[0.2, 0, 1]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[1, 0.6, 16]} />
            <meshStandardMaterial
              emissive="#00FF00"
              emissiveIntensity={1500}
              toneMapped={false}
              transparent
              side={THREE.DoubleSide}
            />
            <pointLight
              ref={lightOne}
              intensity={0}
              color="#00FF00"
              distance={10}
            />
          </mesh>
          <mesh
            ref={ringTwo}
            position={[-0.2, 0, 1]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[1, 0.6, 16]} />
            <meshStandardMaterial
              emissive="#00FF00"
              emissiveIntensity={1500}
              toneMapped={false}
              transparent
              side={THREE.DoubleSide}
            />
            <pointLight
              ref={lightTwo}
              intensity={0}
              color="#00FF00"
              distance={10}
            />
          </mesh>
        </group>
      </group>
      {projectiles.map((projectile, index) => (
        <Projectile
          position={projectile.position}
          rotation={projectile.rotation}
          forwardVector={projectile.forwardVector}
          enemy={true}
          key={index}
        />
      ))}
    </>
  );
};
