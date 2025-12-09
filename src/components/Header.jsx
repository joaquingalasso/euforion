import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhoneAlt, FaClock, FaFacebook, FaInstagram, FaChevronDown, FaEnvelope, FaBullhorn, FaUser, FaShoppingCart } from 'react-icons/fa';
import { contactInfo } from '../data/contactInfo';
import { useAuthSocios } from '../hooks/useAuthSocios';
import { useCart } from '../context/CartContext';

function Header() {
    const { user } = useAuthSocios();
    const { getCartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Logo Logic
    let logoSrc = "/images/logo-sintagline.svg";
    const path = location.pathname;

    // Check strict start match to cover subroutes
    if (
        path.startsWith('/biblioteca') ||
        path.startsWith('/archivo-historico') ||
        path.startsWith('/bibliomovil') ||
        path.startsWith('/abuelas') ||
        path.startsWith('/pasantias') ||
        path.startsWith('/palabras-libres')
    ) {
        logoSrc = "/images/logo-biblioteca.svg";
    } else if (
        path.startsWith('/inicial') ||
        path.startsWith('/primario') ||
        path.startsWith('/secundario') ||
        path.startsWith('/eoe') ||
        path.startsWith('/uniformes') ||
        path.startsWith('/alumni') ||
        path.startsWith('/escuela')
    ) {
        logoSrc = "/images/logo-escuela.svg";
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    // Mobile specific: toggle dropdown on click
    const toggleDropdown = (e, index) => {
        e.stopPropagation();
        if (activeDropdown === index) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(index);
        }
    };

    const handleMouseEnter = (index) => {
        if (window.innerWidth > 968) { // Desktop breakpoint
            setActiveDropdown(index);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 968) {
            setActiveDropdown(null);
        }
    };

    const navItems = [
        {
            label: 'Biblioteca',
            path: '/biblioteca',
            dropdown: [
                { path: '/archivo-historico', label: 'Archivo Histórico' },
                { path: '/asociarse', label: 'Asociarse' },
                { path: '/pasantias', label: 'Pasantías' }, // Keep existing? User didn't say remove.
                { path: '/servicios', label: 'Servicios y proyectos' },
            ]
        },
        {
            label: 'Escuela',
            path: '/escuela',
            dropdown: [
                { path: '/inicial', label: 'Nivel Inicial' },
                { path: '/primario', label: 'Nivel Primario' },
                { path: '/secundario', label: 'Nivel Secundario' },
                { path: '/eoe', label: 'Orientación Escolar' },
                { path: '/alumni', label: 'Alumni' },
            ]
        },
        {
            label: 'Extensión',
            path: '/extension',
            dropdown: [
                { path: '/talleres', label: 'Talleres y Actividades' },
                { path: '/extension#proyectos', label: 'Proyectos Escolares' },
                { path: '/extension#editorial', label: 'Editorial' },
                { path: '/buffet', label: 'Buffet Institucional' },
            ]
        },
        {
            label: 'Institucional',
            path: '/institucional',
            dropdown: [
                { path: '/historia', label: 'Nuestra Historia' },
                { path: '/autoridades', label: 'Autoridades' },
                { path: '/relaciones', label: 'Vinculación' },
                { path: '/galeria', label: 'Galería multimedia' },
            ]
        },
        {
            label: 'Tienda',
            path: '/tienda',
            // No dropdown for now, just main Store page
        },
        { path: '/novedades', label: 'Novedades' },
        {
            label: 'Portal Socio',
            path: '/portal',
            icon: true
        },
    ];

    // Only add Cart if user is logged in
    if (user) {
        navItems.push({
            label: 'Carrito',
            path: '/carrito',
            cart: true
        });
    }

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container top-bar-container">
                    <div className="top-bar-info">
                        <span className="top-bar-info-item">
                            <FaPhoneAlt size={12} /> {contactInfo.general.phones.admin}
                        </span>
                        <span className="top-bar-info-item">
                            <FaClock size={12} /> Lun-Vie 7-20hs
                        </span>
                        <span className="top-bar-info-item desktop-only">
                            <FaEnvelope size={12} /> secretariaeuforion@gmail.com
                        </span>
                    </div>
                    <div className="top-bar-social">
                        <a href={contactInfo.general.social.facebook} target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={14} />
                        </a>
                        <a href={contactInfo.general.social.instagram} target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="container header-container">
                    <Link to="/" onClick={closeMenu} className="logo-link">
                        <img src={logoSrc} alt="Logo Euforión" className="header-logo" />
                    </Link>

                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Overlay for mobile menu */}
                    <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

                    <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <div className="mobile-menu-header">
                            <span style={{ fontWeight: 'bold', color: 'var(--color-blue-dark)' }}>MENÚ</span>
                            <button onClick={closeMenu} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>
                                <FaTimes />
                            </button>
                        </div>
                        <ul className="nav-list">
                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="nav-item"
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {item.dropdown ? (
                                        <>
                                            <div className="nav-link-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
                                                <Link
                                                    to={item.path === '#' ? '#' : item.path}
                                                    className={`nav-link ${activeDropdown === index ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        if (item.path === '#' && window.innerWidth <= 968) {
                                                            e.preventDefault();
                                                            toggleDropdown(e, index);
                                                        } else {
                                                            closeMenu();
                                                        }
                                                    }}
                                                >
                                                    {item.label}
                                                </Link>
                                                {/* Mobile Dropdown Toggler */}
                                                <button
                                                    className="mobile-dropdown-toggle"
                                                    onClick={(e) => toggleDropdown(e, index)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        padding: '0.5rem',
                                                        marginLeft: '0.2rem',
                                                        display: 'none'
                                                    }}
                                                >
                                                    <FaChevronDown size={10} className={`chevron ${activeDropdown === index ? 'rotate' : ''}`} />
                                                </button>
                                                {/* Explicit arrow for visual */}
                                                <FaChevronDown
                                                    size={10}
                                                    className={`chevron desktop-chevron ${activeDropdown === index ? 'rotate' : ''}`}
                                                    style={{ marginLeft: '0.3rem' }}
                                                />
                                            </div>

                                            <ul className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                                                {item.dropdown.map((subItem) => (
                                                    <li key={subItem.path}>
                                                        <Link to={subItem.path} onClick={closeMenu} className="dropdown-link">
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="nav-link"
                                            onClick={closeMenu}
                                            style={{
                                                color: location.pathname === item.path ? 'var(--color-blue-light)' : 'var(--color-blue-dark)',
                                            }}
                                            title={item.label}
                                        >
                                            {item.label === 'Novedades' ? (
                                                <>
                                                    <span className="desktop-only" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaBullhorn size={20} title="Novedades" />
                                                    </span>
                                                    <span className="mobile-only" style={{ width: '100%' }}>
                                                        {item.label}
                                                    </span>
                                                </>
                                            ) : item.path === '/portal' ? (
                                                <>
                                                    {/* Desktop: Icon Only */}
                                                    <span className="desktop-only" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaUser size={20} title="Mi Cuenta" style={{ color: location.pathname.startsWith('/portal') ? 'var(--color-blue-light)' : 'inherit' }} />
                                                    </span>

                                                    {/* Mobile: Mi Cuenta */}
                                                    <span className="mobile-only">
                                                        <span style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <FaUser /> Mi Cuenta ({user?.displayName || 'Socio'})
                                                        </span>
                                                    </span>
                                                </>
                                            ) : item.cart ? (
                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                    <FaShoppingCart size={20} title="Carrito" style={{ color: location.pathname === '/carrito' ? 'var(--color-blue-light)' : 'inherit' }} />
                                                    {getCartCount() > 0 && (
                                                        <span style={{
                                                            position: 'absolute', top: -8, right: -10,
                                                            backgroundColor: 'red', color: 'white',
                                                            borderRadius: '50%', width: '18px', height: '18px',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '0.7rem', fontWeight: 'bold'
                                                        }}>
                                                            {getCartCount()}
                                                        </span>
                                                    )}
                                                    <span className="mobile-only" style={{ marginLeft: '0.5rem' }}>Mi Carrito</span>
                                                </div>
                                            ) : (
                                                item.label
                                            )}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
