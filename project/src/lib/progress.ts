export interface ExerciseAttempt {
  exerciseId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  completedAt: Date;
}

export interface ExerciseProgress {
  completedExercises: Record<string, boolean>;
  attempts: ExerciseAttempt[];
  totalPoints: number;
}

export interface TopicProgress {
  topic: string;
  completed: number;
  total: number;
  averageScore: number;
  timeSpent: number; // in seconds
}

export interface UserProgress {
  topicProgress: Record<string, TopicProgress>;
  exerciseProgress: ExerciseProgress;
  totalTimeSpent: number; // in seconds
  lastActive: Date;
}

const STORAGE_KEY = "math_progress";

const defaultProgress: UserProgress = {
  topicProgress: {},
  exerciseProgress: {
    completedExercises: {},
    attempts: [],
    totalPoints: 0,
  },
  totalTimeSpent: 0,
  lastActive: new Date(),
};

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultProgress;
    }
    const parsed = JSON.parse(stored);
    return {
      ...defaultProgress,
      ...parsed,
      lastActive: new Date(parsed.lastActive || Date.now()),
      exerciseProgress: {
        ...defaultProgress.exerciseProgress,
        ...parsed.exerciseProgress,
        attempts: (parsed.exerciseProgress?.attempts || []).map(
          (a: ExerciseAttempt) => ({
            ...a,
            completedAt: new Date(a.completedAt),
          })
        ),
      },
      topicProgress: parsed.topicProgress || {},
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function updateExerciseProgress(
  progress: UserProgress,
  exerciseId: string,
  isCorrect: boolean,
  points: number,
  topic: string,
  timeSpent: number
): UserProgress {
  const now = new Date();
  const attempt: ExerciseAttempt = {
    exerciseId,
    userAnswer: "", // Will be filled by the component
    isCorrect,
    completedAt: now,
  };

  const completedExercises = { ...progress.exerciseProgress.completedExercises };
  if (isCorrect) {
    completedExercises[exerciseId] = true;
  }

  const attempts = [...progress.exerciseProgress.attempts, attempt];
  const totalPoints = progress.exerciseProgress.totalPoints + (isCorrect ? points : 0);

  // Update topic progress
  const topicProgress = { ...progress.topicProgress };
  const currentTopic = topicProgress[topic] || {
    topic,
    completed: 0,
    total: 0,
    averageScore: 0,
    timeSpent: 0,
  };
  currentTopic.total += 1;
  if (isCorrect) {
    currentTopic.completed += 1;
  }
  currentTopic.averageScore =
    (currentTopic.averageScore * (currentTopic.total - 1) + (isCorrect ? 100 : 0)) /
    currentTopic.total;
  currentTopic.timeSpent += timeSpent;
  topicProgress[topic] = currentTopic;

  return {
    ...progress,
    exerciseProgress: {
      completedExercises,
      attempts,
      totalPoints,
    },
    topicProgress,
    totalTimeSpent: progress.totalTimeSpent + timeSpent,
    lastActive: now,
  };
}

export function getTopicStats(
  progress: UserProgress,
  topic: string,
  totalExercises: number
): TopicProgress {
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
}

export function getOverallStats(progress: UserProgress): {
  totalExercises: number;
  completedExercises: number;
  averageScore: number;
  totalPoints: number;
  totalTimeSpent: number;
} {
  const completed = Object.values(progress.exerciseProgress.completedExercises).filter(
    Boolean
  ).length;
  const total = Object.keys(progress.exerciseProgress.completedExercises).length;
  const averageScore =
    total > 0
      ? (progress.exerciseProgress.attempts.filter((a) => a.isCorrect).length / total) * 100
      : 0;

  return {
    totalExercises: total,
    completedExercises: completed,
    averageScore,
    totalPoints: progress.exerciseProgress.totalPoints,
    totalTimeSpent: progress.totalTimeSpent,
  };
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}
