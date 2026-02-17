import { useRef, useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const PIXEL_FONT = 'https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580w.woff2';

/* ─── GARAGE DATA ─── */

const GARAGES = [
    {
        id: 'torq', num: '01', label: 'TORQ', emoji: '🚗', color: '#2563eb',
        summary: 'AI Emergency Vehicle Support',
        description: 'On-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking.',
        problem: 'No unified real-time platform for emergency roadside service in remote areas.',
        role: 'Founded and led product development end-to-end — architecture, AI chatbot, payment flow.',
        impact: 'Served 500+ users · Modular microservice backend · Razorpay escrow integration',
        tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API', 'Razorpay'],
        features: ['Real-time GPS tracking', 'AI chatbot (OpenAI)', 'Razorpay escrow payments', 'Multi-vendor marketplace', 'Emergency SOS routing', 'Firebase push notifications'],
    },
    {
        id: 'tatvam', num: '02', label: 'TATVAM', emoji: '🧘', color: '#7c3aed',
        summary: 'LLM Contextual Mapping Engine',
        description: 'LLM-powered platform connecting ancient philosophical texts with modern AI through RAG pipelines and ethical guardrails.',
        problem: 'Ancient philosophical knowledge is scattered and existing AI lacks cultural sensitivity.',
        role: 'Designed the RAG pipeline, ethical guardrail system, and AWS deployment architecture.',
        impact: 'Novel AI application bridging philosophy and tech · Stripe 3-tier access · Serverless AWS',
        tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Supabase', 'Stripe', 'AWS'],
        features: ['RAG pipeline with LangChain', 'Ethical guardrails', 'Subscription tiers (Stripe)', 'Vector DB semantic search', 'Personalized guidance', 'Serverless AWS deployment'],
    },
    {
        id: 'minto', num: '03', label: 'MINTO', emoji: '📦', color: '#059669',
        summary: 'Last-Mile Delivery Platform',
        description: 'Delivery platform empowering Tier-2/3 city vendors by eliminating dark-store dependency.',
        problem: 'Small vendors in smaller cities can\'t afford dark-store logistics.',
        role: 'Built real-time order mapping, vendor analytics dashboard, and delivery assignment algorithm.',
        impact: '50+ vendors onboarded · 40% delivery efficiency · Best Social Impact Project',
        tech: ['Next.js', 'Node.js', 'Supabase', 'Google Maps API'],
        features: ['Vendor onboarding system', 'Real-time order mapping', 'Analytics dashboard', 'Proximity-based matching', 'Customer tracking', 'Inventory management'],
    },
    {
        id: 'mood', num: '04', label: 'MOOD', emoji: '🎵', color: '#db2777',
        summary: 'Emotion-Based Spotify Player',
        description: 'Real-time emotion detection via webcam → dynamic Spotify playlist generation using DeepFace.',
        problem: 'Music recommendation relies on history, not real-time emotional state.',
        role: 'Built the entire CV pipeline — face detection, emotion classification, Spotify OAuth, playlist generation.',
        impact: 'Real-time emotion-to-music at 30fps · 7-emotion classification · Best AI Innovation Award',
        tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
        features: ['Real-time facial emotion detection', 'Dynamic Spotify playlist', 'Voice feedback', 'Multi-language support', 'Emotion history tracking', 'Cross-platform app'],
    },
    {
        id: 'skillsync', num: '05', label: 'SKILLSYNC', emoji: '🧠', color: '#9333ea',
        summary: 'AI Opportunity Matching Engine',
        description: 'AI-powered student opportunity matching — recommendation engine serving 1,000+ students.',
        problem: 'Students struggle to find relevant opportunities across fragmented platforms.',
        role: 'Lead AI development — built recommendation engine, web scraping pipeline, CV parsing system.',
        impact: '1,000+ students served · 85% relevance accuracy · 50+ sources aggregated',
        tech: ['Python', 'NLP', 'Web Scraping', 'Collaborative Filtering'],
        features: ['Recommendation engine', 'CV parsing & job-fit scoring', 'Web scraping (50+ sources)', 'Collaborative filtering', 'Content-based scoring', 'NLP resume analysis'],
    },
    {
        id: 'research', num: '06', label: 'RESEARCH', emoji: '📚', color: '#0891b2',
        summary: 'Published — AI and the Soul',
        description: 'Exploring the intersections of AI, creativity, and consciousness. Examines how generative AI challenges authorship.',
        problem: 'The philosophical implications of AI creativity remain underexplored.',
        role: 'Author — researched and wrote a book chapter on AI, consciousness, and creative expression.',
        impact: 'Published book chapter · Framework for AI augmenting human expression',
        tech: ['AI', 'Consciousness', 'Creativity', 'Philosophy of Mind'],
        features: ['AI vs human creativity analysis', 'Authorship in generative AI', 'Framework for AI augmentation', 'Philosophy of Mind perspective', 'Cross-disciplinary research', 'Published chapter'],
    },
];

const GARAGE_SPACING = 8;
const PIT_LANE_LENGTH = GARAGES.length * GARAGE_SPACING + 10;
const PIT_LANE_START_Z = PIT_LANE_LENGTH / 2;

/* ═══════════════ PIT LANE FLOOR ═══════════════ */

function PitLane() {
    return (
        <group>
            {/* Pit lane asphalt — medium grey */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[14, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#6b6b6b" roughness={0.9} />
            </mesh>

            {/* White boundary lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6.5, 0.005, 0]}>
                <planeGeometry args={[0.18, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6.5, 0.005, 0]}>
                <planeGeometry args={[0.18, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>

            {/* Center dashed line */}
            {Array.from({ length: Math.ceil(PIT_LANE_LENGTH / 3) }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, PIT_LANE_START_Z - i * 3]}>
                    <planeGeometry args={[0.12, 1.5]} />
                    <meshStandardMaterial color="#cccccc" roughness={0.5} />
                </mesh>
            ))}

            {/* Pit box floor markings */}
            {GARAGES.map((g, i) => {
                const z = PIT_LANE_START_Z - 5 - i * GARAGE_SPACING;
                return (
                    <group key={g.id}>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.006, z]}>
                            <planeGeometry args={[5, 0.1]} />
                            <meshStandardMaterial color={g.color} roughness={0.5} />
                        </mesh>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.006, z + GARAGE_SPACING / 2 - 0.5]}>
                            <planeGeometry args={[5, 0.1]} />
                            <meshStandardMaterial color={g.color} roughness={0.5} />
                        </mesh>
                    </group>
                );
            })}

            {/* Grass areas — left of garages */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-18, -0.02, 0]}>
                <planeGeometry args={[20, PIT_LANE_LENGTH + 40]} />
                <meshStandardMaterial color="#4a7a3a" roughness={0.95} />
            </mesh>

            {/* Grass — right of track */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[32, -0.02, 0]}>
                <planeGeometry args={[20, PIT_LANE_LENGTH + 40]} />
                <meshStandardMaterial color="#4a7a3a" roughness={0.95} />
            </mesh>
        </group>
    );
}

/* ═══════════════ GARAGE ═══════════════ */

function Garage({
    data,
    index,
    onApproach,
}: {
    data: (typeof GARAGES)[0];
    index: number;
    onApproach: (id: string | null) => void;
}) {
    const wasNear = useRef(false);
    const z = PIT_LANE_START_Z - 5 - index * GARAGE_SPACING;
    const x = -7.5;

    useFrame(({ camera }) => {
        const dist = camera.position.distanceTo(new THREE.Vector3(-3, 0, z));
        const isNear = dist < 5;
        if (isNear !== wasNear.current) {
            wasNear.current = isNear;
            onApproach(isNear ? data.id : null);
        }
    });

    return (
        <group position={[x, 0, z]}>
            {/* Back wall — light concrete */}
            <mesh position={[0, 2.5, 0]}>
                <boxGeometry args={[0.3, 5, GARAGE_SPACING - 0.5]} />
                <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
            </mesh>

            {/* Side walls */}
            <mesh position={[2.5, 2.5, (GARAGE_SPACING - 0.5) / 2]}>
                <boxGeometry args={[5, 5, 0.2]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.7} />
            </mesh>
            <mesh position={[2.5, 2.5, -(GARAGE_SPACING - 0.5) / 2]}>
                <boxGeometry args={[5, 5, 0.2]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.7} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[2.5, 5, 0]}>
                <boxGeometry args={[5.3, 0.2, GARAGE_SPACING - 0.3]} />
                <meshStandardMaterial color="#d0d0d0" roughness={0.8} />
            </mesh>

            {/* Floor inside */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.5, 0.01, 0]}>
                <planeGeometry args={[5, GARAGE_SPACING - 0.5]} />
                <meshStandardMaterial color="#aaaaaa" roughness={0.7} />
            </mesh>

            {/* Team color strip along top */}
            <mesh position={[5, 4.85, 0]}>
                <boxGeometry args={[0.2, 0.25, GARAGE_SPACING - 0.6]} />
                <meshStandardMaterial color={data.color} roughness={0.3} />
            </mesh>

            {/* Team color stripe on back wall */}
            <mesh position={[0.2, 3.5, 0]}>
                <boxGeometry args={[0.05, 0.4, GARAGE_SPACING - 1]} />
                <meshStandardMaterial color={data.color} roughness={0.3} />
            </mesh>

            {/* Team number plate */}
            <Suspense fallback={null}>
                <Text
                    position={[0.25, 4, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    fontSize={0.7}
                    color={data.color}
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                >
                    {data.num}
                </Text>
            </Suspense>

            {/* Team name */}
            <Suspense fallback={null}>
                <Text
                    position={[0.25, 2.5, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    fontSize={0.32}
                    color="#333333"
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                >
                    {data.label}
                </Text>
                <Text
                    position={[0.25, 1.9, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    fontSize={0.11}
                    color="#777777"
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                >
                    {data.summary}
                </Text>
            </Suspense>

            {/* Tire stacks */}
            {[-1.5, 1.5].map((tz) => (
                <group key={tz} position={[1, 0, tz]}>
                    {[0, 0.35, 0.7].map((ty) => (
                        <mesh key={ty} position={[0, ty + 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[0.25, 0.12, 8, 12]} />
                            <meshStandardMaterial color="#222222" roughness={0.95} />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* Equipment box — red toolbox */}
            <mesh position={[1.5, 0.4, -2.5]}>
                <boxGeometry args={[1, 0.8, 0.6]} />
                <meshStandardMaterial color="#cc2222" roughness={0.4} metalness={0.3} />
            </mesh>
        </group>
    );
}

/* ═══════════════ PIT WALL ═══════════════ */

function PitWall() {
    return (
        <group>
            {/* Concrete pit wall */}
            <mesh position={[6, 0.5, 0]}>
                <boxGeometry args={[0.6, 1, PIT_LANE_LENGTH + 10]} />
                <meshStandardMaterial color="#b0b0b0" roughness={0.85} />
            </mesh>

            {/* Top cap */}
            <mesh position={[6, 1.05, 0]}>
                <boxGeometry args={[0.8, 0.1, PIT_LANE_LENGTH + 10]} />
                <meshStandardMaterial color="#cccccc" roughness={0.6} />
            </mesh>

            {/* Safety lights */}
            {Array.from({ length: Math.ceil(PIT_LANE_LENGTH / 4) }).map((_, i) => (
                <mesh key={i} position={[6, 1.15, PIT_LANE_START_Z - 2 - i * 4]}>
                    <boxGeometry args={[0.1, 0.1, 0.1]} />
                    <meshStandardMaterial color={i % 2 === 0 ? '#22cc22' : '#22cc22'} roughness={0.3} />
                </mesh>
            ))}
        </group>
    );
}

/* ═══════════════ TRACK ═══════════════ */

function TrackSection() {
    return (
        <group>
            {/* Track asphalt */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[14, -0.01, 0]}>
                <planeGeometry args={[16, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#555555" roughness={0.88} />
            </mesh>

            {/* Red-white curbs — inner */}
            {Array.from({ length: Math.ceil(PIT_LANE_LENGTH / 2) }).map((_, i) => (
                <mesh key={`c-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[7, 0.008, PIT_LANE_START_Z + 5 - i * 2]}>
                    <planeGeometry args={[0.9, 1]} />
                    <meshStandardMaterial color={i % 2 === 0 ? '#dd1111' : '#ffffff'} roughness={0.5} />
                </mesh>
            ))}

            {/* Outer curbs */}
            {Array.from({ length: Math.ceil(PIT_LANE_LENGTH / 2) }).map((_, i) => (
                <mesh key={`o-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[22, 0.008, PIT_LANE_START_Z + 5 - i * 2]}>
                    <planeGeometry args={[0.9, 1]} />
                    <meshStandardMaterial color={i % 2 === 0 ? '#dd1111' : '#ffffff'} roughness={0.5} />
                </mesh>
            ))}

            {/* White track edge lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[7.5, 0.006, 0]}>
                <planeGeometry args={[0.15, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[21.5, 0.006, 0]}>
                <planeGeometry args={[0.15, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>

            {/* Gravel trap then barrier beyond track */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[23, -0.01, 0]}>
                <planeGeometry args={[2, PIT_LANE_LENGTH + 20]} />
                <meshStandardMaterial color="#c4a96a" roughness={0.95} />
            </mesh>
            {/* TecPro barrier */}
            <mesh position={[24.2, 0.6, 0]}>
                <boxGeometry args={[0.5, 1.2, PIT_LANE_LENGTH + 10]} />
                <meshStandardMaterial color="#2255cc" roughness={0.6} />
            </mesh>
        </group>
    );
}

/* ═══════════════ GRANDSTAND ═══════════════ */

function Grandstand() {
    return (
        <group position={[28, 0, 0]}>
            {/* Stepped seating */}
            {Array.from({ length: 6 }).map((_, row) => (
                <mesh key={row} position={[row * 1.2, row * 1, 0]}>
                    <boxGeometry args={[1, 0.4, PIT_LANE_LENGTH * 0.6]} />
                    <meshStandardMaterial color={row % 2 === 0 ? '#d0d0d0' : '#c0c0c0'} roughness={0.7} />
                </mesh>
            ))}
            {/* Roof */}
            <mesh position={[4, 7.5, 0]}>
                <boxGeometry args={[10, 0.3, PIT_LANE_LENGTH * 0.65]} />
                <meshStandardMaterial color="#eeeeee" roughness={0.5} />
            </mesh>
            {/* Support columns */}
            {[-PIT_LANE_LENGTH * 0.28, 0, PIT_LANE_LENGTH * 0.28].map((z, i) => (
                <mesh key={i} position={[7, 3.75, z]}>
                    <cylinderGeometry args={[0.12, 0.12, 7.5, 6]} />
                    <meshStandardMaterial color="#999999" metalness={0.5} roughness={0.3} />
                </mesh>
            ))}
        </group>
    );
}

/* ═══════════════ PODIUM ═══════════════ */

function Podium() {
    const z = PIT_LANE_START_Z - PIT_LANE_LENGTH + 2;
    return (
        <group position={[0, 0, z]}>
            {/* P2 — silver */}
            <mesh position={[-2, 0.4, 0]}>
                <boxGeometry args={[1.8, 0.8, 1.8]} />
                <meshStandardMaterial color="#c0c0c0" metalness={0.6} roughness={0.3} />
            </mesh>
            <Suspense fallback={null}>
                <Text position={[-2, 0.85, 0.95]} fontSize={0.3} color="#555" anchorX="center" font={PIXEL_FONT}>P2</Text>
            </Suspense>

            {/* P1 — gold */}
            <mesh position={[0, 0.65, 0]}>
                <boxGeometry args={[1.8, 1.3, 1.8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.7} roughness={0.25} />
            </mesh>
            <Suspense fallback={null}>
                <Text position={[0, 1.35, 0.95]} fontSize={0.3} color="#555" anchorX="center" font={PIXEL_FONT}>P1</Text>
            </Suspense>

            {/* P3 — bronze */}
            <mesh position={[2, 0.3, 0]}>
                <boxGeometry args={[1.8, 0.6, 1.8]} />
                <meshStandardMaterial color="#cd7f32" metalness={0.6} roughness={0.3} />
            </mesh>
            <Suspense fallback={null}>
                <Text position={[2, 0.65, 0.95]} fontSize={0.3} color="#555" anchorX="center" font={PIXEL_FONT}>P3</Text>
            </Suspense>

            {/* Checkered backdrop */}
            {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                    <mesh key={`${row}-${col}`} position={[-2.5 + col * 1, 2 + row * 0.5, -1.5]}>
                        <boxGeometry args={[0.48, 0.48, 0.05]} />
                        <meshStandardMaterial color={(row + col) % 2 === 0 ? '#ffffff' : '#222222'} roughness={0.4} />
                    </mesh>
                ))
            )}
        </group>
    );
}

/* ═══════════════ TIMING BOARD ═══════════════ */

function TimingBoard() {
    return (
        <group position={[5.5, 2, PIT_LANE_START_Z - 1]}>
            <mesh>
                <boxGeometry args={[0.15, 2.5, 4]} />
                <meshStandardMaterial color="#222222" roughness={0.3} metalness={0.7} />
            </mesh>
            <Suspense fallback={null}>
                <Text position={[0.1, 0.8, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.18} color="#ff2222" anchorX="center" font={PIXEL_FONT}>
                    GRAND PRIX
                </Text>
                <Text position={[0.1, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.12} color="#ffffff" anchorX="center" font={PIXEL_FONT}>
                    DEVANSH DATTA
                </Text>
                {GARAGES.slice(0, 5).map((g, i) => (
                    <Text key={g.id} position={[0.1, -0.1 - i * 0.3, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.1} color={g.color} anchorX="center" font={PIXEL_FONT}>
                        {`P${i + 1}  ${g.num}  ${g.label}`}
                    </Text>
                ))}
            </Suspense>
        </group>
    );
}

/* ═══════════════ PLAYER CONTROLLER ═══════════════ */

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

    useEffect(() => {
        camera.position.set(0, 2, PIT_LANE_START_Z);
        euler.current.set(0, Math.PI, 0);
        camera.quaternion.setFromEuler(euler.current);
    }, [camera]);

    useEffect(() => {
        const canvas = gl.domElement;
        const onClick = () => canvas.requestPointerLock();
        const onMouse = (e: MouseEvent) => {
            if (document.pointerLockElement !== canvas) return;
            euler.current.y -= e.movementX * 0.002;
            euler.current.x -= e.movementY * 0.002;
            euler.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, euler.current.x));
            camera.quaternion.setFromEuler(euler.current);
        };
        canvas.addEventListener('click', onClick);
        document.addEventListener('mousemove', onMouse);
        return () => { canvas.removeEventListener('click', onClick); document.removeEventListener('mousemove', onMouse); };
    }, [camera, gl]);

    useFrame((_, delta) => {
        const dir = new THREE.Vector3();
        if (keys['w'] || keys['arrowup']) dir.z -= 1;
        if (keys['s'] || keys['arrowdown']) dir.z += 1;
        if (keys['a'] || keys['arrowleft']) dir.x -= 1;
        if (keys['d'] || keys['arrowright']) dir.x += 1;
        if (Math.abs(joystick.x) > 0.1 || Math.abs(joystick.y) > 0.1) { dir.x += joystick.x; dir.z -= joystick.y; }

        if (dir.length() > 0) {
            dir.normalize();
            const fwd = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, euler.current.y, 0));
            const rgt = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, euler.current.y, 0));
            const move = new THREE.Vector3().addScaledVector(rgt, dir.x).addScaledVector(fwd, -dir.z);
            move.y = 0;
            velocity.current.addScaledVector(move, 6 * delta);
        }
        velocity.current.multiplyScalar(0.88);

        const np = camera.position.clone().add(velocity.current.clone().multiplyScalar(delta * 60));
        np.x = Math.max(-6, Math.min(24, np.x));
        np.z = Math.max(-(PIT_LANE_LENGTH / 2 + 8), Math.min(PIT_LANE_START_Z + 5, np.z));
        np.y = 2;
        camera.position.copy(np);
    });

    return null;
}

/* ═══════════════ MOBILE JOYSTICK ═══════════════ */

function MobileJoystick({ onMove }: { onMove: (x: number, y: number) => void }) {
    const baseRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const touchId = useRef<number | null>(null);
    const origin = useRef({ x: 0, y: 0 });

    const start = useCallback((e: React.TouchEvent) => {
        const t = e.changedTouches[0];
        if (!t || !baseRef.current) return;
        touchId.current = t.identifier;
        const r = baseRef.current.getBoundingClientRect();
        origin.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, []);

    const move = useCallback((e: React.TouchEvent) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const t = e.changedTouches[i];
            if (t.identifier !== touchId.current) continue;
            const dx = t.clientX - origin.current.x, dy = t.clientY - origin.current.y;
            const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
            const a = Math.atan2(dy, dx);
            if (knobRef.current) knobRef.current.style.transform = `translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px)`;
            onMove((Math.cos(a) * dist) / 40, -(Math.sin(a) * dist) / 40);
        }
    }, [onMove]);

    const end = useCallback(() => {
        touchId.current = null;
        if (knobRef.current) knobRef.current.style.transform = 'translate(0,0)';
        onMove(0, 0);
    }, [onMove]);

    return (
        <div ref={baseRef} className="absolute bottom-8 left-8 w-28 h-28 rounded-full border border-gray-400/30 bg-white/20 backdrop-blur flex items-center justify-center touch-none select-none z-50"
            onTouchStart={start} onTouchMove={move} onTouchEnd={end} onTouchCancel={end}>
            <div ref={knobRef} className="w-12 h-12 rounded-full bg-gray-500/20 border border-gray-400/40" />
        </div>
    );
}

/* ═══════════════ PROJECT DETAIL ═══════════════ */

function ProjectDetail({ data, onClose }: { data: (typeof GARAGES)[0]; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto mx-4 rounded-2xl border shadow-2xl p-6 md:p-8"
                style={{ backgroundColor: '#ffffffee', borderColor: `${data.color}30` }}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm transition">✕</button>

                <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: `${data.color}15` }}>
                        {data.emoji}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono px-2 py-0.5 rounded font-bold" style={{ backgroundColor: `${data.color}15`, color: data.color }}>#{data.num}</span>
                            <h2 className="text-xl font-bold text-gray-900">{data.label}</h2>
                        </div>
                        <p className="text-sm text-gray-500">{data.summary}</p>
                    </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">{data.description}</p>

                <div className="space-y-3 mb-5">
                    <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                        <h4 className="text-red-600 font-semibold text-xs mb-1">⚡ Problem</h4>
                        <p className="text-gray-600 text-sm">{data.problem}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <h4 className="text-blue-600 font-semibold text-xs mb-1">🎯 My Role</h4>
                        <p className="text-gray-600 text-sm">{data.role}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                        <h4 className="text-green-600 font-semibold text-xs mb-1">📈 Impact</h4>
                        <p className="text-gray-600 text-sm">{data.impact}</p>
                    </div>
                </div>

                <div className="mb-5">
                    <h4 className="text-gray-800 text-sm font-semibold mb-2">Features</h4>
                    <div className="grid grid-cols-2 gap-1.5">
                        {data.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 text-gray-500 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }} />{f}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-800 text-sm font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {data.tech.map((t) => (
                            <span key={t} className="px-2 py-0.5 text-xs rounded-full border text-gray-600 bg-gray-50" style={{ borderColor: `${data.color}30` }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════ MAIN ═══════════════ */

export default function CreativeWorld() {
    const navigate = useNavigate();
    const [nearGarage, setNearGarage] = useState<string | null>(null);
    const [openGarage, setOpenGarage] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const keysRef = useRef<Record<string, boolean>>({});
    const [joystick, setJoystick] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const chk = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        chk(); window.addEventListener('resize', chk);
        return () => window.removeEventListener('resize', chk);
    }, []);

    useEffect(() => {
        const d = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = true; };
        const u = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', d); window.addEventListener('keyup', u);
        return () => { window.removeEventListener('keydown', d); window.removeEventListener('keyup', u); };
    }, []);

    const handleJoystick = useCallback((x: number, y: number) => setJoystick({ x, y }), []);
    const nearData = nearGarage ? GARAGES.find((g) => g.id === nearGarage) : null;
    const openData = openGarage ? GARAGES.find((g) => g.id === openGarage) : null;

    return (
        <div className="fixed inset-0 bg-white w-full h-full z-[9999]">
            <Canvas camera={{ fov: 65, near: 0.1, far: 200 }} style={{ width: '100%', height: '100%' }} gl={{ antialias: true, alpha: false }} shadows>

                {/* Bright blue sky */}
                <color attach="background" args={['#87CEEB']} />
                <fog attach="fog" args={['#b0d0e8', 40, 100]} />

                {/* Daylight — strong sun */}
                <ambientLight intensity={0.6} color="#ffffff" />
                <directionalLight position={[15, 30, 10]} intensity={1.5} color="#fff8e8" castShadow shadow-mapSize={1024} />
                <directionalLight position={[-10, 20, -5]} intensity={0.4} color="#e8f0ff" />
                <hemisphereLight args={['#87CEEB', '#4a7a3a', 0.4]} />

                {/* Scene */}
                <PitLane />
                <PitWall />
                <TrackSection />
                <Grandstand />
                <TimingBoard />
                <Podium />

                {GARAGES.map((g, i) => (
                    <Garage key={g.id} data={g} index={i} onApproach={setNearGarage} />
                ))}

                <PlayerController keys={keysRef.current} joystick={joystick} />
            </Canvas>

            {/* HUD — Light theme */}
            <button onClick={() => navigate('/')}
                className="absolute top-5 left-5 z-50 px-4 py-2 rounded-lg bg-white/70 backdrop-blur border border-gray-200 text-gray-800 text-sm font-medium hover:bg-white/90 transition shadow-sm">
                ← Portfolio
            </button>

            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <h1 className="text-gray-900 text-base md:text-xl font-bold tracking-widest uppercase drop-shadow-sm">
                    🏎️ Devansh Datta Grand Prix
                </h1>
                <p className="text-gray-500 text-xs mt-0.5">walk the pit lane · enter a garage to explore</p>
            </div>

            {!isMobile && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    <div className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur border border-gray-200 text-gray-500 text-xs flex items-center gap-3 shadow-sm">
                        <span className="font-mono text-gray-700">WASD</span> move
                        <span className="text-gray-300">|</span>
                        click + mouse to look
                    </div>
                </div>
            )}

            {isMobile && <MobileJoystick onMove={handleJoystick} />}

            {nearData && !openGarage && (
                <div className="absolute bottom-6 right-5 z-50 max-w-xs">
                    <div className="p-4 rounded-xl bg-white/80 backdrop-blur border border-gray-200 shadow-lg text-gray-900">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-mono px-2 py-0.5 rounded font-bold" style={{ backgroundColor: `${nearData.color}15`, color: nearData.color }}>#{nearData.num}</span>
                            <h3 className="text-base font-bold">{nearData.label}</h3>
                        </div>
                        <p className="text-gray-500 text-xs mb-3">{nearData.summary}</p>
                        <button onClick={() => setOpenGarage(nearData.id)}
                            className="w-full py-1.5 rounded-lg text-xs font-semibold text-white transition"
                            style={{ backgroundColor: nearData.color }}>
                            Enter Garage →
                        </button>
                    </div>
                </div>
            )}

            {openData && <ProjectDetail data={openData} onClose={() => setOpenGarage(null)} />}
        </div>
    );
}
