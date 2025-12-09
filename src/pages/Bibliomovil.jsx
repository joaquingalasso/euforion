import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Bibliomovil() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Bibliomóvil" imageSrc="/images/general/biblioteca.jpg" />
            <div className="container section">
                <h2>Bibliomóvil</h2>
                <p>Nuestra biblioteca móvil recorre la comunidad llevando lectura y actividades culturales.</p>
            </div>
        </motion.div>
    );
}
export default Bibliomovil;
