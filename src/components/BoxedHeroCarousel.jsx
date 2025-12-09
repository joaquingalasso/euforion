import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './StoreHero.css'; // Use StoreHero styles

const BoxedHeroCarousel = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="store-hero">
            <div className="store-hero-image-container">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    style={{ height: '100%', borderRadius: 'inherit' }}
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.id || item.title}>
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                {/* Image */}
                                <img
                                    src={item.image || '/images/general/frente-antiguo.jpg'}
                                    alt={item.title}
                                    className="store-hero-image"
                                />

                                {/* Overlay Content */}
                                <div className="store-hero-overlay">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <span style={{
                                            display: 'inline-block',
                                            backgroundColor: 'var(--color-blue-light)',
                                            color: 'white',
                                            padding: '4px 12px',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            {item.category || 'Taller'}
                                        </span>
                                        <h1 className="store-hero-title" style={{ fontSize: '2.5rem' }}>{item.title}</h1>
                                        {item.excerpt && (
                                            <p className="store-hero-subtitle" style={{
                                                maxWidth: '700px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {item.excerpt}
                                            </p>
                                        )}
                                        <div style={{ marginTop: '1.5rem' }}>
                                            <Link to={`/talleres/${item.id}`} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                                                Ver Actividad
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BoxedHeroCarousel;
