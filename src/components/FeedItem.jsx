import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaBullhorn, FaInfoCircle, FaExclamationTriangle, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const FeedItem = ({ item }) => {
    // Styles based on type
    // Ensure consistent type checking using collection if available, or fallback to type
    const collection = item.collection || item.type;
    const isAviso = collection === 'avisos' || collection === 'aviso';
    const isEvent = collection === 'eventos' || collection === 'event';
    const isNews = collection === 'novedades' || collection === 'news';
    const isBook = collection === 'libros' || collection === 'ingresos';

    // Date formatting for Events (Day / Month Badge)
    // Prioritize parsed dateObj from useContents, as item.date might be in unsupported format (DD/MM/YYYY)
    const dateObj = item.dateObj ? new Date(item.dateObj) : new Date(item.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
    const time = dateObj.getHours() + ':' + dateObj.getMinutes().toString().padStart(2, '0');
    const hasTime = dateObj.getHours() !== 0 || dateObj.getMinutes() !== 0;

    // Aviso Colors
    let borderColor = 'transparent';
    let textColor = 'inherit';
    let icon = <FaInfoCircle />;
    let bgColor = 'var(--color-bg-light)';

    if (isAviso) {
        if (item.level === 'alert') {
            borderColor = 'var(--color-red)';
            textColor = 'var(--color-red)';
            icon = <FaExclamationTriangle />;
            bgColor = '#fff5f5'; // Light red tint
        } else if (item.level === 'warning') {
            borderColor = '#fdc500'; // Yellow/Gold
            textColor = '#a07e00';   // Darker gold for visibility
            icon = <FaExclamationTriangle />;
            bgColor = '#fffdf5'; // Light yellow tint
        } else {
            borderColor = 'var(--color-blue-light)';
            textColor = 'var(--color-blue-light)';
            icon = <FaInfoCircle />;
            bgColor = '#f0f7ff'; // Light blue tint
        }
    }

    // Determine wrapper interactions
    const hasLink = !!item.link;

    // Construct Link Target
    let linkTarget = '#';
    if (hasLink) {
        linkTarget = item.link;
    } else if (isNews) {
        linkTarget = `/novedades/${item.id}`;
    } else if (isEvent) {
        // If it has a link, use it. Otherwise, it's just a card.
        if (hasLink) {
            linkTarget = item.link;
        } else {
            linkTarget = '#';
        }
    } else if (isAviso && !hasLink) {
        linkTarget = '#';
    } else if (isBook) {
        linkTarget = `/biblioteca/ingresos/${item.id}`;
    }

    const Wrapper = (linkTarget === '#') ? 'div' : Link;
    const isClickable = linkTarget !== '#';

    return (
        <Wrapper
            to={linkTarget !== '#' ? linkTarget : undefined}
            className="card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: '100%',
                padding: '0',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                borderLeft: isAviso ? `6px solid ${borderColor}` : 'none',
                backgroundColor: isAviso ? bgColor : 'white',
                position: 'relative',
                cursor: isClickable ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
            }}
        >
            {/* BOOK IMAGE */}
            {isBook && (
                <div style={{ height: '280px', overflow: 'hidden', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #eee', position: 'relative' }}>
                    {/* Category Overlay */}
                    {item.category && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            zIndex: 2
                        }}>
                            {item.category}
                        </div>
                    )}

                    {item.image ? (
                        <img src={item.image} alt={item.title} style={{ height: '90%', width: 'auto', maxWidth: '100%', objectFit: 'contain', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#ccc' }}>
                            <FaInfoCircle size={40} />
                            <span style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Sin portada</span>
                        </div>
                    )}
                </div>
            )}

            {/* EVENT IMAGE / DATE BADGE */}
            {isEvent && (
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: '#eee' }}>
                    {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaCalendarAlt size={50} color="white" opacity={0.5} />
                        </div>
                    )}
                    {/* Floating Date Badge */}
                    <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '8px 15px',
                        textAlign: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                        minWidth: '70px',
                        lineHeight: '1',
                        zIndex: 2
                    }}>
                        <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-blue-dark)' }}>{day}</span>
                        <span style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '4px' }}>{month}</span>
                        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#888', borderTop: '1px solid #eee', paddingTop: '2px' }}>{dateObj.getFullYear()}</span>
                    </div>
                </div>
            )}

            {/* NEWS IMAGE */}
            {isNews && (
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#eee' }}>
                    {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
                            <FaBullhorn size={40} color="#ccc" />
                        </div>
                    )}
                </div>
            )}

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* HEADER: Type specific */}
                {!isBook && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>

                        {/* TYPE TAG */}
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            color: isAviso ? textColor : (isEvent ? 'var(--color-accent)' : 'var(--color-blue-medium)'),
                            textTransform: 'uppercase',
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}>
                            {isAviso && icon}
                            {isEvent && <FaCalendarAlt />}
                            {isNews && <FaInfoCircle />}
                            {isNews ? 'Novedad' : (isAviso ? (item.level === 'alert' ? 'Alerta' : (item.level === 'warning' ? 'Advertencia' : (item.level === 'info' ? 'Recordatorio' : 'Aviso'))) : (item.tagline || 'Evento'))}
                        </span>

                        {/* DATE / TIME */}
                        {/* DATE / TIME / SCHEDULE */}
                        {!isEvent && (
                            <span style={{ fontSize: '0.85rem', color: '#888' }}>
                                {dateObj.toLocaleDateString()}
                            </span>
                        )}
                        {isEvent && (hasTime || (item.schedule && item.schedule.length > 0)) && (
                            <div style={{ fontSize: '0.9rem', color: '#666', fontWeight: '600', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {Array.isArray(item.schedule) && item.schedule.length > 0 ? (
                                    item.schedule.map((s, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <FaClock size={12} /> {s}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <FaClock size={12} /> {(Array.isArray(item.time) ? item.time.join(', ') : (item.time || item.schedule))} hs
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.8rem 0', lineHeight: '1.3', fontWeight: '700', color: 'var(--color-gray-dark)' }}>{item.title}</h3>

                {/* INSTRUCTOR (Workshops/Talleres) */}
                {/* User requested removal of "Profe:" label */}
                {item.instructor && (
                    <div style={{ marginBottom: '0.8rem', fontSize: '0.95rem', color: '#555', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaUsers size={14} color="var(--color-blue-medium)" />
                        <span style={{ fontWeight: '500' }}>{item.instructor}</span>
                    </div>
                )}

                {/* BOOK AUTHOR */}
                {isBook && item.author && (
                    <div style={{ marginBottom: '0.8rem', fontSize: '1rem', color: 'var(--color-blue-medium)', fontStyle: 'italic', fontWeight: '500' }}>
                        {item.author}
                    </div>
                )}

                {/* TARGET AUDIENCE (e.g. "1° Grado Turno Tarde") */}
                {(item.target && item.target.length > 0) && (
                    <div style={{ marginBottom: '0.8rem', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
                        Para: {item.target.join(', ')}
                    </div>
                )}

                {/* CONTENT */}
                <div style={{ flex: 1 }}>
                    {/* Logic: 
                        - If Aviso & No Link -> Show FULL Content (Markdown)
                        - If News/Event or Linked Aviso -> Show Excerpt 
                    */}
                    {(isAviso && !hasLink) ? (
                        <div style={{ fontSize: '0.95rem', color: '#444', marginTop: '0.5rem', lineHeight: '1.6' }}>
                            {item.content ? (
                                <div className="markdown-content">
                                    <ReactMarkdown
                                        components={{
                                            a: ({ node, ...props }) => <a {...props} style={{ color: 'var(--color-blue-medium)', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer" />
                                        }}
                                    >
                                        {item.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                item.excerpt
                            )}
                        </div>
                    ) : (
                        item.excerpt && (
                            <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, display: '-webkit-box', WebkitLineClamp: isAviso ? 10 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {item.excerpt}
                            </p>
                        )
                    )}
                </div>

                {/* FOOTER ACTION HINT */}
                {/* Only show actions if links exist */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: isBook ? 'none' : '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                    {/* Main Link (Details or Collection) */}
                    {linkTarget !== '#' && (
                        <div style={{ fontSize: '0.9rem', color: isAviso ? textColor : 'var(--color-blue-medium)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '0.5rem' }}>
                            {isBook ? 'Seguir leyendo →' : 'Más información →'}
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

export default FeedItem;
