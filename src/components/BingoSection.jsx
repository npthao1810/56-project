import { useState, useEffect } from 'react';
import bingoData from '../data/bingo.json';
import { isPastDeadline, canClaimBingo, getRemainingTimeUntilNextStamp } from '../utils/timeUtils';
import { MapPin, X, CheckCircle2, AlertCircle, Clock, Trophy } from 'lucide-react';
import Thaibeo from './Thaibeo';
import Thaoxinh from './Thaoxinh';

export default function BingoSection({ gameState, addStamp }) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [timeRemainingMsg, setTimeRemainingMsg] = useState('');

  // Update time remaining if they are blocked
  useEffect(() => {
    const interval = setInterval(() => {
      if (!canClaimBingo(gameState.stamps)) {
        const msLeft = getRemainingTimeUntilNextStamp(gameState.stamps);
        const minsLeft = Math.ceil(msLeft / (60 * 1000));
        setTimeRemainingMsg(`Please wait ${minsLeft} min before adding another stamp!`);
      } else {
        setTimeRemainingMsg('');
      }
    }, 10000); // check every 10s
    return () => clearInterval(interval);
  }, [gameState.stamps]);

  const handleSquareClick = (square) => {
    const isStamped = gameState.stamps.some(s => s.id === square.id);
    if (isStamped) return;

    // Unconditionally clear old messages before processing
    setErrorMsg('');
    setSuccessMsg('');
    setPasscode('');

    if (isPastDeadline()) {
      setErrorMsg("The deadline to complete challenges has passed! (June 5, 2026, 6 PM)");
      setSelectedSquare(square);
      return;
    }

    if (!canClaimBingo(gameState.stamps)) {
      const msLeft = getRemainingTimeUntilNextStamp(gameState.stamps);
      const minsLeft = Math.ceil(msLeft / (60 * 1000));
      setErrorMsg(`You've completed 3 challenges in the last hour! Please wait ${minsLeft} minutes before doing another.`);
      setSelectedSquare(square);
      return;
    }

    setSelectedSquare(square);
  };

  const handleVerify = () => {
    if (passcode === selectedSquare.passcode) {
      setSuccessMsg(`Correct! You've arrived in ${selectedSquare.country}! ✈️`);
      
      // Calculate bonuses
      const oldStamps = gameState.stamps;
      const newStamps = [...oldStamps, { id: selectedSquare.id }];
      
      // Helper to check lines
      const checkLines = (stampsArr) => {
        const stampIds = stampsArr.map(s => s.id);
        let lines = 0;
        const winningCombos = [
          [0,1,2], [3,4,5], [6,7,8], // rows
          [0,3,6], [1,4,7], [2,5,8], // cols
          [0,4,8], [2,4,6]           // diagonals
        ];
        
        winningCombos.forEach(combo => {
          if (combo.every(idx => stampIds.includes(bingoData[idx].id))) {
            lines++;
          }
        });
        return lines;
      };

      const oldLines = checkLines(oldStamps);
      const newLines = checkLines(newStamps);
      const linesGained = newLines - oldLines;
      
      let baseReward = 5; // 5 kg base
      let totalReward = baseReward + (linesGained * 10);
      
      if (newStamps.length === 9) {
        totalReward += 50; // Full board bonus
      }

      addStamp(selectedSquare.id, totalReward);
      // Removed auto-close timeout so user can read the success message and click CTA
    } else {
      setErrorMsg("Incorrect passcode! The magic words elude you. 🥺 Try again.");
    }
  };

  const stampCount = gameState.stamps.length;
  const progressPercent = (stampCount / bingoData.length) * 100;

  return (
    <div className="flex flex-col relative h-[calc(100vh-180px)] justify-between pb-4">
      
      {/* Motivation Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-3 text-white shadow-md relative overflow-hidden flex-shrink-0">
        {/* Decor */}
        <Trophy className="absolute right-[-10px] bottom-[-10px] w-20 h-20 text-white opacity-20 rotate-12" />
        
        <h3 className="font-bold text-base mb-1 flex items-center gap-2 font-serif">
          <AlertCircle className="w-4 h-4 fill-yellow-400 text-green-600" />
          Travel the World to Meet Thaoxinh!
        </h3>
        <ul className="text-xs space-y-1 font-medium z-10 relative">
          <li className="flex items-start gap-1">
            <span>✈️</span> Travel to 3 countries in a row to gain strength: <strong>+30 kg!</strong>
          </li>
          <li className="flex items-start gap-1">
            <span>🌍</span> Travel to all countries for a massive <strong>+100 kg feast!</strong>
          </li>
        </ul>
        {timeRemainingMsg && (
          <div className="mt-2 bg-red-500/20 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            {timeRemainingMsg}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 bg-[#FFFAF0] p-2 rounded-2xl shadow-md border border-amber-200 relative flex-1 my-2 min-h-0 bg-[url('https://www.transparenttextures.com/patterns/beige-paper.png')]">
        
        {/* Grid lines styling to look like a map / passport page */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4ade80_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none rounded-2xl"></div>

        {bingoData.map((square, index) => {
          const isStamped = gameState.stamps.some(s => s.id === square.id);
          // Alternate stamp colors just to look cool (Red or Blue ink)
          const inkColor = index % 2 === 0 ? 'border-red-500 text-red-600' : 'border-blue-500 text-blue-600';
          const rotation = index % 2 === 0 ? '-rotate-12' : 'rotate-6';
          
          return (
            <div 
              key={square.id}
              onClick={() => handleSquareClick(square)}
              className="aspect-square flex items-center justify-center p-1 relative z-10"
            >
              <div 
                className={`w-full h-full rounded-full flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all duration-300
                  ${isStamped 
                    ? `border-[3px] border-double ${inkColor} bg-white shadow-sm scale-110 ${rotation} opacity-90 mix-blend-multiply` 
                    : 'border-2 border-dashed border-amber-300 bg-amber-50/50 hover:border-amber-400 hover:bg-amber-100 hover:scale-105 opacity-80'
                  }
                `}
              >
                {isStamped ? (
                  <>
                    <span className="text-3xl drop-shadow-md mb-1">{square.icon}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-tighter leading-tight ${inkColor}`}>
                      {square.country}
                    </span>
                    <span className={`text-[8px] font-bold opacity-50 uppercase tracking-widest mt-0.5 ${inkColor}`}>
                      ARRIVED
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl mb-1 opacity-20 grayscale">{square.icon}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">
                      {square.country}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Travel Progress Bar (Sticky at bottom of Bingo Section) */}
      <div className="bg-[#FFFAF0] rounded-2xl p-3 shadow-md border border-amber-200 relative flex-shrink-0 mt-auto bg-[url('https://www.transparenttextures.com/patterns/beige-paper.png')]">
        <p className="text-[10px] font-bold text-slate-500 text-center mb-4 uppercase tracking-wider">
          Journey to Thaoxinh: {stampCount}/9
        </p>
        
        {/* The Track */}
        <div className="h-3 bg-slate-100 rounded-full relative w-[85%] mx-auto">
          {/* Fill */}
          <div 
            className="absolute top-0 left-0 bottom-0 bg-green-400 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>

          {/* Traveler Thaibeo */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 z-10"
            style={{ left: `${progressPercent}%`, transform: 'translate(-50%, -60%)' }}
          >
            <div className="w-12 h-12 flex items-center justify-center drop-shadow-md">
              <Thaibeo weight={gameState.weight} scale={0.4} hasBackpack={true} />
            </div>
          </div>

          {/* Princess Thaoxinh at the Finish Line */}
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10">
             <div className="w-14 h-14 flex items-center justify-center drop-shadow-md">
               <Thaoxinh scale={0.4} isHappy={stampCount === 9} />
             </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedSquare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="text-2xl">{selectedSquare.icon}</span>
                {selectedSquare.country}
              </h3>
              <button onClick={() => setSelectedSquare(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-100 mb-6 shadow-inner relative overflow-hidden">
               {/* Watermark icon */}
              <span className="absolute -right-4 -bottom-4 text-6xl opacity-10 grayscale">{selectedSquare.icon}</span>
              <p className="text-base text-green-900 font-semibold text-center relative z-10 leading-relaxed">
                "{selectedSquare.challenge}"
              </p>
            </div>

            {successMsg ? (
              <div className="flex flex-col items-center py-6 text-green-600 animate-in fade-in duration-300">
                <CheckCircle2 className="w-16 h-16 mb-4 animate-bounce" />
                <p className="font-bold text-center text-lg mb-6 font-serif">{successMsg}</p>
                <button 
                  onClick={() => {
                    setSelectedSquare(null);
                    document.getElementById('nav-home-btn')?.click();
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-green-200 border border-green-400 active:scale-95"
                >
                  Deed completed! View Thaibeo! 🐷
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-300">
                {errorMsg ? (
                  <p className="text-sm text-red-500 font-bold text-center bg-red-50 py-2 px-3 rounded-lg border border-red-100">{errorMsg}</p>
                ) : (
                  <p className="text-sm text-slate-500 text-center font-medium">Enter the secret passcode to unlock!</p>
                )}
                
                <input 
                  type="text" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="****"
                  className="w-full text-center text-3xl tracking-[0.5em] font-mono bg-slate-50 border-2 border-slate-200 rounded-xl py-4 px-4 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all placeholder:opacity-30"
                  maxLength={4}
                />
                
                <button 
                  onClick={handleVerify}
                  className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_4px_0_0_rgb(22,163,74)] hover:shadow-[0_2px_0_0_rgb(22,163,74)] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none"
                >
                  Verify Passport Stamp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
