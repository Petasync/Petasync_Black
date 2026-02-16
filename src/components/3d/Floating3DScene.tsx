import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Error boundary for WebGL/Three.js Canvas.
 * Catches GPU crashes, missing WebGL support, etc. and renders nothing
 * so the rest of the page still works.
 */
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
    console.warn('3D scene failed to render:', error.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function FloatingShape({ 
  position, 
  geometry, 
  color, 
  rotationSpeed = 0.5,
  scale = 1 
}: { 
  position: [number, number, number]; 
  geometry: "box" | "octahedron" | "torus" | "icosahedron";
  color: string;
  rotationSpeed?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.002 * rotationSpeed;
    meshRef.current.rotation.y += 0.003 * rotationSpeed;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const Geometry = () => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.4]} />;
      case "torus":
        return <torusGeometry args={[0.3, 0.1, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[0.35, 0]} />;
      default:
        return <boxGeometry args={[0.5, 0.5, 0.5]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Geometry />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 80 }) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

interface Floating3DSceneProps {
  variant?: "default" | "minimal" | "dense";
  className?: string;
}

export function Floating3DScene({ variant = "default", className = "" }: Floating3DSceneProps) {
  const shapes = useMemo(() => {
    if (variant === "minimal") {
      return [
        { position: [-2, 0.5, -1] as [number, number, number], geometry: "octahedron" as const, color: "#ffffff", scale: 0.8 },
        { position: [2.5, -0.3, -2] as [number, number, number], geometry: "torus" as const, color: "#ffffff", scale: 0.6 },
      ];
    }
    if (variant === "dense") {
      return [
        { position: [-3, 1, -1] as [number, number, number], geometry: "box" as const, color: "#ffffff", scale: 0.7 },
        { position: [3, 0, -2] as [number, number, number], geometry: "octahedron" as const, color: "#ffffff", scale: 0.9 },
        { position: [-2, -1, -1.5] as [number, number, number], geometry: "torus" as const, color: "#ffffff", scale: 0.5 },
        { position: [2, 1.5, -1] as [number, number, number], geometry: "icosahedron" as const, color: "#ffffff", scale: 0.6 },
        { position: [0, -0.5, -2.5] as [number, number, number], geometry: "box" as const, color: "#ffffff", scale: 0.4 },
      ];
    }
    return [
      { position: [-2.5, 0.8, -1] as [number, number, number], geometry: "box" as const, color: "#ffffff", scale: 0.7 },
      { position: [2.8, -0.2, -1.5] as [number, number, number], geometry: "octahedron" as const, color: "#ffffff", scale: 0.8 },
      { position: [-1, -0.8, -2] as [number, number, number], geometry: "torus" as const, color: "#ffffff", scale: 0.5 },
      { position: [1.5, 1.2, -1] as [number, number, number], geometry: "icosahedron" as const, color: "#ffffff", scale: 0.6 },
    ];
  }, [variant]);

  return (
    <Canvas3DErrorBoundary>
      <div className={`absolute inset-0 ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.5} />

          {shapes.map((shape, index) => (
            <FloatingShape
              key={index}
              position={shape.position}
              geometry={shape.geometry}
              color={shape.color}
              scale={shape.scale}
              rotationSpeed={0.3 + index * 0.1}
            />
          ))}

          <Particles count={variant === "dense" ? 120 : variant === "minimal" ? 40 : 80} />
        </Canvas>
      </div>
    </Canvas3DErrorBoundary>
  );
}
