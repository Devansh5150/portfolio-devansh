import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Stars, Float } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/* ───────────────────── DATA ───────────────────── */

const ISLANDS = [
    {
        id: 'torq',
        label: 'Torq',
        emoji: '🚗',
        color: '#60a5fa',
        description: 'AI Emergency Vehicle Support — On-demand roadside assistance with intelligent matching.',
        tech: 'React Native · Node.js · Firebase · OpenAI',
        position: [0, 1, -12] as [number, number, number],
    },
    {
        id: 'tatvam',
        label: 'Tatvam',
        emoji: '🧘',
        color: '#a78bfa',
        description: 'LLM Contextual Mapping Engine — Ancient philosophy meets modern AI through RAG pipelines.',
        tech: 'Next.js · LangChain · OpenAI · AWS',
        position: [10.4, 1, -6] as [number, number, number],
    },
    {
        id: 'minto',
        label: 'Minto',
        emoji: '📦',
        color: '#34d399',
        description: 'Last-Mile Delivery Platform — Empowering Tier-2/3 city vendors. Built in 48 hours.',
        tech: 'Next.js · Supabase · Google Maps API',
        position: [10.4, 1, 6] as [number, number, number],
    },
    {
        id: 'mood',
        label: 'Mood Player',
        emoji: '🎵',
        color: '#f472b6',
        description: 'Emotion-to-Music — Real-time facial emotion detection drives Spotify playlists.',
        tech: 'Python · OpenCV · DeepFace · Spotify API',
        position: [0, 1, 12] as [number, number, number],
    },
    {
        id: 'skillsync',
        label: 'SkillSync',
        emoji: '🧠',
        color: '#c084fc',
        description: 'AI-powered student opportunity matching — recommendation engine serving 1,000+ students.',
        tech: 'Python · NLP · Web Scraping · Collaborative Filtering',
        position: [-10.4, 1, 6] as [number, number, number],
    },
    {
        id: 'research',
        label: 'Research',
        emoji: '📚',
        color: '#22d3ee',
        description: 'Published author — "AI and the Soul" — exploring AI, creativity, and consciousness.',
        tech: 'Book Chapter · Philosophy of Mind',
        position: [-10.4, 1, -6] as [number, number, number],
    },
];

/* ───────────────────── GROUND GRID ───────────────────── */

function Ground() {
    const gridRef = useRef<THREE.GridHelper>(null);

    useFrame(({ clock }) => {
        if (gridRef.current) {
            const mat = gridRef.current.material as THREE.Material;
            if ('opacity' in mat) {
                (mat as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
            }
        }
    });

    return (
        <gridHelper
            ref={gridRef}
            args={[60, 60, '#444466', '#222244']}
            position={[0, -0.01, 0]}
        />
    );
}

/* ───────────────────── FLOATING ISLAND ───────────────────── */

interface IslandData {
    id: string;
    label: string;
    emoji: string;
    color: string;
    description: string;
    tech: string;
    position: [number, number, number];
}

function Island({ data, onApproach }: { data: IslandData; onApproach: (id: string | null) => void }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const wasNear = useRef(false);

    useFrame(({ clock, camera }) => {
        if (!meshRef.current) return;

        // bob
        meshRef.current.position.y = data.position[1] + Math.sin(clock.getElapsedTime() * 0.6 + data.position[0]) * 0.25;

        // slow rotation
        meshRef.current.rotation.y += 0.003;

        // glow pulse
        if (glowRef.current) {
            const s = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
            glowRef.current.scale.set(s, s, s);
        }

        // proximity check
        const dist = camera.position.distanceTo(
            new THREE.Vector3(data.position[0], 0, data.position[2])
        );
        const isNear = dist < 5;
        if (isNear !== wasNear.current) {
            wasNear.current = isNear;
            onApproach(isNear ? data.id : null);
        }
    });

    const col = new THREE.Color(data.color);

    return (
        <group position={data.position}>
            {/* Platform base */}
            <Float speed={1.2} rotationIntensity={0} floatIntensity={0.3}>
                <mesh ref={meshRef} castShadow>
                    <cylinderGeometry args={[2.2, 2.8, 0.5, 6]} />
                    <meshStandardMaterial
                        color={col}
                        transparent
                        opacity={0.55}
                        roughness={0.4}
                        metalness={0.6}
                    />
                </mesh>
            </Float>

            {/* Glow ring */}
            <mesh ref={glowRef} position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.3, 2.8, 6]} />
                <meshBasicMaterial color={col} transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 3.2, 0]}
                fontSize={0.7}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.04}
                outlineColor="black"
            >
                {data.label}
            </Text>

            {/* Pillar of light */}
            <mesh position={[0, 6, 0]}>
                <cylinderGeometry args={[0.03, 0.15, 12, 8]} />
                <meshBasicMaterial color={col} transparent opacity={0.12} />
            </mesh>
        </group>
    );
}

/* ───────────────────── PLAYER CONTROLLER ───────────────────── */

function PlayerController({ keys, joystick }: { keys: Record<string, boolean>; joystick: { x: number; y: number } }) {
    const { camera } = useThree();
    const velocity = useRef(new THREE.Vector3());
    const direction = useRef(new THREE.Vector3());

    // Set initial camera
    useEffect(() => {
        camera.position.set(0, 2.2, 0);
        camera.lookAt(0, 2, -5);
    }, [camera]);

    useFrame((_, delta) => {
        const speed = 8;
        const dampening = 0.88;

        direction.current.set(0, 0, 0);

        // Keyboard input
        if (keys['w'] || keys['arrowup']) direction.current.z -= 1;
        if (keys['s'] || keys['arrowdown']) direction.current.z += 1;
        if (keys['a'] || keys['arrowleft']) direction.current.x -= 1;
        if (keys['d'] || keys['arrowright']) direction.current.x += 1;

        // Joystick input (mobile)
        if (Math.abs(joystick.x) > 0.1 || Math.abs(joystick.y) > 0.1) {
            direction.current.x += joystick.x;
            direction.current.z -= joystick.y;
        }

        if (direction.current.length() > 0) {
            direction.current.normalize();

            // Get camera forward/right in world space (flat on XZ plane)
            const cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            cameraDir.y = 0;
            cameraDir.normalize();

            const cameraRight = new THREE.Vector3();
            cameraRight.crossVectors(cameraDir, new THREE.Vector3(0, 1, 0)).normalize();

            const moveDir = new THREE.Vector3()
                .addScaledVector(cameraRight, direction.current.x)
                .addScaledVector(cameraDir, -direction.current.z);

            velocity.current.addScaledVector(moveDir, speed * delta);
        }

        velocity.current.multiplyScalar(dampening);

        // Clamp to world bounds
        const newPos = camera.position.clone().add(velocity.current.clone().multiplyScalar(delta * 60));
        newPos.x = THREE.MathUtils.clamp(newPos.x, -28, 28);
        newPos.z = THREE.MathUtils.clamp(newPos.z, -28, 28);
        newPos.y = 2.2;

        camera.position.copy(newPos);

        // Camera slowly looks toward movement direction
        if (velocity.current.length() > 0.01) {
            const lookTarget = camera.position.clone().add(
                new THREE.Vector3(velocity.current.x, 0, velocity.current.z).normalize().multiplyScalar(10)
            );
            lookTarget.y = 2;
            camera.lookAt(lookTarget);
        }
    });

    return null;
}

/* ───────────────────── FLOATING PARTICLES ───────────────────── */

function Particles() {
    const count = 200;
    const ref = useRef<THREE.Points>(null);

    const geom = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 50;
            arr[i * 3 + 1] = Math.random() * 12 + 1;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        return g;
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={ref} geometry={geom}>
            <pointsMaterial size={0.08} color="#88aaff" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

/* ───────────────────── MOBILE JOYSTICK ───────────────────── */

function MobileJoystick({ onMove }: { onMove: (x: number, y: number) => void }) {
    const baseRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const touchId = useRef<number | null>(null);
    const origin = useRef({ x: 0, y: 0 });

    const handleStart = useCallback((e: React.TouchEvent) => {
        const touch = e.changedTouches[0];
        if (!touch || !baseRef.current) return;
        touchId.current = touch.identifier;
        const rect = baseRef.current.getBoundingClientRect();
        origin.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }, []);

    const handleMove = useCallback((e: React.TouchEvent) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier !== touchId.current) continue;

            const dx = touch.clientX - origin.current.x;
            const dy = touch.clientY - origin.current.y;
            const maxR = 40;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const clampedDist = Math.min(dist, maxR);
            const angle = Math.atan2(dy, dx);
            const nx = (Math.cos(angle) * clampedDist) / maxR;
            const ny = -(Math.sin(angle) * clampedDist) / maxR;

            if (knobRef.current) {
                knobRef.current.style.transform = `translate(${Math.cos(angle) * clampedDist}px, ${Math.sin(angle) * clampedDist}px)`;
            }

            onMove(nx, ny);
        }
    }, [onMove]);

    const handleEnd = useCallback(() => {
        touchId.current = null;
        if (knobRef.current) knobRef.current.style.transform = 'translate(0px, 0px)';
        onMove(0, 0);
    }, [onMove]);

    return (
        <div
            ref={baseRef}
            className="absolute bottom-8 left-8 w-28 h-28 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center touch-none select-none z-50"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onTouchCancel={handleEnd}
        >
            <div
                ref={knobRef}
                className="w-12 h-12 rounded-full bg-white/30 border border-white/40 transition-none"
            />
        </div>
    );
}

/* ───────────────────── MAIN PAGE ───────────────────── */

export default function CreativeWorld() {
    const navigate = useNavigate();
    const [nearIsland, setNearIsland] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const keysRef = useRef<Record<string, boolean>>({});
    const joystickRef = useRef({ x: 0, y: 0 });
    const [joystick, setJoystick] = useState({ x: 0, y: 0 });

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Keyboard listeners
    useEffect(() => {
        const onDown = (e: KeyboardEvent) => {
            keysRef.current[e.key.toLowerCase()] = true;
        };
        const onUp = (e: KeyboardEvent) => {
            keysRef.current[e.key.toLowerCase()] = false;
        };
        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        return () => {
            window.removeEventListener('keydown', onDown);
            window.removeEventListener('keyup', onUp);
        };
    }, []);

    const handleJoystick = useCallback((x: number, y: number) => {
        joystickRef.current = { x, y };
        setJoystick({ x, y });
    }, []);

    const nearData = nearIsland ? ISLANDS.find((i) => i.id === nearIsland) : null;

    return (
        <div className="fixed inset-0 bg-black w-full h-full z-[9999]">
            {/* 3D Canvas */}
            <Canvas
                camera={{ fov: 65, near: 0.1, far: 200 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true, alpha: false }}
            >
                <color attach="background" args={['#050510']} />
                <fog attach="fog" args={['#050510', 20, 80]} />

                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 15, 10]} intensity={0.5} color="#aaccff" />
                <pointLight position={[0, 8, 0]} intensity={0.4} color="#6666ff" />

                {/* Stars */}
                <Stars radius={80} depth={60} count={3000} factor={3} saturation={0.2} fade speed={0.5} />

                {/* Ground */}
                <Ground />

                {/* Ground "floor" */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
                    <planeGeometry args={[60, 60]} />
                    <meshStandardMaterial color="#080818" transparent opacity={0.9} />
                </mesh>

                {/* Islands */}
                {ISLANDS.map((island) => (
                    <Island key={island.id} data={island} onApproach={setNearIsland} />
                ))}

                {/* Particles */}
                <Particles />

                {/* Player controller */}
                <PlayerController keys={keysRef.current} joystick={joystick} />
            </Canvas>

            {/* ─── HUD Overlay ─── */}

            {/* Back button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all"
            >
                ← Back to Portfolio
            </button>

            {/* Title */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <h1 className="text-white text-lg md:text-2xl font-bold tracking-wide">
                    🌍 Devansh's World
                </h1>
                <p className="text-gray-400 text-xs mt-1">Walk around and explore my projects</p>
            </div>

            {/* Controls hint */}
            {!isMobile && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-sm flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <kbd className="px-2 py-0.5 rounded bg-white/20 text-xs font-mono">W</kbd>
                            <div className="flex gap-1">
                                <kbd className="px-2 py-0.5 rounded bg-white/20 text-xs font-mono">A</kbd>
                                <kbd className="px-2 py-0.5 rounded bg-white/20 text-xs font-mono">S</kbd>
                                <kbd className="px-2 py-0.5 rounded bg-white/20 text-xs font-mono">D</kbd>
                            </div>
                        </div>
                        <span className="text-gray-400">to move</span>
                    </div>
                </div>
            )}

            {/* Mobile joystick */}
            {isMobile && <MobileJoystick onMove={handleJoystick} />}

            {/* Island info panel */}
            {nearData && (
                <div className="absolute bottom-8 right-6 z-50 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div
                        className="p-5 rounded-xl backdrop-blur-md border text-white"
                        style={{
                            backgroundColor: `${nearData.color}15`,
                            borderColor: `${nearData.color}40`,
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{nearData.emoji}</span>
                            <h3 className="text-lg font-bold" style={{ color: nearData.color }}>
                                {nearData.label}
                            </h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">{nearData.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {nearData.tech.split(' · ').map((t) => (
                                <span key={t} className="px-2 py-0.5 text-xs rounded-full border border-white/20 text-gray-300">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
