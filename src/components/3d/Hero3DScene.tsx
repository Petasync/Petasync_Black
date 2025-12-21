import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Custom Laptop Geometry Component
function Laptop({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smooth mouse follow
      const targetRotationY = mousePosition.x * 0.3;
      const targetRotationX = mousePosition.y * 0.2;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX + 0.1,
        0.05
      );
      
      // Subtle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={1.2}>
        {/* Laptop Base */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <boxGeometry args={[2.4, 0.08, 1.6]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.9} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Keyboard area */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.2, 0.02, 1.2]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.5} 
            roughness={0.8}
          />
        </mesh>

        {/* Keyboard keys (simplified grid) */}
        {[...Array(4)].map((_, row) => (
          [...Array(10)].map((_, col) => (
            <mesh 
              key={`${row}-${col}`}
              position={[-0.9 + col * 0.2, 0.02, 0.4 - row * 0.25]}
            >
              <boxGeometry args={[0.15, 0.01, 0.18]} />
              <meshStandardMaterial 
                color="#2a2a2a" 
                metalness={0.3} 
                roughness={0.7}
              />
            </mesh>
          ))
        ))}

        {/* Trackpad */}
        <mesh position={[0, 0.02, -0.4]}>
          <boxGeometry args={[0.8, 0.01, 0.5]} />
          <meshStandardMaterial 
            color="#1f1f1f" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>

        {/* Screen - hinged at back */}
        <group position={[0, 0.04, 0.75]} rotation={[-0.3, 0, 0]}>
          {/* Screen frame */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <boxGeometry args={[2.4, 1.5, 0.05]} />
            <meshStandardMaterial 
              color="#1a1a1a" 
              metalness={0.9} 
              roughness={0.2}
            />
          </mesh>
          
          {/* Screen display */}
          <mesh position={[0, 0.7, 0.03]}>
            <planeGeometry args={[2.2, 1.35]} />
            <meshStandardMaterial 
              color="#000000" 
              emissive="#ea580c"
              emissiveIntensity={0.05}
              metalness={0.1} 
              roughness={0.1}
            />
          </mesh>

          {/* Screen content - glowing elements */}
          <mesh position={[0, 0.9, 0.035]}>
            <planeGeometry args={[1.8, 0.3]} />
            <meshBasicMaterial 
              color="#ea580c" 
              transparent 
              opacity={0.3}
            />
          </mesh>
          <mesh position={[-0.5, 0.5, 0.035]}>
            <planeGeometry args={[0.6, 0.4]} />
            <meshBasicMaterial 
              color="#22c55e" 
              transparent 
              opacity={0.2}
            />
          </mesh>
          <mesh position={[0.5, 0.5, 0.035]}>
            <planeGeometry args={[0.6, 0.4]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1}
            />
          </mesh>
        </group>

        {/* Orange accent light under laptop */}
        <pointLight 
          position={[0, -0.3, 0]} 
          intensity={0.5} 
          color="#ea580c" 
          distance={3}
        />
      </group>
    </Float>
  );
}

// Floating geometric elements
function FloatingElements({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const group1Ref = useRef<THREE.Mesh>(null);
  const group2Ref = useRef<THREE.Mesh>(null);
  const group3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (group1Ref.current) {
      group1Ref.current.rotation.x = time * 0.3 + mousePosition.y * 0.5;
      group1Ref.current.rotation.y = time * 0.2 + mousePosition.x * 0.5;
      group1Ref.current.position.y = Math.sin(time * 0.5) * 0.3 + 2;
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = time * 0.4;
      group2Ref.current.rotation.z = time * 0.3;
      group2Ref.current.position.y = Math.sin(time * 0.7 + 1) * 0.2 - 1.5;
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.y = time * 0.5;
      group3Ref.current.rotation.z = time * 0.2;
      group3Ref.current.position.x = Math.sin(time * 0.3) * 0.2 + 3;
    }
  });

  return (
    <>
      {/* Wireframe Cube */}
      <mesh ref={group1Ref} position={[-3, 2, -2]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshBasicMaterial color="#ea580c" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Torus */}
      <mesh ref={group2Ref} position={[3.5, -1.5, -3]}>
        <torusGeometry args={[0.5, 0.15, 16, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#ea580c"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Octahedron */}
      <mesh ref={group3Ref} position={[3, 1, -2]}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial 
          color="#22c55e" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#22c55e"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

// Particle system
function Particles() {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Mouse tracker component
function MouseTracker({ onMouseMove }: { onMouseMove: (pos: { x: number; y: number }) => void }) {
  const { viewport } = useThree();
  
  useFrame(({ mouse }) => {
    onMouseMove({
      x: (mouse.x * viewport.width) / 10,
      y: (mouse.y * viewport.height) / 10
    });
  });
  
  return null;
}

// Main Scene
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-5, 3, 2]} intensity={0.4} color="#ea580c" />
      <pointLight position={[5, -2, 3]} intensity={0.2} color="#22c55e" />
      
      {/* Spotlight on laptop */}
      <spotLight
        position={[0, 5, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      {/* 3D Elements */}
      <Laptop mousePosition={mousePosition} />
      <FloatingElements mousePosition={mousePosition} />
      <Particles />
    </>
  );
}

// Exported component
export function Hero3DScene() {
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (pos: { x: number; y: number }) => {
    mousePositionRef.current = pos;
  };

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <MouseTracker onMouseMove={handleMouseMove} />
        <Scene mousePosition={mousePositionRef.current} />
      </Canvas>
    </div>
  );
}
