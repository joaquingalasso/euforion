import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTshirt, FaRuler, FaShoppingCart, FaClock, FaWhatsapp, FaInstagram, FaFilePdf, FaSearch, FaCheck } from 'react-icons/fa';
import { UNIFORMS_DATA, PRICES_DATA, SIZES_BUZO, SIZES_REMERA, SIZES_CHUPIN, SIZES_BERMUDA, SIZES_CAMPERA } from '../data/uniforms';
import { useCart } from '../context/CartContext';

const levels = ['Todos', 'Inicial', 'Primaria', 'Secundaria'];
const types = ['Todos', 'Superior', 'Inferior', 'Deportivo', 'Abrigo', 'Accesorio'];

// Helper to get specific sizes list based on Item Name
const getSizesForItem = (name) => {
    const n = name.toLowerCase();
    if (n.includes('buzo')) return SIZES_BUZO.data.map(d => d.talle);
    if (n.includes('campera')) return SIZES_CAMPERA.data.map(d => d.talle);
    if (n.includes('remera') || n.includes('chomba')) return SIZES_REMERA.data.map(d => d.talle); // Assuming similar sizing
    if (n.includes('pantalón') || n.includes('chupín')) return SIZES_CHUPIN.data.map(d => d.talle);
    if (n.includes('bermuda') || n.includes('short')) return SIZES_BERMUDA.data.map(d => d.talle);
    if (n.includes('polar')) return SIZES_BUZO.data.map(d => d.talle); // Similar to buzo
    return ['Único'];
};

const getPrice = (name, size) => {
    // Logic to match Name + Size to Price List
    // Simplify matching:
    // Numbers 1-14 -> Category "Child"
    // Letters S-XL -> Category "Adult"

    // Normalize Name to match Price List Articles
    let article = '';
    if (name.includes('Campera')) article = 'Campera';
    else if (name.includes('Buzo')) article = 'Buzo';
    else if (name.includes('Remera Manga Corta')) article = 'Remera Clásica'; // Specific
    else if (name.includes('Remera Manga Larga')) article = 'Remera Clásica'; // Specific
    else if (name.includes('Remera Deportiva')) article = 'Remera Deportiva';
    else if (name.includes('Chomba')) article = 'Chomba';
    else if (name.includes('Pantalón')) article = 'Pantalón / Chupín';
    else if (name.includes('Bermuda')) article = 'Bermuda / Short';
    else if (name.includes('Polar')) article = 'Polar';
    else if (name.includes('Mochila')) article = 'Mochila';
    else if (name.includes('Gorra')) article = 'Gorra';
    else if (name.includes('Pintor')) article = 'Pintor';

    if (!article) return 'Consultar';

    // Find Price Entry
    // Strategy: Look for entry where article matches AND size description matches input size type

    // Check if size is Number
    const isNumeric = !isNaN(size);

    const relevantPrices = PRICES_DATA.filter(p => p.article === article);

    // Specific overrides based on price description strings in PRICES_DATA
    // 'T. 1 al 14' vs 'T. S al L'

    if (relevantPrices.length === 1) return relevantPrices[0].price; // Unique Size items

    // Filter by size type
    const priceObj = relevantPrices.find(p => {
        if (isNumeric && p.size.includes('1 al 14')) return true;
        if (!isNumeric && (p.size.includes('S al') || p.size.includes('S a XL'))) return true;
        // Remera Manga Corta vs Larga distinction checks description too?
        if (name.includes('Cortas') && p.description.includes('Corta')) return true;
        if (name.includes('Larga') && p.description.includes('Larga')) return true;
        // Fallback for Remeras handled above? 
        return false;
    });

    // Refined logic for Remeras which have description diffs
    if (article === 'Remera Clásica') {
        const typeDesc = name.includes('Corta') ? 'Manga Corta' : 'Manga Larga';
        const p = relevantPrices.find(p => p.description === typeDesc && (
            (isNumeric && p.size.includes('1 al 14')) || (!isNumeric && p.size.includes('S'))
        ));
        return p ? p.price : 'Consultar';
    }

    return priceObj ? priceObj.price : 'Consultar';
};

function Uniformes() {
    const { addToCart } = useCart();
    const [filters, setFilters] = useState({ level: 'Todos', type: 'Todos' });
    const [addedId, setAddedId] = useState(null); // Feedback state

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const filteredUniforms = UNIFORMS_DATA.filter(item => {
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
        >
            <div className="layout-sidebar">
                <div style={{ marginBottom: '3rem' }}>
                    <motion.h1 className="page-title">UNIFORMES EUFORIÓN</motion.h1>
                    <motion.p style={{ fontSize: '1.1rem', color: 'var(--color-gray-dark)', marginBottom: '2rem' }}>
                        Catálogo oficial. Seleccioná talle y agregá al carrito para realizar tu pedido.
                    </motion.p>

                    {/* Hero Actions */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                        <a href="#catalogo" className="btn btn-primary">Ver Catálogo</a>
                        <a href="#precios" className="btn btn-outline">Lista de Precios</a>
                    </div>

                    {/* Filters */}
                    <div id="catalogo" className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
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
                            <ProductCard key={item.id} item={item} addToCart={addToCart} setAddedId={setAddedId} addedId={addedId} />
                        ))}
                    </div>

                    {/* Price List Ref */}
                    <motion.section id="precios" style={{ marginTop: '4rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <FaShoppingCart /> Lista de Precios 2025
                        </h2>
                        <div className="card" style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                <thead style={{ backgroundColor: 'var(--color-blue-dark)', color: 'white' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Artículo</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Descripción</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Talle</th>
                                        <th style={{ padding: '1rem', textAlign: 'right' }}>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICES_DATA.map((item, index) => (
                                        <tr key={index} style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.article}</td>
                                            <td style={{ padding: '1rem' }}>{item.description}</td>
                                            <td style={{ padding: '1rem' }}>{item.size}</td>
                                            <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.section>

                    {/* Size Guide Ref */}
                    <motion.section id="talles" style={{ marginTop: '4rem' }}>
                        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <FaRuler /> Guía de Talles
                        </h2>
                        <div className="grid grid-2">
                            <SizeTable title="Buzos" data={SIZES_BUZO} />
                            <SizeTable title="Remeras" data={SIZES_REMERA} />
                            <SizeTable title="Camperas" data={SIZES_CAMPERA} />
                            <SizeTable title="Pantalones" data={SIZES_CHUPIN} />
                        </div>
                    </motion.section>
                </div>

                <aside>
                    <div className="card" style={{ position: 'sticky', top: '100px' }}>
                        <h3 style={{ borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Información</h3>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blue-medium)' }}>
                                <FaClock /> Retiros
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                <li>Lunes, Miércoles y Viernes de 8 a 13hs</li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--color-gray-light)' }}>
                            <a href="https://wa.me/5492214372736" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <FaWhatsapp /> Consultar
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
}

const ProductCard = ({ item, addToCart, setAddedId, addedId }) => {
    const validSizes = getSizesForItem(item.name);
    const [selectedSize, setSelectedSize] = useState(validSizes[0]);
    const price = getPrice(item.name, selectedSize);

    const handleAdd = () => {
        addToCart(item, selectedSize, price);
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 2000); // Reset feedback
    };

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

                    <button
                        onClick={handleAdd}
                        className={`btn ${addedId === item.id ? 'btn-success' : 'btn-primary'}`}
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                        disabled={addedId === item.id}
                    >
                        {addedId === item.id ? <><FaCheck /> Agregado</> : <><FaShoppingCart /> Agregar al Carrito</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const SizeTable = ({ title, data }) => (
    <div className="card">
        <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-blue-dark)' }}>{title}</h4>
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.85rem', textAlign: 'center' }}>
                <thead style={{ backgroundColor: 'var(--color-bg-light)' }}>
                    <tr>
                        {Object.keys(data.data[0]).map(key => (
                            <th key={key} style={{ padding: '0.5rem', textTransform: 'capitalize' }}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                            {Object.values(row).map((val, j) => (
                                <td key={j} style={{ padding: '0.5rem' }}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default Uniformes;
