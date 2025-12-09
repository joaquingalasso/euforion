import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { FaGlobeAmericas, FaUsers, FaComments } from 'react-icons/fa';

function ModeloONU() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PageHeader title="Modelo ONU" imageSrc="/images/general/sala-concierto.jpg" />
            <div className="container section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Modelo de Naciones Unidas</h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-dark)' }}>Un espacio de debate, liderazgo y concienciación global.</p>
                </div>

                <div className="grid grid-2">
                    <div className="card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaGlobeAmericas color="var(--color-blue-light)" /> ¿Qué es?</h3>
                        <p>El Modelo ONU es una simulación de los órganos principales de las Naciones Unidas, donde los estudiantes asumen el rol de diplomáticos de distintos países.</p>
                    </div>
                    <div className="card">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaUsers color="var(--color-blue-light)" /> Participación</h3>
                        <p>Alumnos del Nivel Secundario se preparan durante el año para debatir problemáticas mundiales, fomentando el pensamiento crítico y la oratoria.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ModeloONU;
