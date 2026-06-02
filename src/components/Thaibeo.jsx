export default function Thaibeo({ className = "", scale = 1, isEating = false, hasBackpack = false, isBackview = false, showName = false }) {
  // We use scale to grow the pig.
  return (
    <div 
      className={`relative inline-block transition-transform duration-1000 ease-out ${className}`} 
      style={{ transform: `scale(${scale})` }}
    >
      {showName && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-pink-500 font-bold text-xs shadow-sm border border-pink-100 whitespace-nowrap z-20">
          Thaibeo
        </div>
      )}

      <svg 
        width="180" 
        height="150" 
        viewBox="-20 0 240 200" 
        xmlns="http://www.w3.org/2000/svg"
        className={isEating ? "animate-bounce" : ""}
      >
        {/* Shadows */}
        <ellipse cx="100" cy="180" rx="60" ry="10" fill="rgba(0,0,0,0.1)" />
        {hasBackpack && !isBackview && <ellipse cx="170" cy="180" rx="30" ry="6" fill="rgba(0,0,0,0.1)" />}

        {isBackview ? (
          <>
            {/* BACK VIEW */}
            {/* Ears (slightly hidden) */}
            <path d="M 40 70 Q 20 30 60 40 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            <path d="M 160 70 Q 180 30 140 40 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />

            {/* Body (Back) */}
            <circle cx="100" cy="110" r="70" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />

            {/* Tail (Curly) */}
            <path d="M 100 130 Q 120 120 115 110 Q 110 100 95 110 Q 90 120 105 130" fill="none" stroke="#f472b6" strokeWidth="6" strokeLinecap="round" />
            
            {/* Cute butt lines */}
            <path d="M 90 160 Q 100 130 110 160" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
            <path d="M 85 165 Q 95 140 100 140 Q 105 140 115 165" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />

            {/* Red Slap Handprint on Right Cheek */}
            <g transform="translate(130, 130) scale(0.6) rotate(-15)" fill="#ef4444" opacity="0.6">
              {/* Palm */}
              <circle cx="0" cy="0" r="12" />
              {/* Fingers */}
              <path d="M -10 -5 Q -15 -25 -10 -25 Q -5 -25 -5 -5 Z" />
              <path d="M -2 -8 Q -5 -30 0 -30 Q 5 -30 5 -8 Z" />
              <path d="M 6 -5 Q 15 -25 10 -25 Q 5 -25 5 -5 Z" />
              <path d="M 12 0 Q 20 -15 18 -15 Q 12 -15 10 0 Z" />
              {/* Thumb */}
              <path d="M -10 5 Q -25 5 -25 10 Q -25 15 -10 10 Z" />
            </g>
          </>
        ) : (
          <>
            {/* FRONT VIEW */}
            {/* Ears */}
            <path d="M 40 70 Q 20 30 60 40 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />
            <path d="M 160 70 Q 180 30 140 40 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />

            {/* Inner Ears */}
            <path d="M 45 65 Q 35 45 55 50 Z" fill="#f472b6" />
            <path d="M 155 65 Q 165 45 145 50 Z" fill="#f472b6" />

            {/* Body */}
            <circle cx="100" cy="110" r="70" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />

            {/* Cheeks */}
            <ellipse cx="60" cy="115" rx="12" ry="8" fill="#f472b6" opacity="0.6" />
            <ellipse cx="140" cy="115" rx="12" ry="8" fill="#f472b6" opacity="0.6" />

            {/* Eyes */}
            {isEating ? (
              <>
                <path d="M 65 95 Q 75 85 85 95" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                <path d="M 115 95 Q 125 85 135 95" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="75" cy="95" r="6" fill="#1e293b" />
                <circle cx="125" cy="95" r="6" fill="#1e293b" />
              </>
            )}

            {/* Snout */}
            <ellipse cx="100" cy="120" rx="25" ry="18" fill="#f472b6" stroke="#db2777" strokeWidth="3" />
            <ellipse cx="90" cy="118" rx="4" ry="6" fill="#be185d" />
            <ellipse cx="110" cy="118" rx="4" ry="6" fill="#be185d" />

            {/* Mouth */}
            {isEating ? (
               <path d="M 95 145 Q 100 155 105 145 Z" fill="#be185d" />
            ) : (
               <path d="M 90 145 Q 100 150 110 145" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
            )}

            {/* Backpack (next to him) */}
            {hasBackpack && (
              <g transform="translate(170, 140)">
                <path d="M -20 -30 Q -25 -50 -10 -50 L 10 -50 Q 25 -50 20 -30 L 25 30 Q 25 40 10 40 L -10 40 Q -25 40 -25 30 Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="3" />
                <path d="M -15 -10 L 15 -10 L 15 20 L -15 20 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
                <path d="M -10 -60 Q 0 -70 10 -60 L 5 -50 L -5 -50 Z" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
}
