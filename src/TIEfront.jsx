import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Tie } from "./Tie";
import { Box, PositionalAudio,  } from "@react-three/drei";
import { Projectile } from "./EnemyProjectile";
import { useRef, useState, useEffect, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { GameContext } from "./main";
import Explosion from "./Explode";

function handleMouse(ref, ringOne, ringTwo, shotsFired, setProjectiles, light) {
  const projectilePosition = ref.position.clone();
  const projectileRotation = ref.rotation.clone();
  projectilePosition.z -= 4;
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

export const TieFront = ({position}) => {
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
  const [alive, setAlive] = useState(true);
  const xOffset = Math.random() * 20 - 10;
  const sound = useRef();
  const shouldPlay = useRef(true);
  const spotOne = useRef();
  const spotTwo = useRef();
  const ledOne = useRef();
  const ledTwo = useRef();

  const { setup, reset, playerAlive} = useContext(GameContext);
  useFrame(({ clock, camera }) => {
    const currentTime = clock.getElapsedTime();
    const wingPosition = camera.position.clone();
    wingPosition.z = wingPosition.z + 7;

    const distance = wingPosition.distanceTo(ref.current.position);
    if (playerAlive && alive && distance < 70) {

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
        ref.current.lookAt(wingPosition);

          ref.current.position.z -= speed;
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

    } else if(!alive) {
      if (shouldPlay.current) {
        setup.sound && sound.current.play();
        shouldPlay.current = false;
      }
      ledOne.current.material.emissiveIntensity = 0;
      ledTwo.current.material.emissiveIntensity = 0;
      spotOne.current.intensity = 0;
      spotTwo.current.intensity = 0;
    } 
    if(reset){
      setAlive(true);
      health.current = 100;
      ref.current.position.x = position[0];
      ref.current.position.y = position[1];
      ref.current.position.z = position[2];
      ref.current.rotation.x = 0;
      ref.current.rotation.y = 0;
      ref.current.rotation.z = 0;
      shouldPlay.current = true;
      
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
            if(e.colliderObject.name === "playerProjectile") {
              health.current -= 25;
            }
            if (health.current <= 0) {
              setAlive(false);
            }
          }}
        >
          <mesh>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshBasicMaterial color="red" visible={false} />
          </mesh>
        </RigidBody>
        <group ref={ref} position={[position[0], position[1], position[2]]}>
          <Tie scale={0.12} />
          {!alive && <Explosion scale={0.3} />}
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
          <mesh ref={ledOne} position={[0.2, 0, 1]}
>
            <boxGeometry args={[0.1,0.1,0.1]} />
            <meshPhongMaterial emissive={"#FFFFFF"} emissiveIntensity={4} />
            <pointLight
            distance={5}
            color={"#FFFFFF"}
            intensity={1}
            ref={spotOne}
            />
          </mesh>
          <mesh ref={ledTwo} position={[-0.2, 0, 1]}
>
            <boxGeometry args={[0.1,0.1,0.1]} />
            <meshPhongMaterial emissive={"#FFFFFF"} emissiveIntensity={4} />
            <pointLight
            distance={5}
            color={"#FFFFFF"}
            intensity={1}
            ref={spotTwo}
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
          key={index}
        />
      ))}
    </>
  );
};
