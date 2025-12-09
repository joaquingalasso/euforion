import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Buffet() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Buffet Institucional" imageSrc="/images/general/frente-antiguo.jpg" />
            <div className="container section">
                <h2>Buffet Institucional</h2>
                <p>Servicio de alimentos y bebidas para nuestra comunidad educativa.</p>
            </div>
        </motion.div>
    );
}
export default Buffet;
