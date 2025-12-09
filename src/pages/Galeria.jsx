
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

function Galeria() {
    return (
        <div className="container section">
            <SEO title="Galería Multimedia" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '4rem 0' }}
            >
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-blue-dark)' }}>Galería Multimedia</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                    Accede a nuestras fotos y videos institucionales. (Próximamente)
                </p>
            </motion.div>
        </div>
    );
}

export default Galeria;
