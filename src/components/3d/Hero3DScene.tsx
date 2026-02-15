import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

class Canvas3DErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Hero 3D scene failed to render:', error.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// Floating geometric elements - monochrome
function FloatingElements({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const group1Ref = useRef<THREE.Mesh>(null);
  const group2Ref = useRef<THREE.Mesh>(null);
  const group3Ref = useRef<THREE.Mesh>(null);
  const group4Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (group1Ref.current) {
      group1Ref.current.rotation.x = time * 0.15 + mousePosition.y * 0.3;
      group1Ref.current.rotation.y = time * 0.1 + mousePosition.x * 0.3;
      group1Ref.current.position.y = Math.sin(time * 0.3) * 0.2 + 1;
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.x = time * 0.2;
      group2Ref.current.rotation.z = time * 0.15;
      group2Ref.current.position.y = Math.sin(time * 0.4 + 1) * 0.15 - 0.5;
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.y = time * 0.25;
      group3Ref.current.rotation.z = time * 0.1;
      group3Ref.current.position.x = Math.sin(time * 0.2) * 0.15 + 2.5;
    }
    if (group4Ref.current) {
      group4Ref.current.rotation.x = time * 0.1;
      group4Ref.current.rotation.y = time * 0.2;
      group4Ref.current.position.y = Math.sin(time * 0.35 + 2) * 0.2;
    }
  });

  return (
    <>
      {/* Wireframe Cube - white */}
      <mesh ref={group1Ref} position={[-2.5, 1, -2]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Torus - white metallic */}
      <mesh ref={group2Ref} position={[3, -0.5, -2.5]}>
        <torusGeometry args={[0.4, 0.12, 16, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>

      {/* Octahedron - subtle white */}
      <mesh ref={group3Ref} position={[2.5, 0.5, -1.5]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.9} 
          roughness={0.15}
        />
      </mesh>

      {/* Icosahedron - wireframe */}
      <mesh ref={group4Ref} position={[-3, -1, -3]}>
        <icosahedronGeometry args={[0.35]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>
    </>
  );
}

// Particle system - white dots
function Particles() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
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
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Floating laptop with subtle glow
function Laptop({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const targetRotationY = mousePosition.x * 0.2;
      const targetRotationX = mousePosition.y * 0.15;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.03
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX + 0.1,
        0.03
      );
      
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.9} position={[0.5, -0.2, 0]}>
        {/* Laptop Base */}
        <mesh position={[0, -0.04, 0]} castShadow>
          <boxGeometry args={[2, 0.06, 1.4]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.95} 
            roughness={0.15}
          />
        </mesh>
        
        {/* Keyboard area */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.9, 0.015, 1]} />
          <meshStandardMaterial 
            color="#050505" 
            metalness={0.5} 
            roughness={0.8}
          />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.01, -0.35]}>
          <boxGeometry args={[0.7, 0.008, 0.4]} />
          <meshStandardMaterial 
            color="#111111" 
            metalness={0.6} 
            roughness={0.4}
          />
        </mesh>

        {/* Screen - hinged at back */}
        <group position={[0, 0.03, 0.65]} rotation={[-0.25, 0, 0]}>
          {/* Screen frame */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[2, 1.3, 0.04]} />
            <meshStandardMaterial 
              color="#0a0a0a" 
              metalness={0.95} 
              roughness={0.15}
            />
          </mesh>
          
          {/* Screen display - subtle glow */}
          <mesh position={[0, 0.6, 0.025]}>
            <planeGeometry args={[1.85, 1.15]} />
            <meshStandardMaterial 
              color="#000000" 
              emissive="#ffffff"
              emissiveIntensity={0.02}
              metalness={0.1} 
              roughness={0.1}
            />
          </mesh>
        </group>
      </group>
    </Float>
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
      {/* Subtle lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.4} 
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-3, 2, 2]} intensity={0.2} color="#ffffff" />
      
      {/* Spotlight from top */}
      <spotLight
        position={[0, 6, 4]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.5}
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
    <Canvas3DErrorBoundary>
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <MouseTracker onMouseMove={handleMouseMove} />
          <Scene mousePosition={mousePositionRef.current} />
        </Canvas>
      </div>
    </Canvas3DErrorBoundary>
  );
}
