import { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, PerspectiveCamera, Float, Environment, MeshReflectorMaterial, Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ArrowLeft, Mic2, Users, Play, Pause, SkipBack, SkipForward, Volume2, Instagram, Youtube, BookOpen, ChevronRight, Music } from 'lucide-react';

/* ─── TRACK LIST ─── */
const TRACKS = [
    { id: 1, title: 'Kalm', artist: 'Devansh Datta', src: '/songs/Kalm.mp3', duration: '—' },
    { id: 2, title: 'Kithe Duur', artist: 'Devansh Datta', src: '/songs/Kithe Duur.mp3', duration: '—' },
    { id: 3, title: 'Na Jaane Kyu', artist: 'Devansh Datta', src: '/songs/Na Jaane Kyu.mp3', duration: '—' },
];

/* ─── THEME ─── */
const T = {
    bg: '#080a12',
    indigo: '#818cf8',
    violet: '#a78bfa',
    cyan: '#67e8f9',
    gold: '#fde68a',
    rose: '#fb7185',
    surface: '#1a2235',
    wall: '#151e35',
    pillar: '#1e2845',
    floor: '#0a0e18',
};

/* ─── CAMERA STATIONS ─── */
const STATIONS = [
    { id: 'hall', label: 'Overview', cam: [0, 8, 22] as const, look: [0, 3, -10] as const },
    { id: 'stage', label: 'Main Stage', cam: [0, 4, 8] as const, look: [0, 5, -25] as const },
    { id: 'lounge', label: 'Social Lounge', cam: [-18, 6, -5] as const, look: [-28, 4, -20] as const },
    { id: 'archive', label: 'Archive Wing', cam: [18, 6, -5] as const, look: [28, 4, -20] as const },
];

/* ─── SMOOTH CAMERA RIG ─── */
function CameraRig({ target, lookAt: look }: { target: readonly number[]; lookAt: readonly number[] }) {
    const posVec = useMemo(() => new THREE.Vector3(), []);
    const lookVec = useMemo(() => new THREE.Vector3(), []);
    const currentLook = useMemo(() => new THREE.Vector3(look[0], look[1], look[2]), []);

    useFrame(({ camera }) => {
        posVec.set(target[0], target[1], target[2]);
        lookVec.set(look[0], look[1], look[2]);
        camera.position.lerp(posVec, 0.035);
        currentLook.lerp(lookVec, 0.035);
        camera.lookAt(currentLook);
    });
    return null;
}

/* ─── FLOATING DUST PARTICLES ─── */
function DustParticles({ count = 200 }: { count?: number }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const speeds = useMemo(() => Array.from({ length: count }, () => 0.1 + Math.random() * 0.4), [count]);
    const positions = useMemo(() => {
        return Array.from({ length: count }, () => [
            (Math.random() - 0.5) * 60,
            Math.random() * 20,
            (Math.random() - 0.5) * 60 - 10,
        ]);
    }, [count]);

    useFrame(({ clock }) => {
        if (!mesh.current) return;
        const t = clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            const [x, y, z] = positions[i];
            dummy.position.set(
                x + Math.sin(t * speeds[i] + i) * 0.5,
                (y + t * speeds[i] * 0.3) % 20,
                z + Math.cos(t * speeds[i] + i) * 0.5
            );
            dummy.scale.setScalar(0.015 + Math.sin(t + i) * 0.005);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color={T.gold} transparent opacity={0.4} />
        </instancedMesh>
    );
}

/* ─── THE HALL ─── */
function HallStructure() {
    return (
        <group>
            {/* ── FLOOR ── */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[80, 80]} />
                <MeshReflectorMaterial
                    mirror={0.5}
                    blur={[400, 200]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={80}
                    roughness={0.7}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color={T.floor}
                    metalness={0.8}
                />
            </mesh>

            {/* ── BACK WALL ── */}
            <mesh position={[0, 15, -40]} receiveShadow>
                <planeGeometry args={[80, 30]} />
                <meshStandardMaterial color={T.wall} roughness={0.9} metalness={0.1} />
            </mesh>

            {/* ── SIDE WALLS ── */}
            <mesh position={[-40, 15, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[80, 30]} />
                <meshStandardMaterial color={T.wall} roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh position={[40, 15, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[80, 30]} />
                <meshStandardMaterial color={T.wall} roughness={0.9} metalness={0.1} />
            </mesh>

            {/* ── CEILING ── */}
            <mesh position={[0, 30, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[80, 80]} />
                <meshStandardMaterial color="#060810" roughness={1} />
            </mesh>

            {/* ── PILLARS (detailed) ── */}
            {[-25, -15, 15, 25].map((x) =>
                [-5, -20, -35].map((z, zi) => (
                    <group key={`${x}-${zi}`} position={[x, 0, z]}>
                        {/* Base */}
                        <mesh position={[0, 0.5, 0]} castShadow>
                            <cylinderGeometry args={[1.2, 1.4, 1, 16]} />
                            <meshStandardMaterial color={T.pillar} roughness={0.3} metalness={0.7} />
                        </mesh>
                        {/* Shaft */}
                        <mesh position={[0, 13, 0]} castShadow>
                            <cylinderGeometry args={[0.8, 0.8, 24, 16]} />
                            <meshStandardMaterial color={T.pillar} roughness={0.4} metalness={0.6} />
                        </mesh>
                        {/* Capital */}
                        <mesh position={[0, 25.5, 0]} castShadow>
                            <cylinderGeometry args={[1.4, 1, 1, 16]} />
                            <meshStandardMaterial color={T.pillar} roughness={0.3} metalness={0.7} />
                        </mesh>
                        {/* Uplight */}
                        <pointLight
                            position={[0, 2, 0]}
                            intensity={8}
                            color={T.indigo}
                            distance={20}
                            decay={2}
                        />
                    </group>
                ))
            )}

            {/* ── WALL SCONCES (ambient light strips) ── */}
            {[-39.5, 39.5].map((x) =>
                [-10, -25].map((z, i) => (
                    <group key={`sconce-${x}-${i}`} position={[x, 8, z]}>
                        <mesh>
                            <boxGeometry args={[0.3, 4, 0.3]} />
                            <meshStandardMaterial
                                color={T.indigo}
                                emissive={T.indigo}
                                emissiveIntensity={2}
                                toneMapped={false}
                            />
                        </mesh>
                        <pointLight position={[x > 0 ? -1 : 1, 0, 0]} intensity={4} color={T.indigo} distance={12} decay={2} />
                    </group>
                ))
            )}
        </group>
    );
}

/* ─── SEATING ROWS ─── */
function AuditoriumSeating() {
    // Pre-compute which seats have audience (deterministic)
    const occupied = useMemo(() => {
        const map: Record<string, boolean> = {};
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 10; col++) {
                // ~65% occupancy, deterministic based on position
                map[`${row}-${col}`] = Math.sin(row * 17 + col * 31) > -0.3;
            }
        }
        return map;
    }, []);

    return (
        <group position={[0, 0, 8]}>
            {[0, 1, 2, 3].map((row) => (
                <group key={row} position={[0, row * 0.3, row * 3.5]}>
                    {Array.from({ length: 10 }, (_, col) => {
                        const hasAudience = occupied[`${row}-${col}`];
                        // Vibrant outfit colors
                        const outfitColors = [
                            '#e74c3c', '#3498db', '#2ecc71', '#e67e22', '#9b59b6',
                            '#1abc9c', '#f1c40f', '#e84393', '#00cec9', '#6c5ce7',
                            '#fd79a8', '#00b894', '#fdcb6e', '#74b9ff', '#a29bfe',
                        ];
                        const skinTones = ['#d4a574', '#c49a6c', '#e0b896', '#b8886e', '#f0c8a0'];
                        const colorIdx = (row * 7 + col * 13) % outfitColors.length;
                        const skinIdx = (row * 3 + col * 11) % skinTones.length;
                        return (
                            <group key={col} position={[(col - 4.5) * 3.2, 0, 0]}>
                                {/* Seat base */}
                                <mesh position={[0, 0.4, 0]} castShadow>
                                    <boxGeometry args={[1.4, 0.8, 1.2]} />
                                    <meshStandardMaterial color="#1a2035" roughness={0.6} metalness={0.4} />
                                </mesh>
                                {/* Seat back */}
                                <mesh position={[0, 1.2, 0.5]} castShadow>
                                    <boxGeometry args={[1.4, 1.2, 0.15]} />
                                    <meshStandardMaterial color="#1e2740" roughness={0.5} metalness={0.3} />
                                </mesh>
                                {/* Audience Figure */}
                                {hasAudience && (
                                    <group position={[0, 0.8, 0]}>
                                        {/* Body (torso) */}
                                        <mesh position={[0, 0.7, 0]} castShadow>
                                            <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
                                            <meshStandardMaterial color={outfitColors[colorIdx]} roughness={0.8} />
                                        </mesh>
                                        {/* Head */}
                                        <mesh position={[0, 1.6, 0]} castShadow>
                                            <sphereGeometry args={[0.25, 8, 8]} />
                                            <meshStandardMaterial color={skinTones[skinIdx]} roughness={0.7} />
                                        </mesh>
                                    </group>
                                )}
                            </group>
                        );
                    })}
                </group>
            ))}
        </group>
    );
}

/* ─── THE MAIN STAGE ─── */
const SCREEN_COLORS = ['#818cf8', '#a78bfa', '#67e8f9', '#fb7185', '#fde68a', '#34d399'];

function MainStage({
    isPlaying,
    track,
    progress,
    currentTime,
    duration,
    togglePlay,
    seekTo,
    skipTrack,
    currentTrackIdx,
    totalTracks
}: {
    isPlaying: boolean;
    track: { title: string; artist: string; src: string };
    progress: number;
    currentTime: string;
    duration: string;
    togglePlay: () => void;
    seekTo: (e: React.MouseEvent<HTMLDivElement>) => void;
    skipTrack: (dir: 1 | -1) => void;
    currentTrackIdx: number;
    totalTracks: number;
}) {
    const barsRef = useRef<THREE.Group>(null);
    const screenRef = useRef<THREE.Mesh>(null);
    const colorIdx = useRef(0);
    const colorT = useRef(0);
    const currentColor = useRef(new THREE.Color(SCREEN_COLORS[0]));
    const nextColor = useRef(new THREE.Color(SCREEN_COLORS[1]));

    useFrame(({ clock }, delta) => {
        const t = clock.getElapsedTime();
        const speed = isPlaying ? 1.0 : 0.25;
        const amp = isPlaying ? 1.0 : 0.15;

        if (barsRef.current) {
            barsRef.current.children.forEach((bar, i) => {
                const h = Math.sin(t * 2.5 * speed + i * 0.15) * 1.5 * amp
                    + Math.cos(t * 4 * speed + i * 0.08) * 0.8 * amp + (isPlaying ? 2.5 : 0.4);
                bar.scale.y = Math.max(0.05, h);
                const mat = (bar as THREE.Mesh).material as THREE.MeshStandardMaterial;
                mat.emissiveIntensity = isPlaying ? h * 0.9 : 0.2;
                // Color-shift bars through screen color
                mat.emissive.lerp(currentColor.current, 0.05);
                mat.color.lerp(currentColor.current, 0.05);
            });
        }

        if (screenRef.current) {
            const mat = screenRef.current.material as THREE.MeshStandardMaterial;
            if (isPlaying) {
                // Cycle screen through colors
                colorT.current += delta * 0.4;
                if (colorT.current >= 1) {
                    colorT.current = 0;
                    colorIdx.current = (colorIdx.current + 1) % SCREEN_COLORS.length;
                    currentColor.current.set(SCREEN_COLORS[colorIdx.current]);
                    nextColor.current.set(SCREEN_COLORS[(colorIdx.current + 1) % SCREEN_COLORS.length]);
                }
                const blended = currentColor.current.clone().lerp(nextColor.current, colorT.current);
                mat.emissive.lerp(blended, 0.04);
                mat.emissiveIntensity = 0.18 + Math.sin(t * 2) * 0.06;
            } else {
                mat.emissive.lerp(new THREE.Color(T.indigo), 0.05);
                mat.emissiveIntensity = 0.06 + Math.sin(t * 0.8) * 0.02;
            }
        }
    });

    return (
        <group position={[0, 0, -28]}>
            {/* Stage Platform (2-tier) */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
                <boxGeometry args={[34, 0.8, 16]} />
                <meshStandardMaterial color="#0e1225" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
                <boxGeometry args={[28, 0.8, 12]} />
                <meshStandardMaterial color="#111733" roughness={0.2} metalness={0.9} />
            </mesh>
            {/* Glowing Stage Edge */}
            <mesh position={[0, 0.05, 8]}>
                <boxGeometry args={[34, 0.1, 0.1]} />
                <meshStandardMaterial color={T.indigo} emissive={T.indigo} emissiveIntensity={5} toneMapped={false} />
            </mesh>

            {/* LED Backdrop Screen */}
            <mesh ref={screenRef} position={[0, 12, -7.5]}>
                <planeGeometry args={[30, 16]} />
                <meshStandardMaterial color="#000408" emissive={T.indigo} emissiveIntensity={0.12} roughness={0} metalness={1} />
            </mesh>
            {/* Screen Frame */}
            <mesh position={[0, 12, -7.6]}>
                <boxGeometry args={[30.5, 16.5, 0.3]} />
                <meshStandardMaterial color="#0a0e1a" roughness={0.2} metalness={0.9} />
            </mesh>

            {/* ═══ 3D SCREEN MUSIC PLAYER ═══ */}
            <AnimatePresence>
                <Html
                    transform
                    position={[0, 12.5, -7.42]}
                    scale={0.75}
                    center
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-auto"
                        style={{ width: '420px' }}
                    >
                        <div className="rounded-[32px] bg-[#0c0f16] border border-white/[0.05] p-6 shadow-2xl shadow-black/80 w-full">
                            {/* Album Art Area */}
                            <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-[#12121e] mb-6 shadow-inner flex items-center justify-center">
                                {/* Procedural concert lighting visual instead of just an image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 via-black to-blue-900/40" />
                                <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_0%,_rgba(79,70,229,0.3),_transparent_60%)] animate-pulse mix-blend-screen" />
                                {isPlaying && (
                                    <div className="absolute top-[20%] right-[10%] w-40 h-40 bg-[radial-gradient(circle,_rgba(56,189,248,0.4),_transparent_70%)] animate-ping mix-blend-screen" style={{ animationDuration: '3s' }} />
                                )}

                                {/* Grain overlay */}
                                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                                {/* Volume Button Overlay */}
                                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-black/60 transition-colors z-10">
                                    <Volume2 className="w-4 h-4 text-white/80" />
                                </button>

                                {/* Animated Visualizer inside Art when playing */}
                                <Music className={`w-16 h-16 text-indigo-200/60 drop-shadow-2xl transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`} />
                            </div>

                            {/* Track Info */}
                            <div className="px-2 mb-6 text-left">
                                <h3 className="text-white font-bold text-[22px] truncate tracking-tight mb-1">
                                    {track.title}
                                </h3>
                                <p className="text-white/50 text-sm truncate font-medium">
                                    {track.artist}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="px-2 mb-6">
                                <div
                                    className="w-full h-1 rounded-full bg-white/[0.1] cursor-pointer group mb-3 relative flex items-center"
                                    onClick={seekTo}
                                >
                                    <div
                                        className="h-full rounded-full bg-white relative transition-all duration-100"
                                        style={{ width: `${progress}%` }}
                                    >
                                        {/* Thumb */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-medium text-white/40 tracking-wider">
                                    <span>{currentTime}</span>
                                    <span>-{duration.replace('0:', '')}</span>
                                </div>
                            </div>

                            {/* Playback Controls */}
                            <div className="flex items-center justify-center gap-10 mb-2">
                                <button
                                    onClick={() => skipTrack(-1)}
                                    className="text-white/60 hover:text-white transition-colors disabled:opacity-20 hover:scale-110 active:scale-95"
                                    disabled={currentTrackIdx === 0}
                                >
                                    <SkipBack className="w-6 h-6 fill-current" />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                >
                                    {isPlaying
                                        ? <Pause className="w-10 h-10 fill-current" />
                                        : <Play className="w-10 h-10 fill-current ml-1" />
                                    }
                                </button>
                                <button
                                    onClick={() => skipTrack(1)}
                                    className="text-white/60 hover:text-white transition-colors disabled:opacity-20 hover:scale-110 active:scale-95"
                                    disabled={currentTrackIdx === totalTracks - 1}
                                >
                                    <SkipForward className="w-6 h-6 fill-current" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </Html>
            </AnimatePresence>



            {/* Audio Visualization Bars */}
            <group ref={barsRef} position={[0, 5, -7.4]}>
                {Array.from({ length: 40 }, (_, i) => (
                    <mesh key={i} position={[(i - 19.5) * 0.7, 0, 0]}>
                        <boxGeometry args={[0.35, 1, 0.2]} />
                        <meshStandardMaterial
                            color={T.indigo}
                            emissive={T.indigo}
                            emissiveIntensity={1}
                            toneMapped={false}
                        />
                    </mesh>
                ))}
            </group>

            {/* Spotlights */}
            <spotLight position={[-8, 22, 5]} angle={0.25} penumbra={0.8} intensity={50} color="#c2c8ff" castShadow />
            <spotLight position={[8, 22, 5]} angle={0.25} penumbra={0.8} intensity={50} color="#c2c8ff" castShadow />
            <spotLight position={[0, 25, 0]} angle={0.5} penumbra={1} intensity={30} color={T.indigo} castShadow />
            <pointLight position={[0, 5, 5]} intensity={8} color={T.indigo} distance={25} decay={2} />
        </group>
    );
}

/* ─── SOCIAL CAROUSEL CARD ─── */
const SOCIALS = [
    { platform: 'Instagram', label: 'Instagram', handle: '@devansh.datta', color: '#e1306c', bg: '#1a0a0f', href: 'https://instagram.com/devansh.datta', emoji: '📸' },
    { platform: 'YouTube', label: 'YouTube', handle: '@devanshdatta', color: '#ff2d2d', bg: '#1a0808', href: 'https://youtube.com/@devanshdatta', emoji: '▶' },
    { platform: 'LinkedIn', label: 'LinkedIn', handle: 'in/devansh-datta06', color: '#0a9cf5', bg: '#06111a', href: 'https://www.linkedin.com/in/devansh-datta06', emoji: '💼' },
    { platform: 'GitHub', label: 'GitHub', handle: 'Devansh5150', color: '#a78bfa', bg: '#10090f', href: 'https://github.com/Devansh5150', emoji: '⌘' },
    { platform: 'Email', label: 'Email', handle: 'work.devansh.datta\n@gmail.com', color: '#34d399', bg: '#060f0a', href: 'mailto:work.devansh.datta@gmail.com', emoji: '✉' },
    { platform: 'Phone', label: 'Phone', handle: '+91 9871993246', color: '#fbbf24', bg: '#120f04', href: 'tel:+919871993246', emoji: '📱' },
    { platform: 'Linktree', label: 'Linktree', handle: 'linktr.ee/devansh.datta', color: '#43e660', bg: '#071209', href: 'https://linktr.ee/devansh.datta', emoji: '🌿' },
];

function SocialCarousel() {
    const ringRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);
    const velRef = useRef(0.18);
    const dragging = useRef(false);
    const lastX = useRef(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            if (!dragging.current) {
                velRef.current *= 0.96;
                angleRef.current += velRef.current;
                if (Math.abs(velRef.current) < 0.08) velRef.current = 0.18;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const onDown = (e: React.PointerEvent) => {
        dragging.current = true;
        lastX.current = e.clientX;
        velRef.current = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onMove = (e: React.PointerEvent) => {
        if (!dragging.current) return;
        const dx = e.clientX - lastX.current;
        velRef.current = dx * 0.4;
        angleRef.current += dx * 0.4;
        lastX.current = e.clientX;
    };
    const onUp = () => { dragging.current = false; };

    const n = SOCIALS.length;
    const radius = 310;

    return (
        <div
            style={{ width: '860px', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none', background: 'transparent' }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
        >
            <div style={{ perspective: '1400px', width: '860px', height: '460px', position: 'relative', background: 'transparent' }}>
                <div ref={ringRef} style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', background: 'transparent' }}>
                    {SOCIALS.map((s, i) => {
                        const rotY = (360 / n) * i;
                        return (
                            <div
                                key={s.platform}
                                style={{
                                    position: 'absolute',
                                    width: '200px',
                                    height: '280px',
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-100px',
                                    marginTop: '-140px',
                                    transform: `rotateY(${rotY}deg) translateZ(${radius}px)`,
                                    transformStyle: 'preserve-3d',
                                    backfaceVisibility: 'hidden',
                                    background: s.bg,
                                    border: `1px solid ${s.color}55`,
                                    borderRadius: '20px',
                                    padding: '20px',
                                    boxShadow: `0 0 24px ${s.color}33, inset 0 0 30px ${s.color}0a`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    gap: '10px',
                                    pointerEvents: 'auto',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => { e.stopPropagation(); window.open(s.href, '_blank'); }}
                            >
                                {/* Icon Block */}
                                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${s.color}22`, border: `1px solid ${s.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                                    {s.emoji}
                                </div>

                                {/* Title */}
                                <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '700', fontSize: '16px', letterSpacing: '0.03em', fontFamily: 'system-ui, sans-serif' }}>
                                    {s.label}
                                </div>

                                {/* Handle */}
                                <div style={{ color: s.color, fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.5', wordBreak: 'break-all', flex: 1 }}>
                                    {s.handle}
                                </div>

                                {/* Visit Button */}
                                <div style={{ width: '100%', padding: '10px 0', borderTop: `1px solid ${s.color}33`, color: s.color, fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>Visit</span>
                                    <span style={{ fontSize: '14px' }}>→</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ─── SOCIAL LOUNGE (LEFT WING) ─── */
function SocialLounge({ stationIdx }: { stationIdx: number }) {
    return (
        <group position={[-30, 0, -18]} rotation={[0, Math.PI / 6, 0]}>
            {/* Elevated Platform */}
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <boxGeometry args={[16, 2, 14]} />
                <meshStandardMaterial color="#0d1220" roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Glass Railing */}
            <mesh position={[0, 3.5, 7]}>
                <boxGeometry args={[16, 3, 0.15]} />
                <meshPhysicalMaterial color={T.cyan} transparent opacity={0.08} roughness={0} metalness={0.5} />
            </mesh>
            {/* Railing Glow */}
            <mesh position={[0, 2.1, 7]}>
                <boxGeometry args={[16, 0.08, 0.08]} />
                <meshStandardMaterial color={T.cyan} emissive={T.cyan} emissiveIntensity={4} toneMapped={false} />
            </mesh>

            {/* ─── 3D CARD RING CAROUSEL — hidden in Overview to avoid pillar clipping ─── */}
            {stationIdx !== 0 && (
                <Html
                    transform
                    position={[1, 5.5, 1]}
                    scale={0.75}
                    center
                    occlude
                    style={{ background: 'transparent' }}
                >
                    <SocialCarousel />
                </Html>
            )}

            <spotLight position={[0, 15, 5]} angle={0.4} penumbra={1} intensity={20} color={T.cyan} />
            <pointLight position={[0, 6, 3]} intensity={5} color={T.cyan} distance={15} decay={2} />
        </group>
    );
}


/* ─── ARCHIVE WING (RIGHT WING) ─── */
const BOOK_COLORS = [
    '#7c3aed', '#db2777', '#0891b2', '#059669', '#d97706',
    '#dc2626', '#2563eb', '#16a34a', '#9333ea', '#ea580c',
    '#0d9488', '#b45309', '#be123c', '#1d4ed8', '#15803d',
];

function ArchiveWing({ onRead }: { onRead: () => void }) {
    const manuscriptsRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!manuscriptsRef.current) return;
        const t = clock.getElapsedTime();
        manuscriptsRef.current.children.forEach((child, i) => {
            child.position.y = 5 + Math.sin(t * 0.8 + i * 0.8) * 0.4;
            child.rotation.y = Math.sin(t * 0.3 + i) * 0.15;
        });
    });

    // Generate shelf book data deterministically
    const books = useMemo(() => {
        const result = [];
        const shelves = [4, 7, 10, 13];
        for (const y of shelves) {
            let x = -6;
            let idx = 0;
            while (x < 6) {
                const w = 0.25 + ((idx * 17 + y * 7) % 10) * 0.04;
                const h = 1.2 + ((idx * 13 + y * 3) % 10) * 0.08;
                const color = BOOK_COLORS[(idx * 3 + y) % BOOK_COLORS.length];
                result.push({ x, y, w, h, color });
                x += w + 0.03;
                idx++;
            }
        }
        return result;
    }, []);

    return (
        <group position={[30, 0, -18]} rotation={[0, -Math.PI / 6, 0]}>
            {/* Elevated Platform */}
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <boxGeometry args={[16, 2, 14]} />
                <meshStandardMaterial color="#0d1220" roughness={0.3} metalness={0.7} />
            </mesh>

            {/* Bookcase Wall backing */}
            <mesh position={[0, 10, -6.5]} receiveShadow>
                <boxGeometry args={[14, 16, 1.5]} />
                <meshStandardMaterial color="#0a0f1a" roughness={0.8} metalness={0.2} />
            </mesh>

            {/* Shelf planks */}
            {[4, 7, 10, 13, 16].map((y) => (
                <mesh key={y} position={[0, y, -5.7]}>
                    <boxGeometry args={[13, 0.12, 0.85]} />
                    <meshStandardMaterial color="#1a2040" roughness={0.5} metalness={0.5} />
                </mesh>
            ))}

            {/* Actual Book Geometry on shelves */}
            {books.map((b, i) => (
                <mesh key={i} position={[b.x, b.y + b.h / 2 + 0.06, -5.75]} castShadow>
                    <boxGeometry args={[b.w, b.h, 0.6]} />
                    <meshStandardMaterial color={b.color} roughness={0.9} metalness={0.05} />
                </mesh>
            ))}

            {/* Scholar's Desk */}
            <group position={[0, 2, 3]}>
                {/* Desktop */}
                <mesh position={[0, 0.8, 0]} castShadow>
                    <boxGeometry args={[5, 0.12, 2.5]} />
                    <meshStandardMaterial color="#1c1a0e" roughness={0.8} metalness={0.1} />
                </mesh>
                {/* Desk Legs */}
                {[[-2.2, -1.1], [-2.2, 1.1], [2.2, -1.1], [2.2, 1.1]].map(([lx, lz], li) => (
                    <mesh key={li} position={[lx, 0.35, lz]}>
                        <boxGeometry args={[0.12, 0.7, 0.12]} />
                        <meshStandardMaterial color="#2a2310" roughness={0.7} metalness={0.3} />
                    </mesh>
                ))}
                {/* Open Book on desk */}
                <mesh position={[-0.5, 0.88, 0]} rotation={[0, 0.15, 0]}>
                    <boxGeometry args={[2.2, 0.04, 1.6]} />
                    <meshStandardMaterial color="#fef3c7" roughness={1} metalness={0} />
                </mesh>
                {/* Desk lamp */}
                <group position={[1.8, 0.88, -0.8]}>
                    <mesh position={[0, 0.6, 0]}>
                        <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
                        <meshStandardMaterial color="#334" roughness={0.3} metalness={0.9} />
                    </mesh>
                    <mesh position={[0, 1.3, 0]}>
                        <coneGeometry args={[0.3, 0.4, 12]} />
                        <meshStandardMaterial color="#2a2a10" roughness={0.5} metalness={0.4} emissive={T.gold} emissiveIntensity={0.4} />
                    </mesh>
                    <pointLight position={[0, 0.9, 0.3]} intensity={10} color={T.gold} distance={6} decay={2} />
                </group>
            </group>

            {/* Scholar's Chair */}
            <group position={[0, 2, 4.8]}>
                <mesh position={[0, 0.25, 0]} castShadow>
                    <boxGeometry args={[1.2, 0.08, 1.2]} />
                    <meshStandardMaterial color="#1a1408" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[0, 0.7, -0.55]} castShadow>
                    <boxGeometry args={[1.2, 0.9, 0.1]} />
                    <meshStandardMaterial color="#1a1408" roughness={0.8} metalness={0.1} />
                </mesh>
                {[[-0.5, -0.5], [-0.5, 0.5], [0.5, -0.5], [0.5, 0.5]].map(([cx, cz], ci) => (
                    <mesh key={ci} position={[cx, -0.1, cz]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
                        <meshStandardMaterial color="#2a2310" roughness={0.7} metalness={0.3} />
                    </mesh>
                ))}
            </group>

            {/* Floating Manuscripts */}
            <group ref={manuscriptsRef}>
                {[
                    { x: -4, label: 'Ch I' },
                    { x: -1.5, label: 'Ch II' },
                    { x: 1.5, label: 'Ch III' },
                    { x: 4, label: 'Ch IV' },
                ].map((m, i) => (
                    <group key={i} position={[m.x, 5, 0]} onClick={(e) => { e.stopPropagation(); onRead(); }}>
                        <mesh rotation={[0.3, 0, 0]} castShadow>
                            <boxGeometry args={[2, 2.8, 0.12]} />
                            <meshStandardMaterial color="#fef3c7" roughness={0.9} metalness={0} />
                        </mesh>
                        <Text position={[0, 0, 0.15]} fontSize={0.2} color="#78350f" anchorX="center" rotation={[0.3, 0, 0]}>
                            {m.label}
                        </Text>
                        <pointLight position={[0, 0, 1]} intensity={2} color={T.gold} distance={5} decay={2} />
                    </group>
                ))}
            </group>

            <spotLight position={[0, 18, 5]} angle={0.3} penumbra={1} intensity={20} color={T.violet} />
            <pointLight position={[0, 6, 3]} intensity={5} color={T.gold} distance={15} decay={2} />
        </group>
    );
}

/* ─── DYNAMIC STATION LIGHTING ─── */
const STATION_COLORS = [
    { ambient: '#d0d4ff', accent: '#818cf8' }, // Overview  — indigo
    { ambient: '#c8c0ff', accent: '#a78bfa' }, // Main Stage — violet
    { ambient: '#b0f0ff', accent: '#67e8f9' }, // Lounge — cyan
    { ambient: '#ffe8a0', accent: '#fde68a' }, // Archive — gold
];

function DynamicLighting({ stationIdx }: { stationIdx: number }) {
    const ambientRef = useRef<THREE.AmbientLight>(null);
    const accentRef = useRef<THREE.PointLight>(null);
    const targetAmbient = useMemo(() => new THREE.Color(STATION_COLORS[stationIdx].ambient), [stationIdx]);
    const targetAccent = useMemo(() => new THREE.Color(STATION_COLORS[stationIdx].accent), [stationIdx]);

    useFrame(() => {
        if (ambientRef.current) ambientRef.current.color.lerp(targetAmbient, 0.03);
        if (accentRef.current) accentRef.current.color.lerp(targetAccent, 0.03);
    });

    return (
        <>
            <ambientLight ref={ambientRef} intensity={1.2} color={STATION_COLORS[stationIdx].ambient} />
            <pointLight ref={accentRef} position={[0, 18, 0]} intensity={30} distance={80} decay={1.5} color={STATION_COLORS[stationIdx].accent} />
        </>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function CreativeWorld() {
    const navigate = useNavigate();
    const [stationIdx, setStationIdx] = useState(0);
    const [isReading, setIsReading] = useState(false);
    const station = STATIONS[stationIdx];

    /* ─── MOBILE DETECTION ─── */
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    /* ─── MUSIC PLAYER STATE ─── */
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const onTime = () => {
            setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
            setCurrentTime(formatTime(audio.currentTime));
        };
        const onMeta = () => setDuration(formatTime(audio.duration));
        const onEnd = () => {
            if (currentTrack < TRACKS.length - 1) {
                setCurrentTrack(i => i + 1);
            } else {
                setIsPlaying(false);
                setProgress(0);
            }
        };
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('loadedmetadata', onMeta);
        audio.addEventListener('ended', onEnd);
        return () => {
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('loadedmetadata', onMeta);
            audio.removeEventListener('ended', onEnd);
        };
    }, [currentTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.src = TRACKS[currentTrack].src;
        if (isPlaying) audio.play();
    }, [currentTrack]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) { audio.pause(); } else { audio.play(); }
        setIsPlaying(!isPlaying);
    };

    const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    };

    const skipTrack = (dir: 1 | -1) => {
        const next = currentTrack + dir;
        if (next >= 0 && next < TRACKS.length) setCurrentTrack(next);
    };

    const goTo = useCallback((idx: number) => {
        setStationIdx(idx);
        setIsReading(false);
    }, []);

    return (
        <div
            className="fixed inset-0 bg-[#080a12] select-none"
            style={{ overflowX: isMobile ? 'scroll' : 'hidden', overflowY: 'hidden' }}
        >
            {/* Canvas wrapper — wider on mobile so user can scroll L/R */}
            <div style={{ width: isMobile ? '180vw' : '100%', height: '100%', position: 'relative' }}>
                <Canvas
                    shadows
                    gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 2.5 }}
                    dpr={[1, 1.5]}
                >
                    <PerspectiveCamera makeDefault fov={isMobile ? 70 : 50} near={0.1} far={200} />
                    <CameraRig target={station.cam} lookAt={station.look} />

                    <color attach="background" args={['#0a0e18']} />
                    <fog attach="fog" args={['#0a0e18', 30, 120]} />

                    <hemisphereLight intensity={1.5} color="#d0d4ff" groundColor="#1e2440" />
                    <directionalLight position={[10, 20, 10]} intensity={2} color="#e0e4ff" />
                    <directionalLight position={[-10, 15, 5]} intensity={1} color="#c8b8ff" />
                    <DynamicLighting stationIdx={stationIdx} />

                    <Suspense fallback={null}>
                        <HallStructure />
                        {stationIdx === 0 && <AuditoriumSeating />}
                        <MainStage
                            isPlaying={isPlaying}
                            track={TRACKS[currentTrack]}
                            progress={progress}
                            currentTime={currentTime}
                            duration={duration}
                            togglePlay={togglePlay}
                            seekTo={seekTo}
                            skipTrack={skipTrack}
                            currentTrackIdx={currentTrack}
                            totalTracks={TRACKS.length}
                        />
                        <SocialLounge stationIdx={stationIdx} />
                        <ArchiveWing onRead={() => { setStationIdx(3); setIsReading(true); }} />
                        <DustParticles count={150} />
                        <Environment preset="night" />

                    </Suspense>


                </Canvas>

                {/* ═══ UI OVERLAY ═══ */}
                <div className="absolute inset-0 pointer-events-none z-50">
                    {/* Header */}
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 pointer-events-auto flex items-start gap-3 sm:gap-5">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-400 animate-pulse" />
                                <span className="text-indigo-400/80 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                                    Live Experience
                                </span>
                            </div>
                            <h1 className="text-white/90 text-lg sm:text-2xl font-bold tracking-tight">
                                Datta's Creative Corner
                            </h1>
                        </div>
                    </div>

                    {/* Station Navigator */}
                    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto w-[calc(100%-2rem)] sm:w-auto max-w-[560px]">
                        <div className="flex items-center gap-2 sm:gap-1.5 p-2 sm:p-1.5 rounded-2xl bg-black/60 border border-white/[0.06] backdrop-blur-2xl shadow-2xl">
                            {STATIONS.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => goTo(i)}
                                    className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-4 sm:py-3.5 rounded-xl text-[11px] sm:text-xs font-bold sm:font-semibold uppercase tracking-widest sm:tracking-wider transition-all duration-500 leading-tight text-center whitespace-nowrap ${stationIdx === i
                                        ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/20'
                                        : 'text-white/40 hover:text-white/80 hover:bg-white/[0.06]'
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Hidden audio element */}
                    <audio ref={audioRef} preload="metadata" />


                    {/* Reading Mode */}
                    <AnimatePresence>
                        {isReading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-8 pointer-events-auto z-[100]"
                            >
                                <motion.div
                                    initial={{ y: 60, scale: 0.96 }}
                                    animate={{ y: 0, scale: 1 }}
                                    exit={{ y: 60, scale: 0.96 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-full max-w-2xl bg-[#fef3c7] p-6 sm:p-16 rounded-[2rem] sm:rounded-[3rem] relative shadow-2xl"
                                >
                                    <button
                                        onClick={() => setIsReading(false)}
                                        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2.5 sm:p-3 rounded-full hover:bg-black/5 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black/60" />
                                    </button>
                                    <p className="text-black/30 text-[10px] font-semibold uppercase tracking-[0.3em] mb-4 sm:mb-6">Chapter I</p>
                                    <h2 className="text-black text-2xl sm:text-4xl font-bold tracking-tight mb-5 sm:mb-8 leading-tight">
                                        The Neural Symphony
                                    </h2>
                                    <div className="w-12 sm:w-16 h-1 bg-indigo-500 mb-6 sm:mb-10" />
                                    <p className="text-black/60 text-base sm:text-lg leading-relaxed font-serif italic first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3 first-letter:text-indigo-600">
                                        In the quiet hum of the midnight server farm, the algorithms began to compose. It was not mere computation - it was the birth of a digital soul, each line of code a verse in an unfolding epic that would bridge the gap between silicon thought and human emotion...
                                    </p>
                                    <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-black/10 flex justify-between items-center">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                            <div className="w-2 h-2 rounded-full bg-black/10" />
                                            <div className="w-2 h-2 rounded-full bg-black/10" />
                                        </div>
                                        <span className="text-black/30 text-[10px] font-semibold uppercase tracking-widest">Next Chapter</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* end canvas wrapper */}
        </div>
    );
}
