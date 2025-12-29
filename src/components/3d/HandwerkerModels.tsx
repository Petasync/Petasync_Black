import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Toolbox for Handwerker Template
export function RotatingToolbox() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Toolbox Body */}
      <Box args={[2, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF6B35" metalness={0.3} roughness={0.4} />
      </Box>
      {/* Handle */}
      <Cylinder args={[0.05, 0.05, 1.5]} rotation={[0, 0, Math.PI / 2]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#2D3142" metalness={0.8} roughness={0.2} />
      </Cylinder>
    </group>
  );
}

// Rotating Tools (Hammer, Wrench, Drill)
export function FloatingTools() {
  return (
    <group>
      {/* Hammer */}
      <group position={[-2, 0, 0]}>
        <Box args={[0.3, 1, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[0.6, 0.3, 0.3]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#A9A9A9" metalness={0.9} />
        </Box>
      </group>

      {/* Wrench */}
      <group position={[0, 0, 0]}>
        <Cylinder args={[0.05, 0.05, 1.2]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </Cylinder>
      </group>

      {/* Drill */}
      <group position={[2, 0, 0]}>
        <Cylinder args={[0.15, 0.1, 0.8]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#FFB81C" />
        </Cylinder>
        <Cylinder args={[0.02, 0.02, 0.4]} rotation={[0, 0, Math.PI / 2]} position={[0.6, 0, 0]}>
          <meshStandardMaterial color="#2D3142" metalness={0.9} />
        </Cylinder>
      </group>
    </group>
  );
}
