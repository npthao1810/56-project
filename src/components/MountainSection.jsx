import React, { useState } from 'react';
import rewardsData from '../data/rewards.json';
import Thaibeo from './Thaibeo';
import { Gift, Lock, CheckCircle2, ChevronRight, X, ArrowUpCircle } from 'lucide-react';

export default function MountainSection({ gameState, claimReward }) {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showBackpack, setShowBackpack] = useState(false);
  
  // Highest milestone is 100
  const maxWeight = 100;
  // Current weight clamped to maxWeight for visual position
  const currentClimb = Math.min(gameState.weight, maxWeight);
  
  // Calculate vertical percentage (0 is bottom, 100 is top)
  const climbPercentage = (currentClimb / maxWeight) * 100;

  const handleClaim = (choiceId, cost) => {
    claimReward(selectedReward.id, choiceId, cost);
    setSelectedReward(null);
  };

  const isChoiceClaimed = (choiceId) => {
    return gameState.purchasedCoupons.some(c => c.choiceId === choiceId);
  };

  const isFullyClaimed = (rewardId) => {
    const reward = rewardsData.find(r => r.id === rewardId);
    if (!reward) return false;
    return isChoiceClaimed(reward.choiceA.id) && isChoiceClaimed(reward.choiceB.id);
  };

  return (
    <div className="flex flex-col h-full min-h-[80vh] relative bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 overflow-hidden pt-4 pb-24">
      
      {/* Header Info */}
      <div className="px-4 z-20 sticky top-0">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Altitude</p>
            <p className="text-2xl font-black text-pink-500 flex items-center gap-2">
              <ArrowUpCircle className="w-6 h-6" />
              {gameState.weight.toFixed(2)} kg
            </p>
          </div>
          <div className="text-right">
            <button 
              onClick={() => setShowBackpack(true)}
              className="bg-pink-100 text-pink-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-pink-200 transition-colors flex items-center gap-2 shadow-sm border border-pink-200"
            >
              <Gift className="w-4 h-4" />
              Backpack ({gameState.purchasedCoupons.length})
            </button>
          </div>
        </div>
      </div>

      {/* The Mountain Container */}
      <div className="relative flex-1 mt-8 mx-4">
        
        {/* Mountain Graphic Background */}
        <div className="absolute inset-x-0 bottom-0 top-10 flex justify-center pointer-events-none opacity-40">
           {/* Simple CSS Mountain shape */}
           <div className="w-[150%] h-[120%] bg-slate-300 rounded-t-[100%] translate-y-10 blur-sm mix-blend-multiply"></div>
           <div className="absolute w-[100%] h-[100%] bg-white rounded-t-[100%] -translate-y-10 blur-md"></div>
        </div>
        
        {/* The Track Line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-4 bg-white/50 backdrop-blur-sm -translate-x-1/2 rounded-full border-2 border-white shadow-inner"></div>
        
        {/* Thaibeo Climber */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 z-30 transition-all duration-1000 ease-out"
          style={{ bottom: `calc(10px + ${climbPercentage}% * 0.85)` }}
        >
          <div className="relative w-16 h-16 bg-white rounded-full border-4 border-pink-400 shadow-xl flex items-center justify-center animate-bounce">
            {/* Tiny backpack Thaibeo */}
            <div className="scale-[0.35]">
              <Thaibeo hasBackpack={true} />
            </div>
            
            {/* Tooltip */}
            <div className="absolute -top-10 bg-pink-500 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap shadow-md">
              {currentClimb < maxWeight ? "Climbing!" : "Summit Reached!"}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        {rewardsData.map((reward) => {
          const isUnlocked = gameState.weight >= reward.cost;
          const fullyClaimed = isFullyClaimed(reward.id);
          const posPercent = (reward.cost / maxWeight) * 100;
          
          return (
            <div 
              key={reward.id}
              className="absolute left-1/2 -translate-x-1/2 w-full flex justify-center z-20"
              style={{ bottom: `calc(10px + ${posPercent}% * 0.85)` }}
            >
              {/* Branch off to left or right alternating */}
              <div className={`relative flex items-center gap-3 w-64 ${reward.cost % 40 === 0 ? 'flex-row-reverse -translate-x-8' : 'translate-x-8'}`}>
                
                {/* Connector Line */}
                <div className={`h-1 bg-white/60 w-8 rounded-full ${fullyClaimed ? 'bg-green-400' : ''}`}></div>
                
                {/* Milestone Node */}
                <button 
                  disabled={!isUnlocked || fullyClaimed}
                  onClick={() => setSelectedReward(reward)}
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform relative
                    ${fullyClaimed ? 'bg-slate-200 border-4 border-slate-300 opacity-70 grayscale' : 
                      isUnlocked ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-4 border-white hover:scale-110 animate-pulse' : 
                      'bg-slate-100 border-4 border-slate-200 opacity-50 grayscale'
                    }
                  `}
                >
                  {reward.icon}
                  {fullyClaimed && (
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm text-green-500">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="absolute -top-2 -right-2 bg-slate-500 text-white rounded-full p-0.5 shadow-sm">
                      <Lock className="w-3 h-3" />
                    </div>
                  )}
                </button>
                
                {/* Text Label */}
                <div className={`flex flex-col ${reward.cost % 40 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full mb-1 ${fullyClaimed ? 'text-slate-400' : isUnlocked ? 'text-green-600' : 'text-slate-500'}`}>
                    {reward.cost} KG
                  </span>
                  <span className={`text-sm font-bold drop-shadow-sm ${isUnlocked && !fullyClaimed ? 'text-slate-800' : 'text-slate-500'}`}>
                    {reward.isSecret && !fullyClaimed ? "???" : reward.name}
                  </span>
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Claim Reward Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-6 text-white relative">
              <button 
                onClick={() => setSelectedReward(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-4xl mb-3">{selectedReward.icon}</div>
              <h3 className="text-2xl font-black mb-1">
                {selectedReward.isSecret ? "The Summit Prize" : selectedReward.name}
              </h3>
              <p className="text-sm font-medium text-green-100">
                Cost: -{selectedReward.cost} kg
              </p>
            </div>

            {/* Modal Body - 2 Choices */}
            <div className="p-5 bg-slate-50">
              <p className="text-sm text-slate-600 font-bold mb-4 text-center">
                You reached the altitude! Choose ONE reward:
              </p>
              
              <div className="space-y-3">
                {/* Choice A */}
                <div className={`bg-white rounded-2xl border-2 p-4 transition-colors shadow-sm relative overflow-hidden group ${isChoiceClaimed(selectedReward.choiceA.id) ? 'border-slate-200 opacity-60' : 'border-pink-100 hover:border-pink-400'}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${isChoiceClaimed(selectedReward.choiceA.id) ? 'bg-slate-300' : 'bg-pink-400'}`}></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1 pr-6">{selectedReward.choiceA.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{selectedReward.choiceA.description}</p>
                  
                  {isChoiceClaimed(selectedReward.choiceA.id) ? (
                    <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Already Claimed
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleClaim(selectedReward.choiceA.id, selectedReward.cost)}
                      className="w-full bg-pink-50 hover:bg-pink-500 text-pink-600 hover:text-white border border-pink-200 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-pink-500 group-hover:text-white"
                    >
                      Select Choice A <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-3 px-8">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span className="text-xs font-black text-slate-300 uppercase tracking-widest">OR</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                {/* Choice B */}
                <div className={`bg-white rounded-2xl border-2 p-4 transition-colors shadow-sm relative overflow-hidden group ${isChoiceClaimed(selectedReward.choiceB.id) ? 'border-slate-200 opacity-60' : 'border-blue-100 hover:border-blue-400'}`}>
                  <div className={`absolute top-0 left-0 w-1 h-full ${isChoiceClaimed(selectedReward.choiceB.id) ? 'bg-slate-300' : 'bg-blue-400'}`}></div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1 pr-6">{selectedReward.choiceB.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{selectedReward.choiceB.description}</p>
                  
                  {isChoiceClaimed(selectedReward.choiceB.id) ? (
                    <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Already Claimed
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleClaim(selectedReward.choiceB.id, selectedReward.cost)}
                      className="w-full bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-200 font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-blue-500 group-hover:text-white"
                    >
                      Select Choice B <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">
                ⚠️ Warning: Claiming a reward will burn {selectedReward.cost}kg and Thaibeo will slide down the mountain!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backpack Inventory Modal */}
      {showBackpack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 text-white relative shrink-0">
              <button 
                onClick={() => setShowBackpack(false)}
                className="absolute top-4 right-4 p-1.5 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8" />
                <h3 className="text-2xl font-black">Your Backpack</h3>
              </div>
            </div>

            {/* Modal Body - Inventory List */}
            <div className="p-5 bg-slate-50 overflow-y-auto flex-1">
              {gameState.purchasedCoupons.length === 0 ? (
                <div className="text-center py-10 opacity-50">
                   <div className="text-5xl mb-3 grayscale">🎒</div>
                   <p className="text-slate-600 font-bold">Backpack is empty!</p>
                   <p className="text-xs text-slate-400">Climb the mountain to earn rewards.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {gameState.purchasedCoupons.map((coupon, idx) => {
                    // Try to find the detailed reward data
                    const rewardData = rewardsData.find(r => r.id === coupon.rewardId);
                    
                    // Fallback just in case they have an old format coupon
                    if (!rewardData) {
                      return (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                          <p className="font-bold text-slate-700">Mystery Coupon: {coupon.rewardId || coupon}</p>
                        </div>
                      );
                    }
                    
                    // Determine which choice they made
                    const choice = coupon.choiceId === rewardData.choiceA.id ? rewardData.choiceA : 
                                   coupon.choiceId === rewardData.choiceB.id ? rewardData.choiceB : null;

                    return (
                      <div key={idx} className="bg-white p-4 rounded-2xl border-2 border-pink-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-400"></div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-black text-pink-400 uppercase tracking-widest">{rewardData.name} {rewardData.icon}</span>
                          <span className="text-[10px] text-slate-400 font-medium">Redeemed</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-base leading-tight mb-2">
                          {choice ? choice.title : "Reward"}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {choice ? choice.description : "You can claim this in real life!"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="bg-white p-4 border-t border-slate-100 text-center shrink-0">
              <p className="text-xs text-slate-400 font-medium">
                Show this screen to redeem your coupons in real life!
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
