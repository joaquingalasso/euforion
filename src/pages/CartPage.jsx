import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuthSocios } from '../hooks/useAuthSocios';
import { FaTrash, FaCheckCircle, FaExclamationCircle, FaArrowLeft, FaMoneyBillWave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import PagoTransferencia from '../components/PagoTransferencia';

const CartPage = () => {
    const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
    const { user, userData } = useAuthSocios();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Resumen, 2: Datos Alumno, 3: Confirmación, 4: Pago
    const [submitting, setSubmitting] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);

    // Form Data
    const [studentData, setStudentData] = useState({
        type: 'Alumno', // Alumno, Personal, Otro
        name: '',
        level: 'Inicial',
        grade: '',
        shift: 'Mañana',
        comments: ''
    });

    // Validation Logic
    const validateOrder = () => {
        if (studentData.type === 'Alumno' && studentData.level === 'Inicial') {
            // "En nivel inicial no usan buzo ni remera deportiva" (User rule)
            // Keywords to block: 'Buzo', 'Remera Deportiva'
            const blockedItems = cart.filter(item =>
                item.name.includes('Buzo') || item.name.includes('Remera Deportiva')
            );
            return blockedItems.length === 0;
        }
        return true;
    };

    const hasBlockedItems = !validateOrder();

    const handleNext = () => {
        if (step === 1 && cart.length > 0) setStep(2);
        else if (step === 2) {
            setStep(3);
        }
    };

    const handleSubmitOrder = async () => {
        if (!user) {
            alert("Por favor, iniciá sesión para confirmar el pedido.");
            navigate('/portal');
            return;
        }
        setSubmitting(true);
        try {
            const orderData = {
                userId: user.uid,
                userDni: userData?.dni || 'Anónimo',
                userEmail: user.email,
                studentData,
                items: cart,
                total: getCartTotal(),
                depositRequired: getCartTotal() * 0.5,
                status: 'pendiente',
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, 'pedidos'), orderData);

            // Store order data to show in Payment Step
            setLastOrder({ id: docRef.id, ...orderData });

            // Clear cart logic moved here so it happens before moving to step 4
            clearCart();
            setStep(4);

        } catch (error) {
            console.error("Error creating order:", error);
            alert("Hubo un error al procesar el pedido.");
        } finally {
            setSubmitting(false);
        }
    };

    if (step === 4 && lastOrder) {
        return (
            <div className="container section" style={{ maxWidth: '600px' }}>
                <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <FaCheckCircle size={50} color="var(--color-success)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ color: 'var(--color-blue-dark)' }}>¡Pedido Registrado!</h2>
                    <p>Tu orden <strong>#{lastOrder.id}</strong> ha sido creada correctamente.</p>
                </div>

                <PagoTransferencia orden={lastOrder} />

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/portal" className="btn btn-outline">Ir a Mis Pedidos</Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0 && step === 1) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <FaArrowLeft size={40} color="#ddd" />
                <h2 style={{ color: 'var(--color-blue-dark)', marginTop: '1rem' }}>Tu carrito está vacío</h2>
                <p style={{ marginBottom: '2rem' }}>Explorá nuestro catálogo de uniformes y agregá lo que necesites.</p>
                <Link to="/uniformes" className="btn btn-primary">Ir al Catálogo</Link>
            </div>
        );
    }

    return (
        <div className="container section">
            <h1 className="page-title">Tu Pedido</h1>

            <div className="grid grid-2" style={{ alignItems: 'start' }}>
                {/* Left Col: Cart Items */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>Resumen de Items</h3>
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${item.selectedSize}`} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #f9f9f9', paddingBottom: '1rem' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={item.images.model} alt={item.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{item.name}</h4>
                                <span style={{ fontSize: '0.85rem', color: '#666' }}>Talle: {item.selectedSize}</span>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                    <span style={{ fontWeight: 'bold' }}>{item.priceStr}</span>
                                    {step === 1 && (
                                        <button onClick={() => removeFromCart(item.id, item.selectedSize)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #eee' }}>
                        <span>Total</span>
                        <span>${getCartTotal().toLocaleString('es-AR')}</span>
                    </div>
                </div>

                {/* Right Col: Process Steps */}
                <div>
                    {step === 1 && (
                        <div className="card" style={{ backgroundColor: '#f8fafc' }}>
                            <p>Revisá los items antes de continuar. Recordá que se abona el 50% de seña en administración.</p>
                            <button onClick={handleNext} className="btn btn-primary" style={{ width: '100%' }}>Continuar al Pago</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="card">
                            <h3>Datos del Alumno / Destinatario</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label>Tipo de Destinatario</label>
                                    <select value={studentData.type} onChange={e => setStudentData({ ...studentData, type: e.target.value })} style={inputStyle}>
                                        <option value="Alumno">Alumno</option>
                                        <option value="Personal">Personal Docente/No Docente</option>
                                        <option value="Otro">Particular / Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Nombre y Apellido completo</label>
                                    <input type="text" value={studentData.name} onChange={e => setStudentData({ ...studentData, name: e.target.value })} style={inputStyle} placeholder="Ej: Juan Pérez" />
                                </div>

                                {studentData.type === 'Alumno' && (
                                    <>
                                        <div className="grid grid-2" style={{ gap: '0.5rem' }}>
                                            <div>
                                                <label>Nivel</label>
                                                <select value={studentData.level} onChange={e => setStudentData({ ...studentData, level: e.target.value })} style={inputStyle}>
                                                    <option value="Inicial">Inicial (Jardín)</option>
                                                    <option value="Primaria">Primaria</option>
                                                    <option value="Secundaria">Secundaria</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>Turno</label>
                                                <select value={studentData.shift} onChange={e => setStudentData({ ...studentData, shift: e.target.value })} style={inputStyle}>
                                                    <option value="Mañana">Mañana</option>
                                                    <option value="Tarde">Tarde</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label>Sala / Grado / Año</label>
                                            <input type="text" value={studentData.grade} onChange={e => setStudentData({ ...studentData, grade: e.target.value })} style={inputStyle} placeholder="Ej: 3ra Sección / 4to Grado / 6to Año" />
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label>Observaciones (Opcional)</label>
                                    <textarea value={studentData.comments} onChange={e => setStudentData({ ...studentData, comments: e.target.value })} style={{ ...inputStyle, height: '80px' }}></textarea>
                                </div>

                                {hasBlockedItems ? (
                                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1rem', borderRadius: '4px', color: '#991b1b', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                                        <FaExclamationCircle size={20} />
                                        <div>
                                            <strong>Error en el pedido:</strong>
                                            <p style={{ margin: 0 }}>Los alumnos de <strong>Nivel Inicial</strong> no pueden encargar Buzos ni Remeras Deportivas.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <button onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1 }}>Volver</button>
                                        <button onClick={handleNext} className="btn btn-primary" style={{ flex: 1 }} disabled={!studentData.name}>Revisar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="card" style={{ border: '2px solid var(--color-blue-light)' }}>
                            <h3 style={{ textAlign: 'center', color: 'var(--color-blue-dark)' }}>Confirmar Pedido</h3>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0', fontSize: '0.9rem', color: '#555' }}>
                                <li><strong>Para:</strong> {studentData.name} ({studentData.type})</li>
                                {studentData.type === 'Alumno' && (
                                    <li><strong>Curso:</strong> {studentData.level} - {studentData.grade} ({studentData.shift})</li>
                                )}
                                <li><strong>Items:</strong> {cart.length} prendas</li>
                            </ul>

                            <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af' }}>Total del Pedido</p>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>${getCartTotal().toLocaleString('es-AR')}</span>
                                <div style={{ marginTop: '0.5rem', borderTop: '1px solid #bfdbfe', paddingTop: '0.5rem' }}>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e40af', fontWeight: 'bold' }}>Seña requerida (50%)</p>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2563eb' }}>${(getCartTotal() * 0.5).toLocaleString('es-AR')}</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem', fontStyle: 'italic', textAlign: 'center' }}>
                                Al confirmar, tu pedido quedará registrado. Deberás acercarte a administración para abonar la seña y efectivizar el encargo.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1 }}>Modificar</button>
                                <button onClick={handleSubmitOrder} disabled={submitting} className="btn btn-primary" style={{ flex: 1 }}>
                                    {submitting ? 'Enviando...' : 'Confirmar Pedido'}
                                </button>
                            </div>

                            {!user && (
                                <p style={{ color: 'red', fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem' }}>Debés iniciar sesión en el Portal para finalizar.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.95rem'
};

export default CartPage;
