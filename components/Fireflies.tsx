
import React, { useMemo } from 'react';

// Composant gérant la chorégraphie des lucioles enchantées
const Fireflies: React.FC = () => {
  // Calcul unique des positions et trajectoires pour éviter les recalculs inutiles
  const fireflies = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Position horizontale initiale
      top: Math.random() * 100,  // Position verticale initiale
      tx: (Math.random() - 0.5) * 80, // Amplitude de mouvement X
      ty: (Math.random() - 0.5) * 80, // Amplitude de mouvement Y
      duration: 4 + Math.random() * 6, // Durée du vol (plus lent pour plus de douceur)
      delay: Math.random() * 5 // Décalage pour un effet naturel
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="firefly"
          // Injection des variables CSS pour l'animation définie dans index.html
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            '--tx': `${f.tx}px`,
            '--ty': `${f.ty}px`,
            '--duration': `${f.duration}s`,
            '--delay': `${f.delay}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Fireflies;
