import { FaBullhorn } from 'react-icons/fa';

const AvisosAdmin = ({ userData }) => {
    if (!userData.observaciones_admin) return null;

    return (
        <div style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeeba',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'start'
        }}>
            <FaBullhorn size={24} style={{ marginTop: '0.2rem', minWidth: '24px' }} />
            <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Mensaje de Administración</h4>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                    {userData.observaciones_admin}
                </p>
            </div>
        </div>
    );
};

export default AvisosAdmin;
