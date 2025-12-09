import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaRunning } from 'react-icons/fa';
import { useContents } from '../hooks/useContents';
import ReactMarkdown from 'react-markdown';
import UnifiedFeed from '../components/UnifiedFeed';
import SEO from '../components/SEO';
import Loading from '../components/Loading';

function Talleres() {
    const { data: allContent, loading } = useContents();
    const [activities, setActivities] = useState([]);
    const [filterAudience, setFilterAudience] = useState('Todos');

    useEffect(() => {
        if (!loading) {
            const talleres = allContent.filter(c => c.collection === 'talleres');
            setActivities(talleres);
        }
    }, [allContent, loading]);



    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) return (
        <div className="container section">
            <Loading text="Cargando talleres..." />
        </div>
    );

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <SEO title="Talleres y Actividades" />

            {/* Avisos y Eventos de Talleres (Arriba) */}
            <UnifiedFeed tag="talleres" types={['avisos', 'eventos']} limit={3} className="mb-4" />

            <motion.h1 variants={itemVariants} style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Actividades y Talleres</motion.h1>
            <motion.p variants={itemVariants} style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-gray-medium)' }}>
                Descubrí todas las actividades extracurriculares que Euforión tiene para ofrecerte.
            </motion.p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {['Todos', 'Niños', 'Jóvenes', 'Adultos', 'Adultos Mayores'].map(fil => (
                    <button
                        key={fil}
                        onClick={() => setFilterAudience(fil)}
                        className={`btn ${filterAudience === fil ? 'btn-primary' : 'btn-outline'}`}
                        style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}
                    >
                        {fil}
                    </button>
                ))}
            </div>

            <div className="grid grid-2" style={{ alignItems: 'start' }}>
                <AnimatePresence mode='popLayout'>
                    {activities
                        .filter(act => filterAudience === 'Todos' || (act.audience && act.audience.includes(filterAudience)))
                        .map((activity, index) => (
                            <motion.div
                                key={activity.id || index}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="card"
                                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}
                            >
                                {/* Header Image */}
                                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                                    {activity.image ? (
                                        <img src={activity.image} alt={activity.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FaRunning size={50} color="white" />
                                        </div>
                                    )}

                                    {/* Audience Badges Overlay - Removed as per user request to move them under title */}
                                </div>

                                <div style={{ padding: '2rem 2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-blue-dark)', fontSize: '1.5rem' }}>{activity.title}</h3>
                                        {activity.audience && (
                                            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                                                {activity.audience.map(aud => (
                                                    <span key={aud} style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-blue-dark)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                        {aud}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {(activity.instructor || activity.teacher) && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blue-medium)', fontWeight: '600', marginBottom: '1rem' }}>
                                                <FaUser size={14} />
                                                <span>Prof. {activity.instructor || activity.teacher}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                        {/* Schedule */}
                                        {activity.schedule && (
                                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.8rem' }}>
                                                <FaClock style={{ marginTop: '4px', color: 'var(--color-gray-dark)', minWidth: '16px' }} />
                                                <div>
                                                    {Array.isArray(activity.schedule) ? (
                                                        <span style={{ fontSize: '0.95rem', color: '#555' }}>{activity.schedule.join(', ')}</span>
                                                    ) : (
                                                        <span style={{ fontSize: '0.95rem', color: '#555' }}>{activity.schedule}</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Location */}
                                        {activity.location && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                <FaMapMarkerAlt style={{ color: 'var(--color-gray-dark)', minWidth: '16px' }} />
                                                <span style={{ fontSize: '0.95rem', color: '#555' }}>{activity.location}</span>
                                            </div>
                                        )}

                                        {/* Contact Phone */}
                                        {(activity.contact || activity.contact_phone) && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                <FaPhone style={{ color: 'var(--color-gray-dark)', minWidth: '16px' }} />
                                                <a href={`tel:${(activity.contact || activity.contact_phone).replace(/\s/g, '')}`} style={{ fontSize: '0.95rem', color: 'var(--color-blue-medium)', fontWeight: '500' }}>
                                                    {activity.contact || activity.contact_phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <div style={{ marginTop: 'auto', borderTop: '1px solid #eee', paddingTop: '1rem', textAlign: 'right' }}>
                                        <Link
                                            to={`/talleres/${activity.id || index}`}
                                            className="btn btn-sm btn-outline"
                                            style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', width: '100%', textAlign: 'center', display: 'inline-block' }}
                                        >
                                            Ver página completa
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {activities.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--color-gray-medium)', marginTop: '2rem' }}>
                    <p>No hay talleres disponibles por el momento.</p>
                </div>
            )}

            {/* Novedades de Talleres (Abajo) */}
            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Novedades de Talleres</h2>
                <UnifiedFeed tag="talleres" types={['novedades']} limit={3} />
            </div>
        </motion.div>
    );
}

export default Talleres;
