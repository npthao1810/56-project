import { useState, useEffect } from 'react';

const STORAGE_KEY = 'anniversary_quest_state';

const defaultState = {
  weight: 5, // Starting weight in kg
  completedQuizzes: [],
  stamps: [], 
  purchasedCoupons: [],
  sidequestFoodsEaten: [], // Array of ISO timestamp strings
};

export function useGameState() {
  const [gameState, setGameState] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed.points !== undefined && parsed.weight === undefined) {
          parsed.weight = parsed.points > 0 ? parsed.points : 5;
          delete parsed.points;
        }
        if (!parsed.sidequestFoodsEaten) {
          parsed.sidequestFoodsEaten = [];
        }
        return parsed;
      }
      return defaultState;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  }, [gameState]);

  const addWeight = (amount) => {
    // Format to 2 decimal places to avoid floating point math weirdness
    setGameState(prev => ({ 
      ...prev, 
      weight: parseFloat((prev.weight + amount).toFixed(2)) 
    }));
  };

  const completeQuiz = (quizId, rewardWeight, isCorrect = false) => {
    setGameState(prev => {
      if (prev.completedQuizzes.includes(quizId)) return prev;
      return {
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizId],
        weight: parseFloat((prev.weight + rewardWeight).toFixed(2)),
        quizScore: (prev.quizScore !== undefined ? prev.quizScore : prev.completedQuizzes.length) + (isCorrect ? 1 : 0)
      };
    });
  };

  const addStamp = (stampId, rewardWeight) => {
    setGameState(prev => {
      if (prev.stamps.some(s => s.id === stampId)) return prev;
      
      const newStamps = [...prev.stamps, { id: stampId, time: new Date().toISOString() }];
      let finalReward = rewardWeight; // Base reward (10 or 5 depending on what is passed)

      // Calculate bonuses (in a real app we'd calculate exact lines formed, 
      // but for simplicity, let's just award bonus on specific thresholds)
      // Actually, since BingoSection calculates the board, it's safer to pass the bonus 
      // directly from BingoSection or calculate it here.
      // We will let BingoSection handle the bonus logic and just pass the total rewardWeight.
      // So this is fine as is!
      
      return {
        ...prev,
        stamps: newStamps,
        weight: parseFloat((prev.weight + finalReward).toFixed(2))
      };
    });
  };

  const feedSidequestFood = () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    setGameState(prev => {
      // Filter out foods older than 1 hour
      const recentFoods = prev.sidequestFoodsEaten.filter(timeStr => new Date(timeStr) > oneHourAgo);
      
      // Enforce max 20 per hour
      if (recentFoods.length >= 20) {
        return prev;
      }

      return {
        ...prev,
        sidequestFoodsEaten: [...recentFoods, now.toISOString()],
        weight: parseFloat((prev.weight + 0.2).toFixed(2)) // +200 grams
      };
    });
  };

  const canEatSidequestFood = () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const recentFoods = gameState.sidequestFoodsEaten.filter(timeStr => new Date(timeStr) > oneHourAgo);
    return recentFoods.length < 20;
  };

  const claimReward = (rewardId, choiceId, cost) => {
    setGameState(prev => {
      if (prev.weight < cost) return prev;
      // Check if this EXACT choice is already claimed
      if (prev.purchasedCoupons.some(c => c.choiceId === choiceId)) return prev;
      
      return {
        ...prev,
        weight: parseFloat((prev.weight - cost).toFixed(2)),
        purchasedCoupons: [...prev.purchasedCoupons, { rewardId, choiceId, time: new Date().toISOString() }]
      };
    });
  };

  const purchaseCoupon = (couponId, cost) => {
    // Deprecated: keeping for backwards compatibility just in case
    setGameState(prev => {
      if (prev.weight < cost) return prev;
      return {
        ...prev,
        weight: parseFloat((prev.weight - cost).toFixed(2)),
        purchasedCoupons: [...prev.purchasedCoupons, couponId]
      };
    });
  };

  const resetGame = () => {
    setGameState(defaultState);
  };

  return {
    gameState,
    addWeight,
    completeQuiz,
    addStamp,
    feedSidequestFood,
    canEatSidequestFood,
    claimReward,
    resetGame
  };
}
