/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 deathstar-trench-turret.glb --keepnames --transform
*/

import React, { useEffect, useRef, useState, useContext } from "react";
import { PositionalAudio, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Projectile } from "./EnemyProjectile";
import Explosion from "./Explode";
import { RigidBody } from "@react-three/rapier";
import gsap from "gsap";
import { GameContext } from "./main";
import { Enemies } from "./Enemies";
import { TieFront } from "./TIEfront";

function handleMouse(
  pos,
  ref,
  ringOne,
  ringTwo,
  shotsFired,
  setProjectiles,
  light
) {
  const projectilePosition = pos.clone();
  const projectileRotation = ref.rotation.clone();
  projectilePosition.y -= 18;
  projectilePosition.z -= 2;
  // projectileRotation.x += Math.PI / 2;

  if (shotsFired === 1) {
    projectilePosition.x = projectilePosition.x + 0.2;
    animateShoot(ringOne, light);
  } else if (shotsFired === 2) {
    projectilePosition.x = projectilePosition.x - 0.2;
    animateShoot(ringTwo, light);
  }
  const quaternion = ref.quaternion.clone();
  //invert quternion

  // quaternion.conjugate();

  const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion);
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

export function TrenchTurret(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/trench-transformed.glb");
  const { playerAlive } = useContext(GameContext);

  const [Z, setZ] = useState(0);
  useEffect(() => {
    materials.Hullplates2.metalness = 0.2;
    materials.Hullplates2.roughness = 0.4;
    materials.Hullplates2.color = new THREE.Color(0x8e8e8e);
  }, []);

  useFrame(({ camera }) => {
    if (camera.position.z - group.current.position.z > 132.5) {
      setZ(camera.position.z);
    }
    if (!playerAlive) {
      setZ(0);
    }
  });

  function Obstacle({ position, rotation, type }) {
    const ref = useRef();
    const shouldMove = useRef(false);
   
    if(type){
      useFrame(({ camera, clock }) => {
        if (position[2] - camera.position.z < -10) {
          shouldMove.current = false;
        }
        if (position[2] - camera.position.z < 50) {
         shouldMove.current = true;
        }
  
        if(shouldMove.current){
          const time = clock.getElapsedTime();
          ref.current.setTranslation({
            x: 0,
            y: Math.sin(time * 2) * 2,
            z: position[2],
          });
        }
      });
    }
    return (
      <RigidBody
        position={position}
        rotation={rotation ? rotation : [0, 0, 0]}
        type="fixed"
        name="floor"
        restitution={0}
        ref={ref}
      >
        <mesh material={materials.Hullplates2}>
          <boxGeometry args={[10, 3, 1]} />
        </mesh>
      </RigidBody>
    );
  }
  return (
    <>
      <group ref={group} position-z={Z} {...props} dispose={null}>
        {Array(10)
          .fill()
          .map((_, i) => (
            <group
              name="DeathStarTrench"
              position={[-0.2, 0, i * 26.5]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              scale={1}
              key={i}
            >
              <mesh
                name="DeathStarTrench001"
                geometry={nodes.DeathStarTrench001.geometry}
                material={materials.Hullplates2}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
              />
            </group>
          ))}
      </group>
      <Obstacle position={[0, 1, 100]} />
      <Obstacle position={[0, -2, 120]} />
      <Obstacle position={[0, 1, 140]} />
      <Obstacle position={[2, -1, 160]} rotation={[0, 0, Math.PI / 2]} />
      <Turret position={[-2, -18.3, 175]} materials={materials} nodes={nodes} />
      <Obstacle position={[-2, -1, 190]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[0, 1, 210]} />
      <Obstacle position={[0, -2, 230]} />
      <Obstacle position={[0, 1, 250]} />
      <Obstacle position={[2, -1, 270]} rotation={[0, 0, Math.PI / 2]} />
      <Turret position={[-2, -18.3, 285]} materials={materials} nodes={nodes} />
      <Obstacle position={[-2, -1, 300]} rotation={[0, 0, Math.PI / 2]} />
      <Turret
        position={[0.5, -18.3, 320]}
        materials={materials}
        nodes={nodes}
      />
      <Turret position={[-3, -18.3, 340]} materials={materials} nodes={nodes} />
      <Obstacle position={[0, -2, 360]} />
      <Obstacle position={[0, 2, 380]} />
      <Obstacle position={[0, -2, 400]} />
      <Obstacle position={[-3, -1, 420]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[3, -1, 420]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[0, 2.5, 440]} />
      <Obstacle position={[0, -2.5, 440]} />
      <Obstacle position={[-2, -1, 460]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[2, -1, 480]} rotation={[0, 0, Math.PI / 2]} />
      <Turret position={[-3, -18.3, 545]} materials={materials} nodes={nodes} />
      <Turret position={[0, -18.3, 540]} materials={materials} nodes={nodes} />
      <Turret position={[3, -18.3, 545]} materials={materials} nodes={nodes} />
      <TieFront position={[0, 0, 610]} />

      <Obstacle position={[0, -3, 590]} />
      <Turret
        position={[-2.5, -18.3, 645]}
        materials={materials}
        nodes={nodes}
      />
      <Obstacle position={[0, 2, 690]} />
      <Obstacle position={[0, -2.5, 710]} />
      <Obstacle position={[0, 2, 730]} />
      <Obstacle position={[0, -2.5, 750]} />
      <Obstacle position={[0, 2, 760]} />

      <Obstacle position={[0, 2, 770]} />
      <Obstacle position={[0, 0, 780]} />
      <Obstacle position={[0, -2, 800]} />
      <Obstacle position={[0, 1, 820]} />
      <Obstacle position={[0, 2, 840]} />
      <Obstacle position={[0, 0, 860]} />
      <Obstacle position={[-3, -2, 880]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[3, -2, 880]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[-3, -2, 900]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[3, -2, 900]} rotation={[0, 0, Math.PI / 2]} />
      <Obstacle position={[0, -2.5, 920]} />
      <Obstacle position={[0, 2.5, 920]} />
      <Obstacle position={[0, -2.6, 940]} />
      <Obstacle position={[0, 2.6, 940]} />
      <Obstacle position={[0, -4.1, 950]} />
      <Obstacle position={[0, 1.1, 950]} />
      <Obstacle position={[0, -2.1, 960]} />
      <Obstacle position={[0, 3.6, 960]} />
      <Obstacle position={[0, -2.6, 970]} />
      <Obstacle position={[0, 2.6, 970]} />
      <TieFront position={[-2, -2, 1060]} />
      <TieFront position={[2, 1, 1100]} />
      <TieFront position={[3, -1, 1140]} />
      <TieFront position={[0, 0, 1200]} />
      <TieFront position={[2, 0, 1250]} />
      <TieFront position={[-2, 0, 1250]} />
      <Turret position={[0, -18.3, 1300]} materials={materials} nodes={nodes} />
      <Turret
        position={[-2, -18.3, 1400]}
        materials={materials}
        nodes={nodes}
      />
      <Turret position={[2, -18.3, 1400]} materials={materials} nodes={nodes} />
      <TieFront position={[0, 0, 1400]} />
      <Obstacle position={[0, 0, 1450]} />
      <Obstacle position={[0, 2, 1470]} />
      <Obstacle position={[0, 0, 1490]} />
      <Obstacle position={[0, 2, 1510]} />
      {/* <Obstacle position={[0, 0, 1530]} type={true}/> */}
      <Obstacle position={[0, 0, 50]} type={true} />

      {/* <Turret position={[1, -18.3, 100]} materials={materials} nodes={nodes} />
      <Turret position={[-2, -18.3, 110]} materials={materials} nodes={nodes} />
      <Turret
        position={[0.5, -18.3, 130]}
        materials={materials}
        nodes={nodes}
      />
      <Turret
        position={[2.5, -18.3, 150]}
        materials={materials}
        nodes={nodes}
      /> */}
    </>
  );
}

function Turret({ position, materials, nodes }) {
  const { playerAlive, setParticles } = useContext(GameContext);
  const ref = useRef();
  const head = useRef();
  const cannons = useRef();
  const shotsFired = useRef(0);
  const lastShotTime = useRef(0);
  const mousePressed = useRef(true);
  const ringOne = useRef();
  const ringTwo = useRef();
  const lightOne = useRef();
  const lightTwo = useRef();
  const [projectiles, setProjectiles] = useState([]);
  const mesh = useRef();
  const boom = useRef();
  const lightExplode = useRef();
  const offsetY = position[1] * -1 - 4;

  const health = useRef(100);
  const [alive, setAlive] = useState(true);
  useFrame(({ clock, camera }) => {
    if (alive) {
      const currentTime = clock.getElapsedTime();
      const distance = ref.current.position.distanceTo(camera.position);
      if (distance < 50) {
        mousePressed.current = true;
        const wingsPosition = camera.position.clone();
        mesh.current = cannons.current.clone();

        wingsPosition.z += 5;
        head.current.lookAt(wingsPosition);
        head.current.rotation.x = 0;
        head.current.rotation.z = 0;
        cannons.current.lookAt(wingsPosition);
        // cannons.current.rotation.z = 0;

        const projectilePosition = ref.current.position.clone();
        projectilePosition.y = cannons.current.position.y;
        mesh.current.rotation.x *= -1;
        cannons.current.rotation.z = 0;

        if (shotsFired.current === 2) {
          if (currentTime - lastShotTime.current > 2) {
            shotsFired.current = 0;
          }
        }
        if (mousePressed.current && currentTime - lastShotTime.current > 0.2) {
          handleMouse(
            projectilePosition,
            mesh.current,
            ringOne.current,
            ringTwo.current,
            1,
            setProjectiles,
            lightOne.current
          );
          handleMouse(
            projectilePosition,
            mesh.current,
            ringOne.current,
            ringTwo.current,
            2,
            setProjectiles,
            lightTwo.current
          );
          lastShotTime.current = currentTime;
          shotsFired.current += 1;
        }
        mesh.current.visible = false;
      } else {
        mousePressed.current = false;
      }
    }

    if (!playerAlive) {
      setAlive(true);
      setProjectiles([]);
    }
  });

  useEffect(() => {
    if (!alive) {
      boom.current.play();
      gsap.to(lightExplode.current, {
        intensity: 1,
        duration: 0.2,
        ease: "expo.out",
      });
      gsap.to(lightExplode.current, {
        intensity: 0,
        duration: 2,
        delay: 0.2,
        ease: "expo.out",
      });
    }
  }, [alive]);
  return (
    <>
      <group ref={ref} rotation-y={Math.PI} position={position}>
        <RigidBody
          type="fixed"
          position-y={offsetY}
          restitution={0}
          onCollisionEnter={(e) => {
            // if (e.colliderObject.name == "floor") {
            //   health.current -= 100;
            // }
            if (e.colliderObject.name === "playerProjectile") {
              health.current -= 20;
            }
            if (health.current <= 0) {
              setAlive(false);
              health.current = 100;
            }
          }}
        >
          <mesh visible={true}>
            <boxGeometry args={[2, 4, 0.5]} />
            <meshBasicMaterial color="red" transparent opacity={0} />
            <pointLight
              ref={lightExplode}
              position-z={2}
              position-y={1}
              color={"#fad8af"}
              intensity={0}
              distance={50}
            />
          </mesh>
          <PositionalAudio
            ref={boom}
            url="/sounds/ennemyDown.wav"
            loop={false}
            distance={100}
          />
        </RigidBody>
        {!alive && <Explosion offsetY={offsetY} scale={0.3} />}
        <mesh
          name="Body"
          geometry={nodes.Body.geometry}
          material={materials.Hullplates2}
          position={[0, 13.1, 0]}
        />
        <group>
          <mesh
            ref={head}
            name="HEAD"
            geometry={nodes.HEAD.geometry}
            material={materials.Hullplates2}
            position={[0, 15.8, 0]}
          />
          <mesh
            ref={cannons}
            name="cannons"
            geometry={nodes.cannons.geometry}
            material={materials.Hullplates2}
            position={[0, 15.7, 0.21]}
            rotation={[0.28, 0, 0]}
            scale={1}
          />
          <mesh ref={mesh} visible={false}></mesh>
          <mesh
            ref={ringOne}
            position={[0.2, 15.7, 2]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <pointLight
              ref={lightOne}
              intensity={0}
              color="#00FF00"
              distance={10}
            />
          </mesh>
          <mesh
            ref={ringTwo}
            position={[-0.2, 15.7, 2]}
            scale={0}
            rotation={[0, 0, 0]}
          >
            <pointLight
              ref={lightTwo}
              intensity={0}
              color="#00FF00"
              distance={10}
            />
          </mesh>
        </group>
      </group>
      <Projectiles projectiles={projectiles} />
    </>
  );
}
useGLTF.preload("/deathstar-trench-turret-transformed.glb");
