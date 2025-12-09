import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { directors } from '../data/courses';
import { FaGraduationCap, FaTshirt, FaFileAlt, FaBullhorn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLeaf, FaClock, FaGlobeAmericas, FaBroadcastTower, FaHandHoldingHeart } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import NotificationBanner from '../components/NotificationBanner';
import SEO from '../components/SEO';
import UnifiedFeed from '../components/UnifiedFeed';
import { contactInfo } from '../data/contactInfo';
import { useState } from 'react';

function Secundario() {
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
            <SEO title="Nivel Secundario" description="Nivel Secundario de la Escuela Euforión." />
            <NotificationBanner target="secundario" />

            <div className="layout-sidebar">
                {/* Main Content */}
                <div>
                    <PageHeader
                        title="Nivel Secundario"
                        imageSrc="/images/secundario/intro.gif"
                        altText="Nivel Secundario"
                    />

                    <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', color: 'var(--color-gray-dark)' }}>
                        La Escuela Secundaria provee conocimientos específicos, universales y obligatorios. Se encuentra organizada en seis años obligatorios y su estructura comprende un Ciclo Básico de formación Común y un Ciclo Superior Orientado.
                    </motion.p>

                    <motion.div variants={itemVariants} className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FaClock size={24} color="var(--color-blue-medium)" />
                        <div>
                            <strong>Horarios:</strong><br />
                            Mañana: 7:15 a 14:00 hs (varía según curso)<br />
                            Tarde: 13:15 a 18:00 hs (Sólo 1° Año)
                        </div>
                    </motion.div>

                    {/* 1. Avisos */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <UnifiedFeed tag="secundario" types={['avisos']} limit={3} />
                    </motion.section>

                    {/* Turn Selector moved here for functionality context before Orientation */}
                    <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem' }}>
                        <strong style={{ fontSize: '1.2rem', color: 'var(--color-blue-dark)' }}>Seleccionar Turno:</strong>
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

                    {/* Orientation Card */}
                    <motion.div variants={itemVariants} className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--color-blue-light)' }}>
                        {selectedTurn === 'manana' ? (
                            <>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaBullhorn color="var(--color-blue-medium)" /> Orientación en Comunicación
                                </h3>
                                <p>
                                    La Escuela Secundaria Euforión propone un Ciclo Superior Orientado en Comunicación, desarrollando una propuesta que consiste en abordar los fenómenos comunicativos desde tres perspectivas: la observación, el análisis y la producción.
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaLeaf color="var(--color-green)" /> Orientación en Ciencias Naturales
                                </h3>
                                <p>
                                    La Escuela Secundaria Euforión propone un Ciclo Superior Orientado en Ciencias Naturales, ofreciendo una formación integral que aborda el estudio del mundo natural a través de la investigación científica y el pensamiento crítico.
                                </p>
                            </>
                        )}
                    </motion.div>

                    {/* 2. Years Grid */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaGraduationCap color="var(--color-blue-light)" /> Años
                        </h2>
                        {selectedTurn === 'tarde' && (
                            <p style={{ color: 'var(--color-gray-dark)', fontStyle: 'italic', marginBottom: '1rem' }}>
                                * El Turno Tarde está disponible exclusivamente para 1° Año.
                            </p>
                        )}
                        <div className="grid grid-3">
                            {(selectedTurn === 'tarde' ? [1] : [1, 2, 3, 4, 5, 6]).map((ano) => (
                                <Link
                                    key={ano}
                                    to={`/secundario/${ano}-ano/${selectedTurn}`}
                                    className="card"
                                    style={{ textAlign: 'center', display: 'block', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{ano}° Año</h3>
                                    <span style={{ color: 'var(--color-blue-medium)', fontSize: '0.9rem', marginTop: '0.5rem', display: 'block' }}>
                                        Ver contenidos {selectedTurn === 'manana' ? '(TM)' : '(TT)'} &rarr;
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.section>

                    {/* 3. Eventos */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <UnifiedFeed tag="secundario" types={['eventos']} limit={2} />
                    </motion.section>

                    {/* 4. Novedades */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-blue-dark)', fontSize: '1.5rem' }}>Novedades de Secundaria</h2>
                        <UnifiedFeed tag="secundario" types={['novedades']} limit={3} />
                    </motion.section>

                    {/* Info Cards */}
                    <div className="grid grid-2" style={{ marginTop: '3rem' }}>
                        <motion.div variants={itemVariants} id="inscripciones" className="card" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaFileAlt color="var(--color-blue-medium)" /> Inscripciones
                            </h3>
                            <p>
                                Para inscripciones, enviar un correo a <a href="mailto:secretariaeuforion@gmail.com" style={{ fontWeight: 'bold', color: 'var(--color-blue-dark)' }}>secretariaeuforion@gmail.com</a> con el asunto "Inscripción [Año] - Nivel Secundario".
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
                    {/* Proyectos Especiales */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaGlobeAmericas color="var(--color-blue-light)" /> Proyectos Institucionales
                        </h2>
                        <div className="grid grid-2">
                            <Link to="/modelo-onu" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <FaGlobeAmericas size={30} color="var(--color-blue-medium)" />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Modelo ONU</h3>
                                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#666' }}>Debate y diplomacia.</p>
                                </div>
                            </Link>
                            <Link to="/radio" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <FaBroadcastTower size={30} color="var(--color-blue-medium)" />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Radio Escolar</h3>
                                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#666' }}>Comunicación y expresión.</p>
                                </div>
                            </Link>
                            <Link to="/sembrando-ciudadania" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <FaHandHoldingHeart size={30} color="var(--color-blue-medium)" />
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Sembrando Ciudadanía</h3>
                                    <p style={{ fontSize: '0.9rem', margin: 0, color: '#666' }}>Compromiso y participación civil.</p>
                                </div>
                            </Link>
                        </div>
                    </motion.section>
                </div>

                {/* Sidebar */}
                <aside>
                    <motion.div variants={itemVariants} className="card" style={{ position: 'sticky', top: '100px' }}>

                        {/* Contact Info */}
                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Contacto Secundaria</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', fontSize: '0.95rem' }}>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <FaPhoneAlt color="var(--color-blue-light)" />
                                <span>{contactInfo.secundario.phone}</span>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <FaEnvelope color="var(--color-blue-light)" />
                                <a href={`mailto:${contactInfo.secundario.email}`} style={{ color: 'inherit' }}>{contactInfo.secundario.email}</a>
                            </li>
                            <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                <FaMapMarkerAlt color="var(--color-blue-light)" style={{ marginTop: '3px' }} />
                                <span>{contactInfo.secundario.address}</span>
                            </li>
                        </ul>

                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Documentos</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <a href="/documents/secundario/plan-de-estudios.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gray-dark)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaFileAlt color="var(--color-red)" /> Plan de Estudios
                                </a>
                            </li>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <a href="/documents/secundario/acuerdo-institucional.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gray-dark)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaFileAlt color="var(--color-red)" /> Acuerdo Institucional
                                </a>
                            </li>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <a href="/documents/secundario/regimen-academico.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gray-dark)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaFileAlt color="var(--color-red)" /> Régimen Académico
                                </a>
                            </li>
                        </ul>

                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Directivos</h3>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {directors.secundario.map((director, index) => (
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

export default Secundario;
