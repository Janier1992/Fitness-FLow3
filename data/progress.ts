import { WeeklyVolumeData, PersonalRecord, Achievement } from '../types';

export const PROGRESS_DATA = {
    kpis: {
        totalWorkouts: 78,
        totalVolumeKg: 54200,
        timeInvestedHours: 65,
        prsBeaten: 4,
    },
    weeklyVolume: [
        { week: 'Sem 1', volume: 4500 },
        { week: 'Sem 2', volume: 4800 },
        { week: 'Sem 3', volume: 4700 },
        { week: 'Sem 4', volume: 5100 },
        { week: 'Sem 5', volume: 5500 },
        { week: 'Sem 6', volume: 5300 },
    ] as WeeklyVolumeData[],
    personalRecords: [
        { exercise: 'Peso Muerto', weight: 140, date: '2024-05-20' },
        { exercise: 'Press de Banca', weight: 95, date: '2024-05-18' },
        { exercise: 'Sentadilla', weight: 120, date: '2024-05-15' },
    ] as PersonalRecord[],
    achievements: [
        { id: 'first_workout', name: 'Rompiendo el Hielo', description: 'Completaste tu primer entrenamiento.', icon: '🎉', unlocked: true },
        { id: 'one_month', name: 'Constancia de Acero', description: 'Completaste tu primer mes.', icon: '🗓️', unlocked: true },
        { id: '100k_volume', name: 'Titán de Hierro', description: 'Levantaste 100,000 kg en total.', icon: '🌋', unlocked: false },
        { id: 'streak_5', name: 'Imparable', description: 'Racha de 5 días de entrenamiento.', icon: '🔥', unlocked: true },
    ] as Achievement[],
};