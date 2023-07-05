import { Environment, OrbitControls, Stars, CubeCamera, PerspectiveCamera, ContactShadows, Html, PositionalAudio } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef, useContext, useEffect } from 'react'
import { Hangar } from './Hangar'
// import { Ship } from './X-wing'
import { Ship } from './Ship.jsx'
import * as THREE from 'three'
import { CameraShake } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Particles } from './HyperSpace';
import { GameContext } from './main'
import gsap from 'gsap';





export const LandingExperience = () => {
  const { status, setStatus, setup } = useContext(GameContext);
  const cam = useRef();
  const position=[-2, 15, 20]
  const group = useRef()
  const R2 = useRef();

  const damping = 0.02;
  const targetVelocity = new THREE.Vector3();
  const currentVelocity = new THREE.Vector3();
  const activeTargetPosition = [-9.6, -2.7, 20];
  const continueTargetPosition = [0, -2.3, -1];
  const lightRef = useRef();
  const targetZ = useRef(0);
  const [jump, setJump] = useState(false);


  useEffect(() => {
    
    if (status === 'active') {
      gsap.to(cam.current.position, {
        duration: 10,
        x: activeTargetPosition[0],
        y: activeTargetPosition[1],
        z: activeTargetPosition[2],
        ease: 'expo.inOut',
        })
      }
      if (status === 'config') {
        gsap.to(cam.current.position, {
          duration: 10,
          x: continueTargetPosition[0],
          y: continueTargetPosition[1],
          z: continueTargetPosition[2],
          ease: 'expo.inOut',
          })
          gsap.to(targetZ.current, {
            duration: 10,
            value: 10,
            ease: 'expo.inOut',
          });
        }
        if (status === 'takeOff') {
          const tl = gsap.timeline();
          tl.to(group.current.position, {
            duration: 10,
            z : 5,
            y: 2 
          }, 
          'start');
          tl.to(
            group.current.rotation, {
              duration : 5,
              y: -Math.PI / 2,
              delay: 3
            }
            , 'start'
          )
          if(R2.current){
            tl.set(R2.current, { play : true, delay: 3 }, 'start')
          }
          tl.add('end');
          tl.to(group.current.position, {
            duration: 10,
            x : -20,
            y: 2 
          }, 
          'end');
          tl.add('end2');
          tl.to(group.current.position, {
            duration: 4, 
            x: -2000,
            ease: 'expo.in',
            delay:0,
          }, 'end');
          setTimeout(() => {
            setJump(true);
          }, 8000);
          setTimeout(() => {
            setStatus('done');
          }, 14000);
        }
        
    }, [status])

  useFrame(({ clock, mouse, camera}) => {
    
    const groupPosition = group.current.position.clone();
    const groupRotation = group.current.rotation.clone();
    groupPosition.y -= 3;
    lightRef.current.position.copy(cam.current.position);

    targetVelocity.x = mouse.x * 1;
    targetVelocity.y = mouse.y * 1;

    currentVelocity.x += (targetVelocity.x - currentVelocity.x) * damping;
    currentVelocity.y += (targetVelocity.y - currentVelocity.y) * damping;

    groupPosition.z = targetZ.current;
    if(status === 'config' || status === 'takeOff'){
      groupPosition.x -= currentVelocity.x;
      groupPosition.y += currentVelocity.y;
    } else {
      groupPosition.x += currentVelocity.x;
      groupPosition.y += currentVelocity.y;
    }

      cam.current.lookAt(groupPosition);
    cam.current.rotation.x += Math.sin(clock.getElapsedTime() / 5) / 30;
    cam.current.rotation.y += Math.cos(clock.getElapsedTime() / 5) / 30;

    // cam.current.rotation.z += Math.sin(clock.getElapsedTime() / 5) / 50;
    if(status === 'takeOff'){
      cam.current.rotation.y = -Math.PI - targetVelocity.x / 10;
      cam.current.rotation.x = 0 - targetVelocity.y / 10;
      cam.current.rotation.z = 0;
    }
  });

  return(
<>
  <pointLight castShadow intensity={0.5} shadow-mapSize={1024} shadowDarkness={0} position={position} far={50}/>
    <Stars   />
     <Hangar position={[-15, -5,-15]}/> 
     {/*
    <Ship position={[0, -3, 0]} rotation-y={Math.PI}/> */}
    {/* <ContactShadows  width={10} height={10} blur={1} far={4} /> */}
    {jump && <Particles/>}
    <group ref={group} >
    <Ship position={[0, -3.1, 0]} rotation-y={Math.PI}/>
    {setup.sound ? <PositionalAudio ref={R2} url="/sounds/R2TAKEOFF.mp3" distance={10} loop={false} /> : null}

    {/* <ContactShadows  width={10} height={10} blur={1} far={4} /> */}
    <PerspectiveCamera fov={50} ref={cam} near={0.1} far={1000}  makeDefault position={[10, -3.5, 20]} />
    <pointLight castShadow intensity={0.5} shadow-mapSize={1024} distance={5} ref={lightRef}/>

    </group>
    {/* <Hangar position={[-15, -5,-15]}/> */}
    {/* <Composer /> */}
</>
    
  )
}
