import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

interface Scene3DWrapperProps {
  children: React.ReactNode;
  className?: string;
  enableOrbitControls?: boolean;
  cameraPosition?: [number, number, number];
  ambientIntensity?: number;
}

export function Scene3DWrapper({
  children,
  className = '',
  enableOrbitControls = false,
  cameraPosition = [0, 0, 5],
  ambientIntensity = 0.5,
}: Scene3DWrapperProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} />

          {/* Lighting */}
          <ambientLight intensity={ambientIntensity} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* 3D Content */}
          {children}

          {/* Optional Controls */}
          {enableOrbitControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
