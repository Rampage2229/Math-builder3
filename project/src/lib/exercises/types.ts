export type ExerciseType = "multiple_choice" | "numeric_input" | "step_by_step" | "formula_builder";

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  topic: string;
  difficulty: string;
  locale: string;
  question: string;
  correctAnswer: string | number;
  tolerance?: number;
  hint?: string;
  explanation?: string;
  points?: number;
  latex?: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  steps?: { id: string; title: string; content: string; explanation?: string }[];
}

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  topic: string;
  difficulty: string;
  locale: string;
  question: string;
  correctAnswer: string | number;
  tolerance?: number;
  hint?: string;
  explanation?: string;
  points?: number;
  latex?: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  steps?: { id: string; title: string; content: string; explanation?: string }[];
}

export interface Exercise {
  id: string;
  topic: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points?: number;
}

export interface Exercise {
  id: string;
  topic: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points?: number;
}
