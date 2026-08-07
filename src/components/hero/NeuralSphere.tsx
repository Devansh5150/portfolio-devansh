import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralSphereProps {
  particleCount?: number;
}

export const NeuralSphere = ({ particleCount = 4000 }: NeuralSphereProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate sphere particles with some slight noise
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Math.random() based sphere distribution
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const radius = 3 + (Math.random() - 0.5) * 0.4; // Base radius with some thickness

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;

    // Slight parallax based on mouse
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    // Smoothly interpolate current rotation towards target mouse rotation
    // We add this to the base rotation
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, state.pointer.x * 0.5, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, state.pointer.y * 0.5, 0.05);
  });

  return (
    <group>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Central inner glow/core */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#001133" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
