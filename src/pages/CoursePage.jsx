import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { loadCourseFiles } from '../utils/contentLoader';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt, FaChalkboardTeacher, FaDownload } from 'react-icons/fa';
import UnifiedFeed from '../components/UnifiedFeed';
import SEO from '../components/SEO';

// ... (imports remain)

function CoursePage() {
    const { level, courseId, turn } = useParams();
    const levelCourses = courses[level];
    const course = levelCourses?.find(c => c.id === courseId);

    // Defensive check: If level or course invalid, show error instead of crashing
    if (!courses[level]) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Nivel no encontrado</h2>
                <p>El nivel "{level}" no existe.</p>
                <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Curso no encontrado</h2>
                <p>El curso "{courseId}" no existe en el nivel {level}.</p>
                <Link to={`/${level}`} className="btn btn-primary">Volver al Nivel</Link>
            </div>
        );
    }

    // Dynamic files state
    const [dynamicFiles, setDynamicFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            if (level && courseId) {
                try {
                    // Pass turn to loader to optionally filter or load turn-specific folder
                    const files = await loadCourseFiles(level, courseId, turn);
                    setDynamicFiles(files);
                } catch (err) {
                    console.error("Error loading course files:", err);
                }
            }
        };
        fetchFiles();
    }, [level, courseId, turn]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'pdf': return <FaFilePdf size={24} color="var(--color-red)" />;
            case 'word': return <FaFileWord size={24} color="var(--color-blue-dark)" />;
            case 'excel': return <FaFileExcel size={24} color="var(--color-green)" />;
            case 'image': return <FaFileImage size={24} color="var(--color-blue-light)" />;
            default: return <FaFileAlt size={24} color="var(--color-gray-medium)" />;
        }
    };

    if (!course) {
        // ... (not found return)
    }

    // Filter Teachers by Turn
    const filteredTeachers = course.teachers?.filter(t => {
        if (!turn) return true; // Show all if no turn specified (legacy route)
        return !t.turn || t.turn === 'both' || t.turn === turn;
    }) || [];

    // Filter Static Materials by Turn
    const filteredMaterials = course.materials?.filter(m => {
        if (!turn) return true;
        return !m.turn || m.turn === 'both' || m.turn === turn;
    }) || [];

    const hasStaticMaterials = filteredMaterials.length > 0;
    const hasDynamicFiles = dynamicFiles && dynamicFiles.length > 0;

    const turnLabel = turn === 'manana' ? 'Turno Mañana' : (turn === 'tarde' ? 'Turno Tarde' : '');

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <SEO
                title={course ? `${course.title} - ${levelCourses ? level.charAt(0).toUpperCase() + level.slice(1) : ''}` : "Curso"}
                description={`Información y materiales para ${course ? course.title : 'el curso'}.`}
            />
            <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                <Link to={`/${level}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blue-medium)', fontWeight: 'bold' }}>
                    <FaArrowLeft /> Volver a {level.charAt(0).toUpperCase() + level.slice(1)}
                </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {course.title}
            </motion.h1>
            {turn && (
                <motion.h2 variants={itemVariants} style={{ fontSize: '1.5rem', color: 'var(--color-gray-medium)', marginBottom: '2rem', fontWeight: 'normal' }}>
                    {turnLabel}
                </motion.h2>
            )}

            {/* Course Specific Avisos */}
            <motion.section variants={itemVariants} style={{ marginBottom: '3rem' }}>
                {/* Filter by courseId AND specific turn tag (e.g. '1-grado', '1-grado-manana') */}
                <UnifiedFeed tags={[courseId, turn ? `${courseId}-${turn}` : ''].filter(Boolean)} types={['avisos']} limit={2} />
            </motion.section>

            <div className="grid" style={{ gap: '4rem' }}>

                {/* Dynamic File Section (primary) */}
                {(hasDynamicFiles || hasStaticMaterials) && (
                    <motion.section variants={itemVariants}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaDownload color="var(--color-blue-light)" /> Descargas y Materiales
                        </h2>

                        {hasDynamicFiles && (
                            <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
                                {dynamicFiles.map((file, index) => (
                                    <a
                                        key={`dyn-${index}`}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="card"
                                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-blue-dark)', textDecoration: 'none' }}
                                    >
                                        {getIcon(file.icon)}
                                        <span style={{ fontWeight: '600' }}>{file.name}</span>
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Fallback/Legacy Static Materials */}
                        {hasStaticMaterials && (
                            <>
                                {hasDynamicFiles && <h4 style={{ marginBottom: '1rem', color: 'var(--color-gray-medium)' }}>Material Adicional (Legado)</h4>}
                                <div className="grid grid-2">
                                    {filteredMaterials.map((material, index) => (
                                        <a
                                            key={`static-${index}`}
                                            href={material.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="card"
                                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-blue-dark)', textDecoration: 'none' }}
                                        >
                                            <FaFilePdf size={24} color="var(--color-blue-medium)" />
                                            <span style={{ fontWeight: '600' }}>{material.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.section>
                )}

                {(!hasDynamicFiles && !hasStaticMaterials) && (
                    <motion.div variants={itemVariants} className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-gray-medium)' }}>
                        <p>No hay materiales disponibles para este curso por el momento.</p>
                    </motion.div>
                )}

                {/* Course Specific Events & News */}
                <motion.section variants={itemVariants}>
                    <UnifiedFeed tags={[courseId, turn ? `${courseId}-${turn}` : ''].filter(Boolean)} types={['eventos', 'novedades']} limit={3} />
                </motion.section>

                {filteredTeachers.length > 0 && (
                    <motion.section variants={itemVariants}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaChalkboardTeacher color="var(--color-blue-light)" /> Plantel Docente
                        </h2>
                        <div className="grid grid-3">
                            {filteredTeachers.map((teacher, index) => (
                                <div key={index} className="card" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                                    <strong style={{ display: 'block', color: 'var(--color-blue-medium)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>{teacher.role}</strong>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{teacher.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </motion.div>
    );
}

export default CoursePage;
