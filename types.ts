
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
  category: string;
  equipment: string;
  instructions: string[];
}

export interface ClassSchedule {
  day: string;
  time: string;
}

export interface GroupClass {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  difficulty: ExerciseDifficulty;
  category: string;
  instructor: string;
  capacity: number;
  duration: number; // in minutes
  schedule: ClassSchedule[];
  price?: number; // Optional price
}

// Types for MyProgress page
export interface WeeklyVolumeData {
    week: string;
    volume: number;
}

export interface PersonalRecord {
    exercise: string;
    weight: number;
    date: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
}

// Types for AI Coach
export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}