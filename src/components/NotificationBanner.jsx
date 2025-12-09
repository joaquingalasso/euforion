import { useState, useEffect } from 'react';
import { loadContent } from '../utils/contentLoader';
import { FaInfoCircle, FaExclamationTriangle, FaBell, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function NotificationBanner({ target }) {
    const [notifications, setNotifications] = useState([]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const fetchAvisos = async () => {
            try {
                const allAvisos = await loadContent('avisos');
                const now = new Date();

                const filtered = allAvisos.filter(aviso => {
                    // Check Expiration
                    if (aviso.expirationDate) {
                        const expDate = new Date(aviso.expirationDate);
                        if (now > expDate) return false;
                    }

                    // Check Target
                    if (aviso.target && Array.isArray(aviso.target)) {
                        // Check explicit hiddenFromHome flag
                        if (aviso.hiddenFromHome && target === 'home') return false;

                        return aviso.target.includes(target) || aviso.target.includes('global');
                    }

                    return false;
                });

                setNotifications(filtered);
            } catch (error) {
                console.error("Error loading avisos:", error);
            }
        };

        fetchAvisos();
    }, [target]);

    if (!visible || notifications.length === 0) return null;

    const getIcon = (type) => {
        switch (type) {
            case 'warning': return <FaExclamationTriangle />;
            case 'alert': return <FaExclamationTriangle />;
            case 'info': return <FaInfoCircle />;
            default: return <FaBell />;
        }
    };

    const getColors = (type) => {
        switch (type) {
            case 'warning': return { bg: '#fff3cd', color: '#856404', border: '#ffeeba' };
            case 'alert': return { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' };
            case 'info': return { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' };
            default: return { bg: '#d4edda', color: '#155724', border: '#c3e6cb' };
        }
    };

    return (
        <div className="container" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <AnimatePresence>
                {notifications.map((note) => {
                    const style = getColors(note.type);
                    return (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                backgroundColor: style.bg,
                                color: style.color,
                                border: `1px solid ${style.border}`,
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem 1.5rem',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'start',
                                gap: '1rem',
                                position: 'relative'
                            }}
                        >
                            <div style={{ marginTop: '4px', fontSize: '1.2rem' }}>
                                {getIcon(note.type)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong style={{ display: 'block', marginBottom: '0.2rem', fontSize: '1.05rem' }}>{note.title}</strong>
                                <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                                    <ReactMarkdown>{note.content}</ReactMarkdown>
                                </div>
                            </div>
                            {/* Optional formatting for multiple alerts? For now simpler is better */}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

export default NotificationBanner;
