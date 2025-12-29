import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Scissors
export function Scissors() {
  const scissorsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (scissorsRef.current) {
      scissorsRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      scissorsRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={scissorsRef}>
      {/* Blade 1 */}
      <mesh position={[-0.3, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.1, 1, 0.05]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>

      {/* Blade 2 */}
      <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 1, 0.05]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
      </mesh>

      {/* Handle Ring 1 */}
      <Torus args={[0.2, 0.03, 16, 32]} position={[-0.3, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#E91E63" />
      </Torus>

      {/* Handle Ring 2 */}
      <Torus args={[0.2, 0.03, 16, 32]} position={[0.3, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#E91E63" />
      </Torus>
    </group>
  );
}

// Product Bottles
export function ProductBottle({ position }: { position: [number, number, number] }) {
  const bottleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group ref={bottleRef} position={position}>
      {/* Bottle Body */}
      <Cylinder args={[0.15, 0.2, 1, 32]}>
        <meshStandardMaterial color="#E91E63" transparent opacity={0.8} metalness={0.3} />
      </Cylinder>

      {/* Cap */}
      <Cylinder args={[0.12, 0.12, 0.15]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={0.8} />
      </Cylinder>

      {/* Label */}
      <Cylinder args={[0.16, 0.21, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Cylinder>
    </group>
  );
}

// Glitter Particles
export function GlitterParticles() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = Array.from({ length: 30 }, (_, i) => ({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 8,
  }));

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[0.05, 8, 8]} position={[particle.x, particle.y, particle.z]}>
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={1}
            metalness={1}
          />
        </Sphere>
      ))}
    </group>
  );
}
