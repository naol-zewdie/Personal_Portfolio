import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

// Robot by DJMaesen (https://sketchfab.com/bumstrum), CC BY 4.0.
// Textures were downsized and re-encoded for the web (public/models/robot.glb).
const MODEL_URL = '/models/robot.glb';
const HEIGHT = 2.2; // world units the robot is scaled to

function Robot({ reduceMotion }) {
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, scene);

  // Normalise size and stand the robot on y = 0, centred on x/z.
  const fit = useMemo(() => {
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = HEIGHT / size.y;
    return { scale: s, position: [-center.x * s, -box.min.y * s, -center.z * s] };
  }, [scene]);

  useEffect(() => {
    const action = names[0] && actions[names[0]];
    if (!action) return;
    action.reset().fadeIn(0.4).play().setEffectiveTimeScale(reduceMotion ? 0 : 1);
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names, reduceMotion]);

  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) o.frustumCulled = false; // skinned bounds don't follow the animation
    });
  }, [scene]);

  return (
    <group scale={fit.scale} position={fit.position}>
      <primitive object={scene} />
    </group>
  );
}

export default function RobotScene({ className = '' }) {
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );
  const [dragging, setDragging] = useState(false);

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      camera={{ position: [0, 1.4, 5.3], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <hemisphereLight args={['#ffffff', '#1a6fd1', 2.2]} />
      <directionalLight position={[3, 5, 6]} intensity={3.2} />
      <directionalLight position={[-5, 3, -4]} intensity={2.4} color="#bfe2ff" />
      <directionalLight position={[0, -2, 4]} intensity={0.8} color="#8fd0ff" />
      {/* key spotlight from above-front so the robot reads as the focus */}
      <spotLight position={[0, 6, 3]} angle={0.45} penumbra={0.8} intensity={60} distance={14} decay={2} />
      <Suspense fallback={null}>
        <Robot reduceMotion={reduceMotion} />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.85} scale={4} blur={1.8} far={1.6} resolution={512} color="#000814" />
      </Suspense>
      <OrbitControls
        target={[0, 1.05, 0]}
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduceMotion && !dragging}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.95}
        makeDefault
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
