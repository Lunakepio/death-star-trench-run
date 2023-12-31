/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 hangar.glb --shadows --keepnames
*/

import React, { useRef, useEffect, useMemo, useContext } from 'react'
import { useGLTF, MeshReflectorMaterial, PositionalAudio } from '@react-three/drei'
import { TextureLoader, RepeatWrapping, LinearEncoding } from 'three'
import { GameContext } from './main'

export function Hangar(props) {
  const { nodes, materials } = useGLTF('/hangar.glb')
  const { setup, setSetup } = useContext(GameContext);

  const textures = useMemo(() => {
    const loader = new TextureLoader();
    const roughnessTexture = loader.load("/terrain-roughness.jpg");
    const normalTexture = loader.load("/terrain-normal.jpg");
    return [roughnessTexture, normalTexture];
  }, []);

  const [roughness, normal] = textures;


  useEffect(() => {
    materials.light_1.emissiveIntensity = 4;
    materials.light_1.toneMapped = false;


    materials.light_1.emissive = { r: 1, g: 1, b: 1 };
    materials.light_1.color = { r: 1, g: 1, b: 1 };
    materials['light_1.001'].emissiveIntensity = 4;
    materials['light_1.001'].emissive = { r: 1, g: 1, b: 1 };
    materials['light_1.001'].toneMapped = false;
    materials.imperial_hangar_blue_lights.emissiveIntensity = 4;
    materials.imperial_hangar_blue_lights.emissive = { r: 0, g: 0, b: 1 };
    materials.imperial_hangar_blue_lights.toneMapped = false;

    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    normal.encoding = LinearEncoding;

  }, [normal, roughness, materials])
  return (
    <group {...props} dispose={null}>
      <mesh name="SketchUp001_ID16" castShadow receiveShadow geometry={nodes.SketchUp001_ID16.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh name="SketchUp002_ID29" castShadow receiveShadow geometry={nodes.SketchUp002_ID29.geometry} material={materials.material} rotation={[Math.PI / 2, 0, 0]} />
      <mesh name="SketchUp003_ID37" castShadow receiveShadow geometry={nodes.SketchUp003_ID37.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh name="SketchUp004_ID45" castShadow receiveShadow geometry={nodes.SketchUp004_ID45.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh name="SketchUp005_ID53" castShadow receiveShadow geometry={nodes.SketchUp005_ID53.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      {/* <mesh name="SketchUp006_ID61" castShadow receiveShadow geometry={nodes.SketchUp006_ID61.geometry} material={materials.imperial_floor} rotation={[Math.PI / 2, 0, 0]} /> */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow position-y={-0.01} position-x={50}>
      <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial 
        envMapIntensity={0}
          normalMap={normal}
          normalScale={[0.5, 0.5]}
          roughnessMap={roughness}
          // dithering={true}
          color={[0.035, 0.035, 0.035]}
          roughness={0.7}
          blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={30} // How much blur mixes with surface roughness (default = 1)
          mixStrength={80} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          // reflectorOffset={0.2} // Offset
          />
      </mesh>
      {/* {setup.sound ? <PositionalAudio url="/hangar.mp3" distance={100} loop autoplay /> : null} */}
      {setup.sound === true ? <PositionalAudio url="/sounds/hangar.mp3" distance={5} loop autoplay /> : null}
            <mesh geometry={nodes.SketchUp007_ID74.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp008_ID82.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp009_ID90.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp010_ID98.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp011_ID106.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp012_ID114.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp013_ID122.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp014_ID130.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp015_ID138.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp016_ID146.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp017_ID154.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp018_ID162.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp019_ID170.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp020_ID178.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp021_ID186.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp022_ID194.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp023_ID202.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp024_ID210.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp025_ID218.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp026_ID226.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp027_ID234.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp028_ID242.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp029_ID250.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp030_ID258.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp031_ID266.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp032_ID274.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp033_ID282.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp034_ID290.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp035_ID298.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp036_ID306.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp037_ID314.geometry} material={materials.light_1} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp_ID3.geometry} material={materials.imperial_hangar_panels} rotation={[Math.PI / 2, 0, 0]} />
      <group position={[0.77, 0, 3.41]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.group_0010_ID93_1.geometry} material={materials.Metal_Rough} />
        <mesh geometry={nodes.group_0010_ID93_2.geometry} material={materials.Steel_Brushed_Stainless} />
        <mesh geometry={nodes.group_0010_ID93_3.geometry} material={materials['light_1.001']} />
        <mesh geometry={nodes.group_0010_ID93_4.geometry} material={materials.imperial_hangar_blue_lights} />
        <mesh geometry={nodes.group_0010_ID93_5.geometry} material={materials.material} />
        <mesh geometry={nodes.group_0010_ID93_6.geometry} material={materials['imperial_hangar_panels.001']} />
      </group>
      <mesh geometry={nodes.SketchUp014_ID578.geometry} material={materials.Steel_Brushed_Stainless} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.SketchUp015_ID586.geometry} material={materials.Steel_Brushed_Stainless} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/hangar.glb')
