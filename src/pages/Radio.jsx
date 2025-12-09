import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Radio() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Radio Escolar" imageSrc="/images/general/frente-antiguo.jpg" />
            <div className="container section">
                <h2>Radio Escolar</h2>
                <p>Nuestra voz en el aire. Espacio de comunicación y participación.</p>
            </div>
        </motion.div>
    );
}
export default Radio;
