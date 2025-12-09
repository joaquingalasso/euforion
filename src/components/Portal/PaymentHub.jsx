import { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthSocios } from '../../hooks/useAuthSocios';
import { FaMoneyBillWave, FaCartPlus, FaTrash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import PagoTransferencia from '../PagoTransferencia';

const PaymentHub = ({ userData }) => {
    const { user } = useAuthSocios();
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [lastOrder, setLastOrder] = useState(null);

    // Obligations State
    const [obligations, setObligations] = useState([]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [monthlyTotal, setMonthlyTotal] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const docRef = doc(db, 'configuracion', 'valores');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setConfig(docSnap.data());
                }
            } catch (error) {
                console.error("Error loading config:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Effect: Calculate Obligations based on User Concepts + Config
    useEffect(() => {
        if (!config || !userData) return;

        // 1. Identify User Concepts (Assigned by Admin or Default based on Category)
        const userConcepts = userData.conceptos || [];
        // Fallback: If no concepts assigned, assume Category (e.g. Socio Activo)
        if (userConcepts.length === 0 && userData.categoria) {
            // Try to find matching config key for category
            Object.keys(config).forEach(key => {
                if (config[key].categoria_target === userData.categoria) userConcepts.push(key);
            });
        }

        // 2. Calculate Monthly Value
        let total = 0;
        const details = [];

        userConcepts.forEach(key => {
            const item = config[key];
            if (item) {
                total += parseFloat(item.monto || 0);
                details.push(item);
            }
        });

        setMonthlyTotal(total);

        // 3. Calculate Months Owed
        // Logic: From 'vencimiento_cuota' to Today
        if (!userData.vencimiento_cuota) {
            // If never set, assume current month is due? Or no debt?
            // Let's assume current month is due.
            setObligations([{
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                label: getMonthName(new Date().getMonth() + 1) + ' ' + new Date().getFullYear(),
                amount: total,
                details: details
            }]);
            return;
        }

        const parseDate = (str) => {
            const p = str.split('/');
            return new Date(p[2], p[1] - 1, p[0]);
        };

        const dueDate = parseDate(userData.vencimiento_cuota);
        const today = new Date();
        const pending = [];

        // Start from the month AFTER the due date. 
        // Example: Paid until March (venc: 10/04). So April is due? 
        // Simplification: vencimiento_cuota is the limit of coverage. If < today, we owe.
        // Let's iterate from Due Date Month until Today's Month.

        // Safety cap for upcoming loop
        let safeguard = 0;

        // Re-Logic:
        const nextMonthDate = new Date(dueDate);
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1); // Move to next month

        // Loop from nextMonthDate until Today
        let iter = new Date(nextMonthDate);
        iter.setDate(1); // Normalize

        const end = new Date();
        end.setDate(1); // Normalize today

        while (iter <= end && safeguard < 12) {
            pending.push({
                month: iter.getMonth() + 1,
                year: iter.getFullYear(),
                label: `${getMonthName(iter.getMonth() + 1)} ${iter.getFullYear()}`,
                amount: total,
                details: details,
                id: `${iter.getMonth() + 1}-${iter.getFullYear()}`
            });
            iter.setMonth(iter.getMonth() + 1);
            safeguard++;
        }

        // Logic: Always show at least CURRENT month if list is empty (i.e. up to date but want to pay current)
        if (pending.length === 0) {
            // Maybe they want to pay in advance? Or just pay current if it's barely the start of month?
            // If vencimiento >= today, they are up to date.
            // Let's show "Pago Adelantado / Mes actual"
            // For now, if empty, show "Al día".
        }

        setObligations(pending);

    }, [config, userData]);

    const getMonthName = (m) => {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return months[m - 1];
    };

    const toggleMonth = (obs) => {
        // Validation: Must select in order? (Optional but good practice)
        // For flexibility, allow any selection.
        if (selectedMonths.find(m => m.id === obs.id)) {
            setSelectedMonths(selectedMonths.filter(m => m.id !== obs.id));
        } else {
            setSelectedMonths([...selectedMonths, obs]);
        }
    };

    const handleCreateOrder = async () => {
        if (selectedMonths.length === 0) return;

        const total = selectedMonths.reduce((sum, m) => sum + m.amount, 0);

        // Create accurate Items list
        const items = [];
        selectedMonths.forEach(obs => {
            // Add one item per month, clearly labeled
            // Or breakdown concepts per month? 
            // Let's group: "Cuota + Talleres (Mayo 2024)"
            const itemNames = obs.details.map(d => d.label).join(' + ');
            items.push({
                id: obs.id,
                name: `Período ${obs.label}`, // "Período Mayo 2024"
                description: itemNames, // "Cuota Social + Taller Arte"
                price: obs.amount,
                quantity: 1,
                type: 'periodo_mensual'
            });
        });

        const orderData = {
            userId: user.uid,
            userDni: userData?.dni || 'Anónimo',
            userEmail: user.email,
            studentData: {
                name: `${userData.nombres} ${userData.apellidos}`,
                type: userData.rol || 'Socio',
                details: 'Regularización de Cuotas',
                concepts: items.map(i => i.description).join('; ')
            },
            items: items,
            total: total,
            depositRequired: total,
            status: 'pendiente',
            type: 'payment_fee',
            createdAt: serverTimestamp()
        };

        try {
            const docRef = await addDoc(collection(db, 'pedidos'), orderData);
            setLastOrder({ id: docRef.id, ...orderData });
            setStep(2);
        } catch (e) {
            console.error(e);
            alert("Error al generar orden.");
        }
    };

    if (loading) return <div className="card">Cargando pagos...</div>;

    if (step === 2 && lastOrder) {
        return (
            <div className="card" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button onClick={() => setStep(1)} className="btn btn-outline btn-sm"> &larr; Volver</button>
                    <h3>Finalizar Pago</h3>
                </div>
                <PagoTransferencia orden={lastOrder} />
            </div>
        );
    }

    const isUpToDate = obligations.length === 0;

    return (
        <div className="card" style={{ marginTop: '2rem', borderTop: '4px solid #8e44ad' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8e44ad' }}>
                <FaMoneyBillWave /> Mis Obligaciones / Pagos
            </h3>

            {monthlyTotal === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    <FaExclamationCircle size={30} color="#ccc" />
                    <p>No tenés conceptos asignados. Contactá a administración.</p>
                </div>
            ) : (
                <>
                    <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Tu Valor Mensual</span>
                            <strong style={{ fontSize: '1.2rem', color: '#2c3e50' }}>${monthlyTotal.toLocaleString('es-AR')}</strong>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Conceptos:</span>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                {Object.keys(config).filter(k => userData.conceptos?.includes(k)).map(k => config[k].label).join(', ') || 'Cuota Básica'}
                            </div>
                        </div>
                    </div>

                    {isUpToDate ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#27ae60' }}>
                            <FaCheckCircle size={40} style={{ marginBottom: '1rem' }} />
                            <h4>¡Estás al día!</h4>
                            <p>No registrás deuda pendiente.</p>
                        </div>
                    ) : (
                        <div>
                            <h4 style={{ marginBottom: '1rem' }}>Seleccioná periodos a abonar:</h4>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {obligations.map(obs => (
                                    <label key={obs.id} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '1rem', border: '1px solid #eee', borderRadius: '8px',
                                        cursor: 'pointer',
                                        backgroundColor: selectedMonths.find(m => m.id === obs.id) ? '#f3e5f5' : 'white',
                                        borderColor: selectedMonths.find(m => m.id === obs.id) ? '#8e44ad' : '#eee'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={!!selectedMonths.find(m => m.id === obs.id)}
                                                onChange={() => toggleMonth(obs)}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
                                            <span style={{ fontWeight: 'bold' }}>{obs.label}</span>
                                        </div>
                                        <span style={{ fontWeight: 'bold' }}>${obs.amount.toLocaleString('es-AR')}</span>
                                    </label>
                                ))}
                            </div>

                            {selectedMonths.length > 0 && (
                                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', borderTop: '2px solid #8e44ad' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        <span>Total a Pagar</span>
                                        <span>${selectedMonths.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString('es-AR')}</span>
                                    </div>
                                    <button onClick={handleCreateOrder} className="btn btn-primary" style={{ width: '100%', backgroundColor: '#8e44ad' }}>
                                        Iniciar Pago ({selectedMonths.length} periodos)
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PaymentHub;
