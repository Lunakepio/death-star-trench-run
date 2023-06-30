import { useEffect, useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GameContext } from './main';
import { PositionalAudio } from '@react-three/drei';

const StarParticles = ({ count = 10000, jump }) => {
    const groupRef = useRef();

    useEffect(() => {
        for (let i = 0; i < count; i++) {
            // Create the geometry for the particle
            const geometry = new THREE.BoxGeometry(1, 0.2, 0.2);
            const material = new THREE.MeshStandardMaterial({ color: 'cyan', emissive: 'cyan', emissiveIntensity: 1, metalness: 0, roughness: 1, transparent: true, toneMapped: false });
            const mesh = new THREE.Mesh(geometry, material);

            // Position the particle randomly within a 100 unit cube
            mesh.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);

            groupRef.current.add(mesh);
        }
    }, [count]);

    const frameCount= useRef(0);
    useFrame((state, delta) => {
        // This will scale the particles to give the effect of jumping to hyperspace
          groupRef.current.scale.lerp(new THREE.Vector3(15, 15, 2), delta);

    });

    return <group position={[-20, 2, 10]} scale={0} ref={groupRef} />;
};

export const Particles = () => {
    const { setup, setSetup } = useContext(GameContext);

    return (
        <>
            <StarParticles count={5000}/>
            {setup.sound ? <PositionalAudio url="/sounds/hyperspace.mp3" distance={100} autoplay={true} loop={false} /> : null}
        </>
    );
};
