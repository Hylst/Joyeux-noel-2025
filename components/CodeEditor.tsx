
import React, { useState, useEffect } from 'react';
import { CHRISTMAS_CODE_SNIPPET } from '../constants';

interface CodeEditorProps {
  onRun: () => void;
  isRunning: boolean;
}

// Composant simulant l'IDE (Environnement de Développement) du Père Noël
const CodeEditor: React.FC<CodeEditorProps> = ({ onRun, isRunning }) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Effet de machine à écrire pour afficher le code caractère par caractère
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= CHRISTMAS_CODE_SNIPPET.length) {
        setDisplayedCode(CHRISTMAS_CODE_SNIPPET.substring(0, index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15); // Vitesse de frappe du lutin développeur

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl glass rounded-xl overflow-hidden shadow-2xl transition-all duration-700 transform hover:scale-[1.01]">
      {/* Barre de titre de la fenêtre style MacOS */}
      <div className="bg-black/40 px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-white/40 text-xs font-mono">Joyeux_Noel_2025.ts</div>
        <div className="w-12"></div>
      </div>
      
      {/* Zone de code avec coloration syntaxique simulée */}
      <div className="p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
        <pre className="text-emerald-400">
          <code>
            {displayedCode.split('\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="text-white/20 select-none mr-4 w-4 text-right">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: line
                    .replace(/(const|let|if|return|while)/g, '<span class="text-purple-400">$1</span>')
                    .replace(/(['"].*?['"])/g, '<span class="text-yellow-200">$1</span>')
                    .replace(/\((.*?)\)/g, '(<span class="text-blue-300">$1</span>)')
                    .replace(/(\/\/.*|\/\*\*[\s\S]*?\*\/)/g, '<span class="text-emerald-600/60 italic">$1</span>')
                }} />
              </div>
            ))}
            {isTyping && <span className="animate-pulse border-r-2 border-white ml-1">&nbsp;</span>}
          </code>
        </pre>
      </div>

      {/* Barre d'action inférieure */}
      <div className="bg-emerald-500/5 px-6 py-4 flex justify-end">
        <button 
          onClick={onRun}
          disabled={isTyping || isRunning}
          className={`
            px-6 py-2 rounded-full font-mono flex items-center space-x-2 transition-all
            ${isTyping || isRunning 
              ? 'bg-white/5 text-white/20 cursor-not-allowed' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95'}
          `}
        >
          {isRunning ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>DÉPLOIEMENT...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>DÉPLOYER NOËL</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
