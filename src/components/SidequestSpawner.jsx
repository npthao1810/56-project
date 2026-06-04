import { useState, useEffect } from 'react';

const FOODS = ["🧋", "🍰", "🍣", "🥖", "🍜", "☕️", "🥩"];

export default function SidequestSpawner({ canEatSidequestFood, feedSidequestFood }) {
  const [foodItem, setFoodItem] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showAnimation, setShowAnimation] = useState(false);
  const [animProps, setAnimProps] = useState({ text: "", color: "", x: 0, y: 0 });

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
    const isBadFood = foodItem === "☕️" || foodItem === "🥩";
    const weightChange = isBadFood ? -0.2 : 0.2;
    const msg = isBadFood ? "-0.2kg, Thaibeo hong thik" : "+0.2kg, Thaibeo thik ^^";
    const color = isBadFood ? "text-red-500" : "text-green-500";

    // Record click position for the text animation
    setAnimProps({ text: msg, color: color, x: e.clientX, y: e.clientY });
    setShowAnimation(true);
    setFoodItem(null); // Hide food

    feedSidequestFood(weightChange);

    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
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

      {/* +0.2kg / -0.2kg Animation */}
      {showAnimation && (
        <div
          className={`fixed z-[110] font-black text-xl drop-shadow-md animate-in zoom-in slide-in-from-bottom-8 duration-500 whitespace-nowrap ${animProps.color}`}
          style={{
            left: `${animProps.x}px`,
            top: `${animProps.y - 20}px`,
            pointerEvents: 'none',
            transform: 'translateX(-50%)'
          }}
        >
          {animProps.text}
        </div>
      )}
    </>
  );
}
