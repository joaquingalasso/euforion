import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SimpleGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const next = (currentIndex + 1) % images.length;
        setCurrentIndex(next);
        setSelectedImage(images[next]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prev = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prev);
        setSelectedImage(images[prev]);
    };

    return (
        <div style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-blue-dark)' }}>Galería de Imágenes</h3>

            <div className="grid grid-4" style={{ gap: '1rem' }}>
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openLightbox(index)}
                        style={{
                            cursor: 'pointer',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            aspectRatio: '1',
                            backgroundColor: '#eee'
                        }}
                    >
                        <img
                            src={img}
                            alt={`Galería ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        {/* Controls */}
                        <button
                            onClick={closeLightbox}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10001 }}
                        >
                            <FaTimes size={30} />
                        </button>

                        <button
                            onClick={prevImage}
                            style={{ position: 'absolute', left: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10001 }}
                        >
                            <FaChevronLeft size={40} />
                        </button>

                        <button
                            onClick={nextImage}
                            style={{ position: 'absolute', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10001 }}
                        >
                            <FaChevronRight size={40} />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            src={selectedImage}
                            alt="Full screen"
                            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '4px' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SimpleGallery;
