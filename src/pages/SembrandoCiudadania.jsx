import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { FaHandHoldingHeart, FaUsers, FaVoteYea } from 'react-icons/fa';

function SembrandoCiudadania() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Sembrando Ciudadanía" imageSrc="/images/general/biblioteca-frente.jpg" />
            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sembrando Ciudadanía</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-dark)' }}>Construyendo futuro a través de la participación activa.</p>
                </div>

                <div className="grid grid-3">
                    <div className="card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaVoteYea color="var(--color-blue-light)" /> Participación</h3>
                        <p>Incentivamos a nuestros alumnos a sumarse a asociaciones civiles y espacios de decisión ciudadana, fomentando el compromiso social.</p>
                    </div>
                    <div className="card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaHandHoldingHeart color="var(--color-blue-light)" /> Voluntariado</h3>
                        <p>Promovemos actividades solidarias que fortalecen el tejido social y desarrollan la empatía y la responsabilidad cívica.</p>
                    </div>
                    <div className="card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaUsers color="var(--color-blue-light)" /> Articulación</h3>
                        <p>Trabajamos en conjunto con la Comisión Directiva para acercar a los jóvenes al funcionamiento de las instituciones democráticas.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default SembrandoCiudadania;
