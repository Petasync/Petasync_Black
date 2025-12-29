import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Shield for Versicherung Template
export function ProtectionShield() {
  const shieldRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      shieldRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group ref={shieldRef}>
      {/* Shield Shape - using distorted sphere for organic feel */}
      <Sphere args={[1.5, 32, 32]} scale={[1, 1.2, 0.3]}>
        <MeshDistortMaterial
          color="#1E3A8A"
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Inner glow ring */}
      <Torus args={[1.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.5} />
      </Torus>
    </group>
  );
}

// Network Visualization
export function NetworkNodes() {
  const nodesCount = 8;
  const nodes = Array.from({ length: nodesCount }, (_, i) => {
    const angle = (i / nodesCount) * Math.PI * 2;
    return {
      x: Math.cos(angle) * 2,
      y: Math.sin(angle) * 2,
      z: (Math.random() - 0.5) * 0.5,
    };
  });

  return (
    <group>
      {nodes.map((node, i) => (
        <Sphere key={i} args={[0.1, 16, 16]} position={[node.x, node.y, node.z]}>
          <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.5} />
        </Sphere>
      ))}
    </group>
  );
}
