import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContents } from '../hooks/useContents';
import { loadFullItem } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import UnifiedFeed from '../components/UnifiedFeed';
import Loading from '../components/Loading';
import SimpleGallery from '../components/SimpleGallery';

function WorkshopDetail() {
    const { id } = useParams();
    const { data: allContent, loading: contentLoading } = useContents();

    const [workshop, setWorkshop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkshop = async () => {
            if (contentLoading) return;
            setLoading(true);

            try {
                const activities = allContent.filter(c => c.collection === 'talleres');
                const found = activities.find(a => a.id === id);
                if (found) {
                    const fullWorkshop = await loadFullItem(found);
                    setWorkshop(fullWorkshop);
                } else {
                    setWorkshop(null);
                }
            } catch (error) {
                console.error("Error loading workshop:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkshop();
    }, [id, allContent, contentLoading]);

    if (loading) {
        return (
            <div className="container section" style={{ padding: '4rem 0' }}>
                <Loading text="Cargando taller..." />
            </div>
        );
    }

    if (!workshop) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h2>Actividad no encontrada</h2>
                <Link to="/talleres" className="btn btn-primary" style={{ marginTop: '1rem' }}>Volver a Talleres</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container section"
        >
            <Link to="/talleres" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-gray-medium)', fontWeight: 'bold' }}>
                <FaArrowLeft /> Volver a Talleres
            </Link>

            {/* Avisos específicos del taller */}
            <UnifiedFeed
                tags={['talleres', workshop.id]}
                types={['avisos']}
                limit={2}
                className="mb-4"
            />

            <div className="grid grid-3" style={{ alignItems: 'start', gap: '3rem' }}>
                {/* Main Content (2/3 width on desktop) */}
                <div style={{ gridColumn: 'span 2' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-blue-dark)' }}>{workshop.title}</h1>

                    {workshop.image && (
                        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2rem', maxHeight: '400px' }}>
                            <img src={workshop.image} alt={workshop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}

                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
                        <ReactMarkdown components={{ h1: () => null }}>{workshop.content}</ReactMarkdown>
                    </div>

                    {workshop.requirements && workshop.requirements.length > 0 && (
                        <div style={{ marginTop: '3rem', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-blue-light)' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Requisitos</h3>
                            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                                {workshop.requirements.map((req, index) => (
                                    <li key={index} style={{ marginBottom: '0.5rem' }}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Gallery Section */}
                    {workshop.gallery && workshop.gallery.length > 0 && (
                        <SimpleGallery images={workshop.gallery} />
                    )}


                </div>

                {/* Sidebar Info (1/3 width on desktop) */}
                <div style={{ gridColumn: 'span 1' }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '2px solid var(--color-bg-light)', paddingBottom: '0.5rem' }}>Información Clave</h3>

                        {(workshop.teacher || workshop.instructor) && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', color: 'var(--color-blue-medium)' }}>
                                    <FaUser size={18} />
                                    <strong>Tallerista</strong>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {workshop.teacher_image && (
                                        <img src={workshop.teacher_image} alt={workshop.teacher || workshop.instructor} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                    )}
                                    <span>{workshop.teacher || workshop.instructor}</span>
                                </div>
                            </div>
                        )}

                        {workshop.schedule && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', color: 'var(--color-blue-medium)' }}>
                                    <FaClock size={18} />
                                    <strong>Horarios</strong>
                                </div>
                                <div>
                                    {Array.isArray(workshop.schedule) ? (
                                        <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                            {workshop.schedule.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    ) : (
                                        <p style={{ margin: 0 }}>{workshop.schedule}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Aranceles / Price */}
                        {workshop.price && workshop.price.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', color: 'var(--color-blue-medium)' }}>
                                    <FaCalendarAlt size={18} />
                                    <strong>Aranceles</strong>
                                </div>
                                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                    {workshop.price.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>
                        )}

                        {workshop.location && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', color: 'var(--color-blue-medium)' }}>
                                    <FaMapMarkerAlt size={18} />
                                    <strong>Lugar</strong>
                                </div>
                                <p style={{ margin: 0 }}>{workshop.location}</p>
                            </div>
                        )}

                        {(workshop.contact_phone || workshop.contact) && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem', color: 'var(--color-blue-medium)' }}>
                                    <FaPhone size={18} />
                                    <strong>Contacto</strong>
                                </div>
                                <a
                                    href={`tel:${(workshop.contact_phone || workshop.contact).replace(/\s/g, '')}`}
                                    className="btn btn-outline"
                                    style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem', width: '100%' }}
                                >
                                    {workshop.contact_phone || workshop.contact}
                                </a>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-medium)', marginBottom: '1rem' }}>
                                ¿Te interesa esta actividad? ¡Acercate a la Administración para inscribirte!
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </motion.div >
    );
}

export default WorkshopDetail;
