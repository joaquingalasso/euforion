import { useState } from 'react';
import { useAuthSocios } from '../../hooks/useAuthSocios';
import { FaIdCard, FaCalendarAlt, FaEnvelope, FaLock, FaCheckCircle, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const LoginScreen = () => {
    const { login, validateDNI, confirmIdentity, registerUser, error } = useAuthSocios();
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'activar'

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    // Activation Wizard State
    const [step, setStep] = useState(1); // 1: DNI, 2: Birthdate, 3: Password, 4: Success
    const [actDni, setActDni] = useState('');
    const [actName, setActName] = useState('');
    const [actBirthdate, setActBirthdate] = useState('');
    const [actEmail, setActEmail] = useState('');
    const [actPass, setActPass] = useState('');
    const [actPassConfirm, setActPassConfirm] = useState('');
    const [isBirthdateMissingInDB, setIsBirthdateMissingInDB] = useState(false);

    // Handlers
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginEmail, loginPass);
        } catch (err) {
            // handled by hook error
        }
    };

    const handleStep1_DNI = async (e) => {
        e.preventDefault();
        try {
            const result = await validateDNI(actDni);
            if (result.exists) {
                setActName(result.name); // "Juan Perez"
                setIsBirthdateMissingInDB(!result.hasBirthdateStored);
                setStep(2);
            }
        } catch (err) { }
    };

    const handleStep2_Identity = async (e) => {
        e.preventDefault();
        try {
            // Confirm identity (checking birthdate or saving it)
            await confirmIdentity(actDni, actBirthdate); // expect normalized string from input type="date"
            setStep(3);
        } catch (err) { }
    };

    const handleStep3_Register = async (e) => {
        e.preventDefault();
        if (actPass !== actPassConfirm) {
            alert("Las contraseñas no coinciden");
            return;
        }
        if (actPass.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        try {
            await registerUser(actDni, actEmail, actPass);
            setStep(4);
        } catch (err) { }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '0 1rem' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
                <button
                    onClick={() => setActiveTab('login')}
                    style={{
                        flex: 1, padding: '1rem', background: 'none', border: 'none',
                        borderBottom: activeTab === 'login' ? '3px solid var(--color-blue-light)' : 'none',
                        fontWeight: activeTab === 'login' ? 'bold' : 'normal',
                        cursor: 'pointer'
                    }}
                >
                    Ingresar
                </button>
                <button
                    onClick={() => setActiveTab('activar')}
                    style={{
                        flex: 1, padding: '1rem', background: 'none', border: 'none',
                        borderBottom: activeTab === 'activar' ? '3px solid var(--color-blue-light)' : 'none',
                        fontWeight: activeTab === 'activar' ? 'bold' : 'normal',
                        cursor: 'pointer'
                    }}
                >
                    Activar Cuenta
                </button>
            </div>

            <div style={{ minHeight: '300px' }}>
                <AnimatePresence mode='wait'>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <FaCheckCircle style={{ transform: 'rotate(45deg)' }} /> {error}
                        </motion.div>
                    )}

                    {activeTab === 'login' ? (
                        <motion.form
                            key="login"
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleLogin}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        >
                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                <FaEnvelope color="#aaa" />
                                <input
                                    type="email" placeholder="Email" required
                                    value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                                    style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                />
                            </div>
                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                <FaLock color="#aaa" />
                                <input
                                    type="password" placeholder="Contraseña" required
                                    value={loginPass} onChange={e => setLoginPass(e.target.value)}
                                    style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit" style={{ marginTop: '1rem' }}>
                                INGRESAR
                            </button>
                        </motion.form>
                    ) : (
                        <div key="activation">
                            {/* Wizard Progress */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
                                <span style={{ color: step >= 1 ? 'var(--color-blue-light)' : '#ddd' }}>1. DNI</span>
                                <span style={{ color: step >= 2 ? 'var(--color-blue-light)' : '#ddd' }}>2. Identidad</span>
                                <span style={{ color: step >= 3 ? 'var(--color-blue-light)' : '#ddd' }}>3. Crear</span>
                            </div>

                            {step === 1 && (
                                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleStep1_DNI} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Ingresá tu DNI para buscarte en el padrón.</p>
                                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                        <FaIdCard color="#aaa" />
                                        <input
                                            type="number" placeholder="DNI (sin puntos)" required
                                            value={actDni} onChange={e => setActDni(e.target.value)}
                                            style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                        />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Siguiente</button>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleStep2_Identity} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                        <div style={{ width: '50px', height: '50px', background: '#eef2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                                            <FaUser color="var(--color-blue-light)" size={24} />
                                        </div>
                                        <h3 style={{ margin: 0 }}>Hola, {actName.split(' ')[0]}!</h3>
                                        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                                            {isBirthdateMissingInDB
                                                ? "Para completar tu legajo, por favor ingresá tu fecha de nacimiento."
                                                : "Por seguridad, confirma tu fecha de nacimiento."}
                                        </p>
                                    </div>

                                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                        <FaCalendarAlt color="#aaa" />
                                        <input
                                            type="date" required
                                            value={actBirthdate} onChange={e => setActBirthdate(e.target.value)}
                                            style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                        />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Confirmar Identidad</button>
                                </motion.form>
                            )}

                            {step === 3 && (
                                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleStep3_Register} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>Creá tus credenciales de acceso definitivo.</p>

                                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                        <FaEnvelope color="#aaa" />
                                        <input
                                            type="email" placeholder="Email Personal" required
                                            value={actEmail} onChange={e => setActEmail(e.target.value)}
                                            style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                        />
                                    </div>
                                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                        <FaLock color="#aaa" />
                                        <input
                                            type="password" placeholder="Crear Contraseña (min 6 chars)" required
                                            value={actPass} onChange={e => setActPass(e.target.value)}
                                            style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                        />
                                    </div>
                                    <div className="input-group" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                        <FaLock color="#aaa" />
                                        <input
                                            type="password" placeholder="Confirmar Contraseña" required
                                            value={actPassConfirm} onChange={e => setActPassConfirm(e.target.value)}
                                            style={{ border: 'none', outline: 'none', padding: '0.5rem', flex: 1 }}
                                        />
                                    </div>

                                    <button className="btn btn-primary" type="submit">Finalizar Activación</button>
                                </motion.form>
                            )}

                            {step === 4 && (
                                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                                    <FaCheckCircle size={50} color="#22c55e" style={{ marginBottom: '1rem' }} />
                                    <h3>¡Cuenta Activada!</h3>
                                    <p style={{ color: '#666' }}>Bienvenido/a al Portal Euforión.</p>
                                    <p style={{ fontSize: '0.8rem', color: '#999' }}>Redirigiendo a tu panel...</p>
                                </motion.div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoginScreen;
