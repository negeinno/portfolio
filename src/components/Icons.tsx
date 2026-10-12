import React from 'react';

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom Intertwined "AK" Monogram Logo
export const AKLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Anmol Kumar Logo"
  >
    <defs>
      <linearGradient id="akGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="45%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <filter id="akGlow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#ea580c" floodOpacity="0.35" />
      </filter>
    </defs>
    
    {/* Squircle Badge Container */}
    <rect 
      x="2" 
      y="2" 
      width="44" 
      height="44" 
      rx="12" 
      fill="url(#akGrad)" 
      filter="url(#akGlow)"
    />
    <rect 
      x="2.5" 
      y="2.5" 
      width="43" 
      height="43" 
      rx="11.5" 
      stroke="rgba(255,255,255,0.4)" 
      strokeWidth="1"
    />

    {/* Combined Geometric A & K Path Structure */}
    {/* Left Ascender of 'A' */}
    <path 
      d="M12.5 35L21.5 13" 
      stroke="white" 
      strokeWidth="3.6" 
      strokeLinecap="round" 
    />
    {/* Shared Backbone: Right descent of 'A' & Vertical Spine of 'K' */}
    <path 
      d="M21.5 13V35" 
      stroke="white" 
      strokeWidth="3.6" 
      strokeLinecap="round" 
    />
    {/* Crossbar of 'A' */}
    <path 
      d="M16 26H26" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round" 
    />
    {/* Upper Diagonal Arm of 'K' */}
    <path 
      d="M22 23L33.5 13" 
      stroke="white" 
      strokeWidth="3.6" 
      strokeLinecap="round" 
    />
    {/* Lower Diagonal Leg of 'K' */}
    <path 
      d="M23.5 24.5L34.5 35" 
      stroke="white" 
      strokeWidth="3.6" 
      strokeLinecap="round" 
    />
    
    {/* Apex and Branch Data Nodes (Analytics Accent) */}
    <circle cx="21.5" cy="13" r="2" fill="#fff" />
    <circle cx="33.5" cy="13" r="1.8" fill="#fed7aa" />
    <circle cx="34.5" cy="35" r="1.8" fill="#fed7aa" />
  </svg>
);
