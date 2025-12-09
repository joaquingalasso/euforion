import { motion } from 'framer-motion';

const magazines = [
    {
        title: "Edición N° 1",
        url: "https://online.fliphtml5.com/gmuuo/hfgc/#p=2",
        embedUrl: "https://online.fliphtml5.com/gmuuo/hfgc/"
    },
    {
        title: "Edición N° 2",
        url: "https://online.fliphtml5.com/gmuuo/trha/",
        embedUrl: "https://online.fliphtml5.com/gmuuo/trha/"
    },
    {
        title: "Edición N° 3",
        url: "https://online.fliphtml5.com/gmuuo/ynas/#p=1",
        embedUrl: "https://online.fliphtml5.com/gmuuo/ynas/"
    }
];

function RevistaDigital() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Revista Digital</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)', maxWidth: '800px', margin: '0 auto' }}>
                    Recorré las páginas de nuestra revista institucional, un espacio de expresión y comunicación de toda la comunidad educativa de Euforión.
                </p>
            </motion.div>

            <div className="grid grid-3">
                {magazines.map((mag, index) => (
                    <motion.div key={index} variants={itemVariants} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', width: '100%', height: '400px', background: '#f8f9fa' }}>
                            <iframe
                                src={mag.embedUrl}
                                seamless="seamless"
                                scrolling="no"
                                frameBorder="0"
                                allowTransparency="true"
                                allowFullScreen="true"
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                title={mag.title}
                            ></iframe>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--color-gray-light)' }}>
                            <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--color-blue-dark)', textAlign: 'center' }}>{mag.title}</h3>
                            <a
                                href={mag.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ width: '100%', marginTop: 'auto' }}
                            >
                                Leer en Pantalla Completa
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default RevistaDigital;
