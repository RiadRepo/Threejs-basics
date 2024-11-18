import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import { useRef } from "react";
import WaveBackground from "./WaveBackground";

// Other components
function SpinningCube() {
  const cubeRef = useRef();
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}

function AnimatedBackground() {
  const particlesRef = useRef();
  const count = 1000;
  const positions = Array.from(
    { length: count * 3 },
    () => (Math.random() - 0.5) * 10
  );

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          array={new Float32Array(positions)}
          itemSize={3}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color='blue' />
    </points>
  );
}

// Main GameScene Component
export default function GameScene() {
  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />

      {/* Wave Background */}
      <WaveBackground />

      {/* Main Scene Elements */}
      <SpinningCube />
      <AnimatedBackground />
      <OrbitControls />

      {/* Post-Processing Effects */}
      <EffectComposer>
        <Bloom intensity={0.5} />
        <Glitch delay={[1, 2]} />
      </EffectComposer>
    </Canvas>
  );
}
