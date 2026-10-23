import { Exercise } from '@/lib/exercises/types';
import { ExerciseComponent } from './ExerciseComponent';

interface ExerciseListProps {
  exercises: Exercise[];
  title: string;
  description?: string;
}

export default function ExerciseList({ exercises, title, description }: ExerciseListProps) {
  return (
    <section className="exercise-list" aria-labelledby="exercise-list-title">
      <header className="exercise-list-header">
        <h2 id="exercise-list-title" className="exercise-list-title">{title}</h2>
        {description && <p className="exercise-list-description">{description}</p>}
      </header>
      <div className="exercises-grid">
        {exercises.map((exercise) => (
          <article key={exercise.id} className="exercise-card">
            <ExerciseComponent exercise={exercise} />
          </article>
        ))}
      </div>
    </section>
  );
}
