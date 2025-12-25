
import React from 'react';

export const GREETING_MESSAGE = `Un Joyeux et Lumineux Noël à tous ! ✨
En ce 25 décembre, je voulais simplement vous envoyer une petite pensée chaleureuse. 🎄

Au-delà des cadeaux et des lumières, je nous souhaite à tous une journée placée sous le signe de l'authenticité et du cœur. Que ces moments passés en famille ou avec nos proches soient l'occasion de consolider les liens qui nous unissent, de se soutenir et se témoigner de la tendresse, de cultiver la gaieté et la gratitude, de favoriser l'épanouissement de chacun dans la bienveillance.

Que l'esprit de Noël remplisse vos maisons de rires et de douceur. Profitez de chaque instant, de chaque discussion et de chaque sourire.

Merveilleux Noël à vous et à ceux qui vous sont chers ! 🎅🎁🌟`;

export const CHRISTMAS_CODE_SNIPPET = `
/**
 * Configuration du Jour de Noël 2025
 */
const JoyeuxNoel = {
  version: "2025.12.25",
  status: "MAGIE_ACTIVEE",
  ambiance: "Féerique & Joyeuse",
  valeurs: ["Amour", "Partage", "Lumière"],
  run: () => {
    const today = new Date();
    if (today.getDate() === 25) {
      celebrer(JoyeuxNoel.valeurs);
      ouvrirCadeaux();
      profiter(Famille, Amis);
      
      return "Joyeux Noël à tous ! 🎄✨";
    }
  }
};
`.trim();

export const FestiveIcons = {
  Tree: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L5 12h14L12 2zM5 12h14l-7 10L5 12z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Gift: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 8v12M3 12h18M7 8V4h10v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Star: () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
};
