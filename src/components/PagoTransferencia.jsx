import React, { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaCheckCircle, FaUniversity } from 'react-icons/fa';

const PagoTransferencia = ({ orden }) => {
    const [loading, setLoading] = useState(false);
    const [pagoInformado, setPagoInformado] = useState(false);

    const handleInformarPago = async () => {
        if (!orden?.id) return;

        setLoading(true);
        try {
            const ordenRef = doc(db, "pedidos", orden.id);
            await updateDoc(ordenRef, {
                estado: "revision_pendiente",
                fecha_aviso_pago: serverTimestamp()
            });
            setPagoInformado(true);
        } catch (error) {
            console.error("Error al informar pago:", error);
            alert("Hubo un error al informar el pago. Por favor intentalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (pagoInformado) {
        return (
            <div className="card" style={{ padding: '2rem', textAlign: 'center', border: '2px solid #28a745', marginTop: '2rem' }}>
                <div style={{ color: '#28a745', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <FaCheckCircle size={50} />
                </div>
                <h3 style={{ color: 'var(--color-blue-dark)', marginBottom: '1rem', marginTop: '0' }}>¡Pago informado!</h3>
                <p style={{ marginBottom: '1.5rem', color: '#555', fontSize: '1.1rem' }}>
                    Para finalizar, enviá el comprobante por mail a <strong>secretariaeuforion@gmail.com</strong> poniendo en el ASUNTO: <strong>Pago Orden #{orden.id}</strong>
                </p>

                <a
                    href={`mailto:secretariaeuforion@gmail.com?subject=Comprobante Pago Orden #${orden.id}&body=Adjunto el comprobante de la orden #${orden.id} por el monto de $${orden.total}.`}
                    className="btn btn-primary"
                    style={{ display: 'inline-block', textDecoration: 'none', padding: '0.8rem 2rem' }}
                >
                    Enviar correo ahora
                </a>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: '2rem', marginTop: '1rem', borderTop: '4px solid var(--color-blue-dark)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', color: 'var(--color-blue-dark)' }}>
                <FaUniversity size={24} />
                <h3 style={{ margin: 0 }}>Datos Bancarios</h3>
            </div>

            <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#666' }}>
                Transferí el <strong>50% de seña</strong> o el <strong>total</strong> ($ {orden.total}) a la siguiente cuenta:
            </p>

            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e9ecef' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Titular</span>
                    <strong style={{ fontSize: '1.1rem', color: '#333' }}>ASOCIACIÓN CIVIL EUFORIÓN</strong>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CBU</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#333', letterSpacing: '1px', display: 'block', wordBreak: 'break-all' }}>0140999803200000000123</span>
                </div>
                <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Alias</span>
                    <strong style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>EUFORION.MP</strong>
                </div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#e7f5ff', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#004085', borderLeft: '4px solid #004085' }}>
                <strong>Instrucciones:</strong> Una vez hecha la transferencia, hacé clic en el botón de abajo para avisarnos. Luego tendrás que enviar el comprobante por mail.
            </div>

            <button
                onClick={handleInformarPago}
                className="btn btn-success"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}
                disabled={loading}
            >
                {loading ? 'Procesando...' : 'Ya realicé la transferencia'}
            </button>
        </div>
    );
};

export default PagoTransferencia;
