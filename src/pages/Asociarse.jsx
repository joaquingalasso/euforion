
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

function Asociarse() {
    return (
        <div className="container section">
            <SEO title="Asociarse a la Biblioteca" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '4rem 0' }}
            >
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-blue-dark)' }}>Asociarse</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                    Esta sección se encuentra en construcción. Próximamente podrás asociarte online.
                </p>
            </motion.div>
        </div>
    );
}

export default Asociarse;
