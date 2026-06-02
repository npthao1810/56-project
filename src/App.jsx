import { useState } from 'react';
import { useGameState } from './store/useGameState';
import HomeSection from './components/HomeSection';
import QuizSection from './components/QuizSection';
import BingoSection from './components/BingoSection';
import MountainSection from './components/MountainSection';
import SidequestSpawner from './components/SidequestSpawner';
import { Home, Heart, CheckSquare, Map } from 'lucide-react';

function App() {
  const { gameState, completeQuiz, addStamp, getPigScale, canEatSidequestFood, feedSidequestFood, claimReward } = useGameState();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen pb-20 font-sans">
      <SidequestSpawner canEatSidequestFood={canEatSidequestFood} feedSidequestFood={feedSidequestFood} />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent tracking-tight">
              Anniversary Quest
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Deadline: Jun 5, 2026
            </p>
          </div>
          <div className="flex items-center gap-2 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100 shadow-inner">
            <span className="text-sm font-black text-pink-600">{gameState.weight.toFixed(2)}</span>
            <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">kg</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto p-4 animate-in slide-in-from-bottom-4 duration-500 pb-24">
        {activeTab === 'home' && (
          <div className="transition-all duration-500">
            <HomeSection gameState={gameState} getPigScale={getPigScale} />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="transition-all duration-500">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Memory Challenge 🧠</h2>
              <p className="text-slate-500 text-sm">Answer correctly to feed Thaibeo!</p>
            </div>
            <QuizSection gameState={gameState} completeQuiz={completeQuiz} />
          </div>
        )}

        {activeTab === 'bingo' && (
          <div className="transition-all duration-500">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Real-Life Bingo 🗺️</h2>
              <p className="text-slate-500 text-sm">Complete challenges to collect stamps!</p>
            </div>
            <BingoSection gameState={gameState} addStamp={addStamp} />
          </div>
        )}

        {activeTab === 'mountain' && (
          <div className="transition-all duration-500">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">Mountain Climb 🏔️</h2>
              <p className="text-slate-500 text-sm">Reach the peak to claim rewards!</p>
            </div>
            <MountainSection gameState={gameState} claimReward={claimReward} />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 px-2 py-2 pb-safe">
        <div className="max-w-md mx-auto flex justify-between items-center relative">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl flex-1 transition-all duration-300 ${activeTab === 'home' ? 'text-pink-600 bg-pink-50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
          >
            <Home className={`w-6 h-6 mb-1 ${activeTab === 'home' ? 'fill-pink-200 stroke-pink-600' : 'stroke-slate-400'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl flex-1 transition-all duration-300 ${activeTab === 'quiz' ? 'text-pink-600 bg-pink-50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
          >
            <Heart className={`w-6 h-6 mb-1 ${activeTab === 'quiz' ? 'fill-pink-200 stroke-pink-600' : 'stroke-slate-400'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Quiz</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('bingo')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl flex-1 transition-all duration-300 ${activeTab === 'bingo' ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
          >
            <CheckSquare className={`w-6 h-6 mb-1 ${activeTab === 'bingo' ? 'fill-green-200 stroke-green-600' : 'stroke-slate-400'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Bingo</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('mountain')}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl flex-1 transition-all duration-300 ${activeTab === 'mountain' ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
          >
            <Map className={`w-6 h-6 mb-1 ${activeTab === 'mountain' ? 'fill-blue-200 stroke-blue-600' : 'stroke-slate-400'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Mountain</span>
          </button>

        </div>
      </nav>
    </div>
  );
}

export default App;
