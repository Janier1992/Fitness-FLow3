import { LibraryExercise, ExerciseDifficulty } from '../types';

export const EXERCISE_DATA: LibraryExercise[] = [
    {
        id: 1,
        name: 'Bicicleta Estática',
        description: 'Ejercicio de cardio de bajo impacto excelente para las piernas y la salud cardiovascular.',
        imageUrl: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Principiante',
        tags: ['Cardio', 'Cuádriceps', 'Pantorrillas'],
        duration: 40,
        caloriesPerMin: 10,
        isFavorite: true,
        category: 'CARDIO',
        equipment: 'Bicicleta estática',
        instructions: [
            'Ajusta la altura del asiento y el manillar.',
            'Mantén la espalda recta y los hombros relajados.',
            'Pedalea a un ritmo constante.',
            'Varía la resistencia según tu nivel de condición física.'
        ]
    },
    {
        id: 2,
        name: 'Burpees',
        description: 'Ejercicio de alta intensidad que combina fuerza y cardio para un entrenamiento de cuerpo completo.',
        imageUrl: 'https://images.pexels.com/photos/6456137/pexels-photo-6456137.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Avanzado',
        tags: ['Cardio', 'Core', 'Pecho', 'Piernas'],
        duration: 5,
        caloriesPerMin: 15,
        isFavorite: false,
        isPremium: true,
        category: 'CUERPO COMPLETO',
        equipment: 'Peso corporal',
        instructions: [
            'Empieza de pie, luego ponte en cuclillas y coloca las manos en el suelo.',
            'Lleva los pies hacia atrás a una posición de plancha.',
            'Realiza una flexión de pecho.',
            'Vuelve a la posición de cuclillas y salta explosivamente.'
        ]
    },
    {
        id: 3,
        name: 'Correr en Cinta',
        description: 'Ejercicio cardiovascular de bajo impacto ideal para quemar calorías y mejorar la resistencia.',
        imageUrl: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Principiante',
        tags: ['Cardio'],
        duration: 30,
        caloriesPerMin: 12,
        isFavorite: true,
        category: 'CARDIO',
        equipment: 'Cinta de correr',
        instructions: [
            'Selecciona la velocidad e inclinación deseadas.',
            'Mantén una postura erguida mientras corres.',
            'Usa los brazos para impulsarte.',
            'No te agarres a los pasamanos constantemente.'
        ]
    },
    {
        id: 4,
        name: 'Curl de Bíceps con Mancuernas',
        description: 'Ejercicio de aislamiento para el desarrollo de los bíceps. Fundamental para la fuerza del brazo.',
        imageUrl: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Principiante',
        tags: ['Bíceps', 'Brazos'],
        duration: 2,
        caloriesPerMin: 5,
        isFavorite: false,
        isPremium: true,
        category: 'FUERZA',
        equipment: 'Mancuernas',
        instructions: [
            'Sostén una mancuerna en cada mano con los brazos extendidos.',
            'Mantén los codos pegados al cuerpo.',
            'Flexiona los codos para levantar las pesas hacia los hombros.',
            'Baja las pesas de forma controlada.'
        ]
    },
    {
        id: 5,
        name: 'Remo con Barra',
        description: 'Ejercicio compuesto para desarrollar una espalda fuerte y densa, trabajando también los bíceps.',
        imageUrl: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Intermedio',
        tags: ['Espalda', 'Bíceps', 'Core'],
        duration: 3,
        caloriesPerMin: 8,
        isFavorite: false,
        category: 'FUERZA',
        equipment: 'Barra',
        instructions: [
            'Inclina el torso hacia adelante manteniendo la espalda recta.',
            'Sujeta la barra con un agarre ligeramente más ancho que los hombros.',
            'Tira de la barra hacia la parte baja del pecho.',
            'Aprieta los músculos de la espalda en la parte superior del movimiento.'
        ]
    },
    {
        id: 6,
        name: 'Flexiones de Pecho',
        description: 'Ejercicio clásico de peso corporal para pecho, hombros y tríceps. Muy versátil.',
        imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Principiante',
        tags: ['Pecho', 'Hombros', 'Tríceps'],
        duration: 2,
        caloriesPerMin: 6,
        isFavorite: false,
        isPremium: true,
        category: 'FUERZA',
        equipment: 'Peso corporal',
        instructions: [
            'Coloca las manos un poco más anchas que los hombros.',
            'Mantén el cuerpo en línea recta desde la cabeza hasta los talones.',
            'Baja el pecho hasta que esté cerca del suelo.',
            'Empuja hacia arriba hasta que los brazos estén completamente extendidos.'
        ]
    },
     {
        id: 7,
        name: 'Sentadilla con Barra',
        description: 'El rey de los ejercicios de piernas. Desarrolla fuerza y músculo en todo el tren inferior.',
        imageUrl: 'https://images.pexels.com/photos/116077/pexels-photo-116077.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Avanzado',
        tags: ['Piernas', 'Cuádriceps', 'Glúteos', 'Core'],
        duration: 4,
        caloriesPerMin: 10,
        isFavorite: true,
        category: 'FUERZA',
        equipment: 'Barra',
        instructions: [
            'Coloca la barra sobre los trapecios, no en el cuello.',
            'Mantén el pecho erguido y la espalda recta.',
            'Baja hasta que los muslos estén paralelos al suelo o más abajo.',
            'Empuja a través de los talones para volver a la posición inicial.'
        ]
    },
    {
        id: 8,
        name: 'Plancha Abdominal',
        description: 'Ejercicio isométrico fundamental para fortalecer el core y mejorar la estabilidad general.',
        imageUrl: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Principiante',
        tags: ['Core', 'Abdominales'],
        duration: 1,
        caloriesPerMin: 4,
        isFavorite: false,
        category: 'CORE',
        equipment: 'Peso corporal',
        instructions: [
            'Apóyate en los antebrazos y las puntas de los pies.',
            'Mantén el cuerpo en una línea recta de la cabeza a los talones.',
            'Contrae los abdominales y los glúteos.',
            'Evita que las caderas se caigan o se eleven demasiado.'
        ]
    },
    {
        id: 9,
        name: 'Peso Muerto',
        description: 'Ejercicio de cuerpo completo que desarrolla la cadena posterior, la espalda baja y la fuerza de agarre.',
        imageUrl: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Avanzado',
        tags: ['Piernas', 'Espalda', 'Glúteos', 'Core'],
        duration: 5,
        caloriesPerMin: 12,
        isFavorite: false,
        category: 'FUERZA',
        equipment: 'Barra',
        instructions: [
            'Mantén la espalda recta durante todo el levantamiento.',
            'La barra debe permanecer cerca del cuerpo.',
            'Inicia el movimiento empujando con las piernas.',
            'Extiende completamente las caderas y las rodillas en la parte superior.'
        ]
    },
    {
        id: 10,
        name: 'Press de Banca',
        description: 'Ejercicio fundamental para el desarrollo del pectoral, también involucra hombros y tríceps.',
        imageUrl: 'https://images.pexels.com/photos/3837464/pexels-photo-3837464.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Intermedio',
        tags: ['Pecho', 'Hombros', 'Tríceps'],
        duration: 3,
        caloriesPerMin: 7,
        isFavorite: true,
        category: 'FUERZA',
        equipment: 'Barra y banco',
        instructions: [
            'Acuéstate en el banco con los pies firmemente en el suelo.',
            'Sujeta la barra con un agarre un poco más ancho que los hombros.',
            'Baja la barra de forma controlada hasta el pecho.',
            'Empuja la barra hacia arriba explosivamente hasta bloquear los codos.'
        ]
    },
];

export const CATEGORIES = [...new Set(EXERCISE_DATA.flatMap(e => e.tags))];
export const DIFFICULTIES: ExerciseDifficulty[] = ['Principiante', 'Intermedio', 'Avanzado'];