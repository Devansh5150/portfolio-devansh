import { useRef, useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/* ───────────────────── PROJECT DATA ───────────────────── */

// Minecraft-style pixel font from Google Fonts
const PIXEL_FONT = 'https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580w.woff2';

const TOWERS = [
    {
        id: 'torq',
        label: 'Torq',
        emoji: '🚗',
        color: '#60a5fa',
        height: 14,
        summary: 'AI Emergency Vehicle Support',
        description: 'On-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking. Built as a startup, served 500+ users.',
        problem: 'No unified real-time platform for emergency roadside service in remote areas.',
        role: 'Founded and led product development end-to-end — architecture, AI chatbot, payment flow.',
        impact: 'Served 500+ users · Modular microservice backend · Razorpay escrow integration',
        tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API', 'Razorpay'],
        features: ['Real-time GPS tracking', 'AI chatbot (OpenAI)', 'Razorpay escrow payments', 'Multi-vendor marketplace', 'Emergency SOS routing', 'Firebase push notifications'],
        position: [0, 0, -18] as [number, number, number],
    },
    {
        id: 'tatvam',
        label: 'Tatvam',
        emoji: '🧘',
        color: '#a78bfa',
        height: 12,
        summary: 'LLM Contextual Mapping Engine',
        description: 'LLM-powered platform connecting ancient philosophical texts with modern AI through RAG pipelines, ethical guardrails, and tiered subscription access.',
        problem: 'Ancient philosophical knowledge is scattered and existing AI lacks cultural sensitivity.',
        role: 'Designed the RAG pipeline, ethical guardrail system, and AWS deployment architecture.',
        impact: 'Novel AI application bridging philosophy and technology · Stripe 3-tier access · Serverless AWS',
        tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Supabase', 'Stripe', 'AWS'],
        features: ['RAG pipeline with LangChain', 'Ethical guardrails', 'Subscription tiers (Stripe)', 'Vector DB semantic search', 'Personalized guidance', 'Serverless AWS deployment'],
        position: [15.6, 0, -9] as [number, number, number],
    },
    {
        id: 'minto',
        label: 'Minto',
        emoji: '📦',
        color: '#34d399',
        height: 10,
        summary: 'Last-Mile Delivery Platform',
        description: 'Delivery platform empowering Tier-2/3 city vendors by eliminating dark-store dependency. Built proximity-based delivery matching in 48 hours.',
        problem: 'Small vendors in smaller cities can\'t afford dark-store logistics.',
        role: 'Built real-time order mapping, vendor analytics dashboard, and delivery assignment algorithm.',
        impact: '50+ vendors onboarded · 40% delivery efficiency improvement · Best Social Impact Project',
        tech: ['Next.js', 'Node.js', 'Supabase', 'Google Maps API'],
        features: ['Vendor onboarding system', 'Real-time order mapping', 'Analytics dashboard', 'Proximity-based matching', 'Customer tracking', 'Inventory management'],
        position: [15.6, 0, 9] as [number, number, number],
    },
    {
        id: 'mood',
        label: 'Mood Player',
        emoji: '🎵',
        color: '#f472b6',
        height: 11,
        summary: 'Emotion-Based Spotify Player',
        description: 'Real-time emotion detection via webcam → dynamic Spotify playlist generation. Detects 7 emotions through DeepFace and maps them to music genres.',
        problem: 'Music recommendation relies on history, not real-time emotional state.',
        role: 'Built the entire CV pipeline — face detection, emotion classification, Spotify OAuth, playlist generation.',
        impact: 'Real-time emotion-to-music at 30fps · 7-emotion classification · Best AI Innovation Award',
        tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
        features: ['Real-time facial emotion detection', 'Dynamic Spotify playlist generation', 'Voice feedback (pyttsx3)', 'Multi-language support', 'Emotion history tracking', 'Cross-platform app'],
        position: [0, 0, 18] as [number, number, number],
    },
    {
        id: 'skillsync',
        label: 'SkillSync',
        emoji: '🧠',
        color: '#c084fc',
        height: 13,
        summary: 'AI Opportunity Matching Engine',
        description: 'AI-powered student opportunity matching — recommendation engine serving 1,000+ students with personalized results.',
        problem: 'Students struggle to find relevant opportunities across fragmented platforms.',
        role: 'Lead AI development — built recommendation engine, web scraping pipeline, CV parsing system.',
        impact: '1,000+ students served · 85% relevance accuracy · 50+ sources aggregated',
        tech: ['Python', 'NLP', 'Web Scraping', 'Collaborative Filtering'],
        features: ['Recommendation engine', 'CV parsing & job-fit scoring', 'Web scraping (50+ sources)', 'Collaborative filtering', 'Content-based scoring', 'NLP resume analysis'],
        position: [-15.6, 0, 9] as [number, number, number],
    },
    {
        id: 'research',
        label: 'Research',
        emoji: '📚',
        color: '#22d3ee',
        height: 9,
        summary: 'Published Work — AI and the Soul',
        description: 'Exploring the intersections of artificial intelligence, creativity, and consciousness. Examines how generative AI challenges authorship.',
        problem: 'The philosophical implications of AI creativity remain underexplored in technical communities.',
        role: 'Author — researched and wrote a book chapter on AI, consciousness, and creative expression.',
        impact: 'Published book chapter · Framework for AI augmenting human expression',
        tech: ['AI', 'Consciousness', 'Creativity', 'Philosophy of Mind'],
        features: ['AI vs human creativity analysis', 'Authorship in generative AI', 'Framework for AI augmentation', 'Philosophy of Mind perspective', 'Cross-disciplinary research', 'Published chapter'],
        position: [-15.6, 0, -9] as [number, number, number],
    },
];

/* ───────────────────── END STONE GROUND ───────────────────── */

function EndGround() {
    return (
        <group>
            {/* Main platform — circular end stone island */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <circleGeometry args={[30, 64]} />
                <meshStandardMaterial color="#e8dca0" roughness={0.85} metalness={0.05} />
            </mesh>
            {/* End stone texture overlay — darker spots + purple veins */}
            {Array.from({ length: 120 }).map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const r = Math.random() * 28;
                const isPurple = Math.random() > 0.85;
                return (
                    <mesh
                        key={i}
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[Math.cos(angle) * r, -0.08, Math.sin(angle) * r]}
                    >
                        <circleGeometry args={[0.2 + Math.random() * 0.5, 6]} />
                        <meshStandardMaterial
                            color={isPurple ? '#6b3fa0' : Math.random() > 0.5 ? '#d4c88a' : '#c8bc7a'}
                            emissive={isPurple ? '#6b3fa0' : '#000000'}
                            emissiveIntensity={isPurple ? 0.3 : 0}
                            roughness={0.9}
                        />
                    </mesh>
                );
            })}
            {/* Edge glow ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                <ringGeometry args={[28, 30, 64]} />
                <meshBasicMaterial color="#2a0845" transparent opacity={0.6} />
            </mesh>
        </group>
    );
}

/* ───────────────────── CENTER END PORTAL ───────────────────── */

function EndPortal() {
    const portalRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (portalRef.current) {
            (portalRef.current.material as THREE.MeshBasicMaterial).opacity =
                0.6 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
            portalRef.current.rotation.z += 0.005;
        }
    });

    return (
        <group position={[0, 0.05, 0]}>
            {/* Portal frame blocks */}
            {Array.from({ length: 12 }).map((_, i) => {
                const ang = (i / 12) * Math.PI * 2;
                const px = Math.cos(ang) * 3.5;
                const pz = Math.sin(ang) * 3.5;
                return (
                    <mesh key={i} position={[px, 0.3, pz]} rotation={[0, -ang, 0]}>
                        <boxGeometry args={[1.2, 0.6, 0.6]} />
                        <meshStandardMaterial
                            color="#1a4a1a"
                            emissive="#22cc66"
                            emissiveIntensity={0.2}
                            roughness={0.6}
                        />
                    </mesh>
                );
            })}
            {/* Portal surface */}
            <mesh ref={portalRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]}>
                <circleGeometry args={[3.2, 32]} />
                <meshBasicMaterial color="#1a0033" transparent opacity={0.7} />
            </mesh>
            {/* Portal glow */}
            <pointLight position={[0, 1.5, 0]} color="#aa44ff" intensity={3} distance={12} />
            <pointLight position={[0, 0.5, 0]} color="#5500aa" intensity={2} distance={8} />
            {/* Beacon upward */}
            <mesh position={[0, 15, 0]}>
                <cylinderGeometry args={[0.05, 0.3, 30, 8]} />
                <meshBasicMaterial color="#aa44ff" transparent opacity={0.08} />
            </mesh>
        </group>
    );
}

/* ───────────────────── OBSIDIAN TOWER ───────────────────── */

function ObsidianTower({
    data,
    onApproach,
}: {
    data: (typeof TOWERS)[0];
    onApproach: (id: string | null) => void;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const crystalRef = useRef<THREE.Mesh>(null);
    const wasNear = useRef(false);

    useFrame(({ clock, camera }) => {
        // End crystal rotation + bob
        if (crystalRef.current) {
            crystalRef.current.rotation.y += 0.02;
            crystalRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
            crystalRef.current.position.y =
                data.height + 2 + Math.sin(clock.getElapsedTime() * 1.2) * 0.3;
        }

        // Proximity check
        const dist = camera.position.distanceTo(
            new THREE.Vector3(data.position[0], 0, data.position[2])
        );
        const isNear = dist < 5;
        if (isNear !== wasNear.current) {
            wasNear.current = isNear;
            onApproach(isNear ? data.id : null);
        }
    });

    const crystalColor = new THREE.Color(data.color);

    return (
        <group ref={groupRef} position={data.position}>
            {/* Obsidian pillar — stacked blocks with purple sheen */}
            {Array.from({ length: Math.ceil(data.height / 1) }).map((_, i) => (
                <mesh key={i} position={[0, i + 0.5, 0]} castShadow>
                    <boxGeometry args={[2.5, 1.02, 2.5]} />
                    <meshStandardMaterial
                        color={i % 3 === 0 ? '#2a1050' : i % 3 === 1 ? '#1e0c3d' : '#150830'}
                        emissive="#3d1a6e"
                        emissiveIntensity={i === 0 || i === Math.ceil(data.height) - 1 ? 0.15 : 0.05}
                        roughness={0.25}
                        metalness={0.85}
                    />
                </mesh>
            ))}

            {/* Bedrock cage around crystal */}
            {[
                [1.3, data.height + 0.5, 0],
                [-1.3, data.height + 0.5, 0],
                [0, data.height + 0.5, 1.3],
                [0, data.height + 0.5, -1.3],
            ].map((pos, i) => (
                <mesh key={`cage-${i}`} position={pos as [number, number, number]}>
                    <boxGeometry args={[0.4, 1, 0.4]} />
                    <meshStandardMaterial color="#333333" roughness={0.9} />
                </mesh>
            ))}

            {/* End Crystal — rotating diamond */}
            <mesh ref={crystalRef} position={[0, data.height + 2, 0]}>
                <octahedronGeometry args={[0.7, 0]} />
                <meshStandardMaterial
                    color={crystalColor}
                    emissive={crystalColor}
                    emissiveIntensity={3}
                    transparent
                    opacity={0.95}
                    roughness={0.05}
                    metalness={0.3}
                />
            </mesh>

            {/* Crystal glow — double light for vibrancy */}
            <pointLight
                position={[0, data.height + 2, 0]}
                color={data.color}
                intensity={4}
                distance={12}
            />
            <pointLight
                position={[0, data.height + 3, 0]}
                color="#ffffff"
                intensity={0.5}
                distance={6}
            />

            {/* Beam of light from crystal to sky */}
            <mesh position={[0, data.height + 10, 0]}>
                <cylinderGeometry args={[0.02, 0.08, 16, 6]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.15} />
            </mesh>

            {/* Label just above the door */}
            <Suspense fallback={null}>
                <Text
                    position={[0, 3.2, 3.1]}
                    fontSize={0.32}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                    outlineWidth={0.02}
                    outlineColor="#1a0a2e"
                >
                    {data.label}
                </Text>
                <Text
                    position={[0, 2.5, 3.1]}
                    fontSize={0.14}
                    color={data.color}
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                >
                    {data.summary}
                </Text>
            </Suspense>

            {/* Entrance glow on ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 3]}>
                <circleGeometry args={[1, 16]} />
                <meshBasicMaterial
                    color={data.color}
                    transparent
                    opacity={0.25}
                />
            </mesh>
        </group>
    );
}

/* ───────────────────── END PARTICLES (purple) ───────────────────── */

function EndParticles() {
    const ref = useRef<THREE.Points>(null);

    const geom = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const count = 800;
        const pos = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = Math.random() * 25 + 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
            // Brighter purple-magenta-pink palette
            const t = Math.random();
            colors[i * 3] = 0.6 + t * 0.4;       // R: pink to magenta
            colors[i * 3 + 1] = 0.05 + t * 0.15; // G: subtle
            colors[i * 3 + 2] = 0.7 + t * 0.3;   // B: vivid purple
        }
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        return g;
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const positions = ref.current.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const y = positions.getY(i);
            positions.setY(i, y > 25 ? 0.5 : y + 0.008 + Math.sin(i) * 0.002);
        }
        positions.needsUpdate = true;
        ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    });

    return (
        <points ref={ref} geometry={geom}>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.85}
                sizeAttenuation
            />
        </points>
    );
}

/* ───────────────────── PLAYER CONTROLLER (FPS mouse look) ───────────────────── */

function PlayerController({
    keys,
    joystick,
}: {
    keys: Record<string, boolean>;
    joystick: { x: number; y: number };
}) {
    const { camera, gl } = useThree();
    const velocity = useRef(new THREE.Vector3());
    const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

    // Initial position
    useEffect(() => {
        camera.position.set(0, 2.5, 8);
        euler.current.set(-0.1, Math.PI, 0); // look toward center
        camera.quaternion.setFromEuler(euler.current);
    }, [camera]);

    // Pointer Lock + mouse movement
    useEffect(() => {
        const canvas = gl.domElement;

        const onClick = () => {
            canvas.requestPointerLock();
        };

        const onMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement !== canvas) return;
            const sensitivity = 0.002;
            euler.current.y -= e.movementX * sensitivity;
            euler.current.x -= e.movementY * sensitivity;
            // Clamp pitch so you can't flip upside down
            euler.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, euler.current.x));
            camera.quaternion.setFromEuler(euler.current);
        };

        canvas.addEventListener('click', onClick);
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            canvas.removeEventListener('click', onClick);
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, [camera, gl]);

    useFrame((_, delta) => {
        const speed = 7;
        const damp = 0.85;
        const dir = new THREE.Vector3(0, 0, 0);

        if (keys['w'] || keys['arrowup']) dir.z -= 1;
        if (keys['s'] || keys['arrowdown']) dir.z += 1;
        if (keys['a'] || keys['arrowleft']) dir.x -= 1;
        if (keys['d'] || keys['arrowright']) dir.x += 1;

        if (Math.abs(joystick.x) > 0.1 || Math.abs(joystick.y) > 0.1) {
            dir.x += joystick.x;
            dir.z -= joystick.y;
        }

        if (dir.length() > 0) {
            dir.normalize();
            // Forward/right based on current camera yaw
            const forward = new THREE.Vector3(0, 0, -1).applyEuler(
                new THREE.Euler(0, euler.current.y, 0)
            );
            const right = new THREE.Vector3(1, 0, 0).applyEuler(
                new THREE.Euler(0, euler.current.y, 0)
            );

            const move = new THREE.Vector3()
                .addScaledVector(right, dir.x)
                .addScaledVector(forward, -dir.z);
            move.y = 0;

            velocity.current.addScaledVector(move, speed * delta);
        }

        velocity.current.multiplyScalar(damp);

        const newPos = camera.position
            .clone()
            .add(velocity.current.clone().multiplyScalar(delta * 60));
        // Keep inside the end island
        const dist = Math.sqrt(newPos.x * newPos.x + newPos.z * newPos.z);
        if (dist > 28) {
            newPos.x *= 28 / dist;
            newPos.z *= 28 / dist;
        }
        newPos.y = 2.5;
        camera.position.copy(newPos);
    });

    return null;
}

/* ───────────────────── MOBILE JOYSTICK ───────────────────── */

function MobileJoystick({
    onMove,
}: {
    onMove: (x: number, y: number) => void;
}) {
    const baseRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const touchId = useRef<number | null>(null);
    const origin = useRef({ x: 0, y: 0 });

    const handleStart = useCallback(
        (e: React.TouchEvent) => {
            const touch = e.changedTouches[0];
            if (!touch || !baseRef.current) return;
            touchId.current = touch.identifier;
            const rect = baseRef.current.getBoundingClientRect();
            origin.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };
        },
        []
    );

    const handleMove = useCallback(
        (e: React.TouchEvent) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                if (touch.identifier !== touchId.current) continue;
                const dx = touch.clientX - origin.current.x;
                const dy = touch.clientY - origin.current.y;
                const maxR = 40;
                const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxR);
                const angle = Math.atan2(dy, dx);
                const nx = (Math.cos(angle) * dist) / maxR;
                const ny = -(Math.sin(angle) * dist) / maxR;
                if (knobRef.current) {
                    knobRef.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
                }
                onMove(nx, ny);
            }
        },
        [onMove]
    );

    const handleEnd = useCallback(() => {
        touchId.current = null;
        if (knobRef.current)
            knobRef.current.style.transform = 'translate(0px, 0px)';
        onMove(0, 0);
    }, [onMove]);

    return (
        <div
            ref={baseRef}
            className="absolute bottom-8 left-8 w-28 h-28 rounded-full border-2 border-purple-500/30 bg-purple-900/20 backdrop-blur-md flex items-center justify-center touch-none select-none z-50"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onTouchCancel={handleEnd}
        >
            <div
                ref={knobRef}
                className="w-12 h-12 rounded-full bg-purple-400/30 border border-purple-400/50 transition-none"
            />
        </div>
    );
}

/* ───────────────────── PROJECT DETAIL OVERLAY ───────────────────── */

function ProjectDetail({
    data,
    onClose,
}: {
    data: (typeof TOWERS)[0];
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto mx-4 rounded-2xl border p-6 md:p-8"
                style={{
                    backgroundColor: '#0d0520ee',
                    borderColor: `${data.color}40`,
                    boxShadow: `0 0 60px ${data.color}20`,
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{data.emoji}</span>
                    <div>
                        <h2 className="text-2xl font-extrabold text-white">{data.label}</h2>
                        <p className="text-sm" style={{ color: data.color }}>
                            {data.summary}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6">{data.description}</p>

                {/* Problem / Role / Impact */}
                <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <h4 className="text-red-400 font-semibold text-sm mb-1">⚡ Problem</h4>
                        <p className="text-gray-300 text-sm">{data.problem}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <h4 className="text-cyan-400 font-semibold text-sm mb-1">🎯 My Role</h4>
                        <p className="text-gray-300 text-sm">{data.role}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h4 className="text-green-400 font-semibold text-sm mb-1">📈 Impact</h4>
                        <p className="text-gray-300 text-sm">{data.impact}</p>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {data.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 text-gray-400 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }} />
                                {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech stack */}
                <div>
                    <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {data.tech.map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1 text-xs rounded-full border text-white"
                                style={{ borderColor: `${data.color}50` }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ───────────────────── MAIN PAGE ───────────────────── */

export default function CreativeWorld() {
    const navigate = useNavigate();
    const [nearTower, setNearTower] = useState<string | null>(null);
    const [openTower, setOpenTower] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const keysRef = useRef<Record<string, boolean>>({});
    const [joystick, setJoystick] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const check = () =>
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

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
        setJoystick({ x, y });
    }, []);

    const nearData = nearTower
        ? TOWERS.find((t) => t.id === nearTower)
        : null;

    const openData = openTower
        ? TOWERS.find((t) => t.id === openTower)
        : null;

    return (
        <div className="fixed inset-0 bg-black w-full h-full z-[9999]">
            {/* 3D Canvas */}
            <Canvas
                camera={{ fov: 60, near: 0.1, far: 300 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true, alpha: false }}
            >
                {/* End-dimension rich purple sky */}
                <color attach="background" args={['#120025']} />
                <fog attach="fog" args={['#120025', 35, 100]} />

                {/* Lighting — vibrant End ambience */}
                <ambientLight intensity={0.45} color="#bb88ee" />
                <directionalLight
                    position={[5, 25, 5]}
                    intensity={0.6}
                    color="#ddaaff"
                />
                <directionalLight
                    position={[-10, 15, -5]}
                    intensity={0.25}
                    color="#ff66cc"
                />
                <pointLight position={[0, 18, 0]} intensity={1} color="#9933cc" />
                <pointLight position={[15, 5, 15]} intensity={0.4} color="#cc44ff" distance={25} />
                <pointLight position={[-15, 5, -15]} intensity={0.4} color="#8844ff" distance={25} />

                {/* Stars — dense, vibrant */}
                <Stars
                    radius={100}
                    depth={60}
                    count={5000}
                    factor={3.5}
                    saturation={0.5}
                    fade
                    speed={0.8}
                />

                {/* End stone ground */}
                <EndGround />

                {/* Center End Portal */}
                <EndPortal />

                {/* Obsidian Towers */}
                {TOWERS.map((tower) => (
                    <ObsidianTower
                        key={tower.id}
                        data={tower}
                        onApproach={setNearTower}
                    />
                ))}

                {/* Purple floating particles */}
                <EndParticles />

                {/* Player */}
                <PlayerController keys={keysRef.current} joystick={joystick} />
            </Canvas>

            {/* ─── HUD ─── */}

            {/* Back button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/40 backdrop-blur-md border border-purple-500/30 text-white text-sm font-medium hover:bg-purple-800/50 transition-all"
            >
                ← Back to Portfolio
            </button>

            {/* Title */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <h1 className="text-white text-lg md:text-2xl font-bold tracking-wider" style={{ textShadow: '0 0 20px #7722aa88' }}>
                    🐉 The End — Devansh's World
                </h1>
                <p className="text-purple-300/60 text-xs mt-1">
                    Walk to a tower. Step inside to explore.
                </p>
            </div>

            {/* Controls hint */}
            {!isMobile && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    <div className="px-5 py-3 rounded-xl bg-purple-900/40 backdrop-blur-md border border-purple-500/20 text-white text-sm flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">
                                W
                            </kbd>
                            <div className="flex gap-1">
                                <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">
                                    A
                                </kbd>
                                <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">
                                    S
                                </kbd>
                                <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">
                                    D
                                </kbd>
                            </div>
                        </div>
                        <span className="text-purple-300/70">to move</span>
                        <span className="text-purple-300/40 mx-1">•</span>
                        <span className="text-purple-300/70">click + mouse to look</span>
                    </div>
                </div>
            )}

            {/* Mobile joystick */}
            {isMobile && <MobileJoystick onMove={handleJoystick} />}

            {/* Tower approach prompt */}
            {nearData && !openTower && (
                <div className="absolute bottom-8 right-6 z-50 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div
                        className="p-5 rounded-xl backdrop-blur-md border text-white"
                        style={{
                            backgroundColor: '#0d052099',
                            borderColor: `${nearData.color}40`,
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{nearData.emoji}</span>
                            <h3
                                className="text-lg font-bold"
                                style={{ color: nearData.color }}
                            >
                                {nearData.label}
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{nearData.summary}</p>
                        <button
                            onClick={() => setOpenTower(nearData.id)}
                            className="w-full py-2 rounded-lg text-sm font-semibold text-white transition-all"
                            style={{
                                backgroundColor: `${nearData.color}30`,
                                border: `1px solid ${nearData.color}50`,
                            }}
                        >
                            ⏎ Enter Tower
                        </button>
                    </div>
                </div>
            )}

            {/* Full project detail overlay */}
            {openData && (
                <ProjectDetail
                    data={openData}
                    onClose={() => setOpenTower(null)}
                />
            )}
        </div>
    );
}
