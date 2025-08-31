
export interface UserProfile {
  goal: 'build_muscle' | 'lose_fat' | 'improve_endurance' | 'general_fitness';
  level: 'beginner' | 'intermediate' | 'advanced';
  daysPerWeek: number;
  equipment: string[];
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: number;
  description: string;
  imageSearchQuery: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  warmUp: string;
  exercises: Exercise[];
  coolDown: string;
}

export interface WorkoutPlan {
  weeklyPlan: DailyWorkout[];
}

export type ExerciseDifficulty = 'Principiante' | 'Intermedio' | 'Avanzado';

export interface LibraryExercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  difficulty: ExerciseDifficulty;
  tags: string[];
  duration: number; // in minutes
  caloriesPerMin: number;
  isFavorite: boolean;
  isPremium?: boolean;
}
