// Progress tracking utility for exercise completion
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
  scores: Record<string, number>;
  timeSpent: Record<string, number>;
}

const STORAGE_KEY = "math-curriculum-progress";

const defaultProgress: UserProgress = {
  topics: {},
  completedExercises: [],
  scores: {},
  timeSpent: {},
};

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProgress, ...JSON.parse(stored) };
    }
  } catch {
    // Ignore parse errors
  }
  return defaultProgress;
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}

export function useProgress() {
  const [progress, setProgress] = React.useState<UserProgress>(defaultProgress);

  React.useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const markExerciseComplete = (
    exerciseId: string,
    topic: string,
    isCorrect: boolean,
    score: number,
    timeSpent: number
  ) => {
    const newProgress = { ...progress };
    const completed = new Set(newProgress.completedExercises);
    completed.add(exerciseId);
    newProgress.completedExercises = Array.from(completed);
    newProgress.scores[exerciseId] = score;
    newProgress.timeSpent[exerciseId] = timeSpent;

    const topicProgress = newProgress.topics[topic] || {
      completedExercises: 0,
      totalExercises: 0,
    };
    if (!completed.has(exerciseId)) {
      topicProgress.completedExercises += 1;
    }
    topicProgress.totalExercises = Math.max(
      topicProgress.totalExercises,
      topicProgress.completedExercises
    );
    newProgress.topics[topic] = topicProgress;

    setProgress(newProgress);
    saveProgress(newProgress);
  };

  return {
    progress,
    loadProgress: () => setProgress(loadProgress()),
    markExerciseComplete,
  };
}
