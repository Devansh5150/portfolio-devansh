import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  duration = 0.6 
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut"
        }
      }
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseVariants.hidden, y: 60 },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'down':
        return {
          hidden: { ...baseVariants.hidden, y: -60 },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: 60 },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: -60 },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'fade':
        return {
          hidden: { ...baseVariants.hidden, scale: 0.95 },
          visible: { ...baseVariants.visible, scale: 1 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
