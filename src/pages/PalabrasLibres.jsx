import { motion } from 'framer-motion';

function PalabrasLibres() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Palabras Libres</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                    Antología con producciones de estudiantes.
                </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card">
                <p style={{ textAlign: 'center', color: 'var(--color-gray-medium)' }}>
                    Contenido próximamente...
                </p>
            </motion.div>
        </motion.div>
    );
}

export default PalabrasLibres;
