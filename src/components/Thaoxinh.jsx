export default function Thaoxinh({ className = "", scale = 1, isHappy = false, isAngry = false, showName = false }) {
  // Thaoxinh - Human Princess (same cute round style as Thaibeo)
  return (
    <div 
      className={`relative inline-block transition-transform duration-1000 ease-out ${className}`} 
      style={{ transform: `scale(${scale})` }}
    >
      {showName && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-pink-500 font-bold text-xs shadow-sm border border-pink-100 whitespace-nowrap z-20">
          Thaoxinh
        </div>
      )}

      <svg 
        width="180" 
        height="150" 
        viewBox="-20 0 240 200" 
        xmlns="http://www.w3.org/2000/svg"
        className={isHappy ? "animate-bounce" : ""}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="180" rx="55" ry="8" fill="rgba(0,0,0,0.1)" />

        {/* Hair Back */}
        <circle cx="100" cy="120" r="75" fill="#475569" />

        {/* Face/Body */}
        <circle cx="100" cy="115" r="65" fill="#ffedd5" stroke="#fed7aa" strokeWidth="3" />

        {/* Hair Front/Bangs */}
        <path d="M 35 115 Q 100 60 165 115 Q 150 50 100 50 Q 50 50 35 115 Z" fill="#475569" />

        {/* Crown */}
        <path d="M 75 50 L 85 20 L 100 40 L 115 20 L 125 50 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <circle cx="85" cy="18" r="4" fill="#ef4444" />
        <circle cx="100" cy="38" r="4" fill="#3b82f6" />
        <circle cx="115" cy="18" r="4" fill="#ef4444" />

        {/* Cheeks */}
        <ellipse cx="65" cy="120" rx="10" ry="6" fill="#fecdd3" opacity="0.8" />
        <ellipse cx="135" cy="120" rx="10" ry="6" fill="#fecdd3" opacity="0.8" />

        {/* Eyes */}
        {isHappy ? (
          <>
            <path d="M 70 100 Q 75 92 80 100" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 120 100 Q 125 92 130 100" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : isAngry ? (
          <>
            {/* Angry Eyes */}
            <circle cx="75" cy="98" r="5" fill="#1e293b" />
            <circle cx="125" cy="98" r="5" fill="#1e293b" />
            {/* Angry Eyebrows */}
            <path d="M 65 92 L 85 98" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 135 92 L 115 98" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Cute lashes (Sad/Normal) */}
            <path d="M 68 98 Q 75 92 82 98" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 68 98 L 64 94 M 82 98 L 86 94" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            
            <path d="M 118 98 Q 125 92 132 98" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 118 98 L 114 94 M 132 98 L 136 94" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Mouth */}
        {isHappy ? (
           <path d="M 92 135 Q 100 145 108 135 Z" fill="#ef4444" />
        ) : isAngry ? (
           <path d="M 94 140 Q 100 132 106 140" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        ) : (
           <path d="M 94 135 Q 100 140 106 135" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}
