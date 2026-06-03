export default function Thaibeo({ className = "", scale = 1, weight = 0, isEating = false, isAngry = false, hasBackpack = false, isBackview = false, showName = false }) {
  // Determine fatness stage based on weight (0 to 100kg+ maps to 0.0 to 1.0)
  // At 100kg, fatFactor is 1.
  const fatFactor = Math.min(1, Math.max(0, weight / 100));

  return (
    <div 
      className={`relative inline-block transition-all duration-1000 ease-out ${className}`} 
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
        <ellipse cx="100" cy="180" rx={60 + 30 * fatFactor} ry="10" fill="rgba(0,0,0,0.1)" />
        {hasBackpack && !isBackview && <ellipse cx={170 + 20 * fatFactor} cy="180" rx="30" ry="6" fill="rgba(0,0,0,0.1)" />}

        {isBackview ? (
          <>
            {/* BACK VIEW */}
            {/* Ears (slightly hidden) */}
            <g transform={`translate(${-15 * fatFactor}, 0)`}>
              <path d="M 40 70 Q 20 30 60 40 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            </g>
            <g transform={`translate(${15 * fatFactor}, 0)`}>
              <path d="M 160 70 Q 180 30 140 40 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            </g>

            {/* Body (Back) */}
            <ellipse cx="100" cy="110" rx={70 + 40 * fatFactor} ry="70" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />

            {/* Tail (Curly 'e' at top) */}
            <path d="M 100 55 C 130 30, 90 10, 80 35 C 75 55, 110 65, 120 45" fill="none" stroke="#f472b6" strokeWidth="5" strokeLinecap="round" />
            
            {/* Realistic Butt Crack (from image) */}
            <g transform={`scale(${1 + 0.1 * fatFactor}) translate(${-5 * fatFactor}, 0)`}>
              {/* Hollow circle */}
              <circle cx="102" cy="75" r="4" fill="none" stroke="#db2777" strokeWidth="3" />
              {/* Long crack line */}
              <path d="M 104 85 Q 105 125 85 155" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Bottom folds/legs */}
            <g transform={`scale(${1 + 0.2 * fatFactor}) translate(${-10 * fatFactor}, 0)`}>
              <path d="M 75 165 Q 85 155 90 170" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
              <path d="M 125 165 Q 115 155 110 170" fill="none" stroke="#db2777" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Red Slap Handprint on Right Cheek */}
            <g transform={`translate(${130 + 15 * fatFactor}, 130) scale(0.6) rotate(-15)`} fill="#ef4444" opacity="0.6">
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
            <g transform={`translate(${-15 * fatFactor}, 0)`}>
              <path d="M 40 70 Q 20 30 60 40 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />
              <path d="M 45 65 Q 35 45 55 50 Z" fill="#f472b6" />
            </g>
            <g transform={`translate(${15 * fatFactor}, 0)`}>
              <path d="M 160 70 Q 180 30 140 40 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />
              <path d="M 155 65 Q 165 45 145 50 Z" fill="#f472b6" />
            </g>

            {/* Body */}
            <ellipse cx="100" cy="110" rx={70 + 40 * fatFactor} ry="70" fill="#fbcfe8" stroke="#f472b6" strokeWidth="4" />

            {/* Cheeks */}
            <ellipse cx={60 - 25 * fatFactor} cy="115" rx={12 + 23 * fatFactor} ry={8 + 17 * fatFactor} fill="#f472b6" opacity="0.6" />
            <ellipse cx={140 + 25 * fatFactor} cy="115" rx={12 + 23 * fatFactor} ry={8 + 17 * fatFactor} fill="#f472b6" opacity="0.6" />

            {/* Eyes */}
            {isAngry ? (
              <g transform={`translate(0, ${2 * fatFactor})`}>
                <circle cx={75 - 10 * fatFactor} cy="95" r={6 - 4 * fatFactor} fill="#1e293b" />
                <circle cx={125 + 10 * fatFactor} cy="95" r={6 - 4 * fatFactor} fill="#1e293b" />
                {/* Angry Eyebrows */}
                <path d={`M ${60 - 5 * fatFactor} 88 L ${80 - 15 * fatFactor} 95`} stroke="#1e293b" strokeWidth={4 - 2 * fatFactor} strokeLinecap="round" />
                <path d={`M ${140 + 5 * fatFactor} 88 L ${120 + 15 * fatFactor} 95`} stroke="#1e293b" strokeWidth={4 - 2 * fatFactor} strokeLinecap="round" />
              </g>
            ) : isEating ? (
              <g transform={`translate(0, ${2 * fatFactor})`}>
                <path d={`M ${65 - 10 * fatFactor} 95 Q ${75 - 10 * fatFactor} ${85 + 5 * fatFactor} ${85 - 10 * fatFactor} 95`} fill="none" stroke="#1e293b" strokeWidth={4 - 2 * fatFactor} strokeLinecap="round" />
                <path d={`M ${115 + 10 * fatFactor} 95 Q ${125 + 10 * fatFactor} ${85 + 5 * fatFactor} ${135 + 10 * fatFactor} 95`} fill="none" stroke="#1e293b" strokeWidth={4 - 2 * fatFactor} strokeLinecap="round" />
              </g>
            ) : (
              <>
                <circle cx={75 - 10 * fatFactor} cy="95" r={6 - 4 * fatFactor} fill="#1e293b" />
                <circle cx={125 + 10 * fatFactor} cy="95" r={6 - 4 * fatFactor} fill="#1e293b" />
              </>
            )}

            {/* Snout */}
            <ellipse cx="100" cy="120" rx={25 - 10 * fatFactor} ry={18 - 8 * fatFactor} fill="#f472b6" stroke="#db2777" strokeWidth="3" />
            <ellipse cx={90 + 5 * fatFactor} cy="118" rx={4 - 2 * fatFactor} ry={6 - 3 * fatFactor} fill="#be185d" />
            <ellipse cx={110 - 5 * fatFactor} cy="118" rx={4 - 2 * fatFactor} ry={6 - 3 * fatFactor} fill="#be185d" />

            {/* Mouth */}
            {isEating ? (
               <path d="M 95 145 Q 100 155 105 145 Z" fill="#be185d" />
            ) : (
               <path d="M 90 145 Q 100 150 110 145" fill="none" stroke="#be185d" strokeWidth="3" strokeLinecap="round" />
            )}

            {/* Backpack (next to him) */}
            {hasBackpack && (
              <g transform={`translate(${170 + 20 * fatFactor}, 140)`}>
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
