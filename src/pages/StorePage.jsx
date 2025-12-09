import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTshirt, FaShoppingCart, FaClock, FaWhatsapp, FaCheck, FaMinus, FaPlus, FaUser, FaStore, FaBook } from 'react-icons/fa';
import { UNIFORMS_DATA, PRICES_DATA, SIZES_BUZO, SIZES_REMERA, SIZES_CHUPIN, SIZES_BERMUDA, SIZES_CAMPERA } from '../data/uniforms';
import { useCart } from '../context/CartContext';
import { useAuthSocios } from '../hooks/useAuthSocios';
import StoreHero from '../components/StoreHero';

// Reuse helpers from Uniformes.jsx (could extract to utils but keeping here for speed)
const levels = ['Todos', 'Inicial', 'Primaria', 'Secundaria'];
const types = ['Todos', 'Superior', 'Inferior', 'Deportivo', 'Abrigo', 'Accesorio'];

const getSizesForItem = (name) => {
    const n = name.toLowerCase();
    if (n.includes('buzo')) return SIZES_BUZO.data.map(d => d.talle);
    if (n.includes('campera')) return SIZES_CAMPERA.data.map(d => d.talle);
    if (n.includes('remera') || n.includes('chomba')) return SIZES_REMERA.data.map(d => d.talle);
    if (n.includes('pantalón') || n.includes('chupín')) return SIZES_CHUPIN.data.map(d => d.talle);
    if (n.includes('bermuda') || n.includes('short')) return SIZES_BERMUDA.data.map(d => d.talle);
    if (n.includes('polar')) return SIZES_BUZO.data.map(d => d.talle);
    return ['Único'];
};

const getPrice = (name, size) => {
    // Logic to match Name + Size to Price List
    let article = '';
    if (name.includes('Campera')) article = 'Campera';
    else if (name.includes('Buzo')) article = 'Buzo';
    else if (name.includes('Remera Manga Corta')) article = 'Remera Clásica';
    else if (name.includes('Remera Manga Larga')) article = 'Remera Clásica';
    else if (name.includes('Remera Deportiva')) article = 'Remera Deportiva';
    else if (name.includes('Chomba')) article = 'Chomba';
    else if (name.includes('Pantalón')) article = 'Pantalón / Chupín';
    else if (name.includes('Bermuda')) article = 'Bermuda / Short';
    else if (name.includes('Polar')) article = 'Polar';
    else if (name.includes('Mochila')) article = 'Mochila';
    else if (name.includes('Gorra')) article = 'Gorra';
    else if (name.includes('Pintor')) article = 'Pintor';

    if (!article) return 'Consultar';

    const isNumeric = !isNaN(size);
    const relevantPrices = PRICES_DATA.filter(p => p.article === article);

    if (relevantPrices.length === 1) return relevantPrices[0].price;

    const priceObj = relevantPrices.find(p => {
        if (isNumeric && p.size.includes('1 al 14')) return true;
        if (!isNumeric && (p.size.includes('S al') || p.size.includes('S a XL'))) return true;
        if (name.includes('Cortas') && p.description.includes('Corta')) return true;
        if (name.includes('Larga') && p.description.includes('Larga')) return true;
        return false;
    });

    if (article === 'Remera Clásica') {
        const typeDesc = name.includes('Corta') ? 'Manga Corta' : 'Manga Larga';
        const p = relevantPrices.find(p => p.description === typeDesc && (
            (isNumeric && p.size.includes('1 al 14')) || (!isNumeric && p.size.includes('S'))
        ));
        return p ? p.price : 'Consultar';
    }

    return priceObj ? priceObj.price : 'Consultar';
};

function StorePage() {
    const { addToCart } = useCart();
    const { user } = useAuthSocios();
    const [activeSection, setActiveSection] = useState('uniformes'); // Prepared for future sections e.g. 'merch'
    const [filters, setFilters] = useState({ level: 'Todos', type: 'Todos' });
    const [addedId, setAddedId] = useState(null);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const filteredUniforms = UNIFORMS_DATA.filter(item => {
        if (activeSection !== 'uniformes') return false;
        const levelMatch = filters.level === 'Todos' || item.levels.includes(filters.level);
        const typeMatch = filters.type === 'Todos' || item.type === filters.type;
        return levelMatch && typeMatch;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ paddingTop: 0 }}
        >
            <div style={{ marginBottom: '3rem' }}>

                <StoreHero />

                {/* Important Info & Auth Status (Moved from Sidebar) */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid var(--color-blue-dark)' }}>

                    {!user && (
                        <div className="alert alert-warning" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            <FaUser /> <strong>Importante:</strong> Debés iniciar sesión en el Portal para poder realizar pedidos y asegurarlos a tu nombre.
                            <Link to="/portal" className="btn btn-sm btn-primary" style={{ marginLeft: '1rem', display: 'inline-block' }}>
                                Ir al Portal
                            </Link>
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blue-medium)', margin: 0 }}>
                                <FaClock /> Retiros
                            </h4>
                            <span style={{ fontSize: '0.9rem' }}>Lunes, Miércoles y Viernes de 8 a 13hs</span>
                        </div>
                        {/* 'Consultar' removed as requested */}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #eee', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setActiveSection('uniformes')}
                        style={{
                            padding: '1rem 2rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeSection === 'uniformes' ? '3px solid var(--color-blue-dark)' : '3px solid transparent',
                            color: activeSection === 'uniformes' ? 'var(--color-blue-dark)' : '#888',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaTshirt /> Uniformes
                    </button>
                    <button
                        onClick={() => setActiveSection('palabras-libres')}
                        style={{
                            padding: '1rem 2rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeSection === 'palabras-libres' ? '3px solid var(--color-blue-dark)' : '3px solid transparent',
                            color: activeSection === 'palabras-libres' ? 'var(--color-blue-dark)' : '#888',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <FaBook /> Palabras Libres
                    </button>
                </div>

                {/* Uniforms Section */}
                {activeSection === 'uniformes' && (
                    <>
                        {/* Filters */}
                        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-blue-dark)' }}>Filtrar por Nivel:</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {levels.map(level => (
                                        <button key={level} onClick={() => handleFilterChange('level', level)} className={`btn ${filters.level === level ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--color-blue-dark)' }}>Filtrar por Tipo:</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {types.map(type => (
                                        <button key={type} onClick={() => handleFilterChange('type', type)} className={`btn ${filters.type === type ? 'btn-primary' : 'btn-outline'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                            {filteredUniforms.map(item => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    addToCart={addToCart}
                                    setAddedId={setAddedId}
                                    addedId={addedId}
                                    user={user}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Palabras Libres Section (En Desarrollo) */}
                {activeSection === 'palabras-libres' && (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#f8f9fa', borderRadius: '16px' }}>
                        <FaStore size={60} color="#ddd" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ color: 'var(--color-blue-dark)', marginBottom: '1rem' }}>Sección en Desarrollo</h2>
                        <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Estamos preparando esta sección para que puedas adquirir los libros y publicaciones de nuestra editorial <strong>Palabras Libres</strong>.
                        </p>
                        <div className="badge badge-warning" style={{ marginTop: '2rem', padding: '0.5rem 1rem', fontSize: '1rem' }}>
                            Próximamente disponible
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

const ProductCard = ({ item, addToCart, setAddedId, addedId, user }) => {
    const validSizes = getSizesForItem(item.name);
    const [selectedSize, setSelectedSize] = useState(validSizes[0]);
    const [quantity, setQuantity] = useState(1);
    const price = getPrice(item.name, selectedSize);

    const handleAdd = () => {
        if (!user) return; // Should be blocked by UI but safety check
        // Add to cart with specific loop for quantity
        for (let i = 0; i < quantity; i++) {
            addToCart(item, selectedSize, price);
        }

        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 2000); // Reset feedback
    };

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => Math.max(1, q - 1));

    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '250px', overflow: 'hidden', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <img
                    src={item.images.model}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
                    onError={(e) => { e.target.src = 'https://placehold.co/300x300?text=Sin+Imagen'; }}
                />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-blue-dark)' }}>{item.name}</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>{item.description}</p>

                <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ flex: 1, marginRight: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: '#999', marginBottom: '0.2rem' }}>Talle:</label>
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #ddd' }}
                            >
                                {validSizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-blue-dark)' }}>{price}</span>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', backgroundColor: '#f8f9fa', padding: '0.5rem', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#555' }}>Cantidad:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button onClick={decrement} className="btn-icon-small" style={{ background: '#ddd', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <FaMinus size={10} />
                            </button>
                            <span style={{ fontWeight: 'bold' }}>{quantity}</span>
                            <button onClick={increment} className="btn-icon-small" style={{ background: '#ddd', border: 'none', borderRadius: '4px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <FaPlus size={10} />
                            </button>
                        </div>
                    </div>

                    {user ? (
                        <button
                            onClick={handleAdd}
                            className={`btn ${addedId === item.id ? 'btn-success' : 'btn-primary'}`}
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                            disabled={addedId === item.id}
                        >
                            {addedId === item.id ? <><FaCheck /> Agregado</> : <><FaShoppingCart /> Agregar</>}
                        </button>
                    ) : (
                        <Link to="/portal" className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.85rem' }}>
                            <FaUser style={{ marginRight: '5px' }} /> Iniciar Sesión para comprar
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StorePage;
