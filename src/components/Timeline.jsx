import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaCalendarAlt, FaStar } from 'react-icons/fa';

const timelineData = [
    { date: "3 ago 1927", title: "Nace Biblioteca Euforión", description: "Fundación de la Biblioteca Euforión." },
    { date: "24 ago 1928 - 31 ago 1934", title: "Nicodemo Scenna", description: "Fundador de la Biblioteca Euforión." },
    { date: "19 abr 1929 - 11 dic 2020", title: "Subsidio PROVINCIAL", description: "Recibimiento de subsidio provincial." },
    { date: "24 ene 1930 - 3 ago 2020", title: "Subsidio CONABIP", description: "Recibimiento del subsidio de CONABIP." },
    { date: "3 ene 1931 - 26 ene 1950", title: "Favaloro en la Biblioteca", description: "René Favaloro fue declarado miembro honorífico.", highlight: true },
    { date: "7 mar 1935 - 21 ene 1944", title: "Primera presidencia", description: "Presidencia de Nicodemo Scenna." },
    { date: "19 abr 1940 - 9 ene 2020", title: "Subsidio Municipal", description: "Subsidio otorgado por el municipio de La Plata." },
    { date: "3 ago 1978", title: "ACTO - 51° Aniversario", description: "Acto conmemorativo del 51° aniversario." },
    { date: "7 ene 1994 - 31 mar 2020", title: "Bibliomóvil", description: "Proyecto para llevar libros a escuelas rurales." },
    { date: "11 ago 1994 - 19 dic 2020", title: "Abuelas Cuenta Cuentos", description: "Grupo que fomenta la lectura y la imaginación." },
    { date: "13 abr 2000 - 15 abr 2004", title: "Winisis", description: "Implementación del sistema Winisis." },
    { date: "19 abr 2002", title: "Presidencia Ing. Daniel J. Lugones", description: "Fue presidente por 25 años." },
    { date: "1 abr 2004 - 8 abr 2010", title: "SIGEBI", description: "Implementación de software de gestión." },
    { date: "9 may 2007 - 31 dic 2019", title: "Presidencia Juan Carlos Martín", description: "Declarado Ciudadano Ilustre." },
    { date: "1 mar 2010", title: "Creación Escuela Primaria", description: "Directora: Marta Pellegrineti.", highlight: true },
    { date: "9 sep 2010 - 7 ago 2019", title: "KOHA", description: "Software bibliotecario KOHA." },
    { date: "16 ene 2014 - 25 sep 2020", title: "Premio Maratón de Lectura", description: "Ganadores del premio Fundación Leer." },
    { date: "12 feb 2015", title: "Facebook", description: "Creación de red social para difusión." },
    { date: "6 mar 2015 - 4 dic 2020", title: "Página Web Institucional", description: "Implementación de la página web." },
    { date: "1 mar 2016 - 4 dic 2020", title: "Creación Escuela Secundaria", description: "Directora: Carina Curutchet.", highlight: true },
    { date: "13 may 2016 - 16 may 2016", title: "Feria del Libro 2016", description: "Feria para adquirir material." },
    { date: "1 sep 2016 - 29 sep 2016", title: "Palabras Libres", description: "Antología con producciones de estudiantes." },
    { date: "9 sep 2016 - 10 sep 2016", title: "Maratón de Lectura 2016", description: "Ganadores del premio de libros." },
    { date: "5 abr 2017 - 28 abr 2017", title: "Rincón de Primeros Lectores", description: "Creación del rincón infantil." },
    { date: "27 abr 2017 - 15 may 2017", title: "Feria del Libro 2017", description: "Feria para adquirir material." },
    { date: "3 ago 2017", title: "Aniversario 90 años", description: "Celebración del 90° aniversario." },
    { date: "13 abr 2018 - 19 jul 2018", title: "Taller Formación de Usuarios", description: "Formación para búsqueda autónoma de info." },
    { date: "13 abr 2018 - 15 abr 2018", title: "Feria del Libro 2018", description: "Feria para adquirir material." },
    { date: "9 ago 2018 - 10 ago 2018", title: "Colección de Favaloro", description: "Donación de libros de René Favaloro." },
    { date: "1 dic 2018", title: "Artículo en revista española", description: "Publicación en “Mi Biblioteca” (España)." },
    { date: "11 abr 2019 - 13 abr 2019", title: "Feria del Libro 2019", description: "Feria para adquirir material." },
    { date: "7 ago 2019 - 2 ene 2021", title: "Digibepé", description: "Nuevo sistema de gestión por CONABIP." },
    { date: "8 ago 2019 - 20 feb 2020", title: "Remodelación y mudanza", description: "Reacondicionamiento del espacio." },
    { date: "27 sep 2019", title: "Maratón de Lectura 17° ed.", description: "Participación en la maratón nacional." },
    { date: "16 ene 2020 - 11 dic 2020", title: "Presidencia Alejandro Lugones", description: "Nuevo presidente institucional." },
    { date: "6 feb 2020 - 27 feb 2020", title: "Instagram", description: "Creación de cuenta para difusión." },
    { date: "8 may 2020 - 31 may 2020", title: "Feria del Libro 2020", description: "Feria para adquirir material." },
];

function Timeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className='section' style={{ position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-blue-dark)' }}>Biblioteca Euforión: 98 años de historia</h2>
                <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-gray-medium)' }}>
                    Desde su fundación en 1927 por Nicodemo Scenna hasta la actualidad, la Biblioteca Popular Euforión ha sido un faro cultural y educativo en el barrio El Mondongo de La Plata.
                    Esta línea de tiempo recorre momentos clave de su historia, sus proyectos educativos, sociales y comunitarios.
                </p>
            </div>

            <div ref={containerRef} style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>

                {/* Progress Bar Container */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'var(--color-gray-light)',
                    transform: 'translateX(-50%)',
                    borderRadius: '4px',
                    zIndex: 0
                }} className="timeline-line"></div>

                {/* Animated Progress Bar */}
                <motion.div style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'var(--color-blue-azure)',
                    transformOrigin: 'top',
                    scaleY,
                    translateX: '-50%',
                    borderRadius: '4px',
                    zIndex: 1
                }} className="timeline-line-active"></motion.div>

                {/* Events */}
                {timelineData.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
}

function TimelineItem({ item, index }) {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                marginBottom: '3rem',
                position: 'relative',
                zIndex: 2
            }}
            className={`timeline-item ${isLeft ? 'left' : 'right'}`}
        >
            {/* Content */}
            <div style={{
                width: '45%',
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderLeft: item.highlight ? '4px solid var(--color-blue-azure)' : 'none',
                position: 'relative',
                textAlign: isLeft ? 'right' : 'left'
            }}>
                <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-blue-medium)',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isLeft ? 'flex-end' : 'flex-start',
                    gap: '0.5rem'
                }}>
                    {!isLeft && <FaCalendarAlt />}
                    {item.date}
                    {isLeft && <FaCalendarAlt />}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-blue-dark)' }}>
                    {item.highlight && <FaStar color="gold" style={{ marginRight: '0.5rem' }} />}
                    {item.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-gray-dark)' }}>
                    {item.description}
                </p>
            </div>

            {/* Dot */}
            <div style={{
                position: 'absolute',
                left: '50%',
                width: '16px',
                height: '16px',
                background: item.highlight ? 'var(--color-blue-azure)' : 'white',
                border: `3px solid var(--color-blue-azure)`,
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3
            }}></div>
        </motion.div>
    );
}

export default Timeline;
