import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChild, FaUserGraduate, FaSchool, FaHandsHelping, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

function Escuela() {
    const levels = [
        {
            id: 'inicial',
            title: 'Nivel Inicial',
            icon: <FaChild size={50} color="var(--color-blue-light)" />,
            description: 'Un espacio de juego y aprendizaje donde los más pequeños comienzan su camino educativo.',
            link: '/inicial',
            image: '/images/inicial/patio-jardin.jpg'
        },
        {
            id: 'primario',
            title: 'Nivel Primario',
            icon: <FaSchool size={50} color="var(--color-blue-light)" />,
            description: 'Formación integral con enfoque en valores, arte y deporte.',
            link: '/primario',
            image: '/images/primaria/aula.jpg'
        },
        {
            id: 'secundario',
            title: 'Nivel Secundario',
            icon: <FaUserGraduate size={50} color="var(--color-blue-light)" />,
            description: 'Preparación académica de excelencia y acompañamiento en la construcción del proyecto de vida.',
            link: '/secundario',
            image: '/images/secundaria/alumnos.jpg'
        },
        {
            id: 'eoe',
            title: 'Equipo de Orientación (EOE)',
            icon: <FaHandsHelping size={50} color="var(--color-blue-light)" />,
            description: 'Profesionales dedicados al acompañamiento de las trayectorias educativas de nuestros alumnos.',
            link: '/eoe',
            image: '/images/general/escuela.jpg'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <PageHeader
                title="Nuestra Escuela"
                imageSrc="/images/general/escuela.jpg"
                altText="Patio de la Escuela Euforión"
                quote="Educando para la libertad desde 1928"
            />

            <section className="container section">
                <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-blue-dark)' }}>Propuesta Educativa Integral</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-dark)', lineHeight: '1.8' }}>
                        La Escuela Euforión ofrece una trayectoria educativa completa, CONTINUA y coherente desde el Jardín de Infantes hasta la finalización de la Escuela Secundaria. Nuestro proyecto institucional se basa en la formación de ciudadanos críticos, libres y solidarios.
                    </p>
                </motion.div>

                <div className="grid grid-2">
                    {levels.map((level) => (
                        <motion.div
                            key={level.id}
                            variants={itemVariants}
                            className="card"
                            style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={level.image}
                                    alt={level.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Euforion'; }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    padding: '1.5rem'
                                }}>
                                    {/* Icon overlay can go here if needed */}
                                </div>
                            </div>
                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '1rem' }}>{level.icon}</div>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--color-blue-medium)' }}>{level.title}</h3>
                                <p style={{ flex: 1, color: 'var(--color-gray-dark)' }}>{level.description}</p>
                                <Link to={level.link} className="btn btn-outline" style={{ alignSelf: 'start', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Ingresar al nivel <FaArrowRight size={12} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}

export default Escuela;
