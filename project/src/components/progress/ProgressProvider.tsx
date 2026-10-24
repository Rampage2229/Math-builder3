"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  UserProgress,
  loadProgress,
  saveProgress,
  getOverallStats as getOverallStatsLib,
  formatTime,
  TopicProgress,
} from "@/lib/progress";

// Type for the overall stats returned by the library function
type OverallStats = ReturnType<typeof getOverallStatsLib>;

interface ProgressContextType {
  progress: UserProgress;
  refreshProgress: () => void;
  getTopicStats: (topic: string, totalExercises: number) => TopicProgress;
  getOverallStats: () => OverallStats;
  formatTime: (seconds: number) => string;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

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

  const getTopicStats = (
    topic: string,
    totalExercises: number,
  ): TopicProgress => {
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

  const getOverallStats = (): OverallStats => getOverallStatsLib(progress);

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
