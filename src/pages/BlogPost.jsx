import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContents } from '../hooks/useContents';
import { loadFullItem } from '../utils/contentLoader';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaTag, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Loading from '../components/Loading';
import SEO from '../components/SEO';

function BlogPost() {
    const { id } = useParams();
    const { data: allPosts, loading: contentLoading } = useContents();

    const [post, setPost] = useState(null);
    const [prevPost, setPrevPost] = useState(null);
    const [nextPost, setNextPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const findPost = async () => {
            if (contentLoading) return;
            setLoading(true);
            try {
                // Filter only relevant collections
                const relevantPosts = allPosts.filter(p => p.collection === 'novedades' || p.collection === 'eventos');

                const currentIndex = relevantPosts.findIndex(p => p.id === id);

                if (currentIndex !== -1) {
                    const foundPost = relevantPosts[currentIndex];
                    const fullPost = await loadFullItem(foundPost);
                    setPost(fullPost);

                    // Logic: Next (newer) is index - 1, Prev (older) is index + 1
                    setNextPost(currentIndex > 0 ? relevantPosts[currentIndex - 1] : null);
                    setPrevPost(currentIndex < relevantPosts.length - 1 ? relevantPosts[currentIndex + 1] : null);
                } else {
                    setPost(null);
                }
            } catch (error) {
                console.error("Error finding post:", error);
            } finally {
                setLoading(false);
            }
        };

        findPost();
    }, [id, allPosts, contentLoading]);

    const currentUrl = window.location.href;

    if (loading) {
        return (
            <div className="container section">
                <Loading text="Cargando noticia..." />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container section">
                <Link to="/novedades" className="btn btn-outline" style={{ marginBottom: '2rem' }}>
                    <FaArrowLeft /> Volver a Novedades
                </Link>
                <h2>Noticia no encontrada.</h2>
            </div>
        );
    }

    const shareUrl = encodeURIComponent(currentUrl);
    const shareTitle = encodeURIComponent(post.title);

    return (
        <motion.div
            className="container section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: '800px' }}
        >
            <SEO
                title={post.title}
                description={post.excerpt || "Noticias del colegio"}
                image={post.image}
            />

            <Link to="/novedades" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blue-medium)', fontWeight: 'bold', marginBottom: '2rem' }}>
                <FaArrowLeft /> Volver a Novedades
            </Link>

            {post.image && (
                <div style={{ marginBottom: '2rem' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: 'var(--radius-md)', maxHeight: '400px', objectFit: 'cover' }} />
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-gray-light)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--color-gray-medium)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCalendarAlt /> {post.date ? new Date(post.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaTag /> {post.category || 'Novedades'}</span>
                </div>

                {/* Social Share Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ backgroundColor: '#1877F2', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }} title="Compartir en Facebook">
                        <FaFacebookF />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ backgroundColor: '#1DA1F2', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }} title="Compartir en X">
                        <FaTwitter />
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ backgroundColor: '#25D366', color: 'white', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }} title="Compartir en WhatsApp">
                        <FaWhatsapp />
                    </a>
                </div>
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-blue-dark)' }}>{post.title}</h1>

            <div className="markdown-content" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--color-gray-dark)' }}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Post Navigation */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-gray-light)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {prevPost ? (
                    <Link to={`/novedades/${prevPost.id}`} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textAlign: 'left', height: 'auto', padding: '1rem', whiteSpace: 'normal' }}>
                        <FaArrowLeft size={16} style={{ flexShrink: 0 }} />
                        <div style={{ minWidth: 0 }}>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-medium)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Anterior</span>
                            <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.95rem', lineHeight: '1.3' }}>{prevPost.title}</span>
                        </div>
                    </Link>
                ) : <div></div>}

                {nextPost ? (
                    <Link to={`/novedades/${nextPost.id}`} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.8rem', textAlign: 'right', height: 'auto', padding: '1rem', whiteSpace: 'normal' }}>
                        <div style={{ minWidth: 0 }}>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-gray-medium)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Siguiente</span>
                            <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.95rem', lineHeight: '1.3' }}>{nextPost.title}</span>
                        </div>
                        <FaArrowRight size={16} style={{ flexShrink: 0 }} />
                    </Link>
                ) : <div></div>}
            </div>
        </motion.div>
    );
}

export default BlogPost;
