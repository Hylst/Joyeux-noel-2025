
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Snowfall from './components/Snowfall';
import CodeEditor from './components/CodeEditor';
import Fireflies from './components/Fireflies';
import { generateFestiveBackground } from './services/geminiService';
import { GREETING_MESSAGE, FestiveIcons } from './constants';

const App: React.FC = () => {
  // États pour gérer la magie de l'interface
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isDeployed, setIsDeployed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Références vers notre orchestre sonore
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxClickRef = useRef<HTMLAudioElement | null>(null);
  const sfxMagicRef = useRef<HTMLAudioElement | null>(null);
  const sfxSnowRef = useRef<HTMLAudioElement | null>(null);

  // Initialisation : Invocation de l'IA pour le décor
  const initApp = useCallback(async () => {
    try {
      const image = await generateFestiveBackground();
      setBgImage(image);
    } catch (e) {
      console.error("Erreur lors du chargement de la magie:", e);
    } finally {
      setIsLoading(false);
      // Petite pause dramatique avant de révéler le contenu
      setTimeout(() => setShowContent(true), 500);
    }
  }, []);

  useEffect(() => {
    initApp();
    
    // Configuration de la symphonie de Noël
    bgMusicRef.current = new Audio('https://www.chosic.com/wp-content/uploads/2021/11/O-Christmas-Tree-Choir.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    sfxClickRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    sfxMagicRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3');
    
    // Bruit blanc du vent d'hiver
    sfxSnowRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2387/2387-preview.mp3');
    sfxSnowRef.current.loop = true;
    sfxSnowRef.current.volume = 0.15;

    // Rituel pour débloquer l'audio (les navigateurs bloquent le son automatique)
    const unlockAudio = () => {
      if (bgMusicRef.current && bgMusicRef.current.paused && !isMuted) {
          bgMusicRef.current.play().catch(() => {});
          sfxSnowRef.current?.play().catch(() => {});
      }
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);

    // Nettoyage des sons à la fermeture
    return () => {
      bgMusicRef.current?.pause();
      sfxSnowRef.current?.pause();
      bgMusicRef.current = null;
      sfxSnowRef.current = null;
      document.removeEventListener('click', unlockAudio);
    };
  }, [initApp, isMuted]);

  // Gestionnaire de l'ambiance sonore
  const toggleMute = () => {
    if (bgMusicRef.current && sfxSnowRef.current) {
      if (isMuted) {
        bgMusicRef.current.play().then(() => {
          bgMusicRef.current!.loop = true; // On s'assure que la boucle continue
        }).catch(e => console.log("La musique a été bloquée par le lutin du navigateur", e));
        sfxSnowRef.current.play().then(() => {
          sfxSnowRef.current!.loop = true;
        }).catch(e => console.log("Le vent a été bloqué", e));
      } else {
        bgMusicRef.current.pause();
        sfxSnowRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Action principale : Déploiement des vœux
  const handleDeploy = () => {
    sfxClickRef.current?.play().catch(() => {});
    setIsDeployed(true);
    
    // Délai pour synchroniser le son magique avec l'animation
    setTimeout(() => {
      sfxMagicRef.current?.play().catch(() => {});
      // Si l'utilisateur clique sur "Déployer", c'est une interaction, on peut lancer la musique
      if (isMuted) {
        if (bgMusicRef.current && sfxSnowRef.current) {
          bgMusicRef.current.loop = true;
          bgMusicRef.current.play().catch(() => {});
          sfxSnowRef.current.loop = true;
          sfxSnowRef.current.play().catch(() => {});
          setIsMuted(false);
        }
      }
    }, 1200);
  };

  // Écran de chargement féerique
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center text-emerald-500 font-mono space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-[10px] opacity-50">2025</span>
          </div>
        </div>
        <p className="animate-pulse tracking-widest text-sm uppercase">Initialisation de la magie...</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Fond d'écran généré par IA */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-[2000ms]"
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          opacity: showContent ? 0.4 : 0 
        }}
      />
      {/* Dégradé pour la lisibilité */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/70 via-transparent to-[#050505] pointer-events-none" />
      
      {/* Ciel étoilé CSS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i}
            className="star absolute text-yellow-200/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              '--duration': `${3 + Math.random() * 4}s`
            } as any}
          >
            <FestiveIcons.Star />
          </div>
        ))}
      </div>

      <Snowfall />

      {/* Conteneur principal avec animation d'entrée */}
      <div className={`
        relative z-20 w-full px-4 flex flex-col items-center transition-all duration-1000 transform
        ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}>
        {!isDeployed ? (
          /* Vue 1 : L'éditeur de code */
          <>
            <div className="flex flex-col items-center mb-10">
              <div className="text-emerald-500 mb-4 animate-bounce">
                <FestiveIcons.Star />
              </div>
              <h1 className="font-christmas text-5xl md:text-7xl text-white text-center gold-glow leading-tight">
                Joyeux Noël 2025
              </h1>
            </div>
            <CodeEditor onRun={handleDeploy} isRunning={isDeployed} />
            <p className="mt-8 text-white/30 font-mono text-xs uppercase tracking-[0.3em] text-center">
              2025 • par GEOFFROY
            </p>
          </>
        ) : (
          /* Vue 2 : La carte de vœux déployée */
          <div className="max-w-4xl w-full flex flex-col items-center">
             <div className="w-full glass rounded-3xl p-8 md:p-14 shadow-[0_0_80px_rgba(255,255,255,0.08)] border border-white/10 relative overflow-hidden animate-in fade-in zoom-in duration-1000">
               {/* Lueurs d'ambiance */}
               <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[120px] -z-10" />
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 blur-[120px] -z-10" />

               {/* Effet de Lucioles à l'intérieur de la carte */}
               <Fireflies />

               <header className="flex flex-col items-center mb-10 relative z-10">
                 <div className="mb-6 text-yellow-400 float-anim scale-125">
                   <FestiveIcons.Tree />
                 </div>
                 <h2 className="font-christmas text-4xl md:text-6xl text-white text-center gold-glow">
                   Joyeux Noël 2025
                 </h2>
               </header>

               <div className="space-y-8 text-white/90 text-lg md:text-2xl leading-relaxed text-center font-light italic font-inter relative z-10">
                 {GREETING_MESSAGE.split('\n\n').map((para, i) => (
                   <p key={i} className="drop-shadow-md">{para}</p>
                 ))}
               </div>

               <footer className="mt-16 flex flex-col items-center space-y-6 relative z-10">
                 <div className="flex items-center space-x-8 text-yellow-500/50">
                   <div className="scale-75 opacity-50"><FestiveIcons.Gift /></div>
                   <div className="scale-110"><FestiveIcons.Star /></div>
                   <div className="scale-75 opacity-50"><FestiveIcons.Gift /></div>
                 </div>
                 <div className="text-center max-w-lg">
                    <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-3">
                      2025 • par GEOFFROY
                    </p>
                    <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                      Conçu avec un soupçon de code, <br/>
                      une pincée d’intelligence artificielle <br/>
                      et un peu de poudre de Perlimpinpin ✨
                    </p>
                 </div>
                 <button 
                  onClick={() => setIsDeployed(false)}
                  className="mt-6 text-white/20 hover:text-emerald-400 font-mono text-sm transition-all border border-transparent hover:border-emerald-500/20 px-4 py-2 rounded-full"
                 >
                   &lt; Editer le Script 2025 /&gt;
                 </button>
               </footer>
             </div>
          </div>
        )}
      </div>

      {/* Contrôle du Son (Bouton flottant) */}
      <div className="fixed bottom-8 right-8 z-30 flex flex-col items-center space-y-4">
        {isMuted && !isDeployed && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 text-white/70 text-[10px] px-3 py-1 rounded-full animate-pulse uppercase tracking-widest pointer-events-none">
            Activer l'ambiance
          </div>
        )}
        <button 
          onClick={toggleMute}
          className={`
            p-4 rounded-full glass transition-all duration-300 flex items-center justify-center
            ${isMuted ? 'text-white/40 bg-white/5' : 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)] scale-110'}
            hover:scale-125 group
          `}
          title={isMuted ? "Lancer la musique et l'ambiance" : "Mode Silencieux"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </main>
  );
};

export default App;
