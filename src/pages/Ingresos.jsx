
import { useState, useEffect } from 'react';
import { useContents } from '../hooks/useContents';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Loading from '../components/Loading';
import FeedItem from '../components/FeedItem';
import { FaSearch, FaFilter } from 'react-icons/fa';

function Ingresos() {
    const { data, loading } = useContents();
    const [libros, setLibros] = useState([]);
    const [filteredLibros, setFilteredLibros] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!loading) {
            // Filter only 'libros' collection
            const allLibros = data.filter(item => item.collection === 'libros').sort((a, b) => b.dateObj - a.dateObj);
            setLibros(allLibros);
            setFilteredLibros(allLibros);

            // Extract unique categories (e.g. Donation, Purchase, Etc.)
            // Assuming 'category' field holds this info
            const cats = ['Todos', ...new Set(allLibros.map(l => l.category).filter(Boolean))];
            setCategories(cats);
        }
    }, [data, loading]);

    useEffect(() => {
        let result = libros;

        // Filter by Category
        if (activeCategory !== 'Todos') {
            result = result.filter(l => l.category === activeCategory);
        }

        // Filter by Search Term
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(l =>
                l.title.toLowerCase().includes(lowerTerm) ||
                (l.author && l.author.toLowerCase().includes(lowerTerm))
            );
        }

        setFilteredLibros(result);
    }, [activeCategory, searchTerm, libros]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) return <Loading />;

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <SEO title="Últimos Ingresos - Biblioteca Euforión" />

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-blue-dark)' }}>Últimos Ingresos</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                    Explora las nuevas adquisiciones de la biblioteca.
                </p>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                {/* Search */}
                <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
                    <input
                        type="text"
                        placeholder="Buscar por título o autor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '30px', border: '1px solid #ddd', fontSize: '1rem' }}
                    />
                </div>

                {/* Category Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: activeCategory === cat ? 'var(--color-blue-light)' : '#eee',
                                color: activeCategory === cat ? 'white' : '#555',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: '500'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid (Grouped by Collection) */}
            {filteredLibros.length > 0 ? (
                Object.entries(
                    filteredLibros.reduce((groups, book) => {
                        const groupName = book.group_name || 'General';
                        if (!groups[groupName]) groups[groupName] = [];
                        groups[groupName].push(book);
                        return groups;
                    }, {})
                ).map(([groupName, books]) => (
                    <div key={groupName} style={{ marginBottom: '4rem' }}>
                        {groupName !== 'General' && (
                            <h2 style={{
                                fontSize: '1.8rem',
                                borderBottom: '2px solid var(--color-blue-light)',
                                paddingBottom: '0.5rem',
                                marginBottom: '2rem',
                                color: 'var(--color-blue-dark)',
                                display: 'inline-block'
                            }}>
                                {groupName}
                            </h2>
                        )}
                        <div className="grid grid-3">
                            {books.map(libro => (
                                <FeedItem key={libro.id} item={libro} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
                    <p>No se encontraron libros con los filtros seleccionados.</p>
                </div>
            )}
        </motion.div>
    );
}

export default Ingresos;
