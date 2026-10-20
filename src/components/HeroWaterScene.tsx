import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

interface HeroWaterSceneProps {
  reducedMotion: boolean;
}

const WaterDrops = ({ reducedMotion }: HeroWaterSceneProps) => {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.18;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh position={[-0.58, -0.12, 0]} scale={[0.34, 0.52, 0.3]} rotation={[0, 0, -0.2]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#F36B21" metalness={0.2} roughness={0.28} />
      </mesh>
      <mesh position={[0.38, 0.34, -0.2]} scale={[0.24, 0.37, 0.22]} rotation={[0, 0, 0.24]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#69B9D1" metalness={0.18} roughness={0.25} />
      </mesh>
      <mesh position={[0.62, -0.48, 0.1]} scale={[0.17, 0.25, 0.16]} rotation={[0, 0, -0.15]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#F36B21" metalness={0.2} roughness={0.28} />
      </mesh>
    </group>
  );
};

export default function HeroWaterScene({ reducedMotion }: HeroWaterSceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 4], fov: 42 }}
      dpr={1}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} />
      <WaterDrops reducedMotion={reducedMotion} />
    </Canvas>
  );
}
