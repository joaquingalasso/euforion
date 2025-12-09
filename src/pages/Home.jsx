import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBookReader, FaUsers, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaBell, FaRegNewspaper } from 'react-icons/fa';
import { contactInfo } from '../data/contactInfo';
import FeedItem from '../components/FeedItem';
import Loading from '../components/Loading';
import SEO from '../components/SEO';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useContents } from '../hooks/useContents';

function Home() {
    // Hooks should be at the top level
    const { data, loading } = useContents();

    // State for local filtering
    const [recentPosts, setRecentPosts] = useState([]);
    const [featuredNews, setFeaturedNews] = useState([]);
    const [allWorkshops, setAllWorkshops] = useState([]);
    const [avisos, setAvisos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedCollectionName, setSelectedCollectionName] = useState('');

    useEffect(() => {
        if (loading) return;

        const news = data.filter(item => item.collection === 'novedades');

        // ... carouselNews logic ... (Assuming it's fine, I'm replacing the block to inject the books logic, wait, I need to be careful with line counts)
        // I will target the useEffect body specifically for the books part if separated, but here I can just inject it.

        // BOOKS LOGIC: Random Collection
        const allBooks = data.filter(item => item.collection === 'libros');
        if (allBooks.length > 0) {
            // Group by 'group_name'
            const groups = {};
            allBooks.forEach(book => {
                const gName = book.group_name || 'General';
                if (!groups[gName]) groups[gName] = [];
                groups[gName].push(book);
            });

            // Pick random group
            const groupKeys = Object.keys(groups);
            if (groupKeys.length > 0) {
                const randomKey = groupKeys[Math.floor(Math.random() * groupKeys.length)];
                setBooks(groups[randomKey]);
                setSelectedCollectionName(randomKey !== 'General' ? randomKey : '');
            } else {
                setBooks(allBooks.slice(0, 6)); // Fallback if grouping fails somehow
            }
        } else {
            // Fallback for Novedades if 'libros' empty
            const legacyBooks = news.filter(n =>
                (n.category && (n.category.toLowerCase().includes('libro') || n.category.toLowerCase().includes('biblioteca'))) ||
                (n.tags && (n.tags.includes('libros') || n.tags.includes('biblioteca'))) ||
                (n.title && n.title.toLowerCase().includes('ingreso'))
            ).sort((a, b) => b.dateObj - a.dateObj);
            setBooks(legacyBooks.slice(0, 6));
        }

        const carouselNews = [
            ...news.filter(n => n.showInHome === true),
            ...data.filter(item => item.collection === 'talleres' && item.featured === true),
            ...data.filter(item => item.collection === 'eventos' && item.featured === true)
        ].sort((a, b) => b.dateObj - a.dateObj);

        setRecentPosts(carouselNews.slice(0, 5));

        // Featured (Destacadas): Featured flag + Random
        const featured = news.filter(n => n.featured === true);
        // Fisher-Yates shuffle
        for (let i = featured.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [featured[i], featured[j]] = [featured[j], featured[i]];
        }
        setFeaturedNews(featured.slice(0, 3));

        // 2. Workshops (Talleres)
        const workshops = data.filter(item => item.collection === 'talleres' && item.showInHome === true);
        setAllWorkshops(workshops);

        // 3. Events & Avisos
        const rawEvents = data.filter(item => item.collection === 'eventos');
        const rawAvisos = data.filter(item => item.collection === 'avisos');

        const now = new Date();
        now.setHours(0, 0, 0, 0); // Normalize to start of day to include today's events

        // Process Events
        const futureEvents = rawEvents.map(e => ({
            ...e,
            type: 'eventos'
        })).filter(e => e.dateObj >= now && (e.showInHome === true || e.featured === true)).sort((a, b) => a.dateObj - b.dateObj);

        setEventos(futureEvents.slice(0, 6));

        // Process Avisos (Filter expired AND check showInHome)
        const activeAvisos = rawAvisos.filter(a => {
            // 1. Check Expiration
            if (a.expirationDate && new Date(a.expirationDate) <= now) {
                return false; // Expired
            }
            // 2. Check Visibility (Must be strictly TRUE)
            return a.showInHome === true;
        }).map(a => ({
            ...a,
            type: 'avisos'
        })).sort((a, b) => b.dateObj - a.dateObj);

        setAvisos(activeAvisos);

    }, [data, loading]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div>
            <SEO title="Inicio" />

            {/* Hero Section - News Carousel */}
            <section style={{ height: '85vh', position: 'relative', backgroundColor: '#333' }}>
                {recentPosts.length > 0 ? (
                    <Swiper
                        modules={[Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        spaceBetween={0}
                        slidesPerView={1}
                        grabCursor={true}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        style={{ height: '100%' }}
                    >
                        {recentPosts.map((post) => {
                            // Dynamic Link and Text logic
                            let linkUrl = `/novedades/${post.id}`;
                            let buttonText = 'Leer nota completa';

                            if (post.collection === 'talleres') {
                                linkUrl = `/talleres/${post.id}`;
                                buttonText = 'Ver actividad';
                            } else if (post.collection === 'eventos') {
                                // Eventos may have external link, explicit link, or internal detail
                                if (post.link) {
                                    linkUrl = post.link;
                                    buttonText = 'Más información';
                                } else {
                                    // Asuming we don't have detailed event pages yet, fallback to agenda or similar
                                    // For now, let's point to novedades filter if no specific page, or if we had /eventos/:id
                                    // User request: "depende si tienen o no un enlace cargado"
                                    linkUrl = '/novedades?filter=eventos';
                                    buttonText = 'Ver en Agenda';
                                }
                            }

                            return (
                                <SwiperSlide key={post.id}>
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                        width: '100%',
                                        backgroundImage: `url(${post.image || '/images/logo-euforion.png'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            paddingBottom: '5rem'
                                        }}>
                                            <div className="container">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.8 }}
                                                    style={{ maxWidth: '800px', color: 'white' }}
                                                >
                                                    <span style={{
                                                        backgroundColor: 'var(--color-blue-light)',
                                                        padding: '0.5rem 1rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: 'bold',
                                                        marginBottom: '0.5rem',
                                                        display: 'inline-block',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {post.category || (post.collection === 'talleres' ? 'Taller' : 'Novedades')}
                                                    </span>

                                                    {/* Metadata: Date/Time for Events, Schedule for Workshops */}
                                                    {(post.collection === 'eventos' || post.collection === 'talleres') && (
                                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', fontSize: '0.95rem', color: '#f0f0f0' }}>
                                                            {post.collection === 'eventos' && (
                                                                <>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                        <FaCalendarAlt />
                                                                        <span>{post.dateObj ? post.dateObj.toLocaleDateString() : ''}</span>
                                                                    </div>
                                                                    {post.time && (
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                            <FaClock />
                                                                            <span>{post.time}</span>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                            {post.collection === 'talleres' && post.schedule && (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                    <FaClock />
                                                                    <span>{Array.isArray(post.schedule) ? post.schedule.join(', ') : post.schedule}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.2, color: 'white' }}>{post.title}</h1>
                                                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                                                    <Link to={linkUrl} className="btn btn-primary" style={{ border: '2px solid white', backgroundColor: 'transparent' }}>
                                                        {buttonText}
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                        <Loading text="Cargando novedades..." />
                    </div>
                )}
            </section>

            {/* Avisos Carousel Section - Only render if there are avisos */}
            {avisos.length > 0 && (
                <section style={{ backgroundColor: 'white', padding: '2rem 0', borderBottom: '1px solid #e0e0e0' }}>
                    <div className="container">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                            <FaBell size={24} color="var(--color-blue-dark)" />
                            <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-blue-dark)' }}>Avisos Importantes</h2>
                        </div>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            centerInsufficientSlides={true}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 }
                            }}
                            style={{ paddingBottom: '2.5rem', paddingTop: '1rem' }}
                        >
                            {avisos.map(aviso => (
                                <SwiperSlide key={aviso.id} style={{ height: 'auto' }}>
                                    <FeedItem item={aviso} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <Link to="/novedades?filter=avisos" className="btn btn-outline">
                                Ver todos los avisos
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Institucional Section */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg-light)', borderTop: '1px solid #e0e0e0' }}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2>Nuestra Institución</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--color-gray-medium)' }}>
                            La Biblioteca Euforión es un pilar educativo y cultural en nuestra comunidad. Con una trayectoria de casi un siglo, nos dedicamos a la educación integral en todos los niveles.
                        </p>
                    </motion.div >

                    <motion.div
                        className="grid grid-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.div className="card" variants={fadeInUp} style={{ textAlign: 'center', padding: '2.5rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <FaUsers size={50} color="var(--color-blue-light)" style={{ marginBottom: '1.5rem' }} />
                                <h3>Quiénes Somos</h3>
                                <p>Una asociación civil sin fines de lucro comprometida con la educación y la cultura.</p>
                            </div>
                            <Link to="/comision-directiva" className="btn btn-outline" style={{ marginTop: '1rem', alignSelf: 'center' }}>Conocer más</Link>
                        </motion.div>

                        <motion.div className="card" variants={fadeInUp} style={{ textAlign: 'center', padding: '2.5rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <FaBookReader size={50} color="var(--color-blue-light)" style={{ marginBottom: '1.5rem' }} />
                                <h3>Biblioteca</h3>
                                <p>Un espacio abierto a la comunidad con miles de volúmenes y actividades culturales.</p>
                            </div>
                            <Link to="/biblioteca" className="btn btn-outline" style={{ marginTop: '1rem', alignSelf: 'center' }}>Visitar Biblioteca</Link>
                        </motion.div>

                        <motion.div className="card" variants={fadeInUp} style={{ textAlign: 'center', padding: '2.5rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <FaGraduationCap size={50} color="var(--color-blue-light)" style={{ marginBottom: '1.5rem' }} />
                                <h3>Niveles Educativos</h3>
                                <p>Ofrecemos una propuesta educativa continua desde el Jardín hasta la Secundaria.</p>
                            </div>
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <Link to="/inicial" style={{ fontWeight: 'bold', color: 'var(--color-blue-medium)' }}>Inicial</Link> |
                                <Link to="/primario" style={{ fontWeight: 'bold', color: 'var(--color-blue-medium)' }}>Primario</Link> |
                                <Link to="/secundario" style={{ fontWeight: 'bold', color: 'var(--color-blue-medium)' }}>Secundario</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* Featured News Section */}
            <section style={{ backgroundColor: 'white', padding: '4rem 0', borderTop: '1px solid #e0e0e0' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <FaRegNewspaper size={28} color="var(--color-blue-dark)" />
                        <h2 style={{ fontSize: '2rem', margin: 0 }}>Noticias Destacadas</h2>
                    </div>
                    {featuredNews.length > 0 ? (
                        <div className="grid grid-3" style={{ alignItems: 'stretch' }}>
                            {featuredNews.map(item => (
                                <FeedItem key={item.id} item={{ ...item, type: 'novedades' }} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: 'gray', padding: '2rem' }}>
                            No hay noticias destacadas para mostrar.
                        </div>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link to="/novedades?filter=novedades" className="btn btn-outline">Ver todas las novedades</Link>
                    </div>
                </div>
            </section>

            {/* Eventos or Books Section */}
            {(eventos.length > 0 || books.length > 0) && (
                <section style={{ backgroundColor: 'var(--color-bg-light)', borderTop: '1px solid #e0e0e0', padding: '4rem 0' }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ textAlign: 'center', marginBottom: '3rem' }}
                        >
                            {eventos.length > 0 ? (
                                <>
                                    <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <FaCalendarAlt color="var(--color-blue-dark)" /> Próximos Eventos
                                    </h2>
                                    <p style={{ color: 'var(--color-gray-medium)' }}>
                                        No te pierdas las próximas actividades de nuestra comunidad.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                        <FaBookReader color="var(--color-blue-dark)" />
                                        {selectedCollectionName ? `Ingresos: ${selectedCollectionName}` : 'Últimos Ingresos'}
                                    </h2>
                                    <p style={{ color: 'var(--color-gray-medium)' }}>
                                        {selectedCollectionName ? 'Descubrí los ejemplares de esta colección que llegó a la Biblioteca.' : 'Descubrí los nuevos libros que llegaron a la Biblioteca.'}
                                    </p>
                                </>
                            )}
                        </motion.div>

                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 6000, disableOnInteraction: false }}
                            centerInsufficientSlides={true}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 }
                            }}
                            style={{ paddingBottom: '3rem', paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }}
                        >
                            {(eventos.length > 0 ? eventos : books).map(item => (
                                <SwiperSlide key={item.id} style={{ height: 'auto' }}>
                                    <FeedItem item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            {eventos.length > 0 ? (
                                <Link to="/novedades?filter=eventos" className="btn btn-outline">Ver agenda completa</Link>
                            ) : (
                                <Link to="/biblioteca/ingresos" className="btn btn-outline">Ver todos los ingresos</Link>
                            )}
                        </div>
                    </div>
                </section>
            )}


            {/* Actividades Section (Workshops Carousel) */}
            <section style={{ backgroundColor: 'white', borderTop: '1px solid #e0e0e0', padding: '4rem 0' }}>
                <div className="container">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        Actividades y Talleres
                    </motion.h2>

                    {allWorkshops.length > 0 ? (
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                            }}
                            style={{ padding: '1rem', paddingBottom: '3rem' }}
                        >
                            {allWorkshops.map((workshop) => (
                                <SwiperSlide key={workshop.id} style={{ height: 'auto' }}>
                                    <Link to={`/talleres/${workshop.id}`} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'block' }}>
                                        <motion.div
                                            className="card"
                                            whileHover={{ scale: 1.02 }}
                                            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '0', overflow: 'hidden', cursor: 'pointer', height: '100%', minHeight: '180px' }}
                                        >
                                            <div style={{ width: '40%', height: '100%', minHeight: '180px', backgroundColor: '#eee', position: 'relative' }}>
                                                {workshop.image ? (
                                                    <img src={workshop.image} alt={workshop.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-blue-light)' }}>
                                                        <FaUsers size={40} />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-blue-dark)' }}>{workshop.title}</h3>
                                                    {workshop.audience && (
                                                        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                                                            {workshop.audience.map(aud => (
                                                                <span key={aud} style={{
                                                                    backgroundColor: 'var(--color-accent)',
                                                                    color: 'var(--color-blue-dark)',
                                                                    padding: '2px 6px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '0.7rem',
                                                                    fontWeight: 'bold',
                                                                    textTransform: 'uppercase'
                                                                }}>
                                                                    {aud}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Instructor & Tagline */}
                                                <div style={{ marginBottom: '0.5rem' }}>
                                                    {workshop.instructor && (
                                                        <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#555' }}>
                                                            {workshop.instructor}
                                                        </span>
                                                    )}
                                                    {workshop.schedule && (
                                                        <div style={{ fontSize: '0.8rem', color: '#777', marginTop: '3px' }}>
                                                            {Array.isArray(workshop.schedule) ? (
                                                                workshop.schedule.map((s, i) => (
                                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                        <FaClock size={10} /> {s}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                                    <FaClock size={10} /> {workshop.schedule}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div style={{ padding: '2rem 0' }}>
                            <Loading text="Cargando actividades..." />
                        </div>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/talleres" className="btn btn-outline">Ver todas las actividades</Link>
                    </div>
                </div>
            </section >

            {/* Uniformes Teaser Section */}
            < section id="contacto" className="section" style={{ backgroundColor: 'var(--color-blue-dark)', color: 'white' }
            }>
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center' }}>
                        <div>
                            <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>¿Tenés dudas? Contactanos</h2>
                            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
                                Estamos a disposición para responder tus consultas sobre inscripciones, actividades y propuestas educativas.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaPhoneAlt size={20} color="var(--color-blue-light)" />
                                    <div>
                                        <strong style={{ display: 'block' }}>Administración</strong>
                                        <a href={`tel:${contactInfo.general.phones.admin.replace(/\s/g, '')}`} style={{ color: 'white' }}>{contactInfo.general.phones.admin}</a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaEnvelope size={20} color="var(--color-blue-light)" />
                                    <div>
                                        <strong style={{ display: 'block' }}>Email General</strong>
                                        <a href={`mailto:${contactInfo.general.email}`} style={{ color: 'white' }}>{contactInfo.general.email}</a>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <FaMapMarkerAlt size={20} color="var(--color-blue-light)" />
                                    <div>
                                        <strong style={{ display: 'block' }}>Dirección</strong>
                                        <span>{contactInfo.general.address}</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                                    <FaClock size={20} color="var(--color-blue-light)" style={{ marginTop: '5px' }} />
                                    <div>
                                        <strong style={{ display: 'block' }}>Horarios de Administración</strong>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                                            {contactInfo.general.hours.map((hour, i) => (
                                                <li key={i}>{hour}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.786273468948!2d-57.94829368476206!3d-34.91176298038084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e63016624553%3A0x203982823630f92d!2sBiblioteca%20Popular%20Eufori%C3%B3n!5e0!3m2!1ses!2sar!4v1633636282928!5m2!1ses!2sar"
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default Home;
