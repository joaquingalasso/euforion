const fs = require('fs');
const path = require('path');

const baseDir = 'src/content/talleres';
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

const workshops = [
    {
        slug: 'taekwondo',
        title: 'Taekwondo',
        schedule: 'Lunes, miércoles y viernes 18:00 – 20:00',
        location: 'SUM Secundario (2° piso)',
        instructor: 'Raúl Ramos',
        contact: '221 574 1334',
        audience: ['Niños', 'Jóvenes', 'Adultos'],
        excerpt: 'Disciplina marcial que fomenta el autocontrol, la fuerza y la flexibilidad.'
    },
    {
        slug: 'patin',
        title: 'Patín',
        schedule: 'Martes y jueves: 16:00 (Sec), 17:15 (Ini), 18:15 (Prim)',
        location: 'SUM Secundario (2° piso)',
        instructor: 'Catalina Gorostiaga',
        contact: '221 617 9976',
        audience: ['Niños', 'Jóvenes'],
        excerpt: 'Deporte sobre ruedas para desarrollar equilibrio y coordinación.'
    },
    {
        slug: 'plastica',
        title: 'Taller Creativo / Plástica',
        schedule: 'Lunes 13:00 (Sec/Adul), Martes 18:00 (Prim), Viernes 14:00 (Adul)',
        location: 'Aula 1° piso (Secundario)',
        instructor: 'María Inés Martínez',
        contact: '221 589 0557',
        audience: ['Niños', 'Jóvenes', 'Adultos'],
        excerpt: 'Espacio de expresión artística a través de diversas técnicas plásticas.'
    },
    {
        slug: 'zumba',
        title: 'Zumba',
        schedule: 'Martes y jueves 18:30 – 19:30',
        location: 'SUM Jardín (PB) o Patio Primaria (PB)',
        instructor: 'Adriana Pérez y Anita Dafonseca',
        contact: '221 540 2301',
        audience: ['Jóvenes', 'Adultos'],
        excerpt: 'Entrenamiento físico divertido combinando baile y aeróbica.'
    },
    {
        slug: 'estimulacion-cognitiva',
        title: 'Taller de Estimulación Cognitiva (+55)',
        schedule: 'Martes 17:00 – 18:30',
        location: 'Sala de Presidencia (PB)',
        instructor: 'Lucía Vidal',
        contact: '221 548 0810',
        audience: ['Adultos Mayores'],
        excerpt: 'Ejercicios para mantener y mejorar las capacidades mentales.'
    },
    {
        slug: 'memoria',
        title: 'Taller de la Memoria',
        schedule: 'Jueves 16:30 – 18:00',
        location: 'Sala de Presidencia (PB)',
        instructor: 'María Laura Castañeda',
        contact: '221 540 2727',
        audience: ['Adultos Mayores'],
        excerpt: 'Actividades lúdicas y prácticas para ejercitar la memoria.'
    },
    {
        slug: 'ajedrez',
        title: 'Ajedrez',
        schedule: 'Miércoles 14:30 – 17:00, Viernes 18:00 – 19:30',
        location: 'Aula 1° piso (Secundario)',
        instructor: 'Matías Arce',
        contact: '221 604 5993',
        audience: ['Niños', 'Jóvenes', 'Adultos'],
        excerpt: 'Juego de estrategia para desarrollar el pensamiento lógico.'
    },
    {
        slug: 'yoga',
        title: 'Yoga',
        schedule: 'Martes y jueves 17:30 – 18:30',
        location: 'SUM Jardín (PB) o Patio Primaria (PB)',
        instructor: 'María Isabel De La Canal',
        contact: '221 642 6695',
        audience: ['Jóvenes', 'Adultos', 'Adultos Mayores'],
        excerpt: 'Práctica milenaria para la armonía del cuerpo y la mente.'
    },
    {
        slug: 'coro',
        title: 'Coro Juvenil',
        schedule: 'Martes 14:00 – 16:00',
        location: '2° piso (Secundario)',
        instructor: 'Joaquín Fichter',
        contact: '2914 19-0728',
        audience: ['Jóvenes'],
        excerpt: 'Actividad gratuita para mayores de 14 años. ¡Sumate a cantar!'
    }
];

workshops.forEach(w => {
    const dir = path.join(baseDir, w.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Convert audience array to correct yaml list string manually to be safe
    const audienceYaml = w.audience.map(a => `  - "${a}"`).join('\n');

    const content = `---
title: "${w.title}"
excerpt: "${w.excerpt}"
instructor: "${w.instructor}"
contact: "${w.contact}"
schedule: "${w.schedule}"
location: "${w.location}"
audience:
${audienceYaml}
---
# ${w.title}

**Instructor/a:** ${w.instructor}
**Contacto:** ${w.contact}
**Horarios:** ${w.schedule}
**Lugar:** ${w.location}

${w.excerpt}

¡Te esperamos!
`;

    fs.writeFileSync(path.join(dir, 'index.md'), content);
    console.log(`Created ${w.slug}`);
});
