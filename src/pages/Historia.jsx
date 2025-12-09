import { motion } from 'framer-motion';
import { FaHistory, FaBuilding, FaBookOpen } from 'react-icons/fa';
import Timeline from '../components/Timeline';

function Historia() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ maxWidth: '900px' }}
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Nuestra Historia</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>Casi un siglo de compromiso con la cultura y la educación en el Barrio Mondongo.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card" style={{ padding: '3rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem' }}>
                    <FaHistory size={28} color="var(--color-blue-light)" />
                    <h2 style={{ margin: 0, color: 'var(--color-blue-dark)' }}>Orígenes y Legado</h2>
                </div>

                <blockquote style={{
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: 'var(--color-blue-medium)',
                    borderLeft: '4px solid var(--color-blue-light)',
                    paddingLeft: '1.5rem',
                    margin: '0 0 2rem 0'
                }}>
                    “El ideal que anima, transforma, eleva y dignifica los valores humanos, tiene en cada uno de nosotros un cultor sincero y entusiasta.” <br />
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '0.5rem', display: 'block' }}>- Nicodemo Scenna</span>
                </blockquote>

                <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--color-gray-dark)' }}>
                    Ha pasado mucho tiempo, el barrio Mondongo, cuna de Euforión, fue cambiando al ritmo de la ciudad y estos cambios potenciaron el crecimiento de la biblioteca, aumentando el radio de influencia al ámbito del casco de la ciudad, primero, y más allá del Gran La Plata, después.
                </p>
                <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--color-gray-dark)' }}>
                    De variadas herramientas se ha valido Euforión para ello: por un lado, la labor intrínseca de la biblioteca, apoyada por el bibliomóvil, por otro, las actividades culturales (conciertos, exposiciones, conferencias, las Abuelas Cuentacuentos) que nuclean y proyectan el sentir artístico, como así también el servicio educativo que brinda a la comunidad a través del Jardín de Infantes, el primero no estatal de la ciudad.
                </p>
            </motion.div>

            <div className="grid grid-2">
                <motion.div variants={itemVariants} className="card">
                    <FaBuilding size={40} color="var(--color-blue-light)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Crecimiento Institucional</h3>
                    <p>
                        Las sucesivas generaciones que han pasado por la institución y el edificio mismo con su crecimiento así lo demuestran en este nuevo milenio. La apertura de la Escuela Primaria y Secundaria es el salto de calidad hacia el futuro, ya que la tarea de aportar a la cultura es el eje que vertebra estos cambios para la comunidad.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="card">
                    <FaBookOpen size={40} color="var(--color-blue-light)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ marginBottom: '1rem' }}>Mirando al Futuro</h3>
                    <p>
                        Quien sabe en qué situación nos encontrará al centenario de nuestra institución; pasarán nuevas camadas de socios y dirigentes, de alumnos y docentes; la sede social estará en constante crecimiento y el Bibliomóvil será parte del paisaje urbano; de lo que estamos seguros es que continuará el sentido de pertenencia, aquel viejo legado de los fundadores, la pasión por Euforión.
                    </p>
                </motion.div>
            </div>

            <Timeline />
        </motion.div>
    );
}

export default Historia;
