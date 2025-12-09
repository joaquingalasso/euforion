import { motion } from 'framer-motion';
import { FaArchive, FaSearch } from 'react-icons/fa';

function ArchivoHistorico() {
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
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Archivo Histórico</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                    Preservando la memoria documental de nuestra institución y comunidad.
                </p>
            </motion.div>

            <div className="grid grid-2">
                <motion.div variants={itemVariants} className="card">
                    <FaArchive size={40} color="var(--color-blue-light)" style={{ marginBottom: '1rem' }} />
                    <h3>Documentos Fundacionales</h3>
                    <p>Acceso a actas, estatutos originales y registros de los primeros años de la biblioteca.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="card">
                    <FaSearch size={40} color="var(--color-blue-light)" style={{ marginBottom: '1rem' }} />
                    <h3>Catálogo de Archivo</h3>
                    <p>Próximamente disponible para consultas online.</p>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ArchivoHistorico;
