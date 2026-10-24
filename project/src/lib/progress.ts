// Progress tracking utility for exercise completion
import { useState } from 'react';

export interface ProgressEntry {
  exerciseId: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
}

export interface UserProgress {
  topics: Record<string, {
    completedExercises: number;
    totalExercises: number;
  }>;
  completedExercises: string[];
  totalScore: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>({
    topics: {},
    completedExercises: [],
    totalScore: 0,
  });

  const loadProgress = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProgress');
      if (saved) {
        try {
          setProgress(JSON.parse(saved));
        } catch {
          // Ignore parse errors
        }
      }
    }
  };

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
    }
  };

  const markExerciseComplete = (exerciseId: string, topic: string, score: number) => {
    setProgress(prev => {
      const alreadyCompleted = prev.completedExercises.includes(exerciseId);
      if (alreadyCompleted) return prev;

      const newCompletedExercises = [...prev.completedExercises, exerciseId];
      const newTotalScore = prev.totalScore + score;
      
      const topicProgress = prev.topics[topic] || { completedExercises: 0, totalExercises: 0 };
      const newTopicProgress = {
        ...topicProgress,
        completedExercises: topicProgress.completedExercises + 1,
      };

      return {
        ...prev,
        completedExercises: newCompletedExercises,
        totalScore: newTotalScore,
        topics: {
          ...prev.topics,
          [topic]: newTopicProgress,
        },
      };
    });
  };

  return { progress, loadProgress, saveProgress, markExerciseComplete };
}
