// Progress tracking utility for exercise completion
import { useState } from 'react';

export interface ProgressEntry {
  exerciseId: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
}

export interface TopicProgress {
  topicId: string;
  completedExercises: number;
  totalExercises: number;
}

export interface UserProgress {
  topics: TopicProgress[];
  completedExercises: string[];
  totalScore: number;
}

export function loadProgress(): UserProgress | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignore parse errors
      }
    }
  }
  return null;
}

export function saveProgress(newProgress: UserProgress): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
  }
}

export function getOverallStats(progress: UserProgress): {
  totalExercises: number;
  completedExercises: number;
  averageScore: number;
  completionRate: number;
} {
  const totalTopics = progress.topics.length;
  const totalExercises = progress.topics.reduce((sum, t) => sum + t.totalExercises, 0);
  const completedExercises = progress.completedExercises.length;
  const averageScore = totalExercises > 0 ? progress.totalScore / totalExercises : 0;
  const completionRate = totalExercises > 0 ? completedExercises / totalExercises : 0;

  return {
    totalExercises,
    completedExercises,
    averageScore,
    completionRate,
  };
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s]
    .map(v => v.toString().padStart(2, '0'))
    .join(':');
}

export function useProgress(): {
  progress: UserProgress;
  loadProgress: () => void;
  saveProgress: (newProgress: UserProgress) => void;
  markExerciseComplete: (exerciseId: string, topic: string, score: number) => void;
} {
  const [progress, setProgress] = useState<UserProgress>({
    topics: [],
    completedExercises: [],
    totalScore: 0,
  });

  const handleLoadProgress = () => {
    const saved = loadProgress();
    if (saved) {
      setProgress(saved);
    }
  };

  const handleSaveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const markExerciseComplete = (exerciseId: string, topic: string, score: number) => {
    setProgress(prev => {
      const alreadyCompleted = prev.completedExercises.includes(exerciseId);
      if (alreadyCompleted) return prev;

      const newCompletedExercises = [...prev.completedExercises, exerciseId];
      const newTotalScore = prev.totalScore + score;
      
      const topicIndex = prev.topics.findIndex(t => t.topicId === topic);
      const topicProgress = prev.topics[topicIndex] || { topicId: topic, completedExercises: 0, totalExercises: 0 };
      const newTopicProgress = {
        ...topicProgress,
        completedExercises: topicProgress.completedExercises + 1,
      };

      const newTopics = topicIndex >= 0
        ? [...prev.topics.slice(0, topicIndex), newTopicProgress, ...prev.topics.slice(topicIndex + 1)]
        : [...prev.topics, newTopicProgress];

      return {
        ...prev,
        completedExercises: newCompletedExercises,
        totalScore: newTotalScore,
        topics: newTopics,
      };
    });
  };

  return { progress, loadProgress: handleLoadProgress, saveProgress: handleSaveProgress, markExerciseComplete };
}
