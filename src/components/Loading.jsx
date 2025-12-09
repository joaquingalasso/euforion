import { motion } from 'framer-motion';

const Loading = ({ text = "Cargando..." }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            width: '100%',
            color: 'var(--color-blue-dark)',
            gap: '1rem'
        }}>
            <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                {/* Background (Ghost) Logo */}
                <img
                    src="/favicon.svg"
                    alt="Loading base"
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0.2,
                        filter: 'grayscale(100%)'
                    }}
                />

                {/* Animated Foreground Logo */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden'
                    }}
                    initial={{ height: '0%' }}
                    animate={{ height: '100%' }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}
                >
                    <img
                        src="/favicon.svg"
                        alt="Loading fill"
                        style={{
                            width: '60px', // Fixed size to match container
                            height: '60px',
                            objectFit: 'contain'
                        }}
                    />
                </motion.div>
            </div>

            {/* Optional dot animation */}
            <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '1px' }}
            >
                {text}
            </motion.div>
        </div>
    );
};

export default Loading;
