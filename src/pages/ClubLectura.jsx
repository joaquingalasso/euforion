import { motion } from 'framer-motion';
import { FaBookReader } from 'react-icons/fa';

function ClubLectura() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container section"
        >
            <div className="text-center" style={{ padding: '4rem 0' }}>
                <FaBookReader size={60} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                <h1 className="section-title">Club de Lectura</h1>
                <p>Próximamente más información sobre nuestro Club de Lectura.</p>
            </div>
        </motion.div>
    );
}

export default ClubLectura;
