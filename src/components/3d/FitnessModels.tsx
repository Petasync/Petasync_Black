import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Dumbbell
export function Dumbbell() {
  const dumbbellRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (dumbbellRef.current) {
      dumbbellRef.current.rotation.z = state.clock.elapsedTime;
      dumbbellRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={dumbbellRef}>
      {/* Bar */}
      <Cylinder args={[0.05, 0.05, 2]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1C1C1C" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Weights */}
      <Cylinder args={[0.3, 0.3, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.3} />
      </Cylinder>
      <Cylinder args={[0.3, 0.3, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[1, 0, 0]}>
        <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={0.3} />
      </Cylinder>
    </group>
  );
}

// Energy Particles
export function EnergyParticles() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const particles = Array.from({ length: 50 }, (_, i) => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 10,
    size: Math.random() * 0.1 + 0.05,
  }));

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.size, 8, 8]} position={[particle.x, particle.y, particle.z]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00FF00" : "#FF00FF"}
            emissive={i % 2 === 0 ? "#00FF00" : "#FF00FF"}
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}
