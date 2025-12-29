import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// 3D Camera Model
export function CameraModel() {
  const cameraRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      cameraRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={cameraRef}>
      {/* Camera Body */}
      <RoundedBox args={[1.5, 1, 0.8]} radius={0.1} position={[0, 0, 0]}>
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Lens */}
      <Cylinder args={[0.4, 0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.7]}>
        <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Lens Glass */}
      <Cylinder args={[0.35, 0.35, 0.02]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} metalness={1} />
      </Cylinder>

      {/* Flash */}
      <Box args={[0.2, 0.1, 0.1]} position={[0.5, 0.5, 0.3]}>
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.5} />
      </Box>
    </group>
  );
}

// Floating Polaroid Frames
export function PolaroidFrame({ position }: { position: [number, number, number] }) {
  const frameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
      frameRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group>
      <Box ref={frameRef} args={[0.8, 1, 0.02]} position={position}>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
      <Box args={[0.7, 0.7, 0.01]} position={[position[0], position[1] + 0.1, position[2] + 0.02]}>
        <meshStandardMaterial color="#F5F5F5" />
      </Box>
    </group>
  );
}
