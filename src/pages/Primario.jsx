import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { directors } from '../data/courses';
import { FaBook, FaTshirt, FaFileAlt, FaClock, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUtensils, FaShapes, FaHandHoldingHeart, FaChess, FaBookReader } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import NotificationBanner from '../components/NotificationBanner';
import SEO from '../components/SEO';
import UnifiedFeed from '../components/UnifiedFeed';
import { contactInfo } from '../data/contactInfo';
import { useState } from 'react';

function Primario() {
    const [selectedTurn, setSelectedTurn] = useState('manana');

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
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ paddingTop: 0 }}
        >
            <SEO title="Nivel Primario" description="Escuela Primaria Euforión - De 1° a 6° grado." />

            {/* Contextual Banner (High Priority) */}
            <NotificationBanner target="primario" />

            <div className="layout-sidebar">
                {/* Main Content Area */}
                <div>
                    <PageHeader
                        title="Nivel Primario"
                        imageSrc="/images/primario/intro.gif"
                        altText="Nivel Primario"
                        quote='"Leer abre las puertas al conocimiento y al pensamiento crítico. Es lo que nos hace libres."'
                    />

                    <motion.div variants={itemVariants} className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaClock size={24} color="var(--color-blue-medium)" />
                        <div>
                            <strong>Horarios:</strong><br />
                            Mañana: 7:45 a 12:45 hs | Tarde: 13:00 a 18:00 hs.<br />
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>
                                (Jornada extendida +1h: Ajedrez, Inglés, Informática, Taller literario, Teatro)
                            </span>
                        </div>
                    </motion.div>

                    {/* 1. Avisos (High Priority) */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <UnifiedFeed tag="primario" types={['avisos']} limit={3} />
                    </motion.section>

                    {/* 2. Cursos / Grados */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaBook color="var(--color-blue-light)" /> Grados
                            </h2>

                            {/* Turn Selector */}
                            <div style={{ display: 'flex', backgroundColor: '#f0f0f0', borderRadius: '20px', padding: '4px' }}>
                                <button
                                    onClick={() => setSelectedTurn('manana')}
                                    style={{
                                        padding: '5px 15px',
                                        borderRadius: '16px',
                                        border: 'none',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        backgroundColor: selectedTurn === 'manana' ? 'var(--color-blue-medium)' : 'transparent',
                                        color: selectedTurn === 'manana' ? 'white' : '#666',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Mañana
                                </button>
                                <button
                                    onClick={() => setSelectedTurn('tarde')}
                                    style={{
                                        padding: '5px 15px',
                                        borderRadius: '16px',
                                        border: 'none',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        backgroundColor: selectedTurn === 'tarde' ? 'var(--color-blue-medium)' : 'transparent',
                                        color: selectedTurn === 'tarde' ? 'white' : '#666',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Tarde
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-3">
                            {[1, 2, 3, 4, 5, 6].map((grado) => (
                                <Link
                                    key={grado}
                                    to={`/primario/${grado}-grado/${selectedTurn}`}
                                    className="card"
                                    style={{ textAlign: 'center', display: 'block', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{grado}° Grado</h3>
                                    <span style={{ color: 'var(--color-blue-medium)', fontSize: '0.9rem', marginTop: '0.5rem', display: 'block' }}>
                                        Ver contenidos {selectedTurn === 'manana' ? '(TM)' : '(TT)'} &rarr;
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.section>

                    {/* 3. Eventos */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <UnifiedFeed tag="primario" types={['eventos']} limit={2} />
                    </motion.section>

                    {/* 4. Novedades */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-blue-dark)', fontSize: '1.5rem' }}>Novedades de Primaria</h2>
                        <UnifiedFeed tag="primario" types={['novedades']} limit={3} />
                    </motion.section>

                    {/* Info Cards */}
                    <div className="grid grid-2" style={{ marginTop: '3rem' }}>
                        <motion.div variants={itemVariants} id="inscripciones" className="card" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaFileAlt color="var(--color-blue-medium)" /> Inscripciones
                            </h3>
                            <p>
                                Para inscripciones, enviar un correo a <a href="mailto:secretariaeuforion@gmail.com" style={{ fontWeight: 'bold', color: 'var(--color-blue-dark)' }}>secretariaeuforion@gmail.com</a> con el asunto "Inscripción [Año] - Nivel Primario".
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} id="uniforme" className="card" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaTshirt color="var(--color-blue-medium)" /> Uniforme
                            </h3>
                            <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                                <li>Conjunto Deportivo Azul</li>
                                <li>Chomba Blanca</li>
                                <li>Campera Polar Azul</li>
                            </ul>
                            <Link to="/uniformes" className="btn btn-outline" style={{ fontSize: '0.9rem', width: '100%', display: 'inline-block', textAlign: 'center' }}>
                                Ver Uniformes / Cómo comprar
                            </Link>
                        </motion.div>
                    </div>
                    {/* Proyectos Institucionales */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaHandHoldingHeart color="var(--color-blue-light)" /> Proyectos Institucionales
                        </h2>
                        <div className="grid grid-2">
                            <Link to="/talleres" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <FaBookReader size={30} color="var(--color-blue-medium)" />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Taller Literario</h3>
                                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#666' }}>Espacio de narración y creatividad articulado con Biblioteca.</p>
                                </div>
                            </Link>
                            <Link to="/ajedrez" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <FaChess size={30} color="var(--color-blue-medium)" />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Torneo de Ajedrez</h3>
                                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#666' }}>Desarrollo del pensamiento estratégico.</p>
                                </div>
                            </Link>
                        </div>
                    </motion.section>
                </div>

                {/* Sidebar */}
                <aside>
                    <motion.div variants={itemVariants} className="card" style={{ position: 'sticky', top: '100px' }}>

                        {/* Contact Info (Replaces Course Nav) */}
                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Contacto Nivel Primario</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', fontSize: '0.95rem' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <FaPhoneAlt color="var(--color-blue-light)" />
                                <span>{contactInfo.primario.phone}</span>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <FaEnvelope color="var(--color-blue-light)" />
                                <a href={`mailto:${contactInfo.primario.email}`} style={{ color: 'inherit' }}>{contactInfo.primario.email}</a>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                <FaMapMarkerAlt color="var(--color-blue-light)" style={{ marginTop: '3px' }} />
                                <span>Diagonal 79 N° 371</span>
                            </li>
                        </ul>

                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Documentos</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <a href="/documents/primario/reglamento-interno.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gray-dark)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaFileAlt color="var(--color-red)" /> Reglamento Interno
                                </a>
                            </li>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <a href="/documents/primario/autorizacion-retiro.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gray-dark)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaFileAlt color="var(--color-red)" /> Autorización de Retiro
                                </a>
                            </li>
                        </ul>

                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Directivos</h3>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {directors.primario.map((director, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={director.photo} alt={director.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'contain', backgroundColor: '#f0f0f0', padding: '5px' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1rem', margin: 0 }}>{director.name}</h4>
                                        <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>{director.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </aside>
            </div>
        </motion.div>
    );
}

export default Primario;
