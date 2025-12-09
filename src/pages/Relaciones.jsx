import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Relaciones() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Relaciones Institucionales" imageSrc="/images/general/frente-antiguo.jpg" />
            <div className="container section">
                <h2>Vinculación y Redes</h2>
                <p>Nuestras alianzas estratégicas y participación en la comunidad.</p>
            </div>
        </motion.div>
    );
}
export default Relaciones;
