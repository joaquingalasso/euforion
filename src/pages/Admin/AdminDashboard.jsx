import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSocios } from '../../hooks/useAuthSocios';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { FaSearch, FaEdit, FaTimes, FaExclamationTriangle, FaUsers, FaShoppingBag } from 'react-icons/fa';
import Loading from '../../components/Loading';
import AdminOrders from '../../components/Admin/AdminOrders';

const AdminDashboard = () => {
    const { user, isAdmin, loading } = useAuthSocios();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('socios');

    // Search State (Socios)
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    // Edit State (Socios)
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [saveLoading, setSaveLoading] = useState(false);

    // Config State
    const [config, setConfig] = useState({});

    // Protect Route
    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            navigate('/portal');
        }
    }, [user, isAdmin, loading, navigate]);

    // Fetch Config for Concepts
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const docRef = doc(db, 'configuracion', 'valores');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setConfig(docSnap.data());
            } catch (error) {
                console.error("Error fetching config:", error);
            }
        };
        fetchConfig();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchLoading(true);
        setResults([]);
        try {
            const usersRef = collection(db, 'socios');
            let q;
            if (!isNaN(searchTerm) && searchTerm.length > 5) {
                // Search by DNI
                q = query(usersRef, where('dni', '==', searchTerm));
            } else {
                // Search by Last Name (Basic implementation)
                q = query(usersRef, where('apellidos', '>=', searchTerm), where('apellidos', '<=', searchTerm + '\uf8ff'));
            }
            const querySnapshot = await getDocs(q);
            const found = [];
            querySnapshot.forEach((doc) => found.push({ id: doc.id, ...doc.data() }));
            setResults(found);
        } catch (error) {
            console.error("Search error:", error);
            alert("Error al buscar.");
        } finally {
            setSearchLoading(false);
        }
    };

    const startEdit = (user) => {
        setEditingUser(user);
        setFormData({
            email_contacto: user.email_contacto || '',
            telefono: user.telefono || '',
            red_social: user.red_social || '',
            observaciones_admin: user.observaciones_admin || '',
            conceptos: user.conceptos || [] // Arreglo de keys de conceptos asignados
        });
    };

    const handleConceptToggle = (key) => {
        setFormData(prev => {
            const current = prev.conceptos || [];
            if (current.includes(key)) {
                return { ...prev, conceptos: current.filter(k => k !== key) };
            } else {
                return { ...prev, conceptos: [...current, key] };
            }
        });
    };

    const handleSave = async () => {
        setSaveLoading(true);
        try {
            const userRef = doc(db, 'socios', editingUser.id);
            await updateDoc(userRef, {
                email_contacto: formData.email_contacto,
                telefono: formData.telefono,
                red_social: formData.red_social,
                observaciones_admin: formData.observaciones_admin,
                conceptos: formData.conceptos
            });

            // Update local list
            setResults(results.map(r => r.id === editingUser.id ? { ...r, ...formData } : r));
            setEditingUser(null);
            alert("Datos actualizados correctamente.");
        } catch (error) {
            console.error("Error updating:", error);
            alert("Error al guardar.");
        } finally {
            setSaveLoading(false);
        }
    };

    if (loading) return <Loading text="Verificando permisos..." />;
    if (!isAdmin) return null;

    return (
        <div className="section container" style={{ minHeight: '80vh' }}>
            <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h1 style={{ marginBottom: '2rem', borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '1rem' }}>
                    Panel de Administración
                </h1>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #eee' }}>
                    <button
                        onClick={() => setActiveTab('socios')}
                        style={{
                            padding: '1rem 2rem', border: 'none', background: 'none', cursor: 'pointer',
                            borderBottom: activeTab === 'socios' ? '3px solid var(--color-blue-dark)' : '3px solid transparent',
                            color: activeTab === 'socios' ? 'var(--color-blue-dark)' : '#888',
                            fontWeight: 'bold', fontSize: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center'
                        }}
                    >
                        <FaUsers /> Gestión de Socios
                    </button>
                    <button
                        onClick={() => setActiveTab('pedidos')}
                        style={{
                            padding: '1rem 2rem', border: 'none', background: 'none', cursor: 'pointer',
                            borderBottom: activeTab === 'pedidos' ? '3px solid var(--color-blue-dark)' : '3px solid transparent',
                            color: activeTab === 'pedidos' ? 'var(--color-blue-dark)' : '#888',
                            fontWeight: 'bold', fontSize: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center'
                        }}
                    >
                        <FaShoppingBag /> Pedidos de Uniformes
                    </button>
                </div>

                {/* Tab: SOCIOS */}
                {activeTab === 'socios' && (
                    <div>
                        <div style={{ backgroundColor: '#fff3e0', color: '#e65100', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <FaExclamationTriangle size={24} />
                            <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                <strong>ATENCIÓN:</strong> La base de datos maestra es el Excel "Socios".
                                Editá acá sólo campos de contacto rápido o mensajes.
                            </p>
                        </div>


                        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <input
                                type="text"
                                placeholder="Buscar por Apellido (ej: Perez) o DNI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <button type="submit" className="btn btn-primary" disabled={searchLoading}>
                                {searchLoading ? 'Buscando...' : <><FaSearch /> Buscar</>}
                            </button>
                        </form>

                        {results.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem' }}>DNI</th>
                                            <th style={{ padding: '1rem' }}>Apellidos, Nombres</th>
                                            <th style={{ padding: '1rem' }}>Socio N°</th>
                                            <th style={{ padding: '1rem' }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map(socio => (
                                            <tr key={socio.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <td style={{ padding: '1rem' }}>{socio.dni}</td>
                                                <td style={{ padding: '1rem' }}>{socio.apellidos}, {socio.nombres}</td>
                                                <td style={{ padding: '1rem' }}>{socio.id_socio}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <button
                                                        onClick={() => startEdit(socio)}
                                                        className="btn btn-outline"
                                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                                    >
                                                        <FaEdit /> Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{ textAlign: 'center', color: 'gray' }}>No hay resultados recientes. Buscá por DNI o Apellido.</p>
                        )}
                    </div>
                )}

                {/* Tab: PEDIDOS */}
                {activeTab === 'pedidos' && <AdminOrders />}

            </div>

            {/* Edit Modal Overlay (Socios) */}
            {editingUser && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 2000
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
                        width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3>Editar Socio</h3>
                            <button onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <p><strong>Socio:</strong> {editingUser.apellidos}, {editingUser.nombres}</p>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Contacto</label>
                            <input
                                type="text"
                                value={formData.email_contacto}
                                onChange={(e) => setFormData({ ...formData, email_contacto: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Teléfono</label>
                            <input
                                type="text"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Red Social (@usuario)</label>
                            <input
                                type="text"
                                value={formData.red_social}
                                onChange={(e) => setFormData({ ...formData, red_social: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mensaje Admin (Privado)</label>
                            <textarea
                                rows="3"
                                value={formData.observaciones_admin}
                                onChange={(e) => setFormData({ ...formData, observaciones_admin: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>

                        {/* Concept Assignment Section */}
                        <div style={{ marginBottom: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--color-blue-dark)' }}>Asignar Conceptos / Actividades</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                                {Object.entries(config).map(([key, value]) => (
                                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', backgroundColor: formData.conceptos?.includes(key) ? '#e3f2fd' : 'white' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.conceptos?.includes(key) || false}
                                            onChange={() => handleConceptToggle(key)}
                                        />
                                        <div style={{ fontSize: '0.85rem' }}>
                                            <span style={{ display: 'block', fontWeight: 'bold' }}>{value.label || key}</span>
                                            <span style={{ color: '#666' }}>${value.monto}</span>
                                        </div>
                                    </label>
                                ))}
                                {Object.keys(config).length === 0 && <p style={{ color: '#888', fontStyle: 'italic' }}>No hay conceptos cargados en configuración.</p>}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={handleSave} disabled={saveLoading} className="btn btn-primary" style={{ flex: 1 }}>
                                {saveLoading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                            <button onClick={() => setEditingUser(null)} className="btn btn-outline" style={{ flex: 1 }}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
