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
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const [showWrongPopup, setShowWrongPopup] = useState(false);
  const [wrongPopupData, setWrongPopupData] = useState({ msg: "", img: "" });
  const [wrongStreak, setWrongStreak] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);

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
      setMessages([{ sender: 'system', text: "You better show me how much you love me by answering these questions 😤", isImage: false }]);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const nextQuiz = quizzes[activeQuizIndex];
        const initialMsgs = [{ sender: 'system', text: nextQuiz.question, isImage: false }];
        if (nextQuiz.questionImage) {
          initialMsgs.push({ sender: 'system', text: nextQuiz.questionImage, isImage: true });
        }
        setMessages(prev => [...prev, ...initialMsgs]);
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
        // Correct! Show evidence image in chat if it exists
        const successMsgs = [{ sender: 'system', text: "That's exactly right! 😍", isImage: false }];
        if (currentQuiz.evidenceImage) {
          successMsgs.push({ sender: 'system', text: currentQuiz.evidenceImage, isImage: true });
        }
        setMessages(prev => [...prev, ...successMsgs]);

        // Trigger Correct Popup
        setTimeout(() => {
          setShowCorrectPopup(true);
        }, 1500);
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
    setShowEvidence(false);
    completeQuiz(currentQuiz.id, 0, false);
    setHasStarted(false);
    setMessages([]);
  };

  const handleDismissCorrectPopup = () => {
    setShowCorrectPopup(false);
    setShowEvidence(false);
    completeQuiz(currentQuiz.id, currentQuiz.points || 5, true);
    setHasStarted(false);
    setMessages([]);
  };

  const currentQuiz = activeQuizIndex !== -1 ? quizzes[activeQuizIndex] : null;
  const startButtonText = gameState.completedQuizzes.length === 0 ? "Start To Verify" : "Next Question";

  const correctCount = gameState.quizScore !== undefined ? gameState.quizScore : gameState.completedQuizzes.length;
  const maxQuestions = quizzes.length;
  const maxGap = 120; // Starting gap
  const minGap = -40; // Final gap (overlapping slightly)
  const progress = correctCount / maxQuestions;
  const marginPx = maxGap - (progress * (maxGap - minGap));

  let finalTitle = "";
  let finalMessage = "";
  if (activeQuizIndex === -1) {
    if (correctCount < 5) {
      finalTitle = "Verification Failed!";
      finalMessage = "😡 You need to give Thaoxinh 1M to continue! 💸 Countdown 3...2...1";
    } else if (correctCount >= 5 && correctCount <= 7) {
      finalTitle = "Suspicious...";
      finalMessage = "I doubt you are Thaoxinh's boyfriend... but I'll pretend not to notice. 👀";
    } else if (correctCount >= 8 && correctCount <= 9) {
      finalTitle = "cũm cũm!";
      finalMessage = "tạm, but your score should be greater! 😤";
    } else {
      finalTitle = "Identity Verified! 💕";
      finalMessage = "Ghê z?? Anh hack ak??! 😲";
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[70vh] bg-[#FFFAF0] bg-[url('https://www.transparenttextures.com/patterns/beige-paper.png')] rounded-2xl overflow-hidden border-2 border-amber-200 shadow-lg relative">

      {/* Top Header removed to link hearts closer to characters */}

      {!hasStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">

          {/* Couple SVG */}
          <div className="flex items-end justify-center w-full pb-2 relative z-10 scale-[0.75] mb-2 transition-all duration-1000 ease-in-out">
            <div className="z-20 transition-all duration-1000 ease-in-out" style={{ marginRight: `${marginPx}px` }}>
              <Thaibeo weight={gameState.weight} scale={1} showName={false} />
            </div>
            <div className="z-10 transition-all duration-1000 ease-in-out">
              <Thaoxinh scale={1} showName={false} />
            </div>
          </div>

          {/* Progress Hearts Linked to Characters */}
          <div className="flex flex-col items-center mb-8 bg-white/60 px-6 py-2 rounded-full shadow-sm border border-pink-100">
            <div className="flex gap-2 mb-1">
              {quizzes.map((q, idx) => (
                <Heart
                  key={idx}
                  className={`w-5 h-5 transition-all duration-300 ${gameState.completedQuizzes.includes(q.id)
                    ? 'fill-pink-500 text-pink-500 scale-110 animate-pulse'
                    : 'fill-slate-100 text-slate-200'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-pink-400">
              {gameState.completedQuizzes.length} / {quizzes.length} Hearts Collected
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2 font-serif">
            {activeQuizIndex !== -1 ? "Are you Thaoxinh's boyfriend? Let's check!" : finalTitle}
          </h3>
          <p className="text-sm text-slate-500 mb-8 font-medium">
            {activeQuizIndex !== -1
              ? "Answer correctly to prove your identity, bring them closer, and feed Thaibeo +5 kg!"
              : finalMessage}
          </p>

          {activeQuizIndex !== -1 ? (
            <button
              onClick={handleStartQuiz}
              className="bg-pink-500 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:bg-pink-600 transition-colors border border-pink-600 active:scale-95"
            >
              {gameState.completedQuizzes.length === 0 ? "Start Verification" : "Next Question"}
            </button>
          ) : (
            <button
              onClick={() => document.getElementById('nav-home-btn')?.click()}
              className="bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg hover:shadow-pink-200 transition-all border border-pink-600 animate-bounce active:scale-95"
            >
              View Thaibeo 🐷
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
                <div className={`max-w-[70%] rounded-2xl px-4 py-2 flex flex-col justify-center ${msg.sender === 'user'
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
          <div className="bg-white/80 backdrop-blur-sm p-3 border-t border-amber-200 shadow-[0_-4px_6px_-1px_rgba(251,191,36,0.1)] relative z-20">
            {currentQuiz && !isTyping && !isRevealing && (
              <div className="grid grid-cols-1 gap-2">
                {currentQuiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx, option)}
                    className="w-full text-left bg-[#FFFAF0] hover:bg-amber-50 text-amber-900 px-4 py-3 rounded-xl text-sm font-medium transition-colors border border-amber-200 shadow-sm"
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

      {/* Correct Answer Popup Overlay */}
      {showCorrectPopup && (
        <div className="absolute inset-0 z-50 bg-green-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-200">

          <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm flex flex-col items-center text-center animate-bounce max-h-[85vh] overflow-y-auto custom-scrollbar" style={{ animationIterationCount: 3 }}>

            {/* Happy Princess */}
            <div className="w-24 h-24 flex-shrink-0 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-500 shadow-inner mb-4 relative overflow-hidden">
              <div className="scale-125 translate-y-2">
                <Thaoxinh scale={0.8} isHappy={true} />
              </div>
            </div>

            <h2 className="text-2xl font-black text-green-600 mb-2 uppercase tracking-tight">
              Correct!
            </h2>

            <p className="text-slate-700 font-bold mb-4 whitespace-pre-wrap leading-relaxed">
              That's exactly right! 😍
            </p>

            {currentQuiz?.evidenceImage && (
              <>
                {!showEvidence ? (
                  <button
                    onClick={() => setShowEvidence(true)}
                    className="mb-4 bg-green-100 hover:bg-green-200 text-green-700 font-bold py-2 px-6 rounded-full border border-green-300 transition-colors shadow-sm animate-pulse"
                  >
                    Show Evidence 📸
                  </button>
                ) : (
                  <div className="relative p-1 bg-green-100 rounded-xl w-full mb-4">
                    <img
                      src={currentQuiz.evidenceImage}
                      alt="Evidence"
                      className="rounded-lg w-full h-auto opacity-90"
                    />
                    <div className="absolute inset-0 border-4 border-green-500/50 rounded-lg pointer-events-none"></div>
                    <div className="absolute -bottom-2 -right-2 text-6xl opacity-50 rotate-[15deg]">
                      ✅
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="bg-pink-500 text-white font-black text-xl px-6 py-2 rounded-full shadow-lg border-4 border-white animate-[pulse_1s_ease-in-out_infinite] mb-4">
              +5 KG for Thaibeo!
            </div>

            <button
              onClick={handleDismissCorrectPopup}
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-[0_4px_0_0_rgb(22,163,74)] active:translate-y-[4px] active:shadow-none"
            >
              Continue to verify
            </button>
          </div>
        </div>
      )}

      {/* Dramatic Wrong Answer Popup Overlay */}
      {showWrongPopup && (
        <div className="absolute inset-0 z-50 bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-200">

          {/* Shaking Container */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm flex flex-col items-center text-center animate-[shake_0.5s_ease-in-out] max-h-[85vh] overflow-y-auto custom-scrollbar">

            {/* Angry Princess */}
            <div className="w-24 h-24 flex-shrink-0 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-500 shadow-inner mb-4 relative overflow-hidden">
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
              <>
                {!showEvidence ? (
                  <button
                    onClick={() => setShowEvidence(true)}
                    className="mb-4 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-2 px-6 rounded-full border border-orange-300 transition-colors shadow-sm animate-pulse"
                  >
                    Show Evidence 📸
                  </button>
                ) : (
                  <div className="relative p-1 bg-red-100 rounded-xl w-full mb-4">
                    <img
                      src={wrongPopupData.img}
                      alt="Evidence"
                      className="rounded-lg w-full h-auto opacity-90 sepia-[0.2]"
                    />
                    <div className="absolute inset-0 border-4 border-red-500/50 rounded-lg pointer-events-none"></div>
                    <div className="absolute -bottom-2 -right-2 text-6xl opacity-50 rotate-[-15deg]">
                      ❌
                    </div>
                  </div>
                )}
              </>
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
