import { useEffect, useState } from "react";

import { ProgressConfig } from "@/core/types";

const useProgressBar = (config: ProgressConfig, tasksDone?: number): number => {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const startDurationTimeProgress = (): number => {
    let animationFrame: number;
    const start = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min((elapsed / config.limit) * 100, 100);
      setProgressPercentage(Math.floor(progress));

      if (elapsed < config.limit) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return animationFrame;
  };

  const startTaskDoneProgress = (): void => {
    if (tasksDone) {
      const progressPercentage = Math.floor((tasksDone * 100) / config.limit);
      if (tasksDone < config.limit) setProgressPercentage(progressPercentage);
    }
  };

  useEffect(() => {
    let animationFrame: number;

    if (config.mode === "duration-timer") {
      animationFrame = startDurationTimeProgress();
    } else {
      startTaskDoneProgress();
    }

    return () => cancelAnimationFrame(animationFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.mode, tasksDone]);

  return progressPercentage;
};
export default useProgressBar;
