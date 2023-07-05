import { CapsuleCollider, RigidBody, quat } from "@react-three/rapier";
import {
  PerspectiveCamera,
  PositionalAudio,
  Box,
  useKeyboardControls,
} from "@react-three/drei";
import React, { useEffect, useRef, useContext, useMemo } from "react";
import { Xwing } from "./X-wing";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import blaster3 from "/sounds/Blaster3.wav";
import { Controls } from "./App";
import gsap from "gsap";
import { GameContext } from "./main";
import { Projectile } from "./Projectile";
import { XWingShadows } from "./X-WingShadows";
import Explosion from "./Explode";

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

function handleMouse(
  ref,
  ringOne,
  ringTwo,
  ringThree,
  ringFour,
  shotsFired,
  setProjectiles,
  lightOne,
  lightTwo,
  lightThree,
  lightFour
) {
  const distance = 150;
  const projectilePosition = ref.position.clone();
  const projectileRotation = ref.rotation.clone();
  projectilePosition.z += 2;
  const angleA = Math.atan2(1, distance);
  const angleB = Math.atan2(0.33, distance);
  const projectileQuaternion = ref.quaternion.clone();

  if (shotsFired === 0) {
    projectilePosition.x = projectilePosition.x + 1;
    projectilePosition.y = projectilePosition.y + 0.33;
    projectileQuaternion.y -= angleA;
    projectileQuaternion.x += angleB;

    animateShoot(ringOne, lightOne);
  } else if (shotsFired === 1) {
    projectilePosition.x = projectilePosition.x - 1;
    projectilePosition.y = projectilePosition.y - 0.33;
    projectileQuaternion.y += angleA;
    projectileQuaternion.x -= angleB;
    animateShoot(ringTwo, lightTwo);
  } else if (shotsFired === 2) {
    projectilePosition.x = projectilePosition.x + 1;
    projectilePosition.y = projectilePosition.y - 0.33;
    projectileQuaternion.y -= angleA;
    projectileQuaternion.x -= angleB;
    animateShoot(ringThree, lightThree);
  } else if (shotsFired === 3) {
    projectilePosition.x = projectilePosition.x - 1;
    projectilePosition.y = projectilePosition.y + 0.33;
    projectileQuaternion.y += angleA;
    projectileQuaternion.x += angleB;

    animateShoot(ringFour, lightFour);
  }

  const forwardVector = new THREE.Vector3(0, 0, 1).applyQuaternion(
    projectileQuaternion
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

const Projectiles = React.memo(
  ({ projectiles }) => {
    return (
      <>
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
  },
  (prevProps, nextProps) => {
    return prevProps.projectiles === nextProps.projectiles;
  }
);

function Crosshair() {
  return (
    <group rotation-z={Math.PI / 4} position-z={20}>
      //adding crosshair
      <mesh position={[-1.2, 0, 0]}>
        <planeGeometry args={[1, 0.06]} />
        <meshBasicMaterial
          transparent
          opacity={0.4}
          color="white"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[1.2, 0, 0]}>
        <planeGeometry args={[1, 0.06]} />
        <meshBasicMaterial
          transparent
          opacity={0.4}
          color="white"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <planeGeometry args={[0.06, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0.4}
          color="white"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <planeGeometry args={[0.06, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0.4}
          color="white"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

export const Player = () => {
  const ref = useRef();
  const body = useRef();
  const boxRef = useRef();
  const camera = useRef();
  const ringOne = useRef();
  const ringTwo = useRef();
  const ringThree = useRef();
  const ringFour = useRef();
  const lightOne = useRef();
  const lightTwo = useRef();
  const lightThree = useRef();
  const lightFour = useRef();

  const lastShotTime = useRef(0);
  const audio = useRef();
  const [projectiles, setProjectiles] = React.useState([]);
  const [wingsOpen, setWingsOpen] = React.useState(true);
  const shotsFired = useRef(0);
  const {
    gameStarted,
    setGameStarted,
    setup,
    reset,
    setReset,
    playerAlive,
    setPlayerAlive,
    setParticles,
    playerHealth,
  } = useContext(GameContext);
  let distance = 5;

  const speed = useRef(0.3);
  const [cameraDistance, setCameraDistance] = React.useState(-5);
  const mousePressed = useRef(false);

  const upPressed = useKeyboardControls((state) => state[Controls.up]);
  const downPressed = useKeyboardControls((state) => state[Controls.down]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const shootPressed = useKeyboardControls((state) => state[Controls.shoot]);
  const slowPressed = useKeyboardControls((state) => state[Controls.slow]);
  const boostPressed = useKeyboardControls((state) => state[Controls.boost]);
  const wingsTarget = useRef(false);

  const play = useRef(false);
  const boxSpeed = 0.15;

  const attackSpeed = 0.07;

  const frameCount = useRef(0);
  const quaternion = new THREE.Quaternion();
  const euler = new THREE.Euler();
  useFrame(({ mouse, clock, viewport }) => {
    const cam = camera.current;
    const currentTime = clock.getElapsedTime();
    if (gameStarted) {
      if (playerAlive) {
        setWingsOpen(true);
        if (speed.current > 0.3) {
          speed.current -= 0.001;
        } else if (speed.current < 0.3) {
          speed.current += 0.001;
        }

        if (boostPressed) {
          setWingsOpen(false);
          if (speed.current < 0.5) {
            speed.current += 0.001;
          }
        }
        if(slowPressed && !boostPressed){
          if(speed.current > 0.1){
            speed.current -= 0.001;
          }
        }
        let targetFov = boostPressed ? 90 : 50;
        if(slowPressed && !boostPressed){
          targetFov = 30;
        }
        cam.fov = lerp(cam.fov, targetFov, 0.01);
        cam.updateProjectionMatrix();
        if (frameCount.current % 10 === 0) {
          body.current.setTranslation({
            x: ref.current.position.x,
            y: ref.current.position.y,
            z: ref.current.position.z,
          });
          body.current.setRotation(quaternion.setFromEuler(euler.set(0, 0, 0)));
        }
        boxRef.current.rotation.set(0, 0, 0);
        if (setup.mouse) {
          boxRef.current.position.x = -mouse.x * 8;
          boxRef.current.position.y = setup.invertLook
            ? -mouse.y * 8
            : mouse.y * 8;
        } else {
          boxRef.current.position.x += leftPressed ? boxSpeed : 0;
          boxRef.current.position.x += rightPressed ? -boxSpeed : 0;
          if (setup.invertLook) {
            boxRef.current.position.y += upPressed ? -boxSpeed : 0;
            boxRef.current.position.y += downPressed ? boxSpeed : 0;
          } else {
            boxRef.current.position.y += upPressed ? boxSpeed : 0;
            boxRef.current.position.y += downPressed ? -boxSpeed : 0;
          }
        }
        const distanceX = boxRef.current.position.x - ref.current.position.x;

        boxRef.current.position.z += speed.current;
        // Calculer l'angle entre les deux points en radians
        ref.current.lookAt(boxRef.current.position);

        const angle = Math.atan2(distanceX, distance);
        // Définir la rotation de l'arwing autour de l'axe Z en fonction de l'angle
        ref.current.rotation.z = -(
          Math.sin(clock.getElapsedTime() * 2) * 0.05 +
          angle
        );

        if (ref.current.position.x !== boxRef.current.position.x) {
          ref.current.position.x +=
            ((boxRef.current.position.x - ref.current.position.x) / 10) * 0.3;
        }
        if (ref.current.position.y !== boxRef.current.position.y) {
          ref.current.position.y +=
            ((boxRef.current.position.y - ref.current.position.y) / 10) * 0.3;
        }
        if (ref.current.position.z !== boxRef.current.position.z) {
          ref.current.position.z +=
            ((boxRef.current.position.z - ref.current.position.z) / 10) *
            speed.current;
        }
        cam.position.z = ref.current.position.z + cameraDistance;
        cam.position.x = ref.current.position.x * 0.6;
        cam.position.y = ref.current.position.y * 0.6;
        cam.rotation.x = ref.current.position.y * 0.02;
        cam.rotation.y = Math.PI + ref.current.position.x * 0.02;
        cam.rotation.z = -ref.current.position.x * 0.01;
        if (playerHealth.current <= 0) {
          setPlayerAlive(false);
        }
        if (
          (mousePressed.current &&
            currentTime - lastShotTime.current > attackSpeed) && wingsOpen ||
          (shootPressed && currentTime - lastShotTime.current > attackSpeed && wingsOpen)
        ) {
          handleMouse(
            ref.current,
            ringOne.current,
            ringTwo.current,
            ringThree.current,
            ringFour.current,
            shotsFired.current,
            setProjectiles,
            lightOne.current,
            lightTwo.current,
            lightThree.current,
            lightFour.current
          );
          lastShotTime.current = currentTime;
          shotsFired.current += 1;
          if (shotsFired.current === 4) {
            shotsFired.current = 0;
          }
        } else if (
          !mousePressed.current &&
          currentTime - lastShotTime.current > 3
        ) {
          shotsFired.current = 0;
        }
      } else {
        cam.lookAt(ref.current.position);
        cam.position.z -= 0.01;
      }
    } else {
    }
    if (reset) {
      setPlayerAlive(true);
      setProjectiles([]);
      playerHealth.current = 100;
      ref.current.position.set(0, 0, 0);
      boxRef.current.position.set(0, 0, 10);
      setReset(false);
      cam.position.set(0, 0, 0);
    }

    frameCount.current += 1;
  });

  useEffect(() => {
    setGameStarted(true);
    window.addEventListener("mousedown", () => (mousePressed.current = true));
    window.addEventListener("mouseup", () => (mousePressed.current = false));

    // const tl = gsap.timeline({ delay: 95 });
    // tl.to(
    //   cam.rotation,
    //   { x: Math.PI / 2, duration: 10, ease: "power4.in" },
    //   "start"
    // );
    // tl.set(audio.current, { play: true }, "start");
    // tl.add("start2");
    // tl.to(
    //   cam.position,
    //   { z: -7, y: 0, duration: 10, ease: "power4.out" },
    //   "start2"
    // );
    // tl.to(cam.rotation, { x: 0, duration: 10, ease: "power4.out" }, "start2");
    // setTimeout(() => {
    //   setGameStarted(true);
    // }, 110000);
  }, []);

  function handleCollision(name) {
    if (name === "floor") {
      playerHealth.current -= 100;
    }
    if (name === "enemyProjectile") {
      playerHealth.current -= 5;
    }
  }
  return (
    <>
      <group>
        <PositionalAudio
          ref={audio}
          loop={false}
          url="/sounds/gameTheme.mp3"
          distance={10000}
        />
        <mesh ref={boxRef} position={[0, 0, 10]} rotation={[0, 0, 0]}></mesh>
        <RigidBody
          ref={body}
          type="Dynamic"
          onCollisionEnter={(e) => {
            if (
              e.colliderObject.name === "floor" ||
              e.colliderObject.name === "enemyProjectile"
            ) {
              playerHealth.current -=
                e.colliderObject.name === "floor" ? 100 : 5;
            }
          }}
        >
          <mesh>
            <boxGeometry args={[1.5, 0.6, 0.3]} />
            <meshBasicMaterial color="red" visible={false} />
          </mesh>
        </RigidBody>
        <group ref={ref}>
          <group>
            <mesh position-z={20} scale={[1.2, 1, 1]}>
              <ringGeometry args={[1, 0.95, 16]} />
              <meshBasicMaterial transparent opacity={0.4} color="white" />
            </mesh>
            <Crosshair />
            <mesh position-z={40} scale={[1, 0.9, 0.9]}>
              <ringGeometry args={[1, 0.95, 16]} />
              <meshBasicMaterial transparent opacity={0.4} color="white" />
            </mesh>
          </group>
          <Xwing wingsOpen={wingsOpen} />
          {!playerAlive && <Explosion scale={0.3} />}
          <mesh
            ref={ringOne}
            position={[1, 0.335, 0.5]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[1, 0.6, 16]} />
            <meshStandardMaterial
              emissive="#fc6f03"
              emissiveIntensity={100}
              toneMapped={false}
              transparent
            />
            <pointLight
              ref={lightOne}
              intensity={0}
              color="#fc6f03"
              distance={10}
            />
          </mesh>
          <mesh
            ref={ringTwo}
            position={[-1, -0.33, 0.5]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[1, 0.6, 16]} />
            <meshStandardMaterial
              emissive="#fc6f03"
              emissiveIntensity={100}
              toneMapped={false}
              transparent
            />
            <pointLight
              ref={lightTwo}
              intensity={0}
              color="#fc6f03"
              distance={10}
            />
          </mesh>
          <mesh
            ref={ringThree}
            position={[1, -0.33, 0.5]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[1, 0.6, 16]} />
            <meshStandardMaterial
              emissive="#fc6f03"
              emissiveIntensity={100}
              toneMapped={false}
              transparent
            />
            <pointLight
              ref={lightThree}
              intensity={0}
              color="#fc6f03"
              distance={10}
            />
          </mesh>
          <mesh
            ref={ringFour}
            position={[-1, 0.33, 0.5]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <ringGeometry args={[1, 0.6, 16]} />
            <meshStandardMaterial
              emissive="#fc6f03"
              emissiveIntensity={100}
              toneMapped={false}
              transparent
            />
            <pointLight
              ref={lightFour}
              intensity={0}
              color="#fc6f03"
              distance={10}
            />
          </mesh>
        </group>
        <PerspectiveCamera
          ref={camera}
          near={1}
          far={10000}
          makeDefault
          position={[0, 60, -40]}
          rotation={[0, Math.PI, 0]}
        />
      </group>
      <Projectiles projectiles={projectiles} />
    </>
  );
};
