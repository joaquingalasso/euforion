import { motion } from 'framer-motion';
import { FaIdCard, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const CarnetDigital = ({ userData }) => {
    // Logic for "Semáforo" (Traffic Light)
    // Assuming format DD/MM/AAAA or ISO
    const parseDate = (dateString) => {
        if (!dateString) return null;
        // Handle DD/MM/YYYY
        if (dateString.includes('/')) {
            const [day, month, year] = dateString.split('/');
            return new Date(year, month - 1, day);
        }
        return new Date(dateString);
    };

    const expiration = parseDate(userData.vencimiento_cuota);
    const today = new Date();
    // Reset time for fair comparison
    today.setHours(0, 0, 0, 0);

    const isExpired = expiration ? expiration < today : true; // Default broken if no date
    const statusColor = isExpired ? '#e53935' : '#43a047'; // Red vs Green
    const statusText = isExpired ? 'CUOTA VENCIDA' : 'AL DÍA';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="carnet-container"
            style={{
                background: 'linear-gradient(135deg, var(--color-blue-dark) 0%, #1a237e 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                color: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '2rem'
            }}
        >
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                opacity: 0.1
            }}>
                <FaIdCard size={150} />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Socio N°</h3>
                    <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{userData.id_socio || '---'}</p>
                </div>
                <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{userData.categoria || 'General'}</span>
                </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    {userData.nombres} {userData.apellidos}
                </h2>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>DNI: {userData.dni}</p>
            </div>

            {/* Footer / Status */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0,0,0,0.2)',
                margin: '-1.5rem',
                marginTop: '0',
                padding: '1rem 1.5rem'
            }}>
                <div>
                    <span style={{ fontSize: '0.8rem', display: 'block', opacity: 0.8 }}>Vencimiento</span>
                    <strong style={{ fontSize: '1.1rem' }}>{userData.vencimiento_cuota || '---'}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: statusColor, backgroundColor: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                    {isExpired ? <FaExclamationCircle /> : <FaCheckCircle />}
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{statusText}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CarnetDigital;
