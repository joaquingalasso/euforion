import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useContents } from '../hooks/useContents';
import { FaCalendarAlt, FaTag, FaArrowRight, FaClock, FaExclamationTriangle, FaInfoCircle, FaBell } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';
import Loading from '../components/Loading';

import FeedItem from '../components/FeedItem';

function Blog() {
    const [searchParams] = useSearchParams();
    const initialFilter = searchParams.get('filter');
    const { data: rawContent, loading } = useContents();

    // Map URL param to Tab name (case insensitive)
    const getInitialTab = () => {
        if (!initialFilter) return 'Todos';
        const lower = initialFilter.toLowerCase();
        if (lower === 'novedades') return 'Novedades';
        if (lower === 'eventos') return 'Eventos';
        if (lower === 'avisos') return 'Avisos';
        return 'Todos';
    };

    // Content States
    const [allContent, setAllContent] = useState([]);
    const [displayedContent, setDisplayedContent] = useState([]);

    // UI States
    const [activeTab, setActiveTab] = useState(getInitialTab());
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (loading) return;

        // Process raw content into FeedItem format
        // useContents already gives us a normalized list, usually.
        // But Blog.jsx had custom logic (tags, displayDate).
        // Let's re-apply that logic on top of rawContent.

        const processed = rawContent
            .filter(item => item.showInFeed !== false) // Filter hidden items
            .flatMap(item => {
                // Filter by known collections
                if (!['novedades', 'eventos', 'avisos'].includes(item.collection)) return [];

                // For Avisos, filter expired
                const now = new Date();
                if (item.collection === 'avisos') {
                    if (item.expirationDate && new Date(item.expirationDate) < now) return [];
                }

                return {
                    ...item,
                    type: item.collection,
                    tag: item.category || (item.collection === 'avisos' ? (item.type === 'alert' ? 'Alerta' : 'Aviso') : 'Novedades'),
                    displayDate: new Date(item.date).toLocaleDateString('es-AR')
                };
            });

        // useContents sorts by dateObj desc already.
        setAllContent(processed);

    }, [rawContent, loading]);

    // Effect to filtering and slicing
    useEffect(() => {
        let filtered = allContent;

        if (activeTab === 'Novedades') filtered = allContent.filter(i => i.type === 'novedades');
        if (activeTab === 'Eventos') filtered = allContent.filter(i => i.type === 'eventos');
        if (activeTab === 'Avisos') filtered = allContent.filter(i => i.type === 'avisos');

        // Reset page when tab changes
        // But here we want infinite scroll style or "Load More", so we slice from 0 to page * itemsPerPage
        setDisplayedContent(filtered.slice(0, page * itemsPerPage));

    }, [activeTab, page, allContent]);

    // Handlers
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1); // Reset to first page
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    const hasMore = () => {
        let totalFiltered = 0;
        if (activeTab === 'Todos') totalFiltered = allContent.length;
        else if (activeTab === 'Novedades') totalFiltered = allContent.filter(i => i.type === 'novedades').length;
        else if (activeTab === 'Eventos') totalFiltered = allContent.filter(i => i.type === 'eventos').length;
        else if (activeTab === 'Avisos') totalFiltered = allContent.filter(i => i.type === 'avisos').length;

        return displayedContent.length < totalFiltered;
    };


    return (
        <motion.div
            className="container section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <SEO title="Novedades y Agenda" description="Todas las noticias, eventos y avisos importantes de la Biblioteca Euforión." />

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Novedades y Agenda</h1>
                <p style={{ color: 'var(--color-gray-medium)', maxWidth: '600px', margin: '0 auto' }}>
                    Tu centro de información. Filtrá por tipo para encontrar rápidamente lo que buscás.
                </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {['Todos', 'Novedades', 'Eventos', 'Avisos'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className="btn"
                        style={{
                            minWidth: '120px',
                            backgroundColor: activeTab === tab ? 'var(--color-blue-dark)' : 'white',
                            color: activeTab === tab ? 'white' : 'var(--color-blue-dark)',
                            border: '1px solid var(--color-blue-dark)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ padding: '3rem 0' }}>
                    <Loading text="Cargando contenido..." />
                </div>
            ) : (
                <>
                    <div className="grid grid-3" style={{ alignItems: 'stretch' }}> {/* Stretch for equal height */}
                        <AnimatePresence mode="popLayout">
                            {displayedContent.map(item => (
                                <motion.div
                                    key={item.id || item.title} // Ensure unique key
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FeedItem item={item} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {hasMore() && (
                        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                            <button onClick={handleLoadMore} className="btn btn-outline" style={{ minWidth: '200px' }}>
                                Cargar más
                            </button>
                        </div>
                    )}

                    {!hasMore() && displayedContent.length > 0 && (
                        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#999' }}>No hay más contenido para mostrar.</p>
                    )}
                </>
            )}
        </motion.div>
    );
}

export default Blog;
