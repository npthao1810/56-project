// June 5, 2026, 6:00 PM GMT+7 is:
// 2026-06-05T18:00:00+07:00
const GLOBAL_DEADLINE = new Date('2026-06-05T18:00:00+07:00').getTime();

export function isPastDeadline() {
  return Date.now() > GLOBAL_DEADLINE;
}

export function canClaimBingo(stamps) {
  if (!stamps || stamps.length === 0) return true;

  // We need to check if the user has claimed a bingo (3 contiguous stamps) within the last hour.
  // Wait, the rule is "1 bingo per hour". So if they ALREADY have a bingo, when was it achieved?
  // Let's simplify: They can only enter a new stamp if there hasn't been a stamp added in the last hour?
  // No, the rule was "in 1 hour he only can complete 1 bingo - 3 continuous challenges".
  // This means they can complete up to 3 challenges in 1 hour. If they try to complete a 4th challenge within that same hour, it should block?
  // Let's implement: "Cannot add a stamp if 3 stamps were added in the last 60 minutes".
  
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  const stampsInLastHour = stamps.filter(s => new Date(s.time).getTime() > oneHourAgo);
  
  return stampsInLastHour.length < 3;
}

export function getRemainingTimeUntilNextStamp(stamps) {
  if (canClaimBingo(stamps)) return 0;
  
  // Find the oldest stamp in the last hour
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  const stampsInLastHour = stamps.filter(s => new Date(s.time).getTime() > oneHourAgo);
  
  if (stampsInLastHour.length >= 3) {
    // Sort by oldest first
    stampsInLastHour.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    const oldestStampTime = new Date(stampsInLastHour[0].time).getTime();
    // They can add another stamp when the oldest stamp in that batch is > 1 hour old
    return (oldestStampTime + (60 * 60 * 1000)) - Date.now();
  }
  return 0;
}
