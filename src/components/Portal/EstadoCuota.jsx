import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FaMoneyBillWave, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const EstadoCuota = ({ userData }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [debt, setDebt] = useState({ monthsLate: 0, totalDebt: 0, currency: '$' });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const docRef = doc(db, 'configuracion', 'valores');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setConfig(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching financial config:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        if (!config || !userData.vencimiento_cuota) return;

        calculateDebt();
    }, [config, userData]);

    const calculateDebt = () => {
        // 1. Get User Category & Role to find applicable fee
        // Assuming config keys are normalized: 'inicial', 'primario', 'socio_activo'
        // And userData.categoria holds values like 'INICIAL', 'PRIMARIA', 'ACTIVO'

        let feeValue = 0;
        let feeLabel = '';

        // Helper to find fee match
        const findFee = (searchCategory) => {
            if (!searchCategory) return null;
            const norm = searchCategory.toLowerCase().trim();

            // Iterate over config keys to find a match in 'categoria_target' or checking key matching
            for (const [key, value] of Object.entries(config)) {
                // Check if categoria_target matches (e.g. 'INICIAL' == 'INICIAL')
                if (value.categoria_target && value.categoria_target.toLowerCase() === norm) {
                    return value;
                }
                // Fallback: Check if key contains the category name pattern
                if (key.includes(norm)) {
                    return value;
                }
            }
            return null;
        };

        const feeConfig = findFee(userData.categoria);

        if (feeConfig) {
            feeValue = parseFloat(feeConfig.monto);
            feeLabel = feeConfig.label;
        }

        if (feeValue === 0) return; // No debt if no fee found

        // 2. Calculate Months Late
        // Parser for DD/MM/YYYY
        const parseDate = (dateStr) => {
            if (!dateStr) return new Date();
            const parts = dateStr.split('/');
            // Month is 0-indexed in JS Date
            return new Date(parts[2], parts[1] - 1, parts[0]);
        };

        const dueDate = parseDate(userData.vencimiento_cuota);
        const today = new Date();

        // Calculate difference in months
        let months = (today.getFullYear() - dueDate.getFullYear()) * 12;
        months -= dueDate.getMonth();
        months += today.getMonth();

        // If today is before the same day of the month as due date, subtract one month?
        // Let's keep it simple: strict month difference based on calendar months.

        if (months < 0) months = 0;

        setDebt({
            monthsLate: months,
            totalDebt: months * feeValue,
            monthlyFee: feeValue,
            feeLabel: feeLabel
        });
    };

    if (loading) return <div className="card">Cargando estado financiero...</div>;

    if (!config) return null; // Don't show if no config

    const isDebt = debt.totalDebt > 0;

    return (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: isDebt ? '5px solid #dc2626' : '5px solid #22c55e' }}>
            <h3 style={{ margin: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaMoneyBillWave color="var(--color-blue-dark)" /> Estado de Cuenta
            </h3>

            {!userData.vencimiento_cuota ? (
                <p style={{ color: '#666' }}>No hay fecha de vencimiento registrada.</p>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#666' }}>Vencimiento:</span>
                        <strong>{userData.vencimiento_cuota}</strong>
                    </div>

                    {isDebt ? (
                        <div style={{ backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                <FaExclamationCircle /> Deuda Pendiente
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f1d1d' }}>
                                Se registran <strong>{debt.monthsLate} períodos</strong> impagos.
                            </p>
                            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f1d1d' }}>
                                Valor Cuota ({debt.feeLabel || userData.categoria}): <strong>${debt.monthlyFee}</strong>
                            </p>
                            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #fecaca', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold', color: '#dc2626' }}>
                                <span>Total a Pagar:</span>
                                <span>${debt.totalDebt}</span>
                            </div>
                        </div>
                    ) : (
                        <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '8px', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaCheckCircle color="#16a34a" size={24} />
                            <div>
                                <strong style={{ display: 'block', color: '#166534' }}>¡Al día!</strong>
                                <span style={{ fontSize: '0.9rem', color: '#15803d' }}>No registrás deudas pendientes.</span>
                            </div>
                        </div>
                    )}
                </>
            )}

            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '1rem', fontStyle: 'italic' }}>
                * Calculado al día de la fecha. Para regularizar tu situación acércate a administración.
            </p>
        </div>
    );
};

export default EstadoCuota;
