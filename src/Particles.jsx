import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";

function make(color, speed) {
  return {
    ref: React.createRef(),
    color,
    data: new Array(5)
      .fill()
      .map(() => [
        new THREE.Vector3(),
        new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        )
          .normalize()
          .multiplyScalar(speed * 0.75),
      ]),
  };
}

export default function Particles({ position, scale }) {
  // const Y = offsetY ? offsetY + 1 : 0;
  const group = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () => [make("yellow", 0.3), make("orange", 0.2)],
    []
  );

  const [shouldRemove, setShouldRemove] = React.useState(false);
  const frameCount = useRef(0);
  useFrame(() => {
    frameCount.current += 1;
    particles.forEach(({ data }, type) => {
      // Check if the mesh is an instance of THREE.InstancedMesh
      if (group.current.children[type] instanceof THREE.InstancedMesh) {
        const mesh = group.current.children[type];
        data.forEach(([vec, normal], i) => {
          vec.add(normal);
          dummy.position.copy(vec);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        });
        mesh.material.opacity -= 0.05;
        if (mesh.material.emissiveIntensity > 0) {
          mesh.material.emissiveIntensity -= 0.05;
        }
        if (mesh.material.opacity <= 0) {
          mesh.visible = false;
        }

        mesh.instanceMatrix.needsUpdate = true;
      }
    });
  });

  let realPosition = [0, 0, 0];
if(position){
  realPosition = [position.x, position.y, position.z - 1];
}
  return (
    <group ref={group} position={realPosition} scale={[scale, scale, scale]}>
      {particles.map(({ color, data }, index) => (
        <instancedMesh
          key={index}
          args={[null, null, data.length]}
          frustumCulled={false}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.2, 6, 4]} />
          <meshStandardMaterial
            toneMapped={false}
            emissive={color}
            emissiveIntensity={3}
            transparent
            opacity={1}
            fog={false}
          />
        </instancedMesh>
      ))}
    </group>
  );
}
