export const events = [
    {
        id: 1,
        title: "Inicio de Clases - Nivel Inicial",
        date: "2024-03-01",
        time: "08:00hs",
        category: "institucional", // institucional, biblioteca, jardin, primaria, secundaria, talleres
        description: "Comienzo del ciclo lectivo 2024 para salas de 3, 4 y 5 años.",
        link: "/inicial"
    },
    {
        id: 2,
        title: "Taller de Lectura Infantil",
        date: "2024-03-15",
        time: "17:30hs",
        category: "biblioteca",
        description: "Actividad recreativa para niños de 6 a 10 años. ¡Vení a descubrir mundos nuevos!",
        link: "/biblioteca"
    },
    {
        id: 3,
        title: "Reunión de Padres - Primaria",
        date: "2024-03-05", // Fecha pasada para probar el filtro
        time: "18:00hs",
        category: "primaria",
        description: "Reunión informativa para padres de 1° a 6° grado.",
        link: "/primario"
    },
    {
        id: 4,
        title: "Feria del Libro Usado",
        date: "2024-04-12",
        time: "10:00 - 18:00hs",
        category: "biblioteca",
        description: "Venta e intercambio de libros usados a beneficio de la Biblioteca.",
        link: "/biblioteca"
    },
    {
        id: 5,
        title: "Clase Abierta de Taekwondo",
        date: "2024-03-20",
        time: "18:00hs",
        category: "talleres",
        description: "Vení a probar una clase gratuita. Para todas las edades.",
        link: "/talleres"
    },
    {
        id: 6,
        title: "Acto 25 de Mayo",
        date: "2024-05-24",
        time: "10:00hs",
        category: "institucional",
        description: "Acto conmemorativo de la Revolución de Mayo. Salón de Actos.",
        link: null
    },
    {
        id: 7,
        title: "Muestra de Arte Anual",
        date: "2026-11-15",
        time: "19:00hs",
        category: "talleres",
        description: "Exposición de trabajos realizados en los talleres de arte.",
        link: "/talleres"
    },
    {
        id: 8,
        title: "Cierre Ciclo Lectivo",
        date: "2026-12-18",
        time: "18:00hs",
        category: "institucional",
        description: "Acto de finalización de clases. Entrega de diplomas.",
        link: null
    }
];

export const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events
        .filter(event => event.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
};
