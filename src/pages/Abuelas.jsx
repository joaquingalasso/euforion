import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Abuelas() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Abuelas Cuentacuentos" imageSrc="/images/general/biblioteca.jpg" />
            <div className="container section">
                <h2>Abuelas Cuentacuentos</h2>
                <p>Programa de voluntariado para la promoción de la lectura en niños y niñas.</p>
            </div>
        </motion.div>
    );
}
export default Abuelas;
