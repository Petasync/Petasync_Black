import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Cylinder, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// Animated Product Bottle Component
function Bottle({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Bottle body */}
      <Cylinder args={[0.15, 0.15, 1.2, 32]} position={[0, 0, 0]} castShadow>
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
        />
      </Cylinder>

      {/* Bottle cap */}
      <Cylinder args={[0.18, 0.18, 0.15, 32]} position={[0, 0.675, 0]} castShadow>
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Label - simple text */}
      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[0.25, 0.6]} />
        <meshBasicMaterial color="#FFFFFF" opacity={0.9} transparent />
      </mesh>
    </group>
  );
}

export function ProductBottles() {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl overflow-hidden shadow-xl">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500">Lädt 3D-Produkte...</div>
        </div>
      }>
        <Canvas shadows camera={{ position: [0, 1, 4], fov: 50 }}>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />

          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 3, -5]} intensity={0.5} color="#FF1493" />
          <spotLight position={[0, 5, 0]} intensity={0.3} angle={0.3} penumbra={1} />

          {/* Platform */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
            <circleGeometry args={[3, 64]} />
            <meshStandardMaterial
              color="#FFFFFF"
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>

          {/* Product Bottles */}
          <Bottle position={[-0.8, 0, 0]} color="#FF1493" label="Shampoo" />
          <Bottle position={[0, 0, 0]} color="#9333EA" label="Conditioner" />
          <Bottle position={[0.8, 0, 0]} color="#FFD700" label="Serum" />
        </Canvas>
      </Suspense>
    </div>
  );
}
