import { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Navigation, X } from 'lucide-react';
import Thaoxinh from './Thaoxinh';
import Thaibeo from './Thaibeo';

export default function IntroModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="bg-[#FFFAF0] w-full max-w-sm rounded-[2rem] shadow-[0_20px_50px_rgba(244,114,182,0.3)] border-2 border-amber-100 overflow-hidden animate-in zoom-in-95 duration-500">

        {/* Header Graphic */}
        <div className="relative h-48 bg-gradient-to-b from-purple-200 via-pink-100 to-[#FFFAF0] flex items-end justify-center pb-4 border-b-2 border-amber-200/50">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>

          <div className="relative z-10 flex items-end justify-center w-full -mb-6 translate-x-4">
            <div className="scale-[0.8] origin-bottom drop-shadow-xl -mr-12 z-10 animate-[bounce_2s_infinite]">
              <Thaoxinh isHappy={true} />
            </div>
            <div className="scale-[0.8] origin-bottom drop-shadow-xl z-20 animate-[bounce_2.5s_infinite]">
              <Thaibeo weight={0} />
            </div>
          </div>

          {/* Sparkles */}
          <Sparkles className="absolute top-6 left-8 text-yellow-400 w-6 h-6 animate-pulse" />
          <Sparkles className="absolute top-12 right-12 text-pink-400 w-5 h-5 animate-pulse delay-300" />
        </div>

        {/* Story Content */}
        <div className="p-6 pt-5 bg-[url('https://www.transparenttextures.com/patterns/beige-paper.png')] relative">
          <div className="flex justify-center mb-3">
            <div className="bg-amber-100 p-2 rounded-full border border-amber-200 shadow-sm">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
          </div>

          <h2 className="text-xl font-black text-center text-slate-800 mb-3 drop-shadow-sm font-serif">
            A Royal Request
          </h2>

          <div className="text-sm text-slate-600 space-y-3 leading-relaxed text-center font-medium font-serif italic mb-6">
            <p>
              Once upon a time, Princess Thaoxinh found herself stranded at the bottom of the 2 years mountain.
            </p>
            <p>
              The peak holds beautiful treasures, but the climb is far too steep! Only her true boyfriend, Thaibeo-the-pig, can carry her to the top.
            </p>
            <p className="text-pink-600 font-bold">
              But alas, he is currently too small to be Thaibeo!!!
            </p>
            <p>
              Verify your identity in the Boyfriend Verification Trial, then travel the world to meet her, meanwhile gain enough strength to carry his pricess!
            </p>
            <p className="font-bold">
              You should do the "travel" misson first, and come back to do the verification later when you are with Thaoxinh.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate('quiz')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-2xl font-bold shadow-lg shadow-pink-200/50 active:scale-95 transition-transform flex items-center justify-center gap-2 border border-pink-300"
            >
              Boyfriend Verification
            </button>
            <button
              onClick={() => onNavigate('bingo')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200/50 active:scale-95 transition-transform flex items-center justify-center gap-2 border border-emerald-300"
            >
              Travel to meet her
            </button>
            <button
              onClick={onClose}
              className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-wider py-2 active:text-slate-600 transition-colors"
            >
              See the peak ⛰️
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
