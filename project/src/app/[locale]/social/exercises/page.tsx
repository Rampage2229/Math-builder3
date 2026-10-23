"use client";

import { ExerciseList } from "@/components/exercises/ExerciseList";
import { socialExercises } from "@/lib/exercises/social-exercises";

interface SocialExercisesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SocialExercisesPage({
  params,
}: SocialExercisesPageProps) {
  const { locale } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-16 px-4 bg-white dark:bg-black sm:py-24 sm:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Social Mathematics Exercises
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
            Practice descriptive statistics, probability distributions, inference, and regression.
          </p>
        </div>
        <ExerciseList
          exercises={socialExercises}
          title="Social Math Practice"
          description="Interactive exercises for social mathematics curriculum"
        />
      </main>
    </div>
  );
}
