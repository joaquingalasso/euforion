import React from 'react';
import { motion } from 'framer-motion';
import './PageHeader.css';

const PageHeader = ({ title, imageSrc, altText, quote }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="page-header">
            <motion.div
                className="page-header-image-container"
                variants={itemVariants}
            >
                <img src={imageSrc} alt={altText || title} className="page-header-image" />
                <div className="page-header-title-overlay">
                    <h1 className="page-header-title">{title}</h1>
                    {quote && (
                        <blockquote className="page-header-quote">
                            {quote}
                        </blockquote>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PageHeader;
