import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Car Model
export function CarModel() {
  const carRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (carRef.current) {
      carRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={carRef}>
      {/* Car Body */}
      <Box args={[3, 0.8, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#C41E3A" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Car Cabin */}
      <Box args={[1.5, 0.6, 1.4]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#C41E3A" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Windows */}
      <Box args={[0.7, 0.4, 1.41]} position={[0.3, 0.7, 0]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.4} />
      </Box>
      <Box args={[0.7, 0.4, 1.41]} position={[-0.5, 0.7, 0]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.4} />
      </Box>

      {/* Wheels */}
      <Torus args={[0.35, 0.15, 16, 32]} rotation={[0, Math.PI / 2, 0]} position={[1, -0.5, 0.8]}>
        <meshStandardMaterial color="#1C1C1C" />
      </Torus>
      <Torus args={[0.35, 0.15, 16, 32]} rotation={[0, Math.PI / 2, 0]} position={[1, -0.5, -0.8]}>
        <meshStandardMaterial color="#1C1C1C" />
      </Torus>
      <Torus args={[0.35, 0.15, 16, 32]} rotation={[0, Math.PI / 2, 0]} position={[-1, -0.5, 0.8]}>
        <meshStandardMaterial color="#1C1C1C" />
      </Torus>
      <Torus args={[0.35, 0.15, 16, 32]} rotation={[0, Math.PI / 2, 0]} position={[-1, -0.5, -0.8]}>
        <meshStandardMaterial color="#1C1C1C" />
      </Torus>

      {/* Headlights */}
      <Cylinder args={[0.1, 0.1, 0.1]} rotation={[Math.PI / 2, 0, 0]} position={[1.5, 0, 0.5]}>
        <meshStandardMaterial color="#FFB81C" emissive="#FFB81C" emissiveIntensity={1} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.1]} rotation={[Math.PI / 2, 0, 0]} position={[1.5, 0, -0.5]}>
        <meshStandardMaterial color="#FFB81C" emissive="#FFB81C" emissiveIntensity={1} />
      </Cylinder>
    </group>
  );
}

// Rotating Tire
export function RotatingTire() {
  const tireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (tireRef.current) {
      tireRef.current.rotation.x = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group>
      <Torus ref={tireRef} args={[0.8, 0.3, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1C1C1C" metalness={0.2} roughness={0.8} />
      </Torus>

      {/* Rim */}
      <Cylinder args={[0.5, 0.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.2} />
      </Cylinder>
    </group>
  );
}
