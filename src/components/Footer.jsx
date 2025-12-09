import { useLocation, Link } from 'react-router-dom';
import { contactInfo } from '../data/contactInfo';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
    const location = useLocation();
    const path = location.pathname.substring(1); // Remove leading slash

    let currentInfo = contactInfo.general;
    if (path === 'inicial') currentInfo = contactInfo.inicial;
    else if (path === 'primario') currentInfo = contactInfo.primario;
    else if (path === 'secundario') currentInfo = contactInfo.secundario;
    else if (path === 'biblioteca') currentInfo = contactInfo.biblioteca;

    // Fallback to general if specific info is missing properties
    const displayEmail = currentInfo.email || contactInfo.general.email;
    const displayPhone = currentInfo.phone || contactInfo.general.phones.admin;

    return (
        <footer style={{ backgroundColor: 'var(--color-blue-dark)', color: 'white', padding: '4rem 0 2rem 0', marginTop: 'auto', fontSize: '0.9rem' }}>
            <div className="container">
                <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
                    {/* Logo & About */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <img src="/images/logo-sintagline.svg" alt="Logo Euforión" style={{ height: '40px', filter: 'brightness(0) invert(1)', marginBottom: '1rem' }} />
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>
                            Formando ciudadanos con pensamiento crítico, creativos y solidarios desde 1927.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <a href={contactInfo.general.social.facebook} target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem' }}><FaFacebook /></a>
                            <a href={contactInfo.general.social.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem' }}><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <h3 style={{ color: 'white', borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'inline-block' }}>Contacto</h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'start' }}>
                                <FaMapMarkerAlt style={{ marginTop: '4px', color: 'var(--color-blue-light)' }} />
                                <span>{contactInfo.general.address}</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <FaPhoneAlt style={{ color: 'var(--color-blue-light)' }} />
                                <a href={`tel:${displayPhone.replace(/\s/g, '')}`} style={{ color: 'white' }}>{displayPhone}</a>
                            </li>
                            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <FaEnvelope style={{ color: 'var(--color-blue-light)' }} />
                                <a href={`mailto:${displayEmail}`} style={{ color: 'white' }}>{displayEmail}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Institucional & Niveles */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <Link to="/institucional" style={{ textDecoration: 'none' }}>
                            <h3 style={{ color: 'white', borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'inline-block' }}>Institucional</h3>
                        </Link>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="/autoridades" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Comisión Directiva</Link></li>

                            <li style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '0.5rem 0' }}></li>

                            <li>
                                <Link to="/inicial" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.9 }}>
                                    <strong style={{ color: 'var(--color-blue-light)' }}>Jardín:</strong> DIPREGEB N°1186
                                </Link>
                            </li>
                            <li>
                                <Link to="/primario" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.9 }}>
                                    <strong style={{ color: 'var(--color-blue-light)' }}>Primaria:</strong> DIPREGEB N°8142
                                </Link>
                            </li>
                            <li>
                                <Link to="/secundario" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.9 }}>
                                    <strong style={{ color: 'var(--color-blue-light)' }}>Secundaria:</strong> DIPREGEB N°8623
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Biblioteca Info */}
                    <div style={{ gridColumn: 'span 1' }}>
                        <Link to="/biblioteca" style={{ textDecoration: 'none' }}>
                            <h3 style={{ color: 'white', borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'inline-block' }}>Biblioteca</h3>
                        </Link>
                        <div style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.85 }}>
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>Fundada el 3 de agosto de 1927</strong>
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <li>CONABIP N°1973</li>
                                <li>Pers. Jurídica Leg. 1594 - Mat. 881</li>
                                <li>Dir. Bibliotecas Prov. Bs. As. N°30</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
                    &copy; {new Date().getFullYear()} Biblioteca Euforión. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
