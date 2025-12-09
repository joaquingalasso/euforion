import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Alumni() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Alumni" imageSrc="/images/general/escuela.jpg" />
            <div className="container section">
                <h2>Comunidad de Ex-Alumnos</h2>
                <p>Espacio de reencuentro y vinculación para egresados de nuestra institución.</p>
            </div>
        </motion.div>
    );
}
export default Alumni;
