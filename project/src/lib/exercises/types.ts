export type ExerciseType = "multiple_choice" | "numeric_input" | "step_by_step";

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ExerciseStep {
  id: string;
  title: string;
  content: string;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  locale: "en" | "ca" | "es";
  question: string;
  latex?: string;
  options?: ExerciseOption[];
  correctAnswer?: string | number;
  tolerance?: number;
  steps?: ExerciseStep[];
  hint?: string;
  explanation?: string;
  points: number;
}

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
