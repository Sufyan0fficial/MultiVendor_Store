import { useEffect, useState } from "react";

function Timer({ time }) {
  const [remainingTime, setRemainingTime] = useState(null);

  function calculateTimeLeft(endingTime) {
    const now = new Date();
    const difference = endingTime - now;

    if (isNaN(difference) || difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (!time) return; // ✅ Wait until prop arrives

    const endingTime = new Date(time);

    if (isNaN(endingTime)) {
      console.error("Invalid time format passed to Timer:", time);
      return;
    }

    // Initial run
    setRemainingTime(calculateTimeLeft(endingTime));

    // Interval updates
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeLeft(endingTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]); // ✅ Re-run if prop changes

  if (!remainingTime) {
    return (
      <div className="text-red-600 text-center md:text-start text-2xl mb-10 mt-6 font-semibold ">
        Time is up ⏰
      </div>
    );
  }

  const { days, hours, minutes, seconds } = remainingTime;

  return (
    <div className="text-center md:text-start text-2xl mb-7 font-semibold space-x-3 mt-4 text-blue-700">
      <span>{days}d</span>
      <span>{hours}h</span>
      <span>{minutes}m</span>
      <span>{seconds}s</span>
    </div>
  );
}

export default Timer;
