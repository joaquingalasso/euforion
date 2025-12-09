import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
    return (
        <motion.div
            className="container section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', padding: '10rem 0' }}
        >
            <FaExclamationTriangle size={80} color="var(--color-blue-light)" style={{ marginBottom: '2rem' }} />
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ marginBottom: '2rem' }}>Página no encontrada</h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaHome /> Volver al Inicio
            </Link>
        </motion.div>
    );
}

export default NotFound;
