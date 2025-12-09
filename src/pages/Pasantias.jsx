import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Pasantias() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Pasantías" imageSrc="/images/general/biblioteca.jpg" />
            <div className="container section">
                <h2>Pasantías</h2>
                <p>Oportunidades de formación práctica en nuestra biblioteca para estudiantes.</p>
            </div>
        </motion.div>
    );
}
export default Pasantias;
