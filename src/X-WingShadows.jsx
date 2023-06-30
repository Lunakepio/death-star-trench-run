import React, { useContext, useEffect, useRef, useState } from "react";
import {
  useGLTF,
  useAnimations,
  PositionalAudio,
  Trail,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import R2 from "/sounds/R2D2.wav";
import { GameContext } from "./main";

export function XWingShadows({ wingsOpen }) {
  const group = useRef();
  const refOne = useRef();
  const refTwo = useRef();
  const trailOne = useRef();
  const trailTwo = useRef();
  const trailThree = useRef();
  const trailFour = useRef();
  const wingsOpenSound = useRef();
  const wingsCloseSound = useRef();
  const trailValues = useRef({
    width: 0.2,
    color: "#7D7D7D",
    transparent: true,
    length: 1,
    decay: 0,
    local: false,
    stride: 0,
    interval: 2,
    target: undefined,
    attenuation: (width) => width,
    fade: (width) => width,
  });
  const engine = useRef();
  const { nodes, materials, animations } = useGLTF("/x-wing-transformed.glb");
  const { actions } = useAnimations(animations, group);
  const { gameStarted, setGameStarted, setup } = useContext(GameContext);
  function openWings() {
    gsap.to(refOne.current.rotation, { y: -0.22, duration: 1 });
    gsap.to(refTwo.current.rotation, { y: 0.22, duration: 1 });

    gsap.set(trailValues.current, { decay: 0, delay: 0 });
    wingsOpenSound.current.setVolume(0.3);
    setup.sound && wingsOpenSound.current.play();
    gsap.to(materials.Light, { emissiveIntensity: 8, duration: 2 });
  }

  function closeWings() {
    gsap.to(refOne.current.rotation, { y: 0, duration: 1 });
    gsap.to(refTwo.current.rotation, { y: 0, duration: 1 });
    gsap.set(trailValues.current, { decay: 1, delay: 1 });
    gsap.to(materials.Light, { emissiveIntensity: 12, duration: 2 });
    wingsCloseSound.current.setVolume(0.3);
    setup.sound && wingsCloseSound.current.play();
  }

  useEffect(() => {
    materials.Light.toneMapped = false;
    // materials.Light.emissive = new THREE.Color(0xff7aba);
    engine.current.setVolume(0.1);
    if (gameStarted) {
      !setup.sound && engine.current.play();
    }
    if (wingsOpen.current) {
      openWings();
    } else {
      closeWings();
    }
  }, [wingsOpen.current, materials]);

  return (
    <>
      {!wingsOpen.current ? (
        <group>
          <Trail {...trailValues.current}>
            <mesh ref={trailOne} position={[1.1, 0.01, -0.2]} />
          </Trail>
          <Trail {...trailValues.current}>
            <mesh ref={trailTwo} position={[-1.1, -0.01, -0.2]} />
          </Trail>
          <Trail {...trailValues.current}>
            <mesh ref={trailThree} position={[1.1, -0.01, -0.2]} />
          </Trail>
          <Trail {...trailValues.current}>
            <mesh ref={trailFour} position={[-1.1, 0.01, -0.2]} />
          </Trail>
        </group>
      ) : null}

      <group ref={group} scale={0.02} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="x-wingfbx" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Object_2">
                <group name="RootNode">
                  <group
                    name="xwing2xwing2"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.01}
                  >
                    <group name="xwing2Fuselage_Main">
                    <PositionalAudio
                        url="/sounds/engine.wav"
                        ref={engine}
                        distance={1000}
                        loop={true}
                      />
                      <PositionalAudio
                        url="/sounds/wingsOpen.wav"
                        ref={wingsOpenSound}
                        distance={1000}
                        autoplay={false}
                        loop={false}
                      />
                      <PositionalAudio
                        url="/sounds/wingsClose.mp3"
                        ref={wingsCloseSound}
                        distance={1000}
                        autoplay={false}
                        loop={false}
                      />
                      <mesh
                        name="xwing2Fuselage_Main_Fuselage_Main_exterior_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Main_Fuselage_Main_exterior_0
                            .geometry
                        }
                        material={materials.Fuselage_Main_exterior}
                      />
                      <mesh
                        name="xwing2Fuselage_Main_Fuse_Main_interior_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Main_Fuse_Main_interior_0
                            .geometry
                        }
                        material={materials.Fuse_Main_interior}
                      />
                    </group>
                    <group name="xwing2Canopy">
                      <mesh
                        name="xwing2Canopy_Canopy_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2Canopy_Canopy_0.geometry}
                        material={materials.Canopy}
                      />
                    </group>
                    <group name="xwing2Canopy_Glass">
                      <mesh
                        name="xwing2Canopy_Glass_Glass_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2Canopy_Glass_Glass_0.geometry}
                        material={materials.Glass}
                      />
                    </group>
                    <group name="xwing2Cockpit_Glass">
                      <mesh
                        name="xwing2Cockpit_Glass_Glass_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2Cockpit_Glass_Glass_0.geometry}
                        material={materials.Glass}
                      />
                    </group>
                    <group name="xwing2Wing_Rotor_A">
                      <mesh
                        name="xwing2Wing_Rotor_A_Wing_Rotors_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Wing_Rotor_A_Wing_Rotors_0.geometry
                        }
                        material={materials.Wing_Rotors}
                      />
                    </group>
                    <group name="xwing2Wing_Rotor_B">
                      <mesh
                        name="xwing2Wing_Rotor_B_Wing_Rotors_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Wing_Rotor_B_Wing_Rotors_0.geometry
                        }
                        material={materials.Wing_Rotors}
                      />
                    </group>
                    <group name="xwing2Fuselage_Nose">
                      <mesh
                        name="xwing2Fuselage_Nose_Fuselage_Nose_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Nose_Fuselage_Nose_0.geometry
                        }
                        material={materials.Fuselage_Nose}
                      />
                    </group>
                    <group name="xwing2Fuselage_Rear_Plug">
                      <group name="xwing2polymsh" position={[0, 0, -132.55]}>
                        <mesh
                          name="xwing2polymsh_Material__1811_0"
                          castShadow
                          receiveShadow
                          geometry={
                            nodes.xwing2polymsh_Material__1811_0.geometry
                          }
                          material={materials.Material__1811}
                        />
                      </group>
                    </group>
                    <group name="xwing2Fuselage_Rear">
                      <mesh
                        name="xwing2Fuselage_Rear_Material__19941_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Rear_Material__19941_0.geometry
                        }
                        material={materials.Material__19941}
                      />
                    </group>
                    <group name="xwing2Fuselage_Top_Detail">
                      <mesh
                        name="xwing2Fuselage_Top_Detail_Material__19920_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Top_Detail_Material__19920_0
                            .geometry
                        }
                        material={materials.Material__19920}
                      />
                      <mesh
                        name="xwing2Fuselage_Top_Detail_Material__185_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Top_Detail_Material__185_0
                            .geometry
                        }
                        material={materials.Material__19920}
                      />
                    </group>
                    <group name="xwing2Fuselage_Cockpit">
                      <mesh
                        name="xwing2Fuselage_Cockpit_Cockpit_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.xwing2Fuselage_Cockpit_Cockpit_0.geometry
                        }
                        material={materials.Cockpit}
                      />
                    </group>
                    <group name="xwing2R2_Head">
                      <mesh
                        name="xwing2R2_Head_R2_Dome_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2R2_Head_R2_Dome_0.geometry}
                        material={materials.R2_Dome}
                      />
                      <mesh
                        name="xwing2R2_Head_Glassy_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2R2_Head_Glassy_0.geometry}
                        material={materials.Glassy}
                      />
                      <mesh
                        name="xwing2R2_Head_R2_Head_metal_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2R2_Head_R2_Head_metal_0.geometry}
                        material={materials.R2_Head_metal}
                      />
                    </group>
                    <group name="xwing2R2_Body">
                      <mesh
                        name="xwing2R2_Body_Body_main_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2R2_Body_Body_main_0.geometry}
                        material={materials.Body_main}
                      />
                      <mesh
                        name="xwing2R2_Body_Metal_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2R2_Body_Metal_0.geometry}
                        material={materials.Metal}
                      />
                      <mesh
                        name="xwing2R2_Body_Legs_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.xwing2R2_Body_Legs_0.geometry}
                        material={materials.Legs}
                      />
                    </group>
                    <group
                      name="xwing2S_Foil_1_NeutralPose"
                      position={[0, 1407.88, 0]}
                    >
                      <group
                        ref={refOne}
                        name="xwing2S_Foil_1"
                        rotation={[0, 0, 0]}
                      >
                        <group
                          name="xwing2Engine_Intake_Front_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Front_1_Material__199879_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_1_Material__199879_0
                                .geometry
                            }
                            material={materials.Material__199879}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Front_1_Material__19987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_1_Material__19987_0
                                .geometry
                            }
                            material={materials.Material__19987}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Inner_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Wing_Inner_1_Material__199987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Inner_1_Material__199987_0
                                .geometry
                            }
                            material={materials.Material__199987}
                          />
                        </group>
                        <group
                          name="xwing2Laser_cannon_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Laser_cannon_1_Material__31_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__31_0.geometry
                            }
                            material={materials.Material__31}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__39_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__39_0.geometry
                            }
                            material={materials.Material__39}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__34_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__34_0.geometry
                            }
                            material={materials.Material__34}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__35_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__35_0.geometry
                            }
                            material={materials.Material__35}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__2_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__2_0.geometry
                            }
                            material={materials.Material__2}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__36_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__36_0.geometry
                            }
                            material={materials.Material__36}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__32_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__32_0.geometry
                            }
                            material={materials.Material__19987}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__200029_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__200029_0
                                .geometry
                            }
                            material={materials.Material__200029}
                          />
                          <mesh
                            name="xwing2Laser_cannon_1_Material__3_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_1_Material__3_0.geometry
                            }
                            material={materials.Material__3}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_Housing_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Lower_Housing_1_Material__199915_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Lower_Housing_1_Material__199915_0
                                .geometry
                            }
                            material={materials.Material__199915}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Lower_1_Material__199985_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Lower_1_Material__199985_0
                                .geometry
                            }
                            material={materials.Material__199985}
                          />
                        </group>
                        <group name="xwing2Wing_1" position={[0, -1407.88, 0]}>
                          <mesh
                            name="xwing2Wing_1_Wing_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.xwing2Wing_1_Wing_0.geometry}
                            material={materials.Wing}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Upper_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Upper_1_Material__199796_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_1_Material__199796_0
                                .geometry
                            }
                            material={materials.Material__199796}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Upper_1_Material__19979_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_1_Material__19979_0
                                .geometry
                            }
                            material={materials.Material__199796}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Exhaust_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Exhaust_1_Light_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_1_Light_0.geometry
                            }
                            material={materials.Light}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_1_Barrel_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_1_Barrel_0.geometry
                            }
                            material={materials.Barrel}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_1_Grill_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_1_Grill_0.geometry
                            }
                            material={materials.Grill}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Main_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Main_1_Engine_Main_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Main_1_Engine_Main_0.geometry
                            }
                            material={materials.Engine_Main}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Block_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Wing_Block_1_wing_block_mat_1_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Block_1_wing_block_mat_1_0
                                .geometry
                            }
                            material={materials.wing_block_mat_1}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Lower_1"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Lower_1_Material__199878_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Lower_1_Material__199878_0
                                .geometry
                            }
                            material={materials.Material__199878}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Lower_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Lower_4_Material__199878_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Lower_4_Material__199878_0
                                .geometry
                            }
                            material={materials.Material__199878}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_Housing_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Lower_Housing_4_Material__199915_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Lower_Housing_4_Material__199915_0
                                .geometry
                            }
                            material={materials.Material__199915}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Lower_4_Material__199985_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Lower_4_Material__199985_0
                                .geometry
                            }
                            material={materials.Material__199985}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Front_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Front_4_Material__199879_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_4_Material__199879_0
                                .geometry
                            }
                            material={materials.Material__199879}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Front_4_Material__19987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_4_Material__19987_0
                                .geometry
                            }
                            material={materials.Material__19987}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Exhaust_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Exhaust_4_Light_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_4_Light_0.geometry
                            }
                            material={materials.Light}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_4_Barrel_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_4_Barrel_0.geometry
                            }
                            material={materials.Barrel}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_4_Grill_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_4_Grill_0.geometry
                            }
                            material={materials.Grill}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Upper_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Upper_4_Material__199796_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_4_Material__199796_0
                                .geometry
                            }
                            material={materials.Material__199796}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Upper_4_Material__19979_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_4_Material__19979_0
                                .geometry
                            }
                            material={materials.Material__199796}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Main_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Main_4_Engine_Main_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Main_4_Engine_Main_0.geometry
                            }
                            material={materials.Engine_Main}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Inner_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Wing_Inner_4_Material__199987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Inner_4_Material__199987_0
                                .geometry
                            }
                            material={materials.Material__199987}
                          />
                        </group>
                        <group
                          name="xwing2Wing_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Wing_4_Wing_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.xwing2Wing_4_Wing_0.geometry}
                            material={materials.Wing}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Block_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Wing_Block_4_wing_block_mat_1_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Block_4_wing_block_mat_1_0
                                .geometry
                            }
                            material={materials.wing_block_mat_1}
                          />
                        </group>
                        <group
                          name="xwing2Laser_cannon_4"
                          position={[0, -1407.88, 0]}
                          rotation={[-Math.PI, 0, Math.PI]}
                        >
                          <mesh
                            name="xwing2Laser_cannon_4_Material__31_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__31_0.geometry
                            }
                            material={materials.Material__31}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__39_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__39_0.geometry
                            }
                            material={materials.Material__39}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__34_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__34_0.geometry
                            }
                            material={materials.Material__34}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__35_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__35_0.geometry
                            }
                            material={materials.Material__35}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__2_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__2_0.geometry
                            }
                            material={materials.Material__2}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__36_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__36_0.geometry
                            }
                            material={materials.Material__36}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__32_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__32_0.geometry
                            }
                            material={materials.Material__19987}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__200029_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__200029_0
                                .geometry
                            }
                            material={materials.Material__200029}
                          />
                          <mesh
                            name="xwing2Laser_cannon_4_Material__3_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_4_Material__3_0.geometry
                            }
                            material={materials.Material__3}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="xwing2S_Foil_2_NeutralPose"
                      position={[0, 1407.88, 0]}
                    >
                      <group
                        name="xwing2S_Foil_2"
                        ref={refTwo}
                        rotation={[0, 0, 0]}
                      >
                        <group
                          name="xwing2Wing_Block_3"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Wing_Block_3_wing_block_mat_2_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Block_3_wing_block_mat_2_0
                                .geometry
                            }
                            material={materials.wing_block_mat_2}
                          />
                        </group>
                        <group
                          name="xwing2Laser_cannon_2"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0.26, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200097_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200097_0
                                .geometry
                            }
                            material={materials.Material__200097}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200091_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200091_0
                                .geometry
                            }
                            material={materials.Material__36}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200099_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200099_0
                                .geometry
                            }
                            material={materials.Material__34}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200092_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200092_0
                                .geometry
                            }
                            material={materials.Material__31}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200096_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200096_0
                                .geometry
                            }
                            material={materials.Material__200029}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200095_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200095_0
                                .geometry
                            }
                            material={materials.Material__19987}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200094_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200094_0
                                .geometry
                            }
                            material={materials.Material__39}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200093_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200093_0
                                .geometry
                            }
                            material={materials.Material__35}
                          />
                          <mesh
                            name="xwing2Laser_cannon_2_Material__200098_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_2_Material__200098_0
                                .geometry
                            }
                            material={materials.Material__3}
                          />
                        </group>
                        <group
                          name="xwing2Wing_2"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0.26, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Wing_2_wing_2_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.xwing2Wing_2_wing_2_0.geometry}
                            material={materials.wing_2}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Exhaust_2"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Exhaust_2_Light_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_2_Light_0.geometry
                            }
                            material={materials.Light}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_2_Barrel_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_2_Barrel_0.geometry
                            }
                            material={materials.Barrel}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_2_Grill_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_2_Grill_0.geometry
                            }
                            material={materials.Grill}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Front_2"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Front_2_Material__199879_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_2_Material__199879_0
                                .geometry
                            }
                            material={materials.Material__199879}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Front_2_Material__19987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_2_Material__19987_0
                                .geometry
                            }
                            material={materials.Material__19987}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Lower_2"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Lower_2_Material__199878_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Lower_2_Material__199878_0
                                .geometry
                            }
                            material={materials.Material__199878}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Upper_2"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Upper_2_Material__200101_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_2_Material__200101_0
                                .geometry
                            }
                            material={materials.Material__200101}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Upper_2_Material__200100_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_2_Material__200100_0
                                .geometry
                            }
                            material={materials.Material__200100}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Main_2"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Main_2_Engine_Main_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Main_2_Engine_Main_0.geometry
                            }
                            material={materials.Engine_Main}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Block_2"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Wing_Block_2_wing_block_mat_2_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Block_2_wing_block_mat_2_0
                                .geometry
                            }
                            material={materials.wing_block_mat_2}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_Housing_2"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, 0]}
                          scale={-1}
                        >
                          <mesh
                            name="xwing2Engine_Lower_Housing_2_Material__199915_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Lower_Housing_2_Material__199915_0
                                .geometry
                            }
                            material={materials.Material__199915}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_2"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Lower_2_Material__199985_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Lower_2_Material__199985_0
                                .geometry
                            }
                            material={materials.Material__199985}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Inner_2"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0.26, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Wing_Inner_2_Material__199987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Inner_2_Material__199987_0
                                .geometry
                            }
                            material={materials.Material__199987}
                          />
                        </group>
                        <group
                          name="xwing2Wing_Inner_3"
                          position={[0, -1407.88, 0]}
                          rotation={[0, -0.26, 0]}
                        >
                          <mesh
                            name="xwing2Wing_Inner_3_Material__199987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Wing_Inner_3_Material__199987_0
                                .geometry
                            }
                            material={materials.Material__199987}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Exhaust_3"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Exhaust_3_Light_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_3_Light_0.geometry
                            }
                            material={materials.Light}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_3_Barrel_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_3_Barrel_0.geometry
                            }
                            material={materials.Barrel}
                          />
                          <mesh
                            name="xwing2Engine_Exhaust_3_Grill_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Exhaust_3_Grill_0.geometry
                            }
                            material={materials.Grill}
                          />
                        </group>
                        <group
                          name="xwing2Laser_cannon_3"
                          position={[0, -1407.88, 0]}
                          rotation={[0, -0.26, 0]}
                        >
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200109_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200109_0
                                .geometry
                            }
                            material={materials.Material__35}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200102_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200102_0
                                .geometry
                            }
                            material={materials.Material__39}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200110_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200110_0
                                .geometry
                            }
                            material={materials.Material__31}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200108_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200108_0
                                .geometry
                            }
                            material={materials.Material__19987}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200103_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200103_0
                                .geometry
                            }
                            material={materials.Material__200029}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200107_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200107_0
                                .geometry
                            }
                            material={materials.Material__36}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200105_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200105_0
                                .geometry
                            }
                            material={materials.Material__3}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200104_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200104_0
                                .geometry
                            }
                            material={materials.Material__200097}
                          />
                          <mesh
                            name="xwing2Laser_cannon_3_Material__200106_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Laser_cannon_3_Material__200106_0
                                .geometry
                            }
                            material={materials.Material__34}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Front_3"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Front_3_Material__199879_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_3_Material__199879_0
                                .geometry
                            }
                            material={materials.Material__199879}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Front_3_Material__19987_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Front_3_Material__19987_0
                                .geometry
                            }
                            material={materials.Material__19987}
                          />
                        </group>
                        <group
                          name="xwing2Wing_3"
                          position={[0, -1407.88, 0]}
                          rotation={[0, -0.26, 0]}
                        >
                          <mesh
                            name="xwing2Wing_3_Wing_0"
                            castShadow
                            receiveShadow
                            geometry={nodes.xwing2Wing_3_Wing_0.geometry}
                            material={materials.Wing}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Lower_3"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Lower_3_Material__199878_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Lower_3_Material__199878_0
                                .geometry
                            }
                            material={materials.Material__199878}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Intake_Upper_3"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Intake_Upper_3_Material__200101_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_3_Material__200101_0
                                .geometry
                            }
                            material={materials.Material__200101}
                          />
                          <mesh
                            name="xwing2Engine_Intake_Upper_3_Material__200100_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Intake_Upper_3_Material__200100_0
                                .geometry
                            }
                            material={materials.Material__200100}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Main_3"
                          position={[0, -1407.88, 0]}
                          rotation={[Math.PI, 0, -Math.PI]}
                        >
                          <mesh
                            name="xwing2Engine_Main_3_Engine_Main_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Main_3_Engine_Main_0.geometry
                            }
                            material={materials.Engine_Main}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_Housing_3"
                          position={[0, -1407.88, 0]}
                          rotation={[0, 0, Math.PI]}
                          scale={-1}
                        >
                          <mesh
                            name="xwing2Engine_Lower_Housing_3_Material__199915_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes
                                .xwing2Engine_Lower_Housing_3_Material__199915_0
                                .geometry
                            }
                            material={materials.Material__199915}
                          />
                        </group>
                        <group
                          name="xwing2Engine_Lower_3"
                          position={[0, -1407.88, 0]}
                        >
                          <mesh
                            name="xwing2Engine_Lower_3_Material__199985_0"
                            castShadow
                            receiveShadow
                            geometry={
                              nodes.xwing2Engine_Lower_3_Material__199985_0
                                .geometry
                            }
                            material={materials.Material__199985}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/x-wing-transformed.glb");
