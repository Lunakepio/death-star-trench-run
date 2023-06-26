import { BufferGeometry, BufferAttribute, Points, PointsMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
export const Particles = () => {
  const particleCount = 500
const initialPositions = new Float32Array(particleCount * 3); // x, y, z initial positions
const positions = new Float32Array(particleCount * 3); // x, y, z current positions
const colors = new Float32Array(particleCount * 3); // r, g, b colors
const sizes = new Float32Array(particleCount); // sizes

const velocity = new Float32Array(particleCount * 3); // x, y, z velocity

const maxSpeed = 0.05; // maximum speed of particles

// Initialize particle positions, colors, sizes, and velocities
for (let i = 0; i < particleCount; i++) {
  const index = i * 3;

  initialPositions[index] = 0; // initial x position
  initialPositions[index + 1] = 0; // initial y position
  initialPositions[index + 2] = 0; // initial z position

  positions[index] = initialPositions[index];
  positions[index + 1] = initialPositions[index + 1];
  positions[index + 2] = initialPositions[index + 2];

  colors[index] = Math.random(); // random r color
  colors[index + 1] = Math.random(); // random g color
  colors[index + 2] = Math.random(); // random b color

  sizes[i] = Math.random() * 10; // random size

  velocity[index] = Math.random() * maxSpeed * 2 - maxSpeed; // random x velocity
  velocity[index + 1] = Math.random() * maxSpeed * 2 - maxSpeed; // random y velocity
  velocity[index + 2] = Math.random() * maxSpeed * 2 - maxSpeed; // random z velocity
}

const geometry = new BufferGeometry();
geometry.setAttribute('position', new BufferAttribute(positions, 3));
geometry.setAttribute('color', new BufferAttribute(colors, 3));
geometry.setAttribute('size', new BufferAttribute(sizes, 1));

const material = new PointsMaterial({ size: 1, vertexColors: true });

useFrame(() => {
  // Update particle positions
  for (let i = 0; i < particleCount; i++) {
    const index = i * 3;

    positions[index] += velocity[index]; // update x position
    positions[index + 1] += velocity[index + 1]; // update y position
    positions[index + 2] += velocity[index + 2]; // update z position

    // Check if the particle is out of bounds, and reset its position
    if (
      Math.abs(positions[index]) > 10 ||
      Math.abs(positions[index + 1]) > 10 ||
      Math.abs(positions[index + 2]) > 10
    ) {
      positions[index] = initialPositions[index];
      positions[index + 1] = initialPositions[index + 1];
      positions[index + 2] = initialPositions[index + 2];

      velocity[index] = Math.random() * maxSpeed * 2 - maxSpeed; // random x velocity
      velocity[index + 1] = Math.random() * maxSpeed * 2 - maxSpeed; // random y velocity
      velocity[index + 2] = Math.random() * maxSpeed * 2 - maxSpeed; // random z velocity
    }
  }

  // Update the particle system's position attribute
  geometry.attributes.position.needsUpdate = true;
});
return(
  <points geometry={geometry} material={material} />
)
}