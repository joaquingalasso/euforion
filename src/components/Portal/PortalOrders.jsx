import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthSocios } from '../../hooks/useAuthSocios';
import { FaShoppingBag, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const PortalOrders = () => {
    const { user } = useAuthSocios();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'pedidos'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'pendiente':
                return { label: 'Sin enviar / Falta Pago', color: '#f59f00', icon: <FaExclamationCircle /> }; // Orange
            case 'revision_pendiente':
                return { label: 'Pendiente de Aprobación', color: '#1098ad', icon: <FaClock /> }; // Cyan
            case 'aprobado':
                return { label: 'Aprobado', color: '#37b24d', icon: <FaCheckCircle /> }; // Green
            case 'rechazado':
                return { label: 'Rechazado', color: '#f03e3e', icon: <FaTimesCircle /> }; // Red
            default:
                return { label: status, color: '#868e96', icon: <FaExclamationCircle /> }; // Gray
        }
    };

    if (loading) return <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>Cargando pedidos...</div>;

    if (orders.length === 0) return null; // Don't show section if no orders

    return (
        <div className="card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <FaShoppingBag style={{ color: 'var(--color-blue-dark)' }} />
                <h3 style={{ margin: 0, color: 'var(--color-blue-dark)' }}>Mis Pedidos de Uniformes</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(order => {
                    const statusInfo = getStatusInfo(order.status);
                    const date = order.createdAt?.toDate().toLocaleDateString('es-AR') || 'Fecha desconocida';

                    return (
                        <div key={order.id} style={{
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            padding: '1rem',
                            backgroundColor: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <div>
                                    <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Orden #{order.id.slice(0, 8)}...</span>
                                    <h4 style={{ margin: '0.2rem 0', fontSize: '1.1rem' }}>${order.total?.toLocaleString('es-AR')}</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{date}</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    backgroundColor: `${statusInfo.color}15`,
                                    color: statusInfo.color,
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600'
                                }}>
                                    {statusInfo.icon}
                                    <span>{statusInfo.label}</span>
                                </div>
                            </div>

                            {/* Items Summary (First 2 items) */}
                            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#555', borderTop: '1px dashed #eee', paddingTop: '0.5rem' }}>
                                {order.items?.slice(0, 2).map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{item.quantity || 1}x {item.name}</span>
                                        <span style={{ color: '#888', fontSize: '0.8rem' }}>{item.selectedSize}</span>
                                    </div>
                                ))}
                                {order.items?.length > 2 && <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#888' }}>+ {order.items.length - 2} items más...</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PortalOrders;
