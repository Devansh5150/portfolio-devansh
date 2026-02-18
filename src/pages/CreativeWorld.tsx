import { useRef, useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Circle, Sphere, Environment, ContactShadows } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/* ─── DARK SHOWROOM THEME ─── */
const THEME = {
    bg: '#020617',
    fog: '#020617',
    floor: '#0a0a0a',
    walls: '#0f172a',
    trim: '#334155',
    text: '#f8fafc',
    accent: '#60a5fa',
    monitorBezel: '#1e293b',
    monitorScreen: '#020617',
};

const PROJECTS = [
    {
        id: 'torq', num: '01', label: 'TORQ', emoji: '🚗', color: '#3b82f6',
        summary: 'AI Emergency Vehicle Support',
        description: 'TORQ is an on-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking.',
        problem: 'No unified real-time platform for emergency roadside service in remote areas.',
        impact: 'Served 500+ users · Modular microservice backend · Razorpay escrow integration',
        tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API', 'Razorpay'],
        features: ['Real-time GPS tracking', 'AI chatbot (OpenAI)', 'Razorpay escrow payments', 'Multi-vendor marketplace'],
    },
    {
        id: 'tatvam', num: '02', label: 'TATVAM', emoji: '🧘', color: '#8b5cf6',
        summary: 'LLM Contextual Mapping Engine',
        description: 'Tatvam is an LLM-powered platform connecting ancient philosophical texts with modern AI through RAG pipelines and ethical guardrails.',
        problem: 'Ancient philosophical knowledge is scattered and existing AI lacks cultural sensitivity.',
        impact: 'Novel AI bridging philosophy and tech · Stripe 3-tier access · Serverless AWS',
        tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Supabase', 'Stripe', 'AWS'],
        features: ['RAG pipeline with LangChain', 'Ethical guardrails', 'Stripe integration', 'Vector DB semantic search'],
    },
    {
        id: 'minto', num: '03', label: 'MINTO', emoji: '📦', color: '#10b981',
        summary: 'Last-Mile Delivery Platform',
        description: 'Minto is a delivery platform empowering Tier-2 and Tier-3 city vendors by eliminating dark-store dependency.',
        problem: 'Small vendors in smaller cities can\'t afford dark-store logistics.',
        impact: '50+ vendors onboarded · 40% delivery efficiency · Best Social Impact Project',
        tech: ['Next.js', 'Node.js', 'Supabase', 'Google Maps API'],
        features: ['Vendor onboarding system', 'Real-time order mapping', 'Analytics dashboard', 'Proximity-based matching'],
    },
    {
        id: 'mood', num: '04', label: 'MOOD', emoji: '🎵', color: '#ec4899',
        summary: 'Emotion-Based Spotify Player',
        description: 'Mood is a real-time emotion detection player that uses webcam input to detect facial expressions and generate dynamic Spotify playlists.',
        problem: 'Music recommendation relies on history, not real-time emotional state.',
        impact: 'Real-time emotion-to-music at 30fps · 7-emotion classification',
        tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
        features: ['Facial emotion detection', 'Dynamic Spotify playlist', 'Voice feedback', 'Emotion history tracking'],
    },
    {
        id: 'skillsync', num: '05', label: 'SKILLSYNC', emoji: '🧠', color: '#a855f7',
        summary: 'AI Opportunity Matching Engine',
        description: 'SkillSync is an AI-powered student opportunity matching engine serving over 1,000 students. It aggregates opportunities from 50+ sources.',
        problem: 'Students struggle to find relevant opportunities across fragmented platforms.',
        impact: '1,000+ students served · 85% relevance accuracy · 50+ sources aggregated',
        tech: ['Python', 'NLP', 'Web Scraping', 'Collaborative Filtering'],
        features: ['Recommendation engine', 'CV parsing & scoring', 'Web scraping', 'NLP resume analysis'],
    },
    {
        id: 'research', num: '06', label: 'RESEARCH', emoji: '📚', color: '#06b6d4',
        summary: 'Published - AI and the Soul',
        description: 'Research exploring the intersections of AI, creativity, and consciousness. Published a book chapter on AI as a tool for augmenting expression.',
        problem: 'The philosophical implications of AI creativity remain underexplored.',
        impact: 'Published book chapter · Framework for AI augmenting human expression',
        tech: ['AI', 'Consciousness', 'Creativity', 'Philosophy of Mind'],
        features: ['Generative AI authorship', 'Framework for augmentation', 'Cross-disciplinary research'],
    },
];

const ROOM_RADIUS = 22;

/* ═══════ AUDIO GUIDE ═══════ */
function AudioGuide({ text, position, color }: { text: string; position: [number, number, number]; color: string }) {
    const [speaking, setSpeaking] = useState(false);
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);

    const toggle = useCallback((e: any) => {
        e.stopPropagation();
        if (speaking) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        } else {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.rate = 1.0;
            u.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(u);
            setSpeaking(true);
        }
    }, [speaking, text]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(t * 2) * 0.05;
    });

    return (
        <group position={position} onClick={toggle}
            onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        >
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial
                    color={speaking ? '#ff3366' : (hovered ? '#ffffff' : color)}
                    emissive={speaking ? '#ff3366' : color}
                    emissiveIntensity={speaking ? 1.5 : 0.8}
                    metalness={0.9} roughness={0.1}
                />
            </mesh>
            <Text position={[0, -0.4, 0]} fontSize={0.12} color={THEME.text} anchorX="center"> {speaking ? "STOP" : "GUIDE"} </Text>
        </group>
    );
}

function LEDScreen({ lines, color }: { lines: string[]; color: string }) {
    const scrollRef = useRef<THREE.Group>(null);
    const contentH = lines.length * 0.45;

    useFrame(({ clock }) => {
        if (!scrollRef.current) return;
        const t = clock.getElapsedTime();
        scrollRef.current.position.y = (t * 0.25) % (contentH + 2.4);
    });

    return (
        <group>
            <mesh>
                <boxGeometry args={[4.4, 2.8, 0.15]} />
                <meshStandardMaterial color={THEME.monitorBezel} roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0.08]}>
                <planeGeometry args={[4.1, 2.5]} />
                <meshBasicMaterial color={THEME.monitorScreen} />
            </mesh>
            <group position={[0, 0, 0.09]}>
                <group ref={scrollRef}>
                    {lines.concat(lines).map((text, i) => (
                        <Text
                            key={i}
                            position={[0, -i * 0.45 + 1.2, 0]}
                            fontSize={0.14}
                            color={color}
                            maxWidth={3.8}
                            anchorX="center"
                            anchorY="top"
                            lineHeight={1.4}
                        >
                            {text}
                        </Text>
                    ))}
                </group>
            </group>
        </group>
    );
}

function RoadLane({ width, length, angle, position }: { width: number, length: number, angle: number, position: [number, number, number] }) {
    return (
        <group position={position} rotation={[-Math.PI / 2, 0, angle]}>
            <mesh>
                <planeGeometry args={[width, length]} />
                <meshStandardMaterial color="#111111" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh position={[width / 2 - 0.05, 0, 0.005]}>
                <planeGeometry args={[0.08, length]} />
                <meshBasicMaterial color="#f59e0b" />
            </mesh>
            <mesh position={[-width / 2 + 0.05, 0, 0.005]}>
                <planeGeometry args={[0.08, length]} />
                <meshBasicMaterial color="#f59e0b" />
            </mesh>
        </group>
    );
}

function RadialRoads() {
    return (
        <group>
            <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <mesh>
                    <ringGeometry args={[6, 8.5, 64]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>
            </group>
            {PROJECTS.map((p, i) => {
                const angle = (i * Math.PI * 2) / PROJECTS.length;
                const rStart = 8.5;
                const rEnd = ROOM_RADIUS - 1;
                const len = rEnd - rStart;
                const midR = (rStart + rEnd) / 2;
                const x = Math.sin(angle) * midR;
                const z = Math.cos(angle) * midR;
                return <RoadLane key={i} width={1.8} length={len} angle={angle} position={[x, 0.015, z]} />;
            })}
        </group>
    );
}

function ProjectKiosk({ project, angle }: { project: typeof PROJECTS[0], angle: number, index: number }) {
    const x = Math.sin(angle) * ROOM_RADIUS;
    const z = Math.cos(angle) * ROOM_RADIUS;

    return (
        <group position={[x, 0, z]} rotation={[0, angle + Math.PI, 0]}>
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[5, 2.4, 0.4]} />
                <meshStandardMaterial color={THEME.walls} metalness={0.8} roughness={0.2} />
            </mesh>
            <group position={[0, 2.8, -0.1]}>
                <LEDScreen lines={[project.label, project.summary, project.impact]} color={project.color} />
            </group>
            <Text position={[0, 4.0, 0]} fontSize={0.3} color={project.color} anchorX="center">
                {project.label}
            </Text>
            <group position={[0, 1.5, 0.4]}>
                <AudioGuide text={project.description} position={[1.8, 0, 0]} color={project.color} />
                <Text position={[0, 0.2, 0]} fontSize={1.4} anchorX="center" anchorY="middle">
                    {project.emoji}
                </Text>
            </group>
            <pointLight position={[0, 6, 3]} color={project.color} intensity={2.5} />
        </group>
    );
}

function Centerpiece() {
    return (
        <group position={[0, 0, 0]}>
            <Circle args={[6, 64]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <meshStandardMaterial color={THEME.floor} />
            </Circle>
            <Text position={[0, 1.8, 0]} fontSize={1.4} color={THEME.text} anchorX="center">
                DEVANSH DATTA
            </Text>
            <Text position={[0, 1.0, 0]} fontSize={0.3} color={THEME.accent} anchorX="center">
                AI ENGINEER · DEVELOPER
            </Text>
            <pointLight position={[0, 12, 0]} intensity={3} color={THEME.accent} />
        </group>
    );
}

function Showroom() {
    return (
        <group>
            <Circle args={[120, 64]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <meshStandardMaterial color={THEME.floor} />
            </Circle>
            <Sphere args={[120, 32, 32]} position={[0, 0, 0]}>
                <meshBasicMaterial color={THEME.bg} side={THREE.BackSide} />
            </Sphere>
        </group>
    );
}

function Joystick({ onMove }: { onMove: (v: THREE.Vector2) => void }) {
    const [active, setActive] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const baseRef = useRef<HTMLDivElement>(null);

    const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
        setActive(true);
        handleMove(e);
    };

    const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!active || !baseRef.current) return;
        const rect = baseRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = rect.width / 2;
        const clampedDX = (dx / dist) * Math.min(dist, maxDist);
        const clampedDY = (dy / dist) * Math.min(dist, maxDist);
        setPos({ x: clampedDX, y: clampedDY });
        onMove(new THREE.Vector2(clampedDX / maxDist, -clampedDY / maxDist));
    };

    const handleEnd = () => {
        setActive(false);
        setPos({ x: 0, y: 0 });
        onMove(new THREE.Vector2(0, 0));
    };

    return (
        <div ref={baseRef} className="absolute bottom-12 left-12 w-32 h-32 rounded-full border-2 border-white/20 bg-white/5 z-[100] touch-none"
            onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}
            onMouseDown={handleStart} onMouseMove={handleMove} onMouseUp={handleEnd}
        >
            <div className="absolute w-12 h-12 rounded-full bg-blue-500/60"
                style={{ left: 'calc(50% - 1.5rem)', top: 'calc(50% - 1.5rem)', transform: `translate(${pos.x}px, ${pos.y}px)` }}
            />
        </div>
    );
}

function PlayerController({ keys, mobileMove, mobileLook }: {
    keys: Record<string, boolean>,
    mobileMove: THREE.Vector2,
    mobileLook: { x: number, y: number }
}) {
    const { camera } = useThree();
    const velocity = useRef(new THREE.Vector3());
    const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

    useEffect(() => {
        camera.position.set(0, 2.5, 15);
        euler.current.set(0, Math.PI, 0);
    }, [camera]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement === null) return;
            euler.current.y -= e.movementX * 0.002;
            euler.current.x -= e.movementY * 0.002;
            euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
            camera.quaternion.setFromEuler(euler.current);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [camera]);

    useFrame((_, delta) => {
        if (mobileLook.x !== 0 || mobileLook.y !== 0) {
            euler.current.y -= mobileLook.x * 0.005;
            euler.current.x -= mobileLook.y * 0.005;
            euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
            camera.quaternion.setFromEuler(euler.current);
        }

        const move = new THREE.Vector3();
        if (keys['w'] || keys['arrowup']) move.z -= 1;
        if (keys['s'] || keys['arrowdown']) move.z += 1;
        if (keys['a'] || keys['arrowleft']) move.x -= 1;
        if (keys['d'] || keys['arrowright']) move.x += 1;
        if (mobileMove.length() > 0) { move.x = mobileMove.x; move.z = -mobileMove.y; }

        if (move.length() > 0) {
            if (mobileMove.length() === 0) move.normalize();
            const fwd = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, euler.current.y, 0));
            const side = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, euler.current.y, 0));
            const finalDir = new THREE.Vector3().addScaledVector(fwd, -move.z).addScaledVector(side, move.x);
            velocity.current.addScaledVector(finalDir, 150 * delta);
        }
        velocity.current.multiplyScalar(0.85);

        const nextPos = camera.position.clone().add(velocity.current.clone().multiplyScalar(delta));
        const r = new THREE.Vector2(nextPos.x, nextPos.z).length();
        let onRoad = false;
        if (r >= 6.0 && r <= 8.5) { onRoad = true; }
        else if (r > 8.5 && r <= ROOM_RADIUS - 1) {
            const angle = Math.atan2(nextPos.x, nextPos.z);
            PROJECTS.forEach((_, i) => {
                const spokeAngle = (i * Math.PI * 2) / PROJECTS.length;
                let diff = Math.abs(angle - spokeAngle);
                if (diff > Math.PI) diff = Math.PI * 2 - diff;
                if (r * Math.sin(diff) <= 0.95) onRoad = true;
            });
        }
        if (onRoad) camera.position.copy(nextPos);
        else velocity.current.set(0, 0, 0);
        camera.position.y = 2.5;
    });
    return null;
}

function ProximitySensor({ onNear }: { onNear: (id: string | null) => void }) {
    useFrame(({ camera }) => {
        let best: string | null = null;
        let minDist = 10;
        PROJECTS.forEach((p, i) => {
            const angle = (i * Math.PI * 2) / PROJECTS.length;
            const px = Math.sin(angle) * ROOM_RADIUS;
            const pz = Math.cos(angle) * ROOM_RADIUS;
            const d = new THREE.Vector3(px, 0, pz).distanceTo(camera.position);
            if (d < minDist) { minDist = d; best = p.id; }
        });
        onNear(best);
    });
    return null;
}

export default function CreativeWorld() {
    const navigate = useNavigate();
    const [nearProject, setNearProject] = useState<string | null>(null);
    const [mobileMove, setMobileMove] = useState(new THREE.Vector2(0, 0));
    const [mobileLook, setMobileLook] = useState({ x: 0, y: 0 });
    const keysRef = useRef<Record<string, boolean>>({});

    useEffect(() => {
        const d = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = true; };
        const u = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', d); window.addEventListener('keyup', u);
        return () => { window.removeEventListener('keydown', d); window.removeEventListener('keyup', u); };
    }, []);

    const lastTouch = useRef({ x: 0, y: 0 });
    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        if (lastTouch.current.x !== 0) setMobileLook({ x: touch.clientX - lastTouch.current.x, y: touch.clientY - lastTouch.current.y });
        lastTouch.current = { x: touch.clientX, y: touch.clientY };
    };
    const handleTouchEnd = () => { setMobileLook({ x: 0, y: 0 }); lastTouch.current = { x: 0, y: 0 }; };

    const nearData = PROJECTS.find(p => p.id === nearProject);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden select-none bg-[#020617]"
            onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
        >
            <Canvas camera={{ fov: 60, near: 0.1, far: 500 }} shadows onClick={(e) => (e.target as HTMLElement).requestPointerLock?.()}>
                <color attach="background" args={[THEME.bg]} />
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 20, 10]} intensity={1.5} />
                <Showroom />
                <Centerpiece />
                <RadialRoads />
                {PROJECTS.map((p, i) => (
                    <ProjectKiosk key={p.id} project={p} index={i} angle={(i * Math.PI * 2) / PROJECTS.length} />
                ))}
                <Environment preset="night" />
                <ProximitySensor onNear={setNearProject} />
                <PlayerController keys={keysRef.current} mobileMove={mobileMove} mobileLook={mobileLook} />
            </Canvas>

            <button onClick={() => navigate('/')} className="absolute top-8 left-8 z-[110] px-6 py-3 rounded-2xl bg-white/10 text-white text-xs font-bold">
                EXIT SIMULATION
            </button>

            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <h1 className="text-white text-2xl font-bold tracking-widest">THE NEON ROTUNDA (SAFE MODE)</h1>
            </div>

            <div className="md:hidden"><Joystick onMove={setMobileMove} /></div>

            {nearData && (
                <div className="absolute bottom-12 right-12 z-50 w-full max-w-md bg-black/80 border border-blue-500/20 rounded-3xl p-8">
                    <h3 className="text-white font-bold text-2xl mb-2">{nearData.label}</h3>
                    <p className="text-slate-300 mb-6">{nearData.description}</p>
                    <button className="w-full py-4 bg-blue-600 rounded-2xl text-white font-bold">EXPLORE</button>
                </div>
            )}
        </div>
    );
}
