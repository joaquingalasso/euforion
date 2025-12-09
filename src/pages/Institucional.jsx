import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHistory, FaFileContract, FaUsers, FaTshirt, FaArrowRight } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

function Institucional() {
    const sections = [
        {
            id: 'historia',
            title: 'Nuestra Historia',
            icon: <FaHistory size={40} color="var(--color-blue-light)" />,
            description: 'Casi un siglo de compromiso con la cultura y la educación en La Plata.',
            link: '/historia'
        },
        {
            id: 'comision',
            title: 'Comisión Directiva',
            icon: <FaUsers size={40} color="var(--color-blue-light)" />,
            description: 'Conocé a las autoridades que guían el destino de nuestra institución.',
            link: '/comision-directiva'
        },
        {
            id: 'estatuto',
            title: 'Estatuto Social',
            icon: <FaFileContract size={40} color="var(--color-blue-light)" />,
            description: 'El marco normativo que rige nuestra asociación civil.',
            link: '/estatuto'
        },
        {
            id: 'uniformes',
            title: 'Uniformes',
            icon: <FaTshirt size={40} color="var(--color-blue-light)" />,
            description: 'Catálogo oficial de indumentaria escolar y deportiva.',
            link: '/uniformes'
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
                title="Institucional"
                imageSrc="/images/general/frente-antiguo.jpg"
                altText="Frente de la Biblioteca Euforión"
                quote="Identidad, Memoria y Futuro"
            />

            <section className="container section">
                <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-dark)', lineHeight: '1.8' }}>
                        La <strong>Biblioteca Popular Euforión</strong> es una Asociación Civil sin fines de lucro fundada en 1928.
                        Desde entonces, ha crecido hasta convertirse en un complejo educativo y cultural que alberga a la biblioteca pública y a los tres niveles educativos.
                    </p>
                </motion.div>

                <div className="grid grid-2">
                    {sections.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="card"
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}
                        >
                            <div style={{ flexShrink: 0 }}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ marginBottom: '0.8rem', color: 'var(--color-blue-medium)' }}>{item.title}</h3>
                                <p style={{ marginBottom: '1.5rem', color: 'var(--color-gray-dark)' }}>{item.description}</p>
                                <Link to={item.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blue-dark)', fontWeight: 'bold', textDecoration: 'none' }}>
                                    Leer más <FaArrowRight size={12} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </motion.div>
    );
}

export default Institucional;
