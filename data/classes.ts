import { GroupClass } from '../types';

export const CLASS_DATA: GroupClass[] = [
    {
        id: 1,
        name: 'CrossFit WOD',
        description: 'Entrenamiento funcional de alta intensidad que cambia cada día (Workout of the Day).',
        imageUrl: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Avanzado',
        category: 'CrossFit',
        instructor: 'Diego Valencia',
        capacity: 12,
        duration: 60,
        schedule: [
            { day: 'Lunes', time: '18:00' },
            { day: 'Miércoles', time: '18:00' },
        ],
        price: 15000,
    },
    {
        id: 2,
        name: 'Hatha Yoga Flow',
        description: 'Clase de yoga suave enfocada en posturas básicas, respiración y alineación corporal.',
        imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Principiante',
        category: 'Yoga',
        instructor: 'Laura Morales',
        capacity: 15,
        duration: 60,
        schedule: [
            { day: 'Martes', time: '07:00' },
            { day: 'Jueves', time: '07:00' },
        ],
    },
    {
        id: 3,
        name: 'Pilates Mat',
        description: 'Fortalecimiento del core y mejora de la postura a través de ejercicios en colchoneta.',
        imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Intermedio',
        category: 'Pilates',
        instructor: 'Laura Morales',
        capacity: 18,
        duration: 55,
        schedule: [
            { day: 'Martes', time: '08:00' },
            { day: 'Jueves', time: '08:00' },
        ],
    },
    {
        id: 4,
        name: 'Spinning RPM',
        description: 'Clase de ciclismo indoor de alta energía al ritmo de la música para quemar calorías.',
        imageUrl: 'https://images.pexels.com/photos/39308/runners-silhouettes-athletes-fitness-39308.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Intermedio',
        category: 'Spinning',
        instructor: 'Carlos Rojas',
        capacity: 20,
        duration: 50,
        schedule: [
            { day: 'Lunes', time: '19:00' },
            { day: 'Viernes', time: '19:00' },
        ],
        price: 12000,
    },
     {
        id: 5,
        name: 'Vinyasa Yoga',
        description: 'Yoga dinámico donde las posturas se enlazan con la respiración creando un flujo continuo.',
        imageUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=600',
        difficulty: 'Intermedio',
        category: 'Yoga',
        instructor: 'Ana María Osorio',
        capacity: 15,
        duration: 75,
        schedule: [
            { day: 'Miércoles', time: '07:00' },
            { day: 'Viernes', time: '07:00' },
        ],
    },
];

export const CLASS_CATEGORIES = ['Todas', 'Mis Reservas', 'Yoga', 'Spinning', 'CrossFit', 'Pilates'];
