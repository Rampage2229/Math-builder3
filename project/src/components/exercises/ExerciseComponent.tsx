"use client";

import { useState } from "react";
import {
  FormulaDisplay,
  InlineFormula,
  BlockFormula,
} from "@/components/theory/FormulaDisplay";
import { ExerciseType } from "@/lib/exercises/types";
import type { Exercise } from "@/lib/exercises/types";

interface ExerciseComponentProps {
  exercise: Exercise;
  onComplete?: (exerciseId: string, isCorrect: boolean) => void;
}

export function ExerciseComponent({
  exercise,
  onComplete,
}: ExerciseComponentProps) {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const isCorrect = () => {
    if (exercise.type === "multiple_choice") {
      return userAnswer === exercise.correctAnswer?.toString();
    }
    if (exercise.type === "numeric_input") {
      const tolerance = exercise.tolerance || 0.01;
      return (
        Math.abs(Number(userAnswer) - Number(exercise.correctAnswer)) <=
        tolerance
      );
    }
    if (exercise.type === "step_by_step") {
      return (
        exercise.steps?.[currentStep]?.explanation?.includes(userAnswer) ||
        false
      );
    }
    return false;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = isCorrect();
    onComplete?.(exercise.id, correct);
    if (
      exercise.type === "step_by_step" &&
      currentStep < (exercise.steps?.length || 0) - 1
    ) {
      setCurrentStep(currentStep + 1);
      setSubmitted(false);
      setUserAnswer("");
    }
  };

  const handleNextStep = () => {
    if (currentStep < (exercise.steps?.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
      setSubmitted(false);
      setUserAnswer("");
    }
  };

  const renderQuestion = () => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {exercise.title}
      </h3>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">
        {exercise.question}
      </p>
      {exercise.latex && (
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 my-4">
          <BlockFormula latex={exercise.latex} />
        </div>
      )}
    </div>
  );

  const renderMultipleChoice = () => (
    <div className="space-y-3">
      {exercise.options?.map((option) => (
        <label
          key={option.id}
          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
            submitted
              ? option.isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : option.id === userAnswer
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-zinc-200 dark:border-zinc-700"
              : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700"
          }`}
        >
          <input
            type="radio"
            name={exercise.id}
            value={option.id}
            checked={userAnswer === option.id}
            onChange={(e) => !submitted && setUserAnswer(e.target.value)}
            disabled={submitted}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-zinc-700 dark:text-zinc-300">
            {option.text}
          </span>
        </label>
      ))}
    </div>
  );

  const renderNumericInput = () => (
    <div className="max-w-xs">
      <input
        type="number"
        step="any"
        value={userAnswer}
        onChange={(e) => !submitted && setUserAnswer(e.target.value)}
        disabled={submitted}
        placeholder="Enter your answer..."
        className={`w-full px-4 py-3 rounded-lg border-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          submitted
            ? isCorrect()
              ? "border-green-500"
              : "border-red-500"
            : "border-zinc-300 dark:border-zinc-600"
        }`}
      />
      {exercise.tolerance && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Tolerance: ±{exercise.tolerance}
        </p>
      )}
    </div>
  );

  const renderStepByStep = () => {
    const step = exercise.steps?.[currentStep];
    if (!step) return null;

    return (
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Step {currentStep + 1}: {step.title}
          </h4>
          <p className="text-zinc-700 dark:text-zinc-300">{step.content}</p>
          {step.explanation && showExplanation && (
            <p className="text-green-700 dark:text-green-300 mt-2">
              <strong>Explanation:</strong> {step.explanation}
            </p>
          )}
        </div>
        {step.explanation && !showExplanation && (
          <button
            onClick={() => setShowExplanation(true)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Show explanation
          </button>
        )}
      </div>
    );
  };

  const renderAnswerInput = () => {
    switch (exercise.type) {
      case "multiple_choice":
        return renderMultipleChoice();
      case "numeric_input":
        return renderNumericInput();
      case "step_by_step":
        return renderStepByStep();
      default:
        return null;
    }
  };

  const renderFeedback = () => {
    if (!submitted) return null;

    const correct = isCorrect();

    return (
      <div
        className={`mt-4 p-4 rounded-lg ${
          correct
            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        }`}
      >
        <p
          className={`font-medium ${correct ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}
        >
          {correct ? "✓ Correct!" : "✗ Incorrect"}
        </p>
        {exercise.explanation && (
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">
            <strong>Explanation:</strong> {exercise.explanation}
          </p>
        )}
        {exercise.type === "step_by_step" &&
          currentStep < (exercise.steps?.length || 0) - 1 && (
            <button
              onClick={handleNextStep}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Step
            </button>
          )}
      </div>
    );
  };

  return (
    <article className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            exercise.difficulty === "beginner"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : exercise.difficulty === "intermediate"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {exercise.difficulty}
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {exercise.points} points
        </span>
      </div>

      {renderQuestion()}
      {renderAnswerInput()}

      {!submitted && exercise.type !== "step_by_step" && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={!userAnswer}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit
          </button>
          {exercise.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
          )}
        </div>
      )}

      {showHint && exercise.hint && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>Hint:</strong> {exercise.hint}
          </p>
        </div>
      )}

      {renderFeedback()}
    </article>
  );
}
