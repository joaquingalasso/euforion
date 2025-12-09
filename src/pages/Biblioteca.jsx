import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookReader, FaSearch, FaUsers, FaHandHoldingHeart, FaUniversity, FaChevronDown, FaChevronUp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaStar } from 'react-icons/fa';
import { repositories, projects } from '../data/library';
import { useContents } from '../hooks/useContents';
import PageHeader from '../components/PageHeader';
import NotificationBanner from '../components/NotificationBanner';
import SEO from '../components/SEO';
import UnifiedFeed from '../components/UnifiedFeed';
import FeedItem from '../components/FeedItem';
import { contactInfo } from '../data/contactInfo';

function Biblioteca() {
    const { data, loading } = useContents();
    const [showRepos, setShowRepos] = useState(false);  // Restore this
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        if (loading) return;

        // Filter only 'libros' collection from Sheet/Merged Data
        const allLibros = data.filter(item => item.collection === 'libros').sort((a, b) => b.dateObj - a.dateObj);
        setNewArrivals(allLibros.slice(0, 3));
    }, [data, loading]);

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
            <SEO title="Biblioteca Popular Euforión" description="Biblioteca Popular y Pública Euforión - Más de 90 años promoviendo la lectura." />
            <NotificationBanner target="biblioteca" />

            <div className="layout-sidebar">
                {/* Main Content */}
                <div>
                    <PageHeader
                        title="La Biblioteca"
                        imageSrc="/images/biblioteca/intro.gif"
                        altText="Biblioteca Popular Euforión"
                        quote="¡LEER NOS HACE LIBRES!"
                    />

                    <motion.p variants={itemVariants} style={{ lineHeight: '1.6', marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--color-gray-dark)' }}>
                        En la Biblioteca Euforión trabajamos hace más de 90 años promoviendo la lectura como un acto de amor, respeto y libertad individual y social.
                    </motion.p>

                    {/* 1. Avisos (High Priority) */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                        <UnifiedFeed tag="biblioteca" types={['avisos']} limit={3} />
                    </motion.section>

                    {/* New Arrivals Section - DYNAMIC */}
                    {newArrivals.length > 0 && (
                        <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-blue-dark)' }}>
                                <FaStar color="gold" /> Últimos Ingresos
                            </h3>
                            <div className="grid grid-3">
                                {newArrivals.map((book) => (
                                    <FeedItem key={book.id} item={book} />
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <Link to="/biblioteca/ingresos" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaBookReader /> Ver todos los ingresos
                                </Link>
                            </div>
                        </motion.section>
                    )}

                    {/* Servicios */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <FaBookReader color="var(--color-blue-light)" /> Servicios
                        </h3>
                        <div className="grid grid-2">
                            <div className="card">
                                <h4>Sala de Lectura</h4>
                                <p>Espacios silenciosos para lectura y estudio, incluyendo sala infantil.</p>
                            </div>
                            <div className="card">
                                <h4>Estantería Abierta</h4>
                                <p>Acceso directo a obras de referencia y material bibliográfico.</p>
                            </div>
                            <a href="http://1973.bepe.ar/" target="_blank" rel="noopener noreferrer" className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--color-blue-medium)', textDecoration: 'none' }}>
                                <FaSearch size={30} style={{ marginBottom: '0.5rem' }} />
                                <span style={{ fontWeight: 'bold' }}>Catálogo Online</span>
                            </a>
                        </div>
                    </motion.section>

                    {/* Events & News */}
                    <motion.section variants={itemVariants} style={{ marginBottom: '3rem', marginTop: '3rem' }}>
                        <UnifiedFeed tag="biblioteca" types={['eventos', 'novedades']} limit={4} />
                    </motion.section>

                    {/* Repositorios */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <FaUniversity color="var(--color-blue-light)" /> Repositorios Universitarios
                        </h3>
                        <p style={{ marginBottom: '1rem' }}>Acceso a repositorios de acceso abierto de universidades argentinas.</p>

                        <button
                            onClick={() => setShowRepos(!showRepos)}
                            className="btn btn-outline"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', justifyContent: 'center' }}
                        >
                            {showRepos ? 'Ocultar Repositorios' : 'Ver Listado de Repositorios'}
                            {showRepos ? <FaChevronUp /> : <FaChevronDown />}
                        </button>

                        <AnimatePresence>
                            {showRepos && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <ul style={{
                                        marginTop: '1rem',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                        gap: '1rem',
                                        listStyle: 'none',
                                        padding: 0
                                    }}>
                                        {repositories.map((repo, index) => (
                                            <li key={index}>
                                                <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-dark)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    • {repo.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* Proyectos */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <FaHandHoldingHeart color="var(--color-blue-light)" /> Proyectos y Actividades
                        </h3>
                        <div className="grid grid-2">
                            {projects.map((project, index) => (
                                <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                    <h4 style={{ color: 'var(--color-blue-medium)', marginBottom: '0.5rem' }}>{project.title}</h4>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>{project.description}</p>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-blue-light)', marginTop: '0.5rem', display: 'block' }}>Ver más en Facebook &rarr;</span>
                                </a>
                            ))}
                            {/* Taller Literario */}
                            <Link to="/talleres" className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                <h4 style={{ color: 'var(--color-blue-medium)', marginBottom: '0.5rem' }}>Taller Literario</h4>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>Un espacio de lectura y creación literaria compartido por los tres niveles.</p>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-blue-light)', marginTop: '0.5rem', display: 'block' }}>Ver Info &rarr;</span>
                            </Link>
                        </div>
                    </motion.section>

                    {/* Equipo */}
                    <motion.section variants={itemVariants} style={{ marginTop: '3rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <FaUsers color="var(--color-blue-light)" /> Equipo de Trabajo
                        </h3>
                        <div className="grid grid-3">
                            <div className="card" style={{ textAlign: 'center' }}>
                                <img src="/images/biblioteca/vanesa.jpg" alt="Vanesa Ramírez Caruso" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', margin: 0 }}>Vanesa Ramírez Caruso</h4>
                                <p style={{ fontSize: '0.85rem', color: '#666' }}>Lic. en Bibliotecología<br /><strong>Directora</strong></p>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <img src="/images/biblioteca/alejandra.jpg" alt="Alejandra Oviedo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', margin: 0 }}>Alejandra Oviedo</h4>
                                <p style={{ fontSize: '0.85rem', color: '#666' }}>Bibliotecóloga<br /><strong>Auxiliar</strong></p>
                            </div>
                            <div className="card" style={{ textAlign: 'center' }}>
                                <img src="/images/biblioteca/betina.jpg" alt="Betina Sansoi" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }} />
                                <h4 style={{ fontSize: '1rem', margin: 0 }}>Betina Sansoi</h4>
                                <p style={{ fontSize: '0.85rem', color: '#666' }}>Lic. Trabajo Social<br /><strong>Documentalista</strong></p>
                            </div>
                        </div>
                    </motion.section>

                    <motion.div variants={itemVariants} id="requisitos" className="card" style={{ marginTop: '3rem', backgroundColor: 'var(--color-bg-light)' }}>
                        <h3>Requisitos para Asociarse</h3>
                        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                            <li>Fotocopia de DNI</li>
                            <li>Fotocopia de servicio a su nombre</li>
                            <li>2 fotos carnet (4x4)</li>
                            <li>Pago de Cuota Mensual + Matriculación</li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants} id="donaciones" className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--color-blue-light)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaHandHoldingHeart color="var(--color-blue-medium)" /> Donaciones
                        </h3>
                        <p>Aceptamos libros universitarios vigentes, diccionarios, narrativa y manuales escolares (max 15 años).</p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSc0v01knP1Drkf-t2aPgdN_qzmw3qSlUYGNUUB2bJ5sTzl7nA/viewform" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Completar Formulario de Donación
                        </a>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <aside>
                    <motion.div variants={itemVariants} className="card" style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Información Útil</h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', color: 'var(--color-blue-medium)', marginBottom: '0.5rem' }}>Horarios</h4>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--color-gray-dark)' }}>
                                <li><strong>Lun, Jue, Vie:</strong> 7:00 - 20:00 hs</li>
                                <li><strong>Martes:</strong> 7-14 hs y 17-20 hs</li>
                                <li><strong>Miércoles:</strong> 7:00 - 18:00 hs</li>
                            </ul>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', color: 'var(--color-blue-medium)', marginBottom: '0.5rem' }}>Contacto</h4>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--color-gray-dark)' }}>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaPhoneAlt color="var(--color-blue-light)" /> {contactInfo.biblioteca.phone}
                                </li>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaEnvelope color="var(--color-blue-light)" /> <a href={`mailto:${contactInfo.biblioteca.email}`} style={{ color: 'inherit' }}>{contactInfo.biblioteca.email}</a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                    <FaMapMarkerAlt color="var(--color-blue-light)" style={{ marginTop: '3px' }} />
                                    {contactInfo.biblioteca.address}
                                </li>
                            </ul>
                        </div>

                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem', marginTop: '2rem' }}>Enlaces Rápidos</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}><a href="http://1973.bepe.ar/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-blue-medium)', fontWeight: '500' }}>Catálogo Online &rarr;</a></li>
                            <li style={{ marginBottom: '0.8rem' }}><a href="#requisitos" style={{ color: 'var(--color-blue-medium)', fontWeight: '500' }}>Cómo Asociarse &rarr;</a></li>
                            <li style={{ marginBottom: '0.8rem' }}><a href="#donaciones" style={{ color: 'var(--color-blue-medium)', fontWeight: '500' }}>Donaciones &rarr;</a></li>
                        </ul>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <a href="https://www.facebook.com/BibliotecaEuforion" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/bibliotecaeuforion/?hl=es-la" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <FaInstagram />
                            </a>
                        </div>
                    </motion.div>
                </aside>
            </div>
        </motion.div>
    );
}

export default Biblioteca;
