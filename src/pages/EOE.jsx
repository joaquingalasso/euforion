import { motion } from 'framer-motion';
import { eoeMembers, eoeDescription } from '../data/eoe';
import { FaUsers, FaUserMd } from 'react-icons/fa';

function EOE() {
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
        >
            <motion.h1 variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>Equipo de Orientación Escolar (EOE)</motion.h1>

            <motion.div variants={itemVariants} style={{ maxWidth: '800px', margin: '0 auto 4rem auto', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.8' }}>
                <p>{eoeDescription}</p>
            </motion.div>

            <div className="grid grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {eoeMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        className="card"
                        style={{ textAlign: 'center', padding: '2rem' }}
                    >
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                            <FaUserMd color="var(--color-blue-medium)" size={40} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-blue-dark)' }}>{member.name}</h3>
                        <h4 style={{ fontSize: '1.1rem', color: 'var(--color-blue-medium)', marginBottom: '0.5rem' }}>{member.role}</h4>
                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--color-gray-medium)' }}>{member.title}</p>
                        <p style={{ lineHeight: '1.6' }}>{member.description}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default EOE;
