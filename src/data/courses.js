export const directors = {
    inicial: [
        { name: 'Cecilia Quiñones', role: 'Directora', photo: '/images/logo-euforion.png' },
        { name: 'Florencia Acosta Barruti', role: 'Secretaria', photo: '/images/logo-euforion.png' }
    ],
    primario: [
        { name: 'Marta Pellegrinetti', role: 'Directora', photo: '/images/logo-euforion.png' },
        { name: 'Silvina Díaz', role: 'Vicedirectora', photo: '/images/logo-euforion.png' },
        { name: 'Marina Videla', role: 'Secretaria', photo: '/images/logo-euforion.png' }
    ],
    secundario: [
        { name: 'M. Sol Espinel', role: 'Directora', photo: '/images/logo-euforion.png' },
        { name: 'Carina Basaldúa', role: 'Secretaria', photo: '/images/logo-euforion.png' }
    ]
};

export const courses = {
    inicial: [
        {
            id: '1-seccion',
            title: 'Primera Sección',
            teachers: [
                { role: 'Docente (TM)', name: 'Silvina Ramallo', turn: 'manana' },
                { role: 'Preceptora (TM)', name: 'Cecilia Mayer', turn: 'manana' },
                { role: 'Docente (TT)', name: 'Daiana Benzo', turn: 'tarde' },
                { role: 'Preceptora (TT)', name: 'Nerina Vivaldo', turn: 'tarde' },
                { role: 'Educación Física', name: 'Paula Russo', turn: 'both' },
                { role: 'Música', name: 'María Laura Peluso', turn: 'both' }
            ],
            materials: [
                { name: 'Solicitud de Inscripción', url: '/documents/inicial/solicitud-inscripcion.pdf', turn: 'both' },
                { name: 'Acta de Compromiso', url: '/documents/inicial/acta-compromiso.pdf', turn: 'both' },
                { name: 'Contacto Urgencias', url: '/documents/inicial/contacto-urgencias.pdf', turn: 'both' }
            ]
        },
        {
            id: '2-seccion',
            title: 'Segunda Sección',
            teachers: [
                { role: 'Docente (TM)', name: 'Josefina Bustos', turn: 'manana' },
                { role: 'Preceptora (TM)', name: 'Cecilia Mayer', turn: 'manana' },
                { role: 'Docente (TT)', name: 'Florencia Ureta', turn: 'tarde' },
                { role: 'Preceptora (TT)', name: 'Nerina Vivaldo', turn: 'tarde' },
                { role: 'Educación Física', name: 'Paula Russo', turn: 'both' },
                { role: 'Música', name: 'María Laura Peluso', turn: 'both' }
            ],
            materials: [
                { name: 'Solicitud de Inscripción', url: '/documents/inicial/solicitud-inscripcion.pdf', turn: 'both' },
                { name: 'Acta de Compromiso', url: '/documents/inicial/acta-compromiso.pdf', turn: 'both' },
                { name: 'Contacto Urgencias', url: '/documents/inicial/contacto-urgencias.pdf', turn: 'both' }
            ]
        },
        {
            id: '3-seccion',
            title: 'Tercera Sección',
            teachers: [
                { role: 'Docente (TM)', name: 'María Belén Sosa', turn: 'manana' },
                { role: 'Preceptora (TM)', name: 'Cecilia Mayer', turn: 'manana' },
                { role: 'Docente (TT)', name: 'Carolina Chento', turn: 'tarde' },
                { role: 'Preceptora (TT)', name: 'Nerina Vivaldo', turn: 'tarde' },
                { role: 'Educación Física', name: 'Paula Russo', turn: 'both' },
                { role: 'Música', name: 'María Laura Peluso', turn: 'both' }
            ],
            materials: [
                { name: 'Solicitud de Inscripción', url: '/documents/inicial/solicitud-inscripcion.pdf', turn: 'both' },
                { name: 'Acta de Compromiso', url: '/documents/inicial/acta-compromiso.pdf', turn: 'both' },
                { name: 'Contacto Urgencias', url: '/documents/inicial/contacto-urgencias.pdf', turn: 'both' }
            ]
        }
    ],
    primario: [
        {
            id: '1-grado',
            title: 'Primer Grado',
            teachers: [
                { role: 'Docente 1° A', name: 'Mercedes Ávalos', turn: 'manana' },
                { role: 'Docente 1° B', name: 'Patricia Lucero', turn: 'tarde' }
            ],
            materials: []
        },
        {
            id: '2-grado',
            title: 'Segundo Grado',
            teachers: [
                { role: 'Docente 2° A', name: 'Cecilia Giles', turn: 'manana' },
                { role: 'Docente 2° B', name: 'Karen Carroza', turn: 'tarde' }
            ],
            materials: [
                { name: 'Lista de Materiales', url: '/documents/primario/2do-lista-materiales.pdf', turn: 'both' }
            ]
        },
        {
            id: '3-grado',
            title: 'Tercer Grado',
            teachers: [
                { role: 'Docente 3° A', name: 'Florencia López', turn: 'manana' },
                { role: 'Docente 3° B', name: 'Florencia López', turn: 'tarde' }
            ],
            materials: [
                { name: 'Lista de Materiales', url: '/documents/primario/3ro-lista-materiales.pdf', turn: 'both' }
            ]
        },
        {
            id: '4-grado',
            title: 'Cuarto Grado',
            teachers: [
                { role: 'Docente 4° A', name: 'Karen Carroza', turn: 'manana' },
                { role: 'Docente 4° B', name: 'Florencia Brieba', turn: 'tarde' }
            ],
            materials: [
                { name: 'Lista de Materiales 4° A', url: '/documents/primario/4to-a-lista-materiales.pdf', turn: 'manana' },
                { name: 'Lista de Materiales 4° B', url: '/documents/primario/4to-b-lista-materiales.pdf', turn: 'tarde' }
            ]
        },
        {
            id: '5-grado',
            title: 'Quinto Grado',
            teachers: [
                { role: 'Docente 5° A', name: 'Eugenia Clidas', turn: 'manana' },
                { role: 'Docente 5° B', name: 'Eliana Laiño', turn: 'tarde' }
            ],
            materials: [
                { name: 'Lista de Materiales 5° A', url: '/documents/primario/5to-a-lista-materiales.pdf', turn: 'manana' },
                { name: 'Lista de Materiales 5° B', url: '/documents/primario/5to-b-lista-materiales.pdf', turn: 'tarde' }
            ]
        },
        {
            id: '6-grado',
            title: 'Sexto Grado',
            teachers: [
                { role: 'Docente 6° A', name: 'Yamila Alarcón', turn: 'manana' },
                { role: 'Docente 6° B', name: 'Daiana López', turn: 'tarde' }
            ],
            materials: [
                { name: 'Lista de Materiales', url: '/documents/primario/6to-lista-materiales.pdf', turn: 'both' }
            ]
        }
    ],
    secundario: [
        {
            id: '1-ano',
            title: 'Primer Año',
            teachers: [
                { role: 'C. Naturales', name: 'Valeria Aimar', turn: 'both' },
                { role: 'C. Sociales', name: 'Abril Bidondo', turn: 'both' },
                { role: 'Comuni. Gráfica', name: 'Lorena Lavorato', turn: 'both' },
                { role: 'C. de Ciudadanía', name: 'Pablo Anduaga', turn: 'both' },
                { role: 'E. Artíst. (música)', name: 'Lorena Serpe', turn: 'both' },
                { role: 'E. Física', name: 'Micaela Torga', turn: 'both' },
                { role: 'Inglés', name: 'M. Virginia Perdoni', turn: 'both' },
                { role: 'Matemática', name: 'Selena Lorenzo', turn: 'both' },
                { role: 'P. del Lenguaje', name: 'Valeria La Ferrara', turn: 'both' },
                { role: 'Pat. Cultural', name: 'Alejo Raynal', turn: 'both' }
            ],
            materials: [
                { name: 'Plan de Estudios', url: '/documents/secundario/plan-de-estudios.pdf', turn: 'both' },
                { name: 'Cuadernillo del Ingresante', url: '/documents/secundario/cuadernillo-ingresante.pdf', turn: 'both' },
                { name: 'Acuerdo Institucional', url: '/documents/secundario/acuerdo-institucional.pdf', turn: 'both' }
            ]
        },
        {
            id: '2-ano',
            title: 'Segundo Año',
            teachers: [],
            materials: [
                { name: 'Plan de Estudios', url: '/documents/secundario/plan-de-estudios.pdf', turn: 'both' },
                { name: 'Acuerdo Institucional', url: '/documents/secundario/acuerdo-institucional.pdf', turn: 'both' }
            ]
        },
        {
            id: '3-ano',
            title: 'Tercer Año',
            teachers: [],
            materials: [
                { name: 'Plan de Estudios', url: '/documents/secundario/plan-de-estudios.pdf', turn: 'both' },
                { name: 'Acuerdo Institucional', url: '/documents/secundario/acuerdo-institucional.pdf', turn: 'both' }
            ]
        },
        {
            id: '4-ano',
            title: 'Cuarto Año',
            teachers: [],
            materials: [
                { name: 'Plan de Estudios', url: '/documents/secundario/plan-de-estudios.pdf', turn: 'both' },
                { name: 'Acuerdo Institucional', url: '/documents/secundario/acuerdo-institucional.pdf', turn: 'both' }
            ]
        },
        {
            id: '5-ano',
            title: 'Quinto Año',
            teachers: [],
            materials: [
                { name: 'Plan de Estudios', url: '/documents/secundario/plan-de-estudios.pdf', turn: 'both' },
                { name: 'Acuerdo Institucional', url: '/documents/secundario/acuerdo-institucional.pdf', turn: 'both' }
            ]
        },
        {
            id: '6-ano',
            title: 'Sexto Año',
            teachers: [
                // Turno Mañana (A) - Comunicación
                { role: 'Arte (A)', name: 'Analía Gabalec', turn: 'manana' },
                { role: 'Articulación Educ. Superior (A)', name: 'Gloria Potes', turn: 'manana' },
                { role: 'Comunicación Ambiental (A)', name: 'Alejo Raynal', turn: 'manana' },
                { role: 'Comunicación y Transform. S. XXI (A)', name: 'Virginia Camacho', turn: 'manana' },
                { role: 'Ed. Física (A)', name: 'Cecilia Pereyra', turn: 'manana' },
                { role: 'Filosofía (A)', name: 'Carina Curutchet', turn: 'manana' },
                { role: 'Inglés (A)', name: 'Milagros Ventura', turn: 'manana' },
                { role: 'Matemática (A)', name: 'Priscila Rodríguez', turn: 'manana' },
                { role: 'Literatura (A)', name: 'Pamela Curcio', turn: 'manana' },
                { role: 'Trabajo y Ciudadanía (A)', name: 'Pedro Maugeri Larranda', turn: 'manana' },
                { role: 'Taller de Com. Inst. (A)', name: 'Celeste Moreno', turn: 'manana' },
                { role: 'Taller de Prod. Lenguajes (A)', name: 'Ignacio Martino', turn: 'manana' },

                // Turno Tarde (B) - Ciencias Naturales (Asumiendo A/B split based on previous file names, user said Cs Naturales for Tarde)
                { role: 'Arte (B)', name: 'Analía Gabalec', turn: 'tarde' },
                { role: 'Articulación Educ. Superior (B)', name: 'Gloria Potes', turn: 'tarde' },
                { role: 'Comunicación Ambiental (B)', name: 'Alejo Raynal', turn: 'tarde' },
                { role: 'Comunicación y Transform. S. XXI (B)', name: 'M. Soledad Lunino', turn: 'tarde' },
                { role: 'Ed. Física (B)', name: 'Guillermo Eymeri', turn: 'tarde' },
                { role: 'Filosofía (B)', name: 'Estefano Baggiarini', turn: 'tarde' },
                { role: 'Inglés (B)', name: 'Natalia Lopez', turn: 'tarde' },
                { role: 'Matemática (B)', name: 'Micaela Fernández', turn: 'tarde' },
                { role: 'Literatura (B)', name: 'M. Alejandra Finocchi', turn: 'tarde' },
                { role: 'Trabajo y Ciudadanía (B)', name: 'Victoria Fernandez', turn: 'tarde' },
                { role: 'Taller de Com. Inst. (B)', name: 'Celeste Moreno', turn: 'tarde' },
                { role: 'Taller de Prod. Lenguajes (B)', name: 'Emanuel Peralta', turn: 'tarde' }
            ],
            materials: [
                { name: 'Plan de Estudios', url: '/documents/secundario/plan-de-estudios.pdf', turn: 'both' },
                { name: 'Acuerdo Institucional', url: '/documents/secundario/acuerdo-institucional.pdf', turn: 'both' }
            ]
        }
    ]
};
