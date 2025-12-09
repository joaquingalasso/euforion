import { motion } from 'framer-motion';
import CarnetDigital from './CarnetDigital';
import DatosPersonales from './DatosPersonales';
import AvisosAdmin from './AvisosAdmin';
import InfoDigibepe from './InfoDigibepe';
import EstadoCuota from './EstadoCuota';
import PortalOrders from './PortalOrders';
import PaymentHub from './PaymentHub';
import { useAuthSocios } from '../../hooks/useAuthSocios';
import { FaSignOutAlt } from 'react-icons/fa';

const Dashboard = ({ userData }) => {
    const { logout } = useAuthSocios();

    if (!userData) return (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1rem' }}>Cargando información del socio...</p>
            <button
                onClick={logout}
                className="btn btn-outline"
                style={{ margin: '0 auto' }}
            >
                <FaSignOutAlt /> Cancelar / Cerrar Sesión
            </button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portal-dashboard"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Hola, {userData.nombres.split(' ')[0]}</h1>
                    <span style={{ fontSize: '0.9rem', color: '#666', textTransform: 'capitalize' }}>
                        {userData.rol === 'admin' ? 'Administrador' : userData.rol === 'escuela' ? 'Escuela' : 'Socio'}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {userData.rol === 'admin' && (
                        <button
                            onClick={() => window.location.href = '/admin'}
                            className="btn"
                            style={{
                                padding: '0.5rem 1rem', fontSize: '0.9rem',
                                backgroundColor: '#1e293b', color: 'white',
                                display: 'flex', gap: '0.5rem', alignItems: 'center'
                            }}
                        >
                            Panel Admin
                        </button>
                    )}
                    <button
                        onClick={logout}
                        className="btn btn-outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                    >
                        <FaSignOutAlt /> Salir
                    </button>
                </div>
            </div>

            <div className="portal-grid">
                {/* Main Column (Left/Top) */}
                <div className="main-col">
                    <CarnetDigital userData={userData} />
                    <EstadoCuota userData={userData} />
                    <PaymentHub userData={userData} />
                    <PortalOrders />
                    <AvisosAdmin userData={userData} />

                    <div className="mobile-only">
                        <DatosPersonales userData={userData} />
                        <InfoDigibepe />
                    </div>
                </div>

                {/* Sidebar Column (Right/Bottom) */}
                <div className="side-col desktop-only">
                    <DatosPersonales userData={userData} />
                    <InfoDigibepe />
                </div>
            </div>

            {/* CSS Grid for Layout */}
            <style>{`
                .portal-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                .mobile-only { display: block; }
                .desktop-only { display: none; }

                @media (min-width: 968px) {
                    .portal-grid {
                        grid-template-columns: 1.2fr 0.8fr;
                        align-items: start;
                    }
                    .mobile-only { display: none; }
                    .desktop-only { display: block; }
                }
            `}</style>
        </motion.div>
    );
};

export default Dashboard;
