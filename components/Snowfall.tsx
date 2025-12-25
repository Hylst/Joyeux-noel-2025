
import React, { useEffect, useRef } from 'react';

// Composant responsable de la météo hivernale de l'application
const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];

    // Ajustement de la tempête en cas de redimensionnement de la fenêtre
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Création des flocons uniques
    const initParticles = () => {
      particles = [];
      const count = Math.floor(window.innerWidth / 8); // Densité de la neige
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1, // Taille variable
          speed: Math.random() * 1 + 0.5, // Vitesse de chute
          opacity: Math.random() * 0.5 + 0.2 // Transparence
        });
      }
    };

    // Boucle d'animation (Le souffle du vent)
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Mouvement physique simple
        p.y += p.speed;
        p.x += Math.sin(p.y / 50) * 0.5; // Oscillation latérale

        // Recyclage des flocons qui touchent le sol
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-10"
      style={{ filter: 'blur(0.5px)' }} // Flou artistique
    />
  );
};

export default Snowfall;
