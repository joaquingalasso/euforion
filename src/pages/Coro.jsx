import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

function Coro() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Coro Juvenil" imageSrc="/images/general/frente-antiguo.jpg" />
            <div className="container section">
                <h2>Coro Juvenil</h2>
                <p>Espacio de expresión musical para jóvenes.</p>
            </div>
        </motion.div>
    );
}
export default Coro;
