import React from 'react';
import { motion } from 'framer-motion';
import './StoreHero.css';

const StoreHero = () => {
    return (
        <div className="store-hero">
            <motion.div
                className="store-hero-image-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Using a placeholder or existing uniform image. ideally specific store image */}
                <img
                    src="/images/uniformes/ai/trio.png"
                    alt="Tienda Euforión"
                    className="store-hero-image"
                    onError={(e) => { e.target.src = 'https://placehold.co/1200x400/153687/ffffff?text=Tienda+Euforión'; }}
                />
                <div className="store-hero-overlay">
                    <h1 className="store-hero-title">Tienda Euforión</h1>
                    <p className="store-hero-subtitle">Productos oficiales y uniformes de la institución.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default StoreHero;
