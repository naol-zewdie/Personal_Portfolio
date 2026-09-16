import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as random from 'maath/random';

function AnimatedSphere() {
    const meshRef = useRef();
    const scrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            scrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(time / 4) + state.pointer.y * 0.15;
            meshRef.current.rotation.y = Math.cos(time / 2) + state.pointer.x * 0.15;

            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = scrollY.current / maxScroll;
            meshRef.current.position.y = (progress - 0.5) * -0.3;
            meshRef.current.position.x = Math.sin(progress * Math.PI) * 0.12;
        }
    });

    return (
        <Float speed={3} rotationIntensity={0.6} floatIntensity={1.2}>
            <Sphere
                ref={meshRef}
                args={[1, 48, 48]}
            >
                <MeshDistortMaterial
                    color="#dc2626"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.25}
                    metalness={0.85}
                />
            </Sphere>
        </Float>
    );
}

function Stars(props) {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(2800), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
            ref.current.rotation.x += state.pointer.y * 0.0005;
            ref.current.rotation.y += state.pointer.x * 0.0005;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f2f2f3"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function HeroBackground() {
    const [isVisible, setIsVisible] = useState(typeof document !== 'undefined' ? !document.hidden : true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden);
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full">
            <Canvas
                frameloop={isVisible ? "always" : "never"}
                camera={{ position: [0, 0, 1] }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <pointLight position={[-10, -10, -5]} intensity={0.6} color="#dc2626" />
                <AnimatedSphere />
                <Stars />
            </Canvas>
        </div>
    );
}
