import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

// Simple 3D Floor Plan Component
function FloorPlan() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#E8E8E8" />
      </mesh>

      {/* Walls */}
      {/* Outer walls */}
      <mesh position={[0, 1.5, -5]} castShadow>
        <boxGeometry args={[10, 3, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 1.5, 5]} castShadow>
        <boxGeometry args={[10, 3, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-5, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 10]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[5, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 10]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Inner walls - creating rooms */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 8]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      <mesh position={[2, 1.5, 2]} castShadow>
        <boxGeometry args={[6, 3, 0.2]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>

      {/* Furniture representations */}
      {/* Bed */}
      <mesh position={[-3, 0.3, -3]} castShadow>
        <boxGeometry args={[2, 0.6, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Sofa */}
      <mesh position={[3, 0.4, -3]} castShadow>
        <boxGeometry args={[2.5, 0.8, 1]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>

      {/* Table */}
      <mesh position={[-3, 0.4, 3]} castShadow>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* Kitchen counter */}
      <mesh position={[3.5, 0.5, 3]} castShadow>
        <boxGeometry args={[1, 1, 3]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
    </group>
  );
}

export function FloorPlanViewer() {
  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-2xl">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-500">Lädt 3D-Grundriss...</div>
        </div>
      }>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[8, 8, 8]} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2.2}
          />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} />

          <FloorPlan />
        </Canvas>
      </Suspense>
    </div>
  );
}
