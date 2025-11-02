import { useState, useEffect } from 'react';

export const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      if (progress < duration) {
        const nextCount = Math.floor((progress / duration) * (end - start) + start);
        setCount(nextCount);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};
