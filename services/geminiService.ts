import { GoogleGenAI, Type } from "@google/genai";
import { type UserProfile, type WorkoutPlan } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const workoutPlanSchema = {
    type: Type.OBJECT,
    properties: {
        weeklyPlan: {
            type: Type.ARRAY,
            description: "Un arreglo de sesiones de entrenamiento diarias para la semana.",
            items: {
                type: Type.OBJECT,
                required: ["day", "focus", "warmUp", "exercises", "coolDown"],
                properties: {
                    day: { type: Type.STRING, description: "Día de la semana o número de sesión (ej: 'Lunes', 'Día 1')." },
                    focus: { type: Type.STRING, description: "El enfoque principal del entrenamiento (ej: 'Fuerza de Cuerpo Completo', 'Día de Pierna')." },
                    warmUp: { type: Type.STRING, description: "Una rutina de calentamiento breve y detallada para la sesión." },
                    exercises: {
                        type: Type.ARRAY,
                        description: "Una lista de ejercicios para la sesión de entrenamiento.",
                        items: {
                            type: Type.OBJECT,
                            required: ["name", "sets", "reps", "rest", "description", "imageSearchQuery"],
                            properties: {
                                name: { type: Type.STRING, description: "Nombre del ejercicio." },
                                sets: { type: Type.INTEGER, description: "Número de series." },
                                reps: { type: Type.STRING, description: "Rango de repeticiones (ej: '8-12', '15')." },
                                rest: { type: Type.INTEGER, description: "Tiempo de descanso en segundos entre series." },
                                description: { type: Type.STRING, description: "Descripción concisa (2-3 puntos clave) sobre la forma correcta del ejercicio." },
                                imageSearchQuery: { type: Type.STRING, description: "Un término de búsqueda simple en inglés para encontrar una demostración visual (ej: 'barbell back squat')." }
                            }
                        }
                    },
                    coolDown: { type: Type.STRING, description: "Una rutina de enfriamiento y estiramiento breve y detallada." }
                }
            }
        }
    }
};


const generatePrompt = (profile: UserProfile): string => {
  const goalMap = {
    build_muscle: 'ganar músculo y aumentar la fuerza (hipertrofia)',
    lose_fat: 'perder grasa y mejorar la salud cardiovascular (pérdida de peso)',
    improve_endurance: 'mejorar la resistencia muscular y cardiovascular',
    general_fitness: 'mantener un estado físico general y bienestar'
  };

  const levelMap = {
    beginner: 'un principiante con poca o ninguna experiencia',
    intermediate: 'un intermedio con experiencia de entrenamiento consistente',
    advanced: 'un atleta avanzado con experiencia de entrenamiento significativa'
  };

  return `
    You are FitnessFlow Pro's AI-Coach, an expert personal trainer and exercise physiologist from Medellín, Colombia. 
    Create a detailed, hyper-personalized weekly workout plan for a user with the following profile:
    - Main Goal: ${goalMap[profile.goal]}
    - Experience Level: ${levelMap[profile.level]}
    - Training Frequency: ${profile.daysPerWeek} days per week.
    - Available Equipment: ${profile.equipment.join(', ') || 'None (Bodyweight only)'}.
    - Special Considerations/Notes: ${profile.notes || 'None'}.

    Instructions:
    1.  Design a ${profile.daysPerWeek}-day workout split that is optimal for the user's goal and experience level.
    2.  For each training day, provide a clear focus (e.g., 'Upper Body Push', 'Legs & Core').
    3.  Each session must include a specific warm-up routine and a cool-down routine.
    4.  Select exercises that are appropriate for the user's experience level and available equipment.
    5.  For each exercise, specify the number of sets, a suitable repetition range, and the rest period in seconds.
    6.  For EACH exercise, you MUST provide:
        a. A 'description' with 2-3 key pointers on proper form.
        b. An 'imageSearchQuery' which is a simple, effective ENGLISH search term to find a visual demonstration (e.g., 'barbell back squat', 'dumbbell bicep curl', 'bodyweight push up').
    7.  Ensure the plan is well-balanced and promotes recovery.
    8.  The entire output, including day names, focus, exercise names, and descriptions MUST be in Spanish. The 'imageSearchQuery' must be in English.
    9.  Respond ONLY with the JSON object that adheres to the provided schema. Do not add any introductory text, greetings, or markdown formatting around the JSON.
    `;
};


export const generateWorkoutPlan = async (profile: UserProfile): Promise<WorkoutPlan> => {
    const prompt = generatePrompt(profile);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: workoutPlanSchema,
                temperature: 0.7,
            },
        });
        
        const jsonString = response.text;
        const parsedPlan = JSON.parse(jsonString) as WorkoutPlan;

        if (!parsedPlan.weeklyPlan || !Array.isArray(parsedPlan.weeklyPlan)) {
            throw new Error("Formato de respuesta de la IA inválido: weeklyPlan falta o no es un arreglo.");
        }

        return parsedPlan;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("No se pudo generar el plan de entrenamiento desde el servicio de IA.");
    }
};