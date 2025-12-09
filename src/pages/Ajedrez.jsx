import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { FaChess, FaChessKnight, FaTrophy } from 'react-icons/fa';

function Ajedrez() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Torneos de Ajedrez" imageSrc="/images/general/frente-antiguo.jpg" />
            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ajedrez Euforión</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-dark)' }}>Estrategia, concentración y sana competencia.</p>
                </div>

                <div className="grid grid-3">
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaChess size={40} color="var(--color-blue-medium)" style={{ marginBottom: '1rem' }} />
                        <h3>Torneos</h3>
                        <p>Competencias internas e interescolares para todos los niveles.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaChessKnight size={40} color="var(--color-blue-medium)" style={{ marginBottom: '1rem' }} />
                        <h3>Talleres</h3>
                        <p>Clases de aprendizaje y perfeccionamiento para alumnos de la institución.</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <FaTrophy size={40} color="var(--color-blue-medium)" style={{ marginBottom: '1rem' }} />
                        <h3>Comunidad</h3>
                        <p>Fomentamos el desarrollo intelectual y social a través del juego ciencia.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Ajedrez;
