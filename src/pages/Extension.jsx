import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBroadcastTower, FaMusic, FaUtensils, FaRunning, FaGlobeAmericas, FaChess, FaBus, FaBookReader } from 'react-icons/fa';
import BoxedHeroCarousel from '../components/BoxedHeroCarousel';
import { useContents } from '../hooks/useContents';
import Loading from '../components/Loading';

function Extension() {
    const { data: allContent, loading } = useContents();
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        if (!loading && allContent) {
            // Filter all workshops that should show in Extension/Feed
            // Note: useContents maps 'show_feed' to 'showInFeed'
            const relevantWrapper = allContent.filter(c => c.collection === 'talleres' && c.showInFeed === true);
            setWorkshops(relevantWrapper);
        }
    }, [allContent, loading]);

    const categories = [
        {
            title: 'Institucional',
            items: [
                { title: 'Buffet Institucional', link: '/buffet', icon: <FaUtensils size={30} /> },
                { title: 'Coro Juvenil', link: '/coro', icon: <FaMusic size={30} /> },
            ]
        },
        {
            title: 'Editorial',
            id: 'editorial',
            items: [
                { title: 'Palabras Libres', link: '/palabras-libres', icon: <FaBookReader size={30} /> },
                { title: 'Revista Digital', link: '/revista-digital', icon: <FaBookReader size={30} /> },
            ]
        },
        {
            title: 'Nivel Secundario',
            id: 'proyectos',
            items: [
                { title: 'Modelo ONU', link: '/modelo-onu', icon: <FaGlobeAmericas size={30} /> },
                { title: 'Radio Escolar', link: '/radio', icon: <FaBroadcastTower size={30} /> },
            ]
        },
        {
            title: 'Nivel Primario',
            items: [
                { title: 'Torneos de Ajedrez', link: '/ajedrez', icon: <FaChess size={30} /> },
            ]
        },
        {
            title: 'Biblioteca',
            items: [
                { title: 'Bibliomóvil', link: '/bibliomovil', icon: <FaBus size={30} /> },
                { title: 'Abuelas Cuentacuentos', link: '/abuelas', icon: <FaBookReader size={30} /> },
                { title: 'Taller Literario', link: '/talleres', icon: <FaBookReader size={30} /> },
                { title: 'Club de Lectura', link: '/club-lectura', icon: <FaBookReader size={30} /> },
            ]
        },
    ];

    if (loading) return <div className="container section"><Loading /></div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <div className="container" style={{ marginBottom: '2rem' }}>
                {workshops.length > 0 ? (
                    <BoxedHeroCarousel items={workshops} />
                ) : (
                    <BoxedHeroCarousel items={[{
                        id: 'intro',
                        title: 'Extensión Cultural',
                        excerpt: 'Actividades abiertas a la comunidad para el desarrollo integral.',
                        image: '/images/general/frente-antiguo.jpg'
                    }]} />
                )}
            </div>

            <div className="container section">
                {categories.map((cat, catIndex) => (
                    <div key={catIndex} id={cat.id || ''} style={{ marginBottom: '3rem' }}>
                        <h2 className="section-title">{cat.title}</h2>
                        <div className="grid grid-2">
                            {cat.items.map((item, i) => (
                                <Link to={item.link} key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-blue-dark)' }}>
                                    <div style={{ color: 'var(--color-accent)', filter: 'brightness(0.8)' }}>
                                        {item.icon}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.title}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
export default Extension;
