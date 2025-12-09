import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FaSearch, FaEye, FaCheckCircle, FaTimesCircle, FaClock, FaBoxOpen, FaFilter } from 'react-icons/fa';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all'); // all, pending, active

    useEffect(() => {
        const q = query(collection(db, 'pedidos'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(docs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching orders:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, 'pedidos', orderId);
            await updateDoc(orderRef, {
                status: newStatus,
                updatedAt: serverTimestamp()
            });
            // Close modal if open and matches
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            }
            alert(`Estado actualizado a: ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error al actualizar estado.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pendiente': return '#f59f00'; // Orange
            case 'revision_pendiente': return '#1098ad'; // Cyan
            case 'aprobado': return '#37b24d'; // Green
            case 'rechazado': return '#f03e3e'; // Red
            case 'entregado': return '#1c7ed6'; // Blue
            default: return '#868e96';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pendiente': return 'Falta Pago';
            case 'revision_pendiente': return 'Revisión Pago';
            case 'aprobado': return 'Aprobado / En Prep.';
            case 'rechazado': return 'Rechazado';
            case 'entregado': return 'Entregado';
            default: return status;
        }
    };

    const filteredOrders = orders.filter(o => {
        if (filterStatus === 'all') return true;
        if (filterStatus === 'pending') return ['pendiente', 'revision_pendiente'].includes(o.status);
        if (filterStatus === 'ready') return o.status === 'aprobado';
        return o.status === filterStatus;
    });

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando pedidos...</div>;

    return (
        <div>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <button
                    className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setFilterStatus('all')}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                >
                    Todos
                </button>
                <button
                    className={`btn ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setFilterStatus('pending')}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                >
                    Pendientes de Acción
                </button>
                <button
                    className={`btn ${filterStatus === 'ready' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setFilterStatus('ready')}
                    style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                >
                    Listos para Retirar
                </button>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '600px' }}>
                        <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Fecha</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Socio / Cliente</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Alumno</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Estado</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>
                                        {order.createdAt?.toDate().toLocaleDateString('es-AR')}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 'bold' }}>{order.userDni}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>{order.userEmail}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {order.studentData?.name}
                                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                            {order.studentData?.level} - {order.studentData?.grade}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                                        ${order.total?.toLocaleString('es-AR')}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            backgroundColor: getStatusColor(order.status) + '20',
                                            color: getStatusColor(order.status),
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem'
                                        }}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="btn btn-sm btn-outline"
                                            title="Ver Detalle"
                                        >
                                            <FaEye /> Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedOrder && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 2000
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '0', borderRadius: '8px',
                        width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto',
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Orden #{selectedOrder.id.slice(0, 8)}</h3>
                            <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>

                        <div style={{ padding: '2rem', overflowY: 'auto' }}>
                            <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
                                <div>
                                    <h4 style={{ marginBottom: '1rem', color: '#555' }}>Datos del Comprador</h4>
                                    <p><strong>DNI:</strong> {selectedOrder.userDni}</p>
                                    <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '1rem', color: '#555' }}>Datos del Alumno</h4>
                                    <p><strong>Nombre:</strong> {selectedOrder.studentData?.name}</p>
                                    <p><strong>Curso:</strong> {selectedOrder.studentData?.level} {selectedOrder.studentData?.grade}</p>
                                    <p><strong>Turno:</strong> {selectedOrder.studentData?.shift}</p>
                                </div>
                            </div>

                            <h4 style={{ marginBottom: '1rem', color: '#555' }}>Items ({selectedOrder.items?.length})</h4>
                            <div style={{ marginBottom: '2rem', border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
                                {selectedOrder.items?.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px dashed #eee', paddingBottom: '0.5rem' }}>
                                        <div>
                                            <strong>{item.quantity}x</strong> {item.name}
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Talle: {item.selectedSize}</div>
                                        </div>
                                        <div>${item.priceStr}</div>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    <span>Total</span>
                                    <span>${selectedOrder.total?.toLocaleString('es-AR')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                                    <span>Seña (50%)</span>
                                    <span>${(selectedOrder.total * 0.5)?.toLocaleString('es-AR')}</span>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Gestionar Estado</h4>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'aprobado')}
                                        className="btn btn-success"
                                        disabled={selectedOrder.status === 'aprobado'}
                                    >
                                        <FaCheckCircle /> Aprobar Pago
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'entregado')}
                                        className="btn btn-primary"
                                        disabled={selectedOrder.status === 'entregado'}
                                    >
                                        <FaBoxOpen /> Marcar Entregado
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'rechazado')}
                                        className="btn btn-danger"
                                        style={{ backgroundColor: '#dc3545', color: 'white' }}
                                        disabled={selectedOrder.status === 'rechazado'}
                                    >
                                        <FaTimesCircle /> Rechazar
                                    </button>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                    Estado actual: <strong>{getStatusLabel(selectedOrder.status)}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
