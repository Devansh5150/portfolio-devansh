import { useRef, useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

/* ─── FONT ─── */
const PIXEL_FONT = 'https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580w.woff2';

/* ─── COLORS ─── */
const PURPUR = '#9b59b6'; // purpur block
const PURPUR_D = '#6c3483'; // dark purpur
const PURPUR_L = '#c39bd3'; // light purpur
const END_STONE = '#ddd8a0';
const CIRCUIT_GREEN = '#00ff88';

/* ─── PROJECT DATA ─── */

const TOWERS = [
    {
        id: 'torq', label: 'Torq', emoji: '🚗', color: '#60a5fa', height: 16,
        summary: 'AI Emergency Vehicle Support',
        description: 'On-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking.',
        problem: 'No unified real-time platform for emergency roadside service in remote areas.',
        role: 'Founded and led product development end-to-end — architecture, AI chatbot, payment flow.',
        impact: 'Served 500+ users · Modular microservice backend · Razorpay escrow integration',
        tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API', 'Razorpay'],
        features: ['Real-time GPS tracking', 'AI chatbot (OpenAI)', 'Razorpay escrow payments', 'Multi-vendor marketplace', 'Emergency SOS routing', 'Firebase push notifications'],
        position: [0, 0, -22] as [number, number, number],
    },
    {
        id: 'tatvam', label: 'Tatvam', emoji: '🧘', color: '#a78bfa', height: 14,
        summary: 'LLM Contextual Mapping Engine',
        description: 'LLM-powered platform connecting ancient philosophical texts with modern AI through RAG pipelines and ethical guardrails.',
        problem: 'Ancient philosophical knowledge is scattered and existing AI lacks cultural sensitivity.',
        role: 'Designed the RAG pipeline, ethical guardrail system, and AWS deployment architecture.',
        impact: 'Novel AI application bridging philosophy and technology · Stripe 3-tier access · Serverless AWS',
        tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Supabase', 'Stripe', 'AWS'],
        features: ['RAG pipeline with LangChain', 'Ethical guardrails', 'Subscription tiers (Stripe)', 'Vector DB semantic search', 'Personalized guidance', 'Serverless AWS deployment'],
        position: [19, 0, -11] as [number, number, number],
    },
    {
        id: 'minto', label: 'Minto', emoji: '📦', color: '#34d399', height: 12,
        summary: 'Last-Mile Delivery Platform',
        description: 'Delivery platform empowering Tier-2/3 city vendors by eliminating dark-store dependency.',
        problem: 'Small vendors in smaller cities can\'t afford dark-store logistics.',
        role: 'Built real-time order mapping, vendor analytics dashboard, and delivery assignment algorithm.',
        impact: '50+ vendors onboarded · 40% delivery efficiency improvement · Best Social Impact Project',
        tech: ['Next.js', 'Node.js', 'Supabase', 'Google Maps API'],
        features: ['Vendor onboarding system', 'Real-time order mapping', 'Analytics dashboard', 'Proximity-based matching', 'Customer tracking', 'Inventory management'],
        position: [19, 0, 11] as [number, number, number],
    },
    {
        id: 'mood', label: 'Mood Player', emoji: '🎵', color: '#f472b6', height: 13,
        summary: 'Emotion-Based Spotify Player',
        description: 'Real-time emotion detection via webcam → dynamic Spotify playlist generation using DeepFace.',
        problem: 'Music recommendation relies on history, not real-time emotional state.',
        role: 'Built the entire CV pipeline — face detection, emotion classification, Spotify OAuth, playlist generation.',
        impact: 'Real-time emotion-to-music at 30fps · 7-emotion classification · Best AI Innovation Award',
        tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
        features: ['Real-time facial emotion detection', 'Dynamic Spotify playlist', 'Voice feedback', 'Multi-language support', 'Emotion history tracking', 'Cross-platform app'],
        position: [0, 0, 22] as [number, number, number],
    },
    {
        id: 'skillsync', label: 'SkillSync', emoji: '🧠', color: '#c084fc', height: 15,
        summary: 'AI Opportunity Matching Engine',
        description: 'AI-powered student opportunity matching — recommendation engine serving 1,000+ students.',
        problem: 'Students struggle to find relevant opportunities across fragmented platforms.',
        role: 'Lead AI development — built recommendation engine, web scraping pipeline, CV parsing system.',
        impact: '1,000+ students served · 85% relevance accuracy · 50+ sources aggregated',
        tech: ['Python', 'NLP', 'Web Scraping', 'Collaborative Filtering'],
        features: ['Recommendation engine', 'CV parsing & job-fit scoring', 'Web scraping (50+ sources)', 'Collaborative filtering', 'Content-based scoring', 'NLP resume analysis'],
        position: [-19, 0, 11] as [number, number, number],
    },
    {
        id: 'research', label: 'Research', emoji: '📚', color: '#22d3ee', height: 11,
        summary: 'Published — AI and the Soul',
        description: 'Exploring the intersections of AI, creativity, and consciousness. Examines how generative AI challenges authorship.',
        problem: 'The philosophical implications of AI creativity remain underexplored in technical communities.',
        role: 'Author — researched and wrote a book chapter on AI, consciousness, and creative expression.',
        impact: 'Published book chapter · Framework for AI augmenting human expression',
        tech: ['AI', 'Consciousness', 'Creativity', 'Philosophy of Mind'],
        features: ['AI vs human creativity analysis', 'Authorship in generative AI', 'Framework for AI augmentation', 'Philosophy of Mind perspective', 'Cross-disciplinary research', 'Published chapter'],
        position: [-19, 0, -11] as [number, number, number],
    },
];

/* ─────────────── CIRCUIT BOARD GROUND ─────────────── */

function TechGround() {
    const traceGeom = useMemo(() => {
        // Create glowing circuit trace lines on the ground
        const points: THREE.Vector3[][] = [];
        // Radial traces from center to each tower
        TOWERS.forEach((t) => {
            const p = t.position;
            const midX = p[0] * 0.5 + (Math.random() - 0.5) * 3;
            const midZ = p[2] * 0.5 + (Math.random() - 0.5) * 3;
            points.push([
                new THREE.Vector3(0, 0.06, 0),
                new THREE.Vector3(midX, 0.06, midZ),
                new THREE.Vector3(p[0], 0.06, p[2]),
            ]);
        });
        return points;
    }, []);

    return (
        <group>
            {/* Main platform */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
                <circleGeometry args={[35, 64]} />
                <meshStandardMaterial color="#1a1a2e" roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Grid overlay — subtle PCB pattern */}
            {Array.from({ length: 30 }).map((_, i) => {
                const s = -30 + i * 2;
                return (
                    <group key={`grid-h-${i}`}>
                        <mesh position={[0, 0.01, s]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[60, 0.03]} />
                            <meshBasicMaterial color={CIRCUIT_GREEN} transparent opacity={0.06} />
                        </mesh>
                        <mesh position={[s, 0.01, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
                            <planeGeometry args={[60, 0.03]} />
                            <meshBasicMaterial color={CIRCUIT_GREEN} transparent opacity={0.06} />
                        </mesh>
                    </group>
                );
            })}

            {/* Glowing circuit traces to each tower */}
            {traceGeom.map((pts, ti) => (
                <group key={`trace-${ti}`}>
                    {pts.slice(0, -1).map((p, si) => {
                        const next = pts[si + 1];
                        const mid = new THREE.Vector3().addVectors(p, next).multiplyScalar(0.5);
                        const len = p.distanceTo(next);
                        const angle = Math.atan2(next.x - p.x, next.z - p.z);
                        return (
                            <mesh key={si} position={[mid.x, 0.03, mid.z]} rotation={[-Math.PI / 2, 0, angle]}>
                                <planeGeometry args={[0.15, len]} />
                                <meshBasicMaterial color={TOWERS[ti].color} transparent opacity={0.35} />
                            </mesh>
                        );
                    })}
                </group>
            ))}

            {/* Keyboard key walkway — path of raised keys */}
            {Array.from({ length: 50 }).map((_, i) => {
                const angle = (i / 50) * Math.PI * 2;
                const r = 8 + Math.sin(i * 0.7) * 2;
                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;
                const keys = ['W', 'A', 'S', 'D', '↵', 'Fn', 'Alt', 'Ctrl', 'Esc', '⌘', 'Tab', '/', '<>', '{}', '()', '[]', '01', 'AI', 'ML', 'JS', 'TS', 'PY', 'GIT', 'NPM', 'API'];
                const label = keys[i % keys.length];
                return (
                    <group key={`key-${i}`} position={[x, 0, z]}>
                        {/* Key cap */}
                        <mesh position={[0, 0.12, 0]} castShadow>
                            <boxGeometry args={[0.7, 0.2, 0.7]} />
                            <meshStandardMaterial color="#2d2d3d" roughness={0.4} metalness={0.6} />
                        </mesh>
                        {/* Key top (lighter) */}
                        <mesh position={[0, 0.23, 0]}>
                            <boxGeometry args={[0.6, 0.02, 0.6]} />
                            <meshStandardMaterial color="#3a3a4d" roughness={0.3} metalness={0.7} />
                        </mesh>
                        {/* Key label */}
                        <Suspense fallback={null}>
                            <Text
                                position={[0, 0.26, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                fontSize={0.15}
                                color={CIRCUIT_GREEN}
                                anchorX="center"
                                anchorY="middle"
                                font={PIXEL_FONT}
                            >
                                {label}
                            </Text>
                        </Suspense>
                    </group>
                );
            })}

            {/* Scattered circuit components */}
            {Array.from({ length: 20 }).map((_, i) => {
                const a = Math.random() * Math.PI * 2;
                const r = 5 + Math.random() * 22;
                const x = Math.cos(a) * r;
                const z = Math.sin(a) * r;
                return (
                    <group key={`comp-${i}`} position={[x, 0.05, z]}>
                        {/* Resistor / capacitor shapes */}
                        <mesh>
                            <boxGeometry args={[0.15 + Math.random() * 0.2, 0.08, 0.08]} />
                            <meshStandardMaterial
                                color={i % 3 === 0 ? '#cc4444' : i % 3 === 1 ? '#44aa44' : '#4444cc'}
                                emissive={i % 3 === 0 ? '#cc4444' : i % 3 === 1 ? '#44aa44' : '#4444cc'}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                    </group>
                );
            })}

            {/* Edge — glowing border */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[33, 35, 64]} />
                <meshBasicMaterial color={PURPUR} transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

/* ─────────────── TECH PROPS — scattered around ─────────────── */

function TechProps() {
    const items = useMemo(() => {
        const props: { type: string; pos: [number, number, number]; rot: number; scale: number }[] = [];
        for (let i = 0; i < 18; i++) {
            const a = Math.random() * Math.PI * 2;
            const r = 6 + Math.random() * 20;
            props.push({
                type: ['monitor', 'cpu', 'usb', 'chip'][i % 4],
                pos: [Math.cos(a) * r, 0, Math.sin(a) * r],
                rot: Math.random() * Math.PI * 2,
                scale: 0.6 + Math.random() * 0.5,
            });
        }
        return props;
    }, []);

    return (
        <group>
            {items.map((item, i) => (
                <group key={i} position={item.pos} rotation={[0, item.rot, 0]} scale={item.scale}>
                    {item.type === 'monitor' && <Monitor />}
                    {item.type === 'cpu' && <CPU />}
                    {item.type === 'usb' && <USB />}
                    {item.type === 'chip' && <Chip />}
                </group>
            ))}
        </group>
    );
}

function Monitor() {
    return (
        <group>
            {/* Screen */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[1.6, 1, 0.1]} />
                <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Screen glow */}
            <mesh position={[0, 1.2, 0.06]}>
                <planeGeometry args={[1.4, 0.85]} />
                <meshBasicMaterial color="#0a1628" />
            </mesh>
            {/* Code lines on screen */}
            {[0, 1, 2, 3, 4].map((line) => (
                <mesh key={line} position={[-0.15, 1.45 - line * 0.17, 0.07]}>
                    <planeGeometry args={[0.5 + Math.random() * 0.6, 0.06]} />
                    <meshBasicMaterial color={line % 2 === 0 ? CIRCUIT_GREEN : '#66bbff'} transparent opacity={0.7} />
                </mesh>
            ))}
            {/* Stand */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.15, 0.8, 0.15]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[0.8, 0.1, 0.5]} />
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
            </mesh>
            <pointLight position={[0, 1.2, 0.5]} color="#0066ff" intensity={0.5} distance={4} />
        </group>
    );
}

function CPU() {
    return (
        <group>
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Heat sink fins */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={i} position={[0, 0.65, -0.3 + i * 0.15]}>
                    <boxGeometry args={[0.7, 0.08, 0.04]} />
                    <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
                </mesh>
            ))}
            {/* Power LED */}
            <mesh position={[0.35, 0.15, 0.41]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#00ff44" />
            </mesh>
            <pointLight position={[0.35, 0.15, 0.5]} color="#00ff44" intensity={0.3} distance={2} />
        </group>
    );
}

function USB() {
    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.25, 0.8, 0.12]} />
                <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.95, 0]}>
                <boxGeometry args={[0.2, 0.15, 0.08]} />
                <meshStandardMaterial color="#ddd" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.3, 0.15, 0.15]} />
                <meshStandardMaterial color={PURPUR} emissive={PURPUR} emissiveIntensity={0.3} />
            </mesh>
        </group>
    );
}

function Chip() {
    return (
        <group>
            <mesh position={[0, 0.08, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.6]} />
                <meshStandardMaterial color="#111" roughness={0.4} metalness={0.8} />
            </mesh>
            {/* Pins */}
            {Array.from({ length: 6 }).map((_, i) => (
                <group key={i}>
                    <mesh position={[-0.35, 0.06, -0.2 + i * 0.08]}>
                        <boxGeometry args={[0.12, 0.02, 0.03]} />
                        <meshStandardMaterial color="#ccc" metalness={0.95} roughness={0.05} />
                    </mesh>
                    <mesh position={[0.35, 0.06, -0.2 + i * 0.08]}>
                        <boxGeometry args={[0.12, 0.02, 0.03]} />
                        <meshStandardMaterial color="#ccc" metalness={0.95} roughness={0.05} />
                    </mesh>
                </group>
            ))}
            {/* Top marking */}
            <mesh position={[0, 0.14, 0]}>
                <boxGeometry args={[0.3, 0.01, 0.3]} />
                <meshBasicMaterial color={CIRCUIT_GREEN} transparent opacity={0.4} />
            </mesh>
        </group>
    );
}

/* ─────────────── END CITY TOWER ─────────────── */

function EndCityTower({
    data,
    onApproach,
}: {
    data: (typeof TOWERS)[0];
    onApproach: (id: string | null) => void;
}) {
    const crystalRef = useRef<THREE.Mesh>(null);
    const wasNear = useRef(false);

    useFrame(({ clock, camera }) => {
        if (crystalRef.current) {
            crystalRef.current.rotation.y += 0.025;
            crystalRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.2;
            crystalRef.current.position.y = data.height + 2.5 + Math.sin(clock.getElapsedTime() * 1.2) * 0.4;
        }
        const dist = camera.position.distanceTo(new THREE.Vector3(data.position[0], 0, data.position[2]));
        const isNear = dist < 6;
        if (isNear !== wasNear.current) {
            wasNear.current = isNear;
            onApproach(isNear ? data.id : null);
        }
    });

    const towerColor = new THREE.Color(data.color);

    return (
        <group position={data.position}>
            {/* Main tower body — purpur blocks with tech accent stripes */}
            {Array.from({ length: data.height }).map((_, i) => {
                const isAccent = i % 4 === 0;
                const w = 2.8 - (i / data.height) * 0.6; // taper slightly
                return (
                    <mesh key={i} position={[0, i + 0.5, 0]} castShadow>
                        <boxGeometry args={[w, 1.02, w]} />
                        <meshStandardMaterial
                            color={isAccent ? '#2a1a3e' : i % 2 === 0 ? PURPUR_D : PURPUR}
                            emissive={isAccent ? data.color : PURPUR}
                            emissiveIntensity={isAccent ? 0.4 : 0.08}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </mesh>
                );
            })}

            {/* Tech strip — glowing circuit line up the tower */}
            <mesh position={[1.45, data.height / 2, 0]}>
                <boxGeometry args={[0.04, data.height, 0.04]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.6} />
            </mesh>
            <mesh position={[-1.45, data.height / 2, 0]}>
                <boxGeometry args={[0.04, data.height, 0.04]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.6} />
            </mesh>

            {/* Window lights — data flowing */}
            {Array.from({ length: Math.floor(data.height / 3) }).map((_, i) => (
                <mesh key={`win-${i}`} position={[1.2, 2 + i * 3, 0]}>
                    <boxGeometry args={[0.05, 0.4, 0.6]} />
                    <meshBasicMaterial color={data.color} transparent opacity={0.5} />
                </mesh>
            ))}

            {/* Top crown — End City style stepped top */}
            <mesh position={[0, data.height + 0.3, 0]}>
                <boxGeometry args={[3.2, 0.3, 3.2]} />
                <meshStandardMaterial color={PURPUR_L} emissive={PURPUR} emissiveIntensity={0.15} roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, data.height + 0.6, 0]}>
                <boxGeometry args={[2.2, 0.3, 2.2]} />
                <meshStandardMaterial color={PURPUR_L} emissive={data.color} emissiveIntensity={0.1} roughness={0.3} metalness={0.6} />
            </mesh>

            {/* Floating crystal — tech orb */}
            <mesh ref={crystalRef} position={[0, data.height + 2.5, 0]}>
                <octahedronGeometry args={[0.7, 1]} />
                <meshStandardMaterial
                    color={towerColor}
                    emissive={towerColor}
                    emissiveIntensity={3}
                    transparent opacity={0.9}
                    roughness={0.05}
                    metalness={0.3}
                />
            </mesh>

            {/* Crystal glow */}
            <pointLight position={[0, data.height + 2.5, 0]} color={data.color} intensity={4} distance={14} />
            <pointLight position={[0, data.height + 3.5, 0]} color="#ffffff" intensity={0.4} distance={6} />

            {/* Light beam */}
            <mesh position={[0, data.height + 12, 0]}>
                <cylinderGeometry args={[0.02, 0.1, 18, 6]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.1} />
            </mesh>

            {/* Label above door */}
            <Suspense fallback={null}>
                <Text
                    position={[0, 3.2, 1.6]}
                    fontSize={0.28}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                    outlineWidth={0.02}
                    outlineColor="#0a0015"
                >
                    {data.label}
                </Text>
                <Text
                    position={[0, 2.5, 1.6]}
                    fontSize={0.12}
                    color={data.color}
                    anchorX="center"
                    anchorY="middle"
                    font={PIXEL_FONT}
                >
                    {data.summary}
                </Text>
            </Suspense>

            {/* Entrance glow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2.5]}>
                <circleGeometry args={[1.2, 16]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.2} />
            </mesh>

            {/* Base glow ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[1.8, 2.2, 16]} />
                <meshBasicMaterial color={data.color} transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

/* ─────────────── DATA PARTICLES ─────────────── */

function DataParticles() {
    const ref = useRef<THREE.Points>(null);

    const geom = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const count = 600;
        const pos = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 70;
            pos[i * 3 + 1] = Math.random() * 30 + 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
            const t = Math.random();
            if (t < 0.33) { // green (circuit)
                colors[i * 3] = 0; colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; colors[i * 3 + 2] = 0.4;
            } else if (t < 0.66) { // purple (end)
                colors[i * 3] = 0.6 + Math.random() * 0.3; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.8;
            } else { // blue (data)
                colors[i * 3] = 0.2; colors[i * 3 + 1] = 0.5; colors[i * 3 + 2] = 1;
            }
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
            positions.setY(i, y > 30 ? 0.5 : y + 0.006 + Math.sin(i * 0.3) * 0.003);
        }
        positions.needsUpdate = true;
        ref.current.rotation.y = clock.getElapsedTime() * 0.012;
    });

    return (
        <points ref={ref} geometry={geom}>
            <pointsMaterial size={0.12} vertexColors transparent opacity={0.8} sizeAttenuation />
        </points>
    );
}

/* ─────────────── SERVER HUB (center) ─────────────── */

function ServerHub() {
    const rackRef = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (rackRef.current) {
            rackRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group position={[0, 0.05, 0]}>
            {/* Central server rack — rotating */}
            <group ref={rackRef}>
                {Array.from({ length: 4 }).map((_, i) => {
                    const ang = (i / 4) * Math.PI * 2;
                    return (
                        <group key={i} position={[Math.cos(ang) * 2, 0, Math.sin(ang) * 2]} rotation={[0, -ang, 0]}>
                            {/* Server unit */}
                            <mesh position={[0, 1.2, 0]}>
                                <boxGeometry args={[1.2, 2.2, 0.5]} />
                                <meshStandardMaterial color="#0a0a1a" roughness={0.3} metalness={0.9} />
                            </mesh>
                            {/* Blinking LEDs */}
                            {Array.from({ length: 6 }).map((_, j) => (
                                <mesh key={j} position={[-0.3 + j * 0.12, 0.5 + Math.floor(j / 3) * 0.3, 0.26]}>
                                    <sphereGeometry args={[0.025, 6, 6]} />
                                    <meshBasicMaterial color={j % 3 === 0 ? '#00ff44' : j % 3 === 1 ? '#ffaa00' : '#ff4444'} />
                                </mesh>
                            ))}
                            {/* Screen stripe */}
                            <mesh position={[0, 1.5, 0.26]}>
                                <planeGeometry args={[0.9, 0.3]} />
                                <meshBasicMaterial color="#001133" />
                            </mesh>
                            <mesh position={[-0.1, 1.55, 0.27]}>
                                <planeGeometry args={[0.4, 0.04]} />
                                <meshBasicMaterial color={CIRCUIT_GREEN} transparent opacity={0.8} />
                            </mesh>
                            <mesh position={[0.05, 1.45, 0.27]}>
                                <planeGeometry args={[0.5, 0.04]} />
                                <meshBasicMaterial color="#66bbff" transparent opacity={0.6} />
                            </mesh>
                        </group>
                    );
                })}
            </group>

            {/* Center glow */}
            <pointLight position={[0, 2, 0]} color={PURPUR} intensity={3} distance={10} />
            <pointLight position={[0, 0.5, 0]} color={CIRCUIT_GREEN} intensity={1.5} distance={6} />

            {/* Holographic beam */}
            <mesh position={[0, 8, 0]}>
                <cylinderGeometry args={[0.03, 0.2, 14, 8]} />
                <meshBasicMaterial color={PURPUR} transparent opacity={0.06} />
            </mesh>
        </group>
    );
}

/* ─────────────── PLAYER CONTROLLER (FPS) ─────────────── */

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
        camera.position.set(0, 2.5, 10);
        euler.current.set(-0.1, Math.PI, 0);
        camera.quaternion.setFromEuler(euler.current);
    }, [camera]);

    useEffect(() => {
        const canvas = gl.domElement;
        const onClick = () => canvas.requestPointerLock();
        const onMouseMove = (e: MouseEvent) => {
            if (document.pointerLockElement !== canvas) return;
            euler.current.y -= e.movementX * 0.002;
            euler.current.x -= e.movementY * 0.002;
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
        const dir = new THREE.Vector3();

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
            const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, euler.current.y, 0));
            const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, euler.current.y, 0));
            const move = new THREE.Vector3().addScaledVector(right, dir.x).addScaledVector(forward, -dir.z);
            move.y = 0;
            velocity.current.addScaledVector(move, speed * delta);
        }

        velocity.current.multiplyScalar(0.85);
        const newPos = camera.position.clone().add(velocity.current.clone().multiplyScalar(delta * 60));
        const dist = Math.sqrt(newPos.x * newPos.x + newPos.z * newPos.z);
        if (dist > 32) { newPos.x *= 32 / dist; newPos.z *= 32 / dist; }
        newPos.y = 2.5;
        camera.position.copy(newPos);
    });

    return null;
}

/* ─────────────── MOBILE JOYSTICK ─────────────── */

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
            const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxR);
            const angle = Math.atan2(dy, dx);
            if (knobRef.current) knobRef.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
            onMove((Math.cos(angle) * dist) / maxR, -(Math.sin(angle) * dist) / maxR);
        }
    }, [onMove]);

    const handleEnd = useCallback(() => {
        touchId.current = null;
        if (knobRef.current) knobRef.current.style.transform = 'translate(0,0)';
        onMove(0, 0);
    }, [onMove]);

    return (
        <div ref={baseRef} className="absolute bottom-8 left-8 w-28 h-28 rounded-full border-2 border-purple-500/30 bg-purple-900/20 backdrop-blur-md flex items-center justify-center touch-none select-none z-50"
            onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd} onTouchCancel={handleEnd}>
            <div ref={knobRef} className="w-12 h-12 rounded-full bg-purple-400/30 border border-purple-400/50" />
        </div>
    );
}

/* ─────────────── PROJECT DETAIL OVERLAY ─────────────── */

function ProjectDetail({ data, onClose }: { data: (typeof TOWERS)[0]; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto mx-4 rounded-2xl border p-6 md:p-8"
                style={{ backgroundColor: '#0a0a1aee', borderColor: `${data.color}40`, boxShadow: `0 0 60px ${data.color}20` }}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition">✕</button>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{data.emoji}</span>
                    <div>
                        <h2 className="text-2xl font-extrabold text-white">{data.label}</h2>
                        <p className="text-sm" style={{ color: data.color }}>{data.summary}</p>
                    </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{data.description}</p>
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
                <div>
                    <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                        {data.tech.map((t) => (
                            <span key={t} className="px-3 py-1 text-xs rounded-full border text-white" style={{ borderColor: `${data.color}50` }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function CreativeWorld() {
    const navigate = useNavigate();
    const [nearTower, setNearTower] = useState<string | null>(null);
    const [openTower, setOpenTower] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const keysRef = useRef<Record<string, boolean>>({});
    const [joystick, setJoystick] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const onDown = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = true; };
        const onUp = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false; };
        window.addEventListener('keydown', onDown);
        window.addEventListener('keyup', onUp);
        return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
    }, []);

    const handleJoystick = useCallback((x: number, y: number) => setJoystick({ x, y }), []);
    const nearData = nearTower ? TOWERS.find((t) => t.id === nearTower) : null;
    const openData = openTower ? TOWERS.find((t) => t.id === openTower) : null;

    return (
        <div className="fixed inset-0 bg-black w-full h-full z-[9999]">
            <Canvas camera={{ fov: 60, near: 0.1, far: 300 }} style={{ width: '100%', height: '100%' }} gl={{ antialias: true, alpha: false }}>
                {/* Deep purple-black sky */}
                <color attach="background" args={['#080012']} />
                <fog attach="fog" args={['#080012', 40, 110]} />

                {/* Vibrant lighting */}
                <ambientLight intensity={0.35} color="#9966cc" />
                <directionalLight position={[8, 25, 8]} intensity={0.5} color="#ddaaff" />
                <directionalLight position={[-10, 15, -8]} intensity={0.2} color="#ff66cc" />
                <pointLight position={[0, 20, 0]} intensity={0.8} color="#9933cc" />

                {/* Dense star field */}
                <Stars radius={100} depth={60} count={4000} factor={3} saturation={0.4} fade speed={0.6} />

                {/* Ground — circuit board */}
                <TechGround />

                {/* Center server hub */}
                <ServerHub />

                {/* End City Towers */}
                {TOWERS.map((tower) => (
                    <EndCityTower key={tower.id} data={tower} onApproach={setNearTower} />
                ))}

                {/* Tech props scattered around */}
                <TechProps />

                {/* Data particles */}
                <DataParticles />

                {/* Player */}
                <PlayerController keys={keysRef.current} joystick={joystick} />
            </Canvas>

            {/* HUD — Back */}
            <button onClick={() => navigate('/')}
                className="absolute top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/40 backdrop-blur-md border border-purple-500/30 text-white text-sm font-medium hover:bg-purple-800/50 transition-all">
                ← Back to Portfolio
            </button>

            {/* Title */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
                <h1 className="text-white text-lg md:text-2xl font-bold tracking-wider" style={{ textShadow: '0 0 20px #00ff8844, 0 0 40px #9933cc44' }}>
                    ⚡ Tech End City — Devansh's World
                </h1>
                <p className="text-purple-300/50 text-xs mt-1">Walk to a tower · Click to look · Enter to explore</p>
            </div>

            {/* Controls */}
            {!isMobile && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    <div className="px-5 py-3 rounded-xl bg-[#0a0a1a]/60 backdrop-blur-md border border-purple-500/20 text-white text-sm flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">W</kbd>
                            <div className="flex gap-1">
                                <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">A</kbd>
                                <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">S</kbd>
                                <kbd className="px-2 py-0.5 rounded bg-purple-800/60 text-xs font-mono">D</kbd>
                            </div>
                        </div>
                        <span className="text-purple-300/70">move</span>
                        <span className="text-purple-300/30">•</span>
                        <span className="text-purple-300/70">click + mouse to look</span>
                    </div>
                </div>
            )}

            {isMobile && <MobileJoystick onMove={handleJoystick} />}

            {/* Tower approach prompt */}
            {nearData && !openTower && (
                <div className="absolute bottom-8 right-6 z-50 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-5 rounded-xl backdrop-blur-md border text-white" style={{ backgroundColor: '#0a0a1a99', borderColor: `${nearData.color}40` }}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{nearData.emoji}</span>
                            <h3 className="text-lg font-bold" style={{ color: nearData.color }}>{nearData.label}</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{nearData.summary}</p>
                        <button onClick={() => setOpenTower(nearData.id)}
                            className="w-full py-2 rounded-lg text-sm font-semibold text-white transition-all"
                            style={{ backgroundColor: `${nearData.color}30`, border: `1px solid ${nearData.color}50` }}>
                            ⏎ Enter Tower
                        </button>
                    </div>
                </div>
            )}

            {openData && <ProjectDetail data={openData} onClose={() => setOpenTower(null)} />}
        </div>
    );
}
