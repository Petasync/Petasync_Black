import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Plate with Food
export function FoodPlate() {
  const plateRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (plateRef.current) {
      plateRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      plateRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={plateRef}>
      {/* Plate */}
      <Cylinder args={[1.5, 1.5, 0.1, 32]}>
        <meshStandardMaterial color="#F4E4C1" metalness={0.3} roughness={0.6} />
      </Cylinder>

      {/* Food items - abstract spheres */}
      <Sphere args={[0.3, 16, 16]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#8B1538" />
      </Sphere>
      <Sphere args={[0.2, 16, 16]} position={[0.4, 0.15, 0.3]}>
        <meshStandardMaterial color="#D4AF37" metalness={0.8} />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[-0.3, 0.18, -0.2]}>
        <meshStandardMaterial color="#228B22" />
      </Sphere>

      {/* Gold rim */}
      <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
      </Torus>
    </group>
  );
}

// Wine Glass
export function WineGlass() {
  return (
    <group position={[2, 0, 0]}>
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F4E4C1" transparent opacity={0.6} />
      </Cylinder>
      <Cylinder args={[0.5, 0.3, 1, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#8B1538" transparent opacity={0.4} />
      </Cylinder>
    </group>
  );
}
