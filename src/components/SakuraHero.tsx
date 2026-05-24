import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface SakuraHeroProps {
  scrollY: number;
}

interface Petal {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
  opacity: number;
  swingSpeed: number;
  rotationSpeed: number;
}

export function SakuraHero({ scrollY }: SakuraHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize petals with more variety
    if (petalsRef.current.length === 0) {
      for (let i = 0; i < 80; i++) {
        petalsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          rotation: Math.random() * 360,
          speed: 0.3 + Math.random() * 0.8,
          size: 8 + Math.random() * 12,
          opacity: 0.4 + Math.random() * 0.5,
          swingSpeed: 0.02 + Math.random() * 0.03,
          rotationSpeed: 1 + Math.random() * 2
        });
      }
    }

    const drawRealisticPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;
      
      // Petal gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petal.size);
      gradient.addColorStop(0, '#FFF5F7');
      gradient.addColorStop(0.4, '#FFB7C5');  
      gradient.addColorStop(1, '#FF96B4');
      
      ctx.fillStyle = gradient;
      
      // Draw petal shape (more realistic)
      ctx.beginPath();
      ctx.moveTo(0, -petal.size);
      ctx.quadraticCurveTo(petal.size * 0.6, -petal.size * 0.5, petal.size * 0.3, 0);
      ctx.quadraticCurveTo(petal.size * 0.6, petal.size * 0.5, 0, petal.size);
      ctx.quadraticCurveTo(-petal.size * 0.6, petal.size * 0.5, -petal.size * 0.3, 0);
      ctx.quadraticCurveTo(-petal.size * 0.6, -petal.size * 0.5, 0, -petal.size);
      ctx.closePath();
      ctx.fill();
      
      // Add subtle vein
      ctx.strokeStyle = 'rgba(255, 150, 180, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -petal.size);
      ctx.lineTo(0, petal.size);
      ctx.stroke();
      
      ctx.restore();
    };

    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw falling petals with realistic physics
      petalsRef.current.forEach((petal, index) => {
        petal.y += petal.speed;
        petal.x += Math.sin(time * petal.swingSpeed + index) * 2;
        petal.rotation += petal.rotationSpeed;
        
        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }
        
        drawRealisticPetal(ctx, petal);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Real Sakura Tree Photo Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1647373742563-2a73c15d0fa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWt1cmElMjBjaGVycnklMjBibG9zc29tJTIwdHJlZXxlbnwxfHx8fDE3Njc0MzI0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/20 via-transparent to-pink-50/80" />
      
      {/* Canvas for Falling Petals */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />
      
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
      
      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: 1 - scrollY / 500,
        }}
      >
        <h1 className="text-6xl md:text-8xl mb-6 text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 20px rgba(255, 182, 193, 0.8), 0 0 40px rgba(255, 182, 193, 0.5)' }}>
        Sakura Beauty
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg" style={{ textShadow: '0 2px 10px rgba(255, 182, 193, 0.6)' }}>
          Blossoming Beauty, Naturally Yours
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white drop-shadow-lg"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}