import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  useTexture, 
  Float, 
  Html,
  OrbitControls,
  Billboard
} from '@react-three/drei';
import * as THREE from 'three';

const AvatarWithText = () => {
  const texture = useTexture('/anmol-ai.png');
  const textRef = useRef<THREE.Group>(null);
  
  // The glasses are approximately located slightly to the right and above center in the image
  const glassesOffset = [0.8, 0.4, 0.1]; 

  useFrame((state) => {
    if (textRef.current) {
      // Make the text gently float outwards from the glasses
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group>
      {/* 2D Flat Avatar that always faces the camera (Billboard) */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh position={[0, -1, 0]}>
          <planeGeometry args={[6, 7.5]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} />
        </mesh>
      </Billboard>

      {/* 3D Text Emitting from the Spectacles to the Bottom */}
      <group position={glassesOffset as [number, number, number]} ref={textRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text 
            position={[-0.8, -3.8, 0.8]} 
            rotation={[-0.2, 0, 0]}
            fontSize={0.22} 
            color="#ffffff" 
            maxWidth={5} 
            textAlign="center"
            lineHeight={1.4}
            outlineWidth={0.01}
            outlineColor="#eb5939"
          >
            Computer Science graduate with hands-on experience building web applications using Python, Django, Django REST Framework, and Java Spring Boot. Passionate about backend development and eager to build scalable systems.
          </Text>
        </Float>

        {/* Trail / Beam effect from glasses to text */}
        <mesh position={[-0.4, -1.9, 0.4]} rotation={[0.2, 0, 0.1]}>
          <cylinderGeometry args={[0.01, 0.05, 3.8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
};

export const Avatar3DScene = () => {
  return (
    <div className="absolute inset-0 z-30 pointer-events-auto flex justify-center items-end">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} />

        <Suspense fallback={
          <Html center>
            <div className="text-white font-bold animate-pulse text-xl">Loading 3D Engine...</div>
          </Html>
        }>
          <AvatarWithText />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 2.2}
            minAzimuthAngle={-0.5}
            maxAzimuthAngle={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
