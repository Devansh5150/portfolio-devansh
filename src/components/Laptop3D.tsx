
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, OrbitControls } from '@react-three/drei';
import { Mesh, Group } from 'three';

const LaptopModel = ({ onClick }: { onClick: () => void }) => {
  const laptopRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (laptopRef.current) {
      // Gentle floating animation
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handleClick = () => {
    onClick();
  };

  return (
    <group
      ref={laptopRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Laptop Base */}
      <Box
        args={[3, 0.1, 2]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={hovered ? "#4A90E2" : "#2C3E50"} />
      </Box>
      
      {/* Laptop Screen */}
      <Box
        args={[2.8, 1.8, 0.05]}
        position={[0, 0.95, -0.95]}
        rotation={[-0.1, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#1A1A1A" />
      </Box>
      
      {/* Screen Content */}
      <Plane
        args={[2.6, 1.6]}
        position={[0, 0.96, -0.92]}
        rotation={[-0.1, 0, 0]}
      >
        <meshStandardMaterial color="#00FF41" emissive="#003311" />
      </Plane>
      
      {/* Keyboard */}
      <Box
        args={[2.5, 0.02, 1.5]}
        position={[0, 0.06, 0.2]}
        castShadow
      >
        <meshStandardMaterial color="#1A1A1A" />
      </Box>
      
      {/* Touchpad */}
      <Box
        args={[0.8, 0.01, 0.6]}
        position={[0, 0.07, 0.7]}
        castShadow
      >
        <meshStandardMaterial color="#333333" />
      </Box>
    </group>
  );
};

const Laptop3D = ({ onLaptopClick }: { onLaptopClick: () => void }) => {
  return (
    <div className="w-64 h-64 cursor-pointer">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
        className="transition-transform duration-300 hover:scale-105"
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <LaptopModel onClick={onLaptopClick} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default Laptop3D;
