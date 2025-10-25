import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

export default function InteractiveBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const colors = ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];
    const count = 12;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      return {
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 12,
      };
    });
    
    setParticles((prev) => [...prev, ...newParticles]);
    
    // Animate and remove particles
    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2, // gravity
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0);
        
        if (updated.length === 0) {
          clearInterval(interval);
        }
        return updated;
      });
    }, 16);
  }, []);

  return (
    <div
      className="fixed inset-0 cursor-pointer"
      onClick={handleClick}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        animate={{
          background: [
            'linear-gradient(to bottom right, #020617, #0f172a, #020617)',
            'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
            'linear-gradient(to bottom right, #020617, #0f172a, #020617)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${
              ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'][i]
            }, transparent)`,
            width: `${200 + i * 50}px`,
            height: `${200 + i * 50}px`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
          initial={{
            left: `${10 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
        />
      ))}
      
      {/* Click particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.life,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}


