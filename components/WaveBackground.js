import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function WaveBackground() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value = time;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[10, 10, 50, 50]} />
      <shaderMaterial
        uniforms={{
          u_time: { value: 0 },
        }}
        vertexShader={`
          uniform float u_time;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + u_time) * 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default WaveBackground;
