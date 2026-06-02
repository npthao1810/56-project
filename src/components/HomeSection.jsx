import React, { useState, useEffect } from 'react';
import Thaibeo from './Thaibeo';
import Thaoxinh from './Thaoxinh';

export default function HomeSection({ gameState, getPigScale }) {
  const scale = getPigScale();
  
  // Animation state for toggling views
  const [isBackview, setIsBackview] = useState(false);

  useEffect(() => {
    // Toggle every 3 seconds
    const interval = setInterval(() => {
      setIsBackview(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate level based on weight
  let levelName = "Baby Piglet";
  if (gameState.weight > 30) levelName = "Chubby Pig";
  if (gameState.weight > 80) levelName = "Big Boy Thaibeo";
  if (gameState.weight >= 100) levelName = "Legendary Thaibeo";
  
  // Goal is strictly 100kg
  const nextLevelGoal = 100;
  
  const progressPercent = Math.min((gameState.weight / nextLevelGoal) * 100, 100);

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500 pt-8 pb-12">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-pink-500 drop-shadow-sm mb-2">Meet Thaibeo! 🐷</h2>
        <p className="text-slate-600 font-medium px-4">Help him reach 100kg to impress Princess Thaoxinh!</p>
      </div>

      {/* Pig Display Area */}
      <div className="relative w-full max-w-[400px] aspect-[4/3] bg-gradient-to-b from-blue-50 to-green-100 rounded-[3rem] border-8 border-white shadow-xl flex items-end justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Thaibeo and Thaoxinh standing together */}
        <div className="flex items-end justify-center w-full pb-8 relative z-10 transition-all duration-500">
          <div className="-mr-6 z-20">
            <Thaibeo scale={scale} isBackview={isBackview} showName={true} />
          </div>
          <div className="mb-2 z-10">
            {/* Thaoxinh watches happily when he turns his back (state 2) or if goal is met */}
            <Thaoxinh scale={scale} isHappy={isBackview || gameState.weight >= 100} showName={true} />
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border border-pink-100 relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-6 py-1 rounded-full font-bold shadow-sm whitespace-nowrap">
          {levelName}
        </div>
        
        <div className="mt-4 flex justify-between items-end mb-2">
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Weight</p>
            <p className="text-3xl font-black text-slate-800">{gameState.weight.toFixed(2)} <span className="text-lg text-slate-400">kg</span></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 font-medium">Goal</p>
            <p className="text-xl font-bold text-pink-400">{nextLevelGoal} kg</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-1000 ease-out rounded-full relative"
            style={{ width: `${progressPercent}%` }}
          >
             <div className="absolute top-0 right-0 bottom-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20 animate-[slide_1s_linear_infinite]"></div>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-500 mt-4 font-medium">
          Feed Thaibeo by completing quests, or catch random snacks!
        </p>
      </div>

    </div>
  );
}
