import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

// 3D House Model
export function HouseModel() {
  const houseRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (houseRef.current) {
      houseRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={houseRef}>
      {/* House Base */}
      <Box args={[2, 2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ECF0F1" />
      </Box>

      {/* Roof */}
      <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.6, 1, 4]} />
        <meshStandardMaterial color="#C9B037" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Door */}
      <Box args={[0.5, 1, 0.1]} position={[0, -0.5, 1.05]}>
        <meshStandardMaterial color="#2C3E50" />
      </Box>

      {/* Windows */}
      <Box args={[0.4, 0.4, 0.1]} position={[-0.6, 0.3, 1.05]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </Box>
      <Box args={[0.4, 0.4, 0.1]} position={[0.6, 0.3, 1.05]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </Box>
    </group>
  );
}

// Floating Property Cards
export function FloatingPropertyCard({ position }: { position: [number, number, number] }) {
  const cardRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Box ref={cardRef} args={[1, 1.4, 0.05]} position={position}>
      <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.8} />
    </Box>
  );
}
