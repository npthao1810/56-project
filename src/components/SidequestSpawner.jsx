import { useState, useEffect } from 'react';

const FOODS = ["🧋", "🍰", "🍣", "🥖", "🍜"];

export default function SidequestSpawner({ canEatSidequestFood, feedSidequestFood }) {
  const [foodItem, setFoodItem] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showAnimation, setShowAnimation] = useState(false);
  const [animPosition, setAnimPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Spawning loop
    let timeoutId;

    const spawnLoop = () => {
      // Spawn exactly every 2 seconds
      const nextSpawnMs = 2000;

      timeoutId = setTimeout(() => {
        if (canEatSidequestFood() && !foodItem) {
          // Spawn food!
          const randomFood = FOODS[Math.floor(Math.random() * FOODS.length)];
          // Keep it within standard mobile screen bounds
          const randomX = Math.floor(Math.random() * 80) + 10; // 10% to 90%
          const randomY = Math.floor(Math.random() * 60) + 20; // 20% to 80%
          
          setFoodItem(randomFood);
          setPosition({ x: randomX, y: randomY });
          
          // Despawn after 5 seconds if not clicked
          setTimeout(() => {
            setFoodItem(null);
          }, 5000);
        }
        
        // Loop
        spawnLoop();
      }, nextSpawnMs);
    };

    spawnLoop();

    return () => clearTimeout(timeoutId);
  }, [canEatSidequestFood, foodItem]);

  const handleEat = (e) => {
    // Record click position for the +50g animation
    setAnimPosition({ x: e.clientX, y: e.clientY });
    setShowAnimation(true);
    setFoodItem(null); // Hide food
    
    feedSidequestFood();

    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Food */}
      {foodItem && (
        <button 
          onClick={handleEat}
          className="fixed z-[9999] animate-[bounce_1s_infinite] drop-shadow-xl flex flex-col items-center hover:scale-110 active:scale-95 transition-transform"
          style={{ 
            left: `${position.x}%`, 
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm text-pink-500 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm mb-1 animate-pulse border border-pink-100">
            Eat me!
          </div>
          <div className="text-4xl bg-white/50 backdrop-blur-sm p-2 rounded-full border-2 border-white shadow-lg">
            {foodItem}
          </div>
        </button>
      )}

      {/* +50g Animation */}
      {showAnimation && (
        <div 
          className="fixed z-[110] font-black text-green-500 text-xl drop-shadow-md animate-[ping_1s_cubic-bezier(0,0,0.2,1)_forwards]"
          style={{ 
            left: `${animPosition.x}px`, 
            top: `${animPosition.y - 20}px`,
            pointerEvents: 'none'
          }}
        >
          +0.2kg
        </div>
      )}
    </>
  );
}
