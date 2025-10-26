import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function CodeCube() {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh
      ref={ref}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial color={'#ffffff'} metalness={0.2} roughness={0.3} />
    </mesh>
  );
}

export default function CodeScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 2.2, 3.5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={[0x000000]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={0.7} castShadow />
      <spotLight position={[-4, 6, -4]} intensity={0.4} />

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      <CodeCube />

      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={0.6} />
    </Canvas>
  );
}
