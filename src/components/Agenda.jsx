import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarDay, FaMapMarkerAlt, FaClock, FaTag, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getUpcomingEvents } from '../data/events';

function Agenda({ filter: externalFilter, showFilters = true, title = "Agenda de Actividades", externalEvents }) {
    const [internalFilter, setInternalFilter] = useState('todos');

    // Use external events if provided, otherwise fetch from static data
    // Note: If externalEvents are raw MD objects, we might need to ensure they match the shape expected (id, title, date, category, description, time)
    const allEvents = externalEvents || getUpcomingEvents();

    const activeFilter = externalFilter ? externalFilter.toLowerCase() : internalFilter;
    const effectiveFilter = activeFilter === 'todos' ? 'todos' : activeFilter;

    const filteredEvents = effectiveFilter === 'todos'
        ? allEvents
        : allEvents.filter(event => event.category === effectiveFilter);

    const categories = [
        { id: 'todos', label: 'Todos' },
        { id: 'institucional', label: 'Institucional' },
        { id: 'biblioteca', label: 'Biblioteca' },
        { id: 'jardin', label: 'Jardín' },
        { id: 'primaria', label: 'Primaria' },
        { id: 'secundaria', label: 'Secundaria' },
        { id: 'talleres', label: 'Talleres' },
    ];

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'biblioteca': return 'var(--color-blue-light)';
            case 'talleres': return 'var(--color-blue-azure)';
            case 'institucional': return 'var(--color-blue-dark)';
            default: return 'var(--color-blue-medium)';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00');
        const day = date.getDate();
        const month = date.toLocaleString('es-AR', { month: 'short' }).toUpperCase();
        return { day, month };
    };

    return (
        <section className="section container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: showFilters ? '3rem' : '2rem' }}
            >
                <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <FaCalendarDay color="var(--color-blue-light)" /> {title}
                </h2>
                {showFilters && (
                    <p style={{ color: 'var(--color-gray-medium)' }}>
                        Próximos eventos y fechas importantes de nuestra comunidad.
                    </p>
                )}
            </motion.div>

            {/* Filters - Only render if showFilters is true AND no external filter is controlled */}
            {showFilters && !externalFilter && (
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setInternalFilter(cat.id)}
                            className={`btn ${internalFilter === cat.id ? 'btn-primary' : 'btn-outline'}`}
                            style={{
                                padding: '0.4rem 1rem',
                                fontSize: '0.9rem',
                                border: internalFilter === cat.id ? 'none' : '1px solid var(--color-gray-light)',
                                color: internalFilter === cat.id ? 'white' : 'var(--color-gray-medium)'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Events List */}
            <div className="grid grid-2">
                <AnimatePresence mode='popLayout'>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => {
                            const { day, month } = formatDate(event.date);
                            const categoryColor = getCategoryColor(event.category);

                            return (
                                <motion.div
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="card"
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        padding: '1rem',
                                        alignItems: 'center',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Milder shadow
                                        border: '1px solid var(--color-gray-light)'
                                    }}
                                >
                                    {/* Date Badge - More Compact */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '60px', // Smaller
                                        height: '60px',
                                        backgroundColor: 'var(--color-bg-light)',
                                        borderRadius: '8px',
                                        color: 'var(--color-blue-dark)',
                                        borderLeft: `4px solid ${categoryColor}` // Side border instead of full border
                                    }}>
                                        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', lineHeight: 1 }}>{day}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>{month}</span>
                                    </div>

                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ marginBottom: '0.3rem' }}>
                                            {/* Compact Category Tag */}
                                            <span style={{
                                                fontSize: '0.7rem',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold',
                                                color: categoryColor,
                                                letterSpacing: '0.5px'
                                            }}>
                                                {event.category}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '1rem', margin: '0 0 0.3rem 0', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={event.title}>
                                            {event.title}
                                        </h3>

                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {event.description}
                                        </p>

                                        {event.link && (
                                            <Link to={event.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: '600', color: categoryColor, marginTop: '0.5rem' }}>
                                                Más info <FaChevronRight size={9} />
                                            </Link>
                                        )}
                                    </div>

                                    {/* Time - Vertically aligned to the middle on the right */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderLeft: '1px solid var(--color-gray-light)',
                                        paddingLeft: '1rem',
                                        minWidth: '60px',
                                        textAlign: 'center'
                                    }}>
                                        <FaClock size={16} color="var(--color-gray-medium)" style={{ marginBottom: '0.3rem' }} />
                                        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-gray-dark)' }}>{event.time}</span>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--color-gray-medium)' }}
                        >
                            <p>No hay eventos próximos.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

export default Agenda;
