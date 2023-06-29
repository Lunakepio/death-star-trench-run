/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 x-wing.glb --keepnames --shadows --transform
Author: Cristianolop (https://sketchfab.com/Cristianolop)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/x-wing-69b58a7dfa5d42f88b52aecfe564c8ff
Title: X- Wing
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Ship(props) {
  const { nodes, materials } = useGLTF('/ship.glb')
  return (
    <group {...props} dispose={null}>
      <group name="x-wingfbx" scale={0.01}>
        <group name="Fuselage" position={[0.13, -3.86, -5.66]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <group name="Cockpit002" position={[0, -0.91, 0.67]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
            <mesh name="Cockpit002_TT_checker_2048x2048_UV_GRID_0" castShadow geometry={nodes.Cockpit002_TT_checker_2048x2048_UV_GRID_0.geometry} material={materials.TT_checker_2048x2048_UV_GRID} />
            <mesh name="Cockpit002_WHITE_0" castShadow geometry={nodes.Cockpit002_WHITE_0.geometry} material={materials.WHITE} />
            <mesh name="Cockpit002_RED_0" castShadow geometry={nodes.Cockpit002_RED_0.geometry} material={materials.material} />
            <mesh name="Cockpit002_ORANGE_0" castShadow  eometry={nodes.Cockpit002_ORANGE_0.geometry} material={materials.ORANGE} />
            <mesh name="Cockpit002_GREEN_0" castShadow geometry={nodes.Cockpit002_GREEN_0.geometry} material={materials.GREEN} />
            <mesh name="Cockpit002_Material007_0" castShadow  geometry={nodes.Cockpit002_Material007_0.geometry} material={materials['Material.007']} />
          </group>
          <mesh name="Fuselage_backup_Material001_0" castShadow geometry={nodes.Fuselage_backup_Material001_0.geometry} material={materials['backup_Material.001']} />
          <mesh name="Details_Fuselage_backup_Material013_0" castShadow receiveShadowgeometry={nodes.Details_Fuselage_backup_Material013_0.geometry} material={materials['backup_Material.013']} />
          <mesh name="Canopi_backup_Material_0" castShadow receiveShadow geometry={nodes.Canopi_backup_Material_0.geometry} material={materials.backup_Material} position={[0, -0.06, 0.04]} />
          <mesh name="Landing_Gear001_backup_Material003_0" castShadow receiveShadow geometry={nodes.Landing_Gear001_backup_Material003_0.geometry} material={materials['backup_Material.003']} position={[-0.39, 2.78, -0.36]} rotation={[1.63, -0.07, 0.09]} />
          <mesh name="Landing_Gear002_backup_Material003_0" castShadow receiveShadow geometry={nodes.Landing_Gear002_backup_Material003_0.geometry} material={materials['backup_Material.003']} position={[0.39, 2.78, -0.36]} rotation={[1.63, 0.08, -0.09]} />
        </group>
        <group name="R2D2_Cylinder_Parts015" position={[0.36, 76.86, 219.22]} rotation={[0, -0.56, 0]} scale={28.79}>
          <mesh name="R2D2_Cylinder_Parts015_R2D2_Blue_Parts_Shine_0" castShadow geometry={nodes.R2D2_Cylinder_Parts015_R2D2_Blue_Parts_Shine_0.geometry} material={materials.R2D2_Blue_Parts_Shine} />
          <mesh name="R2D2_Cylinder_Parts015_R2D2_Metal_Parts_Shine_0" castShadow geometry={nodes.R2D2_Cylinder_Parts015_R2D2_Metal_Parts_Shine_0.geometry} material={materials.R2D2_Metal_Parts_Shine} />
          <mesh name="R2D2_Cylinder_Parts015_R2D2_Metal_Parts_Shine_02_0" castShadow geometry={nodes.R2D2_Cylinder_Parts015_R2D2_Metal_Parts_Shine_02_0.geometry} material={materials['R2D2_Metal_Parts_Shine_0.2']} />
          <mesh name="R2D2_Cylinder_Parts015_R2D2_Black_Parts_0" castShadow geometry={nodes.R2D2_Cylinder_Parts015_R2D2_Black_Parts_0.geometry} material={materials.R2D2_Black_Parts} />
          <mesh name="R2D2_Cylinder_Parts015_R2D2_Barrel_0" castShadow geometry={nodes.R2D2_Cylinder_Parts015_R2D2_Barrel_0.geometry} material={materials.R2D2_Barrel} />
          <mesh name="R2D2_Cylinder_Parts015_R2D2_White_Parts_Shine_0" castShadow geometry={nodes.R2D2_Cylinder_Parts015_R2D2_White_Parts_Shine_0.geometry} material={materials.R2D2_White_Parts_Shine} />
        </group>
        <group name="Ctrl_droid_Head" position={[0.47, 120.91, 217.75]} rotation={[-Math.PI / 2, 0, 0.3]} scale={40.82}>
          <group name="R2D2_Cylinder_Parts001" position={[0, 0, -0.69]} rotation={[Math.PI / 2, -0.56, 0]} scale={0.71}>
            <mesh name="R2D2_Cylinder_Parts001_R2D2_Head_0" castShadow geometry={nodes.R2D2_Cylinder_Parts001_R2D2_Head_0.geometry} material={materials.R2D2_Head} />
            <mesh name="R2D2_Cylinder_Parts001_R2D2_Blue_Parts_Shine_0" castShadow geometry={nodes.R2D2_Cylinder_Parts001_R2D2_Blue_Parts_Shine_0.geometry} material={materials.R2D2_Blue_Parts_Shine} />
            <mesh name="R2D2_Cylinder_Parts001_R2D2_Black_Parts_Shine_0" castShadow geometry={nodes.R2D2_Cylinder_Parts001_R2D2_Black_Parts_Shine_0.geometry} material={materials.R2D2_Black_Parts_Shine} />
            <mesh name="R2D2_Cylinder_Parts001_R2D2_Metal_Parts_Shine_02_0" castShadow geometry={nodes.R2D2_Cylinder_Parts001_R2D2_Metal_Parts_Shine_02_0.geometry} material={materials['R2D2_Metal_Parts_Shine_0.2']} />
            <mesh name="R2D2_Cylinder_Parts001_R2D2_Black_Parts_0" castShadow geometry={nodes.R2D2_Cylinder_Parts001_R2D2_Black_Parts_0.geometry} material={materials.R2D2_Black_Parts} />
            <mesh name="R2D2_Cylinder_Parts001_R2D2_Red_Light_Emision_0" castShadow geometry={nodes.R2D2_Cylinder_Parts001_R2D2_Red_Light_Emision_0.geometry} material={materials.R2D2_Red_Light_Emision} />
          </group>
        </group>
        <mesh name="Wing_L_Up_backup_Material006_0" castShadow geometry={nodes.Wing_L_Up_backup_Material006_0.geometry} material={materials['backup_Material.006']} position={[0.13, -3.86, -5.66]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Wing_L_Down_backup_Material004_0" castShadow geometry={nodes.Wing_L_Down_backup_Material004_0.geometry} material={materials['backup_Material.004']} position={[0.13, -3.86, -5.66]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Landing_Gear_backup_Material003_0" castShadow geometry={nodes.Landing_Gear_backup_Material003_0.geometry} material={materials['backup_Material.003']} position={[0.13, -3.86, -5.66]} rotation={[0.87, 0, 0]} scale={100} />
        <mesh name="Wing_R_Up_backup_Material006_0" castShadow geometry={nodes.Wing_R_Up_backup_Material006_0.geometry} material={materials['backup_Material.006']} position={[0.13, -3.86, -5.66]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Wing_R_Down_backup_Material004_0" castShadow geometry={nodes.Wing_R_Down_backup_Material004_0.geometry} material={materials['backup_Material.004']} position={[0.13, -3.86, -5.66]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Wing_L_Down001_backup_Material004_0" castShadow geometry={nodes.Wing_L_Down001_backup_Material004_0.geometry} material={materials['backup_Material.004']} position={[-204.95, -61.2, 362.83]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Wing_L_Down002_backup_Material004_0" castShadow geometry={nodes.Wing_L_Down002_backup_Material004_0.geometry} material={materials['backup_Material.004']} position={[-93.21, -59.73, 362.83]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Wing_R_Down001_backup_Material004_0" castShadow geometry={nodes.Wing_R_Down001_backup_Material004_0.geometry} material={materials['backup_Material.004']} position={[93.47, -59.73, 362.83]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Wing_R_Down002_backup_Material004_0" castShadow geometry={nodes.Wing_R_Down002_backup_Material004_0.geometry} material={materials['backup_Material.004']} position={[205.21, -61.2, 362.83]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        <mesh name="Landing_Gear003_backup_Material003_0" castShadow geometry={nodes.Landing_Gear003_backup_Material003_0.geometry} material={materials['backup_Material.003']} position={[0.13, -3.86, -5.66]} rotation={[0.87, 0, 0]} scale={100} />
        <mesh name="Landing_Gear004_backup_Material003_0" castShadow geometry={nodes.Landing_Gear004_backup_Material003_0.geometry} material={materials['backup_Material.003']} position={[0.13, -3.86, -5.66]} rotation={[0.87, 0, 0]} scale={100} />
      </group>
    </group>
  )
}

useGLTF.preload('/ship.glb')
