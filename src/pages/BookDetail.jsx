import { useParams, Link } from 'react-router-dom';
import { useContents } from '../hooks/useContents';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import FeedItem from '../components/FeedItem';
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

function BookDetail() {
    const { id } = useParams();
    const { data, loading } = useContents();

    if (loading) return <Loading />;

    const book = data.find(item => item.id == id); // Loose equality for string/number id

    if (!book) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>Libro no encontrado</h2>
                <Link to="/biblioteca/ingresos" className="btn btn-primary">Volver a Ingresos</Link>
            </div>
        );
    }

    // Related Books: Same collection (group_name), excluding current
    const relatedBooks = data.filter(item =>
        item.collection === 'libros' &&
        item.group_name === book.group_name &&
        item.id != book.id
    ).slice(0, 3);

    return (
        <motion.div
            className="container section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <SEO title={`${book.title} - Biblioteca Euforión`} description={book.excerpt} />

            <div style={{ marginBottom: '2rem' }}>
                <Link to="/biblioteca/ingresos" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gray-medium)', textDecoration: 'none', fontWeight: '500' }}>
                    <FaArrowLeft /> Volver a Ingresos
                </Link>
            </div>

            <div className="grid grid-2" style={{ alignItems: 'start', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                {/* Visual Section */}
                <div>
                    <div style={{
                        backgroundColor: '#f9f9f9',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px'
                    }}>
                        {book.image ? (
                            <img src={book.image} alt={book.title} style={{ width: '100%', height: 'auto', maxWidth: '350px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} />
                        ) : (
                            <div style={{ textAlign: 'center', color: '#ccc' }}>
                                <FaInfoCircle size={60} />
                                <p>Sin portada</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div>
                    {/* Header */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            {book.category && (
                                <span style={{
                                    backgroundColor: 'var(--color-blue-light)',
                                    color: 'white',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                    {book.category}
                                </span>
                            )}
                            {book.group_name && book.group_name !== 'General' && (
                                <span style={{
                                    backgroundColor: 'var(--color-accent)',
                                    color: 'var(--color-blue-dark)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold'
                                }}>
                                    Colección: {book.group_name}
                                </span>
                            )}
                        </div>

                        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', lineHeight: '1.2', color: 'var(--color-blue-dark)' }}>{book.title}</h1>
                        {book.author && (
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-gray-medium)', fontStyle: 'italic', fontWeight: '500' }}>
                                Por {book.author}
                            </h2>
                        )}
                    </div>

                    {/* Synopsis / Content */}
                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444', marginBottom: '2.5rem' }}>
                        {book.content ? (
                            <ReactMarkdown components={{
                                p: ({ node, ...props }) => <p style={{ marginBottom: '1rem' }} {...props} />
                            }}>
                                {book.content}
                            </ReactMarkdown>
                        ) : (
                            <p>{book.excerpt || 'Sin sinopsis disponible.'}</p>
                        )}
                    </div>

                    {/* Actions */}
                    {book.catalogLink && (
                        <div style={{ marginBottom: '3rem' }}>
                            <a
                                href={book.catalogLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}
                            >
                                Consultar Disponibilidad
                            </a>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#777' }}>
                                <small>Te llevará a nuestro catálogo online para ver el estado del ejemplar.</small>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
                <div style={{ marginTop: '5rem', borderTop: '1px solid #eee', paddingTop: '3rem' }}>
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--color-blue-dark)' }}>Más de esta colección</h3>
                    <div className="grid grid-3">
                        {relatedBooks.map(item => (
                            <FeedItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default BookDetail;
