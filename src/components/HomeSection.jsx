import React, { useState, useEffect } from 'react';
import Thaibeo from './Thaibeo';
import Thaoxinh from './Thaoxinh';

export default function HomeSection({ gameState }) {
  const { weight } = gameState;
  
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
  if (weight > 30) levelName = "Chubby Pig";
  if (weight > 80) levelName = "Big Boy Thaibeo";
  if (weight >= 100) levelName = "Legendary Thaibeo";
  
  // Goal is strictly 100kg
  const nextLevelGoal = 100;
  
  const progressPercent = Math.min((weight / nextLevelGoal) * 100, 100);

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500 pt-2 pb-4 h-full">
      
      <div className="text-center mb-4">
        <h2 className="text-2xl font-extrabold text-pink-500 drop-shadow-sm mb-1">Meet Thaibeo! 🐷</h2>
        <p className="text-sm text-slate-600 font-medium px-4 leading-tight">Help him reach 100kg to impress Princess Thaoxinh!</p>
      </div>

      {/* Pig Display Area */}
      <div className="relative w-full max-w-[400px] aspect-[16/10] bg-gradient-to-b from-blue-50 to-green-100 rounded-[2.5rem] border-8 border-white shadow-xl flex items-end justify-center overflow-hidden mb-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Thaibeo and Thaoxinh standing together */}
        <div className="flex items-end justify-center w-full pb-8 relative z-10 transition-all duration-500">
          <div className="-mr-6 z-20">
            <Thaibeo weight={weight} scale={1} isBackview={isBackview} showName={true} />
          </div>
          <div className="mb-2 z-10">
            {/* Thaoxinh watches happily when he turns his back (state 2) or if goal is met */}
            <Thaoxinh scale={1} isHappy={isBackview || weight >= 100} showName={true} />
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border border-pink-100 relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-6 py-1 rounded-full font-bold shadow-sm whitespace-nowrap">
          {levelName}
        </div>
        
        <div className="mt-2 flex justify-between items-end mb-1">
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Weight</p>
            <p className="text-3xl font-black text-slate-800">{gameState.weight.toFixed(2)} <span className="text-lg text-slate-400">kg</span></p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 font-medium">Goal</p>
            <p className="text-xl font-bold text-pink-400">{nextLevelGoal} kg</p>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="relative mt-8 mb-8 w-[90%] mx-auto">
          {/* The Bar */}
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-1000 ease-out rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20 animate-[slide_1s_linear_infinite]"></div>
            </div>
          </div>
          
          {/* Previews */}
          {[0, 25, 50, 75, 100].map(w => {
            const isPassed = weight >= w;
            return (
              <div key={w} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10" style={{ left: `${w}%` }}>
                
                {/* Scaled Pig floating above */}
                <div className={`absolute bottom-full mb-1 transition-all duration-500 flex justify-center w-0 ${isPassed ? 'drop-shadow-md' : 'opacity-30 grayscale'}`}>
                   <div className="scale-[0.2] origin-bottom">
                     <Thaibeo weight={w} />
                   </div>
                </div>

                {/* The dot on the bar */}
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm relative ${isPassed ? 'bg-pink-500' : 'bg-slate-300'}`}></div>
                
                {/* The text below the bar */}
                <span className={`absolute top-full mt-1.5 text-[10px] font-bold ${isPassed ? 'text-pink-500' : 'text-slate-400'}`}>{w}kg</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
