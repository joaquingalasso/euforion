import { useEffect } from 'react';
import { useAuthSocios } from '../../hooks/useAuthSocios';
import LoginScreen from '../../components/Portal/LoginScreen';
import Dashboard from '../../components/Portal/Dashboard';
import SEO from '../../components/SEO';
import Loading from '../../components/Loading';

const PortalHome = () => {
    const { user, userData, loading } = useAuthSocios();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ minHeight: '80vh', backgroundColor: '#f4f6f8', padding: '4rem 0' }}>
            <SEO
                title="Portal del Socio | Biblioteca Popular Euforión"
                description="Gestión de cuenta, estado de cuota y servicios para socios de la Biblioteca Euforión."
            />

            <div className="container">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
                        <Loading text="Cargando portal..." />
                    </div>
                ) : user ? (
                    <Dashboard userData={userData} />
                ) : (
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h1 style={{ color: 'var(--color-blue-dark)', marginBottom: '0.5rem' }}>Portal del Socio</h1>
                            <p style={{ fontSize: '1.1rem', color: '#555' }}>
                                Accedé a tu credencial digital, revisá tu estado y actualizá tus datos.
                            </p>
                        </div>
                        <LoginScreen />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortalHome;
