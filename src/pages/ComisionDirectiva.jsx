import { motion } from 'framer-motion';
import { FaUserTie, FaUsers, FaBuilding, FaGavel, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ComisionDirectiva() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const mainBoard = [
        { role: 'Presidente', name: 'Ing. Alejandro Daniel Lugones' },
        { role: 'Vicepresidente', name: 'Arq. Paula Rodriguez' },
        { role: 'Secretario', name: 'Prof. Enso Hugo Reinoso' },
        { role: 'Prosecretario', name: 'Cdra. Evangelina Ortiz' },
        { role: 'Tesorero', name: 'Antonella Colavita' },
        { role: 'Protesorero', name: 'Ing. Sergio Elhorriburu' },
    ];

    const vocalesTitulares = [
        'Joaquín Galasso',
        'Arq. Susana Herrero Loyola',
        'Dra. Marta Schullman',
        'Ing. Leonardo Palumbo',
        'Prof. Valeria Dascanio',
        'Augusto Ezequiel Pereda'
    ];

    const vocalesSuplentes = [
        'Marta Pellegrinetti',
        'Prof. Mariano Sagaspe',
        'Laura Brena',
        'Blas Cadierno'
    ];

    const revisoresTitulares = [
        'Dr. Jorge Alabart',
        'Enrique Galanko',
        'Oscar Loudet'
    ];

    const revisoresSuplentes = [
        'Marcelo Viñes'
    ];

    const staff = [
        { role: 'Representante Legal', name: 'Dr. Nombre Apellido' },
        { role: 'Administración', name: 'Lic. Nombre Apellido' },
        { role: 'Responsables de Maestranza', name: 'Sr. Nombre Apellido' },
    ];

    const SectionTitle = ({ children, icon }) => (
        <motion.div
            variants={itemVariants}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                marginTop: '3rem',
                borderBottom: '2px solid var(--color-gray-light)',
                paddingBottom: '0.5rem'
            }}
        >
            {icon}
            <h2 style={{ margin: 0, color: 'var(--color-blue-dark)', fontSize: '1.8rem' }}>{children}</h2>
        </motion.div>
    );

    const MemberCard = ({ role, name, highlight = false }) => (
        <motion.div
            variants={itemVariants}
            className="card"
            style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                borderTop: highlight ? '4px solid var(--color-blue-light)' : '1px solid var(--color-gray-light)'
            }}
        >
            <h3 style={{ fontSize: '0.9rem', color: 'var(--color-gray-medium)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{role}</h3>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: 'var(--color-blue-dark)' }}>{name}</p>
        </motion.div>
    );

    const ListCard = ({ title, names }) => (
        <motion.div
            variants={itemVariants}
            className="card"
            style={{ padding: '2rem' }}
        >
            <h3 style={{ color: 'var(--color-blue-medium)', marginBottom: '1.5rem', textAlign: 'center' }}>{title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                {names.map((name, idx) => (
                    <li key={idx} style={{ fontSize: '1.05rem', fontWeight: '500' }}>{name}</li>
                ))}
            </ul>
        </motion.div>
    );

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Autoridades</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>Comisión Directiva 2025-2027</p>

                {/* Link to Estatuto */}
                <Link to="/estatuto" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--color-blue-medium)', fontWeight: 'bold', textDecoration: 'none', padding: '0.5rem 1rem', border: '2px solid var(--color-blue-light)', borderRadius: '20px' }}>
                    <FaBook /> Ver Estatuto Social
                </Link>
            </motion.div>

            {/* Comisión Directiva Principal */}
            <SectionTitle icon={<FaGavel size={28} color="var(--color-blue-light)" />}>Comisión Directiva</SectionTitle>
            <div className="grid grid-3">
                {mainBoard.map((member, index) => (
                    <MemberCard key={index} role={member.role} name={member.name} highlight={true} />
                ))}
            </div>

            {/* Vocales */}
            <SectionTitle icon={<FaUsers size={28} color="var(--color-blue-light)" />}>Vocales</SectionTitle>
            <div className="grid grid-2">
                <ListCard title="Vocales Titulares" names={vocalesTitulares} />
                <ListCard title="Vocales Suplentes" names={vocalesSuplentes} />
            </div>

            {/* Revisores de Cuentas */}
            <SectionTitle icon={<FaUserTie size={28} color="var(--color-blue-light)" />}>Revisores de Cuentas</SectionTitle>
            <div className="grid grid-2">
                <ListCard title="Titulares" names={revisoresTitulares} />
                <ListCard title="Suplentes" names={revisoresSuplentes} />
            </div>

            {/* Staff Institucional */}
            <SectionTitle icon={<FaBuilding size={28} color="var(--color-blue-light)" />}>Staff Institucional</SectionTitle>
            <div className="grid grid-3">
                {staff.map((member, index) => (
                    <MemberCard key={index} role={member.role} name={member.name} />
                ))}
            </div>
        </motion.div>
    );
}

export default ComisionDirectiva;
