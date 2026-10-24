export type ExerciseType = "multiple_choice" | "numeric_input" | "step_by_step" | "formula_builder";

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface ExerciseStep {
  title: string;
  content: string;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  question: string;
  type: ExerciseType;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  correctAnswer?: string | number;
  tolerance?: number;
  options?: ExerciseOption[];
  steps?: ExerciseStep[];
  latex?: string;
  explanation?: string;
  hint?: string;
}

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface ExerciseStep {
  title: string;
  content: string;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  question: string;
  type: ExerciseType;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  correctAnswer?: string | number;
  tolerance?: number;
  options?: ExerciseOption[];
  steps?: ExerciseStep[];
  latex?: string;
  explanation?: string;
  hint?: string;
}
