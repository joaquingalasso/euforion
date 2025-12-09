import { FaBook } from 'react-icons/fa';

const InfoDigibepe = () => {
    return (
        <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--color-blue-dark)', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FaBook size={24} color="var(--color-blue-light)" />
                <h3 style={{ margin: 0, color: 'white' }}>Catálogo Digibepé</h3>
            </div>

            <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
                Para reservar libros, consultar disponibilidad y ver tu historial de préstamos, utilizá el sistema oficial Digibepé de CONABIP.
            </p>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', color: 'var(--color-blue-light)', marginBottom: '0.5rem' }}>IMPORTANTE</strong>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    Tu contraseña para Digibepé es la misma que configuraste en este portal. <br />
                    <em>(La actualización es manual, puede demorar hasta 24hs hábiles).</em>
                </p>
            </div>

            <a href="http://www.digibepe.medios.com.ar/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', textAlign: 'center', borderColor: 'white', color: 'white' }}>
                Ir al Catálogo
            </a>
        </div>
    );
};

export default InfoDigibepe;
