import { useState, useEffect, useRef } from 'react';
import quizzes from '../data/quizzes.json';
import { Heart } from 'lucide-react';
import Thaibeo from './Thaibeo';
import Thaoxinh from './Thaoxinh';

export default function QuizSection({ gameState, completeQuiz }) {
  const [activeQuizIndex, setActiveQuizIndex] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showEatingPopup, setShowEatingPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [wrongPopupData, setWrongPopupData] = useState({ msg: "", img: "" });
  const [wrongStreak, setWrongStreak] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  
  const chatEndRef = useRef(null);

  // Find the first uncompleted quiz
  useEffect(() => {
    const nextQuizIndex = quizzes.findIndex(q => !gameState.completedQuizzes.includes(q.id));
    setActiveQuizIndex(nextQuizIndex);
  }, [gameState.completedQuizzes]);

  const handleStartQuiz = () => {
    setHasStarted(true);
    setIsRevealing(false);
    if (activeQuizIndex !== -1) {
      setMessages([{ sender: 'system', text: "Hey love! 💖 Ready for today's question?", isImage: false }]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { sender: 'system', text: quizzes[activeQuizIndex].question, isImage: false }]);
      }, 1000);
    } else {
      setMessages([{ sender: 'system', text: "Wow! You've answered all the questions! 🎉 I love you!", isImage: false }]);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleAnswer = (optionIndex, optionText) => {
    const currentQuiz = quizzes[activeQuizIndex];
    setIsRevealing(true); // Disable buttons
    
    // Add user's answer to chat
    setMessages(prev => [...prev, { sender: 'user', text: optionText, isImage: false }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (optionIndex === currentQuiz.correctIndex) {
        // Correct! Show evidence image in chat
        setMessages(prev => [
          ...prev, 
          { sender: 'system', text: "That's exactly right! 😍", isImage: false },
          { sender: 'system', text: currentQuiz.evidenceImage, isImage: true }
        ]);
        
        // Trigger Eating Popup
        setTimeout(() => {
          setShowEatingPopup(true);
        }, 1500);

        // Hide eating popup and complete quiz after a few seconds
        setTimeout(() => {
          setShowEatingPopup(false);
          completeQuiz(currentQuiz.id, currentQuiz.points || 10);
          setHasStarted(false); // Reset to start screen
          setMessages([]);
        }, 4500);
      } else {
        // Wrong
        const newStreak = wrongStreak + 1;
        setWrongStreak(newStreak);
        
        let errorMsg = "";
        const correctAnswerText = currentQuiz.options[currentQuiz.correctIndex];
        
        if (newStreak === 1) {
          errorMsg = `Oops, that's not it...\n\nThe correct answer was:\n"${correctAnswerText}"`;
        } else if (newStreak === 2) {
          errorMsg = `Wait, you really missed that?\n\nThe answer was:\n"${correctAnswerText}"`;
        } else if (newStreak === 3) {
          errorMsg = `Are you even trying?!\n\nIt's "${correctAnswerText}"!`;
        } else {
          errorMsg = `I CANNOT BELIEVE YOU MISSED THIS! 😡\n\nIt is obviously "${correctAnswerText}"!`;
        }

        // Show dramatic popup instead of chat
        setWrongPopupData({ msg: errorMsg, img: currentQuiz.evidenceImage });
        setShowWrongPopup(true);
      }
    }, 1500);
  };

  const handleDismissWrongPopup = () => {
    setShowWrongPopup(false);
    completeQuiz(currentQuiz.id, 0);
    setHasStarted(false);
    setMessages([]);
  };

  const currentQuiz = activeQuizIndex !== -1 ? quizzes[activeQuizIndex] : null;
  const startButtonText = gameState.completedQuizzes.length === 0 ? "Start Today's Quiz" : "Next Question";

  return (
    <div className="flex flex-col h-[600px] max-h-[70vh] bg-pink-50 rounded-2xl overflow-hidden border border-pink-200 shadow-sm relative">
      
      {/* Progress Header */}
      <div className="bg-white px-4 py-2 border-b border-pink-100 flex flex-col items-center z-10">
        <span className="text-xs font-bold text-pink-400 mb-1">
          {gameState.completedQuizzes.length} / {quizzes.length} Completed
        </span>
        <div className="flex gap-1">
          {quizzes.map((q, idx) => (
            <Heart 
              key={idx} 
              className={`w-4 h-4 transition-all duration-300 ${
                gameState.completedQuizzes.includes(q.id) 
                  ? 'fill-pink-500 text-pink-500 scale-110' 
                  : 'fill-slate-100 text-slate-200'
              }`} 
            />
          ))}
        </div>
      </div>

      {!hasStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          
          {/* Couple SVG instead of Heart */}
          <div className="flex items-end justify-center w-full pb-2 relative z-10 scale-125 mb-4">
            <div className="-mr-4 z-20">
              <Thaibeo weight={gameState.weight} scale={0.6} showName={false} />
            </div>
            <div className="z-10">
              <Thaoxinh scale={0.6} showName={false} />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {activeQuizIndex !== -1 ? "Ready for a memory challenge?" : "You did it!"}
          </h3>
          <p className="text-slate-500 mb-6 text-sm">
            {activeQuizIndex !== -1 
              ? "Join the quiz to test your memory and feed Thaibeo!" 
              : "You've completed all available quizzes! Come back later for more."}
          </p>
          {activeQuizIndex !== -1 && (
            <button 
              onClick={handleStartQuiz}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              {startButtonText}
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full flex-shrink-0 bg-white border border-pink-100 overflow-hidden shadow-sm flex items-center justify-center">
                  {msg.sender === 'system' ? (
                     <Thaoxinh scale={0.4} />
                  ) : (
                     <Thaibeo weight={gameState.weight} scale={0.4} />
                  )}
                </div>
                
                {/* Bubble */}
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 flex flex-col justify-center ${
                  msg.sender === 'user' 
                    ? 'bg-green-500 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-pink-100 shadow-sm'
                }`}>
                  {msg.isImage ? (
                    <img src={msg.text} alt="Evidence" className="rounded-xl mt-1 max-w-full h-auto object-cover border border-slate-100 shadow-sm" />
                  ) : (
                    <p className="text-sm">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 flex-row">
                <div className="w-10 h-10 rounded-full flex-shrink-0 bg-white border border-pink-100 overflow-hidden shadow-sm flex items-center justify-center">
                  <Thaoxinh scale={0.4} />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-pink-100 shadow-sm flex items-center space-x-1">
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area (Options) */}
          <div className="bg-white p-3 border-t border-pink-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-20">
            {currentQuiz && !isTyping && !isRevealing && (
               <div className="grid grid-cols-1 gap-2">
                 {currentQuiz.options.map((option, idx) => (
                   <button 
                     key={idx}
                     onClick={() => handleAnswer(idx, option)}
                     className="w-full text-left bg-pink-50 hover:bg-pink-100 text-pink-700 px-4 py-3 rounded-xl text-sm font-medium transition-colors border border-pink-200"
                   >
                     {option}
                   </button>
                 ))}
               </div>
            )}
            {(!currentQuiz || isTyping || isRevealing) && (
              <div className="flex justify-center items-center py-4 text-pink-400">
                <Heart className="w-6 h-6 animate-pulse" />
              </div>
            )}
          </div>
        </>
      )}

      {/* Massive Eating Popup Overlay */}
      {showEatingPopup && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
          <h2 className="text-4xl font-black text-white drop-shadow-lg mb-8 animate-bounce">
            DELICIOUS!
          </h2>
          <div className="scale-150 mb-8 drop-shadow-2xl">
            <Thaibeo weight={gameState.weight} scale={1} isEating={true} />
          </div>
          <div className="bg-green-500 text-white font-black text-2xl px-6 py-2 rounded-full shadow-lg border-4 border-white animate-[pulse_1s_ease-in-out_infinite]">
            +10 KG
          </div>
        </div>
      )}

      {/* Dramatic Wrong Answer Popup Overlay */}
      {showWrongPopup && (
        <div className="absolute inset-0 z-50 bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-200">
          
          {/* Shaking Container */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm flex flex-col items-center text-center animate-[shake_0.5s_ease-in-out]">
            
            {/* Angry Princess */}
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-500 shadow-inner mb-4 relative overflow-hidden">
               <div className="scale-125 translate-y-2">
                 <Thaoxinh scale={0.8} isAngry={true} />
               </div>
            </div>

            <h2 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tight">
              Wrong!
            </h2>
            
            <p className="text-slate-700 font-bold mb-4 whitespace-pre-wrap leading-relaxed">
              {wrongPopupData.msg}
            </p>

            {wrongPopupData.img && (
              <div className="relative p-1 bg-red-100 rounded-xl overflow-hidden w-full mb-4">
                <img 
                  src={wrongPopupData.img} 
                  alt="Evidence" 
                  className="rounded-lg w-full h-40 object-cover opacity-90 sepia-[0.2]"
                />
                <div className="absolute inset-0 border-4 border-red-500/50 rounded-lg pointer-events-none"></div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-50 rotate-[-15deg]">
                  ❌
                </div>
              </div>
            )}
            
            <button 
              onClick={handleDismissWrongPopup}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              I will try my best next question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
