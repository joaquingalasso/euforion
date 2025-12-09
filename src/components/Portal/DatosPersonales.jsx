import { useState } from 'react';
import { FaUser, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaPencilAlt, FaSave } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const DatosPersonales = ({ userData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        red_social: userData.red_social || '',
        telefono: userData.telefono || '',
        domicilio: userData.domicilio || '',
        email_contacto: userData.email_contacto || '',
        fecha_nacimiento: userData.fecha_nacimiento || '',
        fecha_ingreso: userData.fecha_ingreso || ''
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docRef = doc(db, 'socios', userData.dni.toString());
            await updateDoc(docRef, {
                red_social: formData.red_social,
                telefono: formData.telefono,
                domicilio: formData.domicilio,
                email_contacto: formData.email_contacto,
                fecha_nacimiento: formData.fecha_nacimiento,
                fecha_ingreso: formData.fecha_ingreso
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("No se pudo guardar el cambio.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaUser color="var(--color-blue-dark)" /> Datos Personales
                </h3>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-blue-medium)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        <FaPencilAlt /> Editar
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>Cancelar</button>
                        <button onClick={handleSave} disabled={saving} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'green', fontWeight: 'bold' }}>
                            <FaSave /> Guardar
                        </button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: '#666' }}>Domicilio</label>
                        <input name="domicilio" value={formData.domicilio} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: '#666' }}>Teléfono / WhatsApp</label>
                        <input name="telefono" value={formData.telefono} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: '#666' }}>Email de Contacto</label>
                        <input name="email_contacto" value={formData.email_contacto} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: '#666' }}>Fecha Nacimiento</label>
                            <input type="text" placeholder="DD/MM/AAAA" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', color: '#666' }}>Fecha Ingreso/Inicio</label>
                            <input type="text" placeholder="DD/MM/AAAA" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', color: '#666' }}>Instagram (sin @)</label>
                        <input name="red_social" value={formData.red_social} onChange={handleChange} placeholder="usuario" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                </div>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FaMapMarkerAlt color="gray" />
                        <div>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'gray' }}>Domicilio</span>
                            <strong>{formData.domicilio || userData.domicilio || 'No registrado'}</strong>
                        </div>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FaPhoneAlt color="gray" />
                        <div>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'gray' }}>Teléfono</span>
                            <strong>{formData.telefono || userData.telefono || 'No registrado'}</strong>
                        </div>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FaUser color="gray" />
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'gray' }}>Nacimiento</span>
                                <strong>{formData.fecha_nacimiento || userData.fecha_nacimiento || '--/--/----'}</strong>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'gray' }}>Ingreso</span>
                                <strong>{formData.fecha_ingreso || userData.fecha_ingreso || '--/--/----'}</strong>
                            </div>
                        </div>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <FaInstagram color="gray" />
                        <div>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: 'gray' }}>Instagram</span>
                            <strong>{formData.red_social ? `@${formData.red_social.replace('@', '')}` : 'No registrado'}</strong>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default DatosPersonales;
