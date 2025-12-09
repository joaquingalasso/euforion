import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const routeNameMap = {
    'inicial': 'Nivel Inicial',
    'primario': 'Nivel Primario',
    'secundario': 'Nivel Secundario',
    'biblioteca': 'Biblioteca',
    'talleres': 'Talleres y Actividades',
    'novedades': 'Novedades',
    'institucional': 'Institucional',
    'historia': 'Historia',
    'comision-directiva': 'Comisión Directiva',
    'estatuto': 'Estatuto',
    'contacto': 'Contacto',
    'uniformes': 'Uniformes',
    'escuela': 'La Escuela',
    'eoe': 'Equipo de Orientación (EOE)',
    'palabras-libres': 'Palabras Libres',
    'revista-digital': 'Revista Digital',
    // Courses will need some dynamic handling or manual map if we want pretty names like "1-grado" -> "1° Grado"
    // We can add common ones:
    '1-grado': '1° Grado',
    '2-grado': '2° Grado',
    '3-grado': '3° Grado',
    '4-grado': '4° Grado',
    '5-grado': '5° Grado',
    '6-grado': '6° Grado',
    '1-seccion': '1° Sección',
    '2-seccion': '2° Sección',
    '3-seccion': '3° Sección',
    '1-ano': '1° Año',
    '2-ano': '2° Año',
    '3-ano': '3° Año',
    '4-ano': '4° Año',
    '5-ano': '5° Año',
    '6-ano': '6° Año',
    'manana': 'Turno Mañana',
    'tarde': 'Turno Tarde'
};

const Breadcrumbs = () => {
    const location = useLocation();

    // Don't show on home
    if (location.pathname === '/') return null;

    const pathnames = location.pathname.split('/').filter(x => x);

    // If pathnames is empty (should cover '/' but safe check)
    if (pathnames.length === 0) return null;

    return (
        <div style={{
            backgroundColor: '#f8f9fa',
            padding: '0.8rem 0',
            borderBottom: '1px solid #eee',
            fontSize: '0.9rem',
            color: '#666'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-blue-medium)', textDecoration: 'none' }}>
                    <FaHome style={{ marginRight: '4px' }} /> Inicio
                </Link>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // Decode URI component to handle spaces if any, though slugs usually safe
                    const safeValue = decodeURIComponent(value);
                    const name = routeNameMap[safeValue] || safeValue.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                    return (
                        <div key={to} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaChevronRight size={10} color="#ccc" />
                            {isLast ? (
                                <span style={{ fontWeight: '600', color: '#333' }}>{name}</span>
                            ) : (
                                <Link to={to} style={{ color: 'var(--color-blue-medium)', textDecoration: 'none' }}>
                                    {name}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Breadcrumbs;
