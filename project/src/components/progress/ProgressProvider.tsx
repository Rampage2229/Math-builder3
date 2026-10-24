"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { UserProgress, loadProgress, saveProgress, getOverallStats, formatTime, TopicProgress } from "@/lib/progress";

interface ProgressContextType {
  progress: UserProgress;
  refreshProgress: () => void;
  getTopicStats: (topic: string, totalExercises: number) => TopicProgress;
  getOverallStats: () => ReturnType<typeof getOverallStats>;
  formatTime: (seconds: number) => string;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());

  const refreshProgress = () => {
    setProgress(loadProgress());
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setProgress(loadProgress());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getTopicStats = (topic: string, totalExercises: number): TopicProgress => {
    const topicProgress = progress.topicProgress[topic];
    if (!topicProgress) {
      return {
        topic,
        completed: 0,
        total: totalExercises,
        averageScore: 0,
        timeSpent: 0,
      };
    }
    return {
      ...topicProgress,
      total: totalExercises,
    };
  };

  const getOverallStats = () => getOverallStats(progress);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        refreshProgress,
        getTopicStats,
        getOverallStats,
        formatTime,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
