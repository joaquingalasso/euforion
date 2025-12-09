import { motion } from 'framer-motion';
import { FaBook, FaGavel, FaUsers, FaBuilding, FaBalanceScale } from 'react-icons/fa';

function Estatuto() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const Title = ({ children, icon }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '3rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-blue-light)', paddingBottom: '0.5rem' }}>
            {icon}
            <h2 style={{ margin: 0, color: 'var(--color-blue-dark)', fontSize: '1.8rem' }}>{children}</h2>
        </div>
    );

    const Article = ({ title, children }) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-blue-medium)', marginBottom: '0.5rem' }}>{title}</h3>
            <div style={{ color: 'var(--color-gray-dark)', lineHeight: '1.6' }}>{children}</div>
        </div>
    );

    return (
        <motion.div
            className="container section"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ maxWidth: '900px' }}
        >
            <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Estatuto Social</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-medium)' }}>Biblioteca Popular Euforión</p>
            </motion.div>

            <motion.div variants={itemVariants} className="card" style={{ padding: '3rem' }}>

                <Title icon={<FaBuilding size={24} color="var(--color-blue-light)" />}>TÍTULO I — DENOMINACIÓN, DOMICILIO, OBJETO, CAPACIDAD Y PATRIMONIO</Title>

                <Article title="Artículo 1 — Denominación y Objeto">
                    <p>En la localidad de La Plata, Partido de La Plata, Provincia de Buenos Aires, queda constituida una Asociación de carácter civil denominada <strong>Biblioteca Euforión</strong>, que tendrá por objeto propender al mejoramiento intelectual, cultural y físico de sus asociados y de la comunidad en general.</p>
                    <p>Para ello podrá:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Difundir el libro.</li>
                        <li>Organizar y/o patrocinar jornadas, congresos, charlas, debates y conferencias.</li>
                        <li>Divulgar conquistas y creaciones de la ciencia y el arte.</li>
                        <li>Realizar actos culturales, reuniones y fiestas sociales.</li>
                        <li>Desarrollar la cultura y la educación en todos los niveles.</li>
                        <li>Difundir la cultura física.</li>
                        <li>Publicar boletines, revistas, periódicos, etc.</li>
                        <li>Brindar cursos de capacitación y perfeccionamiento.</li>
                        <li>Promover un ambiente de cordialidad y solidaridad entre los asociados.</li>
                    </ul>
                </Article>

                <Article title="Artículo 2 — Capacidad">
                    <p>La Asociación podrá adquirir bienes muebles e inmuebles, enajenarlos, hipotecarlos, permutarlos y realizar todo acto jurídico necesario para cumplir su objeto.</p>
                </Article>

                <Article title="Artículo 3 — Patrimonio">
                    <p>Constituyen el patrimonio:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>a) Cuotas sociales.</li>
                        <li>b) Bienes actuales y futuros y sus rentas.</li>
                        <li>c) Donaciones, legados y subvenciones.</li>
                        <li>d) Beneficios, festivales y cualquier entrada lícita.</li>
                    </ul>
                </Article>

                <Title icon={<FaUsers size={24} color="var(--color-blue-light)" />}>TÍTULO II — DE LOS ASOCIADOS</Title>

                <Article title="Artículo 4 — Categorías">
                    <p>Habrá seis categorías:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Honorarios</li>
                        <li>Vitalicios</li>
                        <li>Activos</li>
                        <li>Cadetes</li>
                        <li>Protectores</li>
                        <li>Socios de actividades</li>
                    </ul>
                </Article>

                <Article title="Artículo 5 — Socios Honorarios">
                    <p>Designados por Asamblea. No tienen voto ni pueden integrar Comisión Directiva.</p>
                </Article>

                <Article title="Artículo 6 — Socios Vitalicios">
                    <p>Quienes posean <strong>30 años ininterrumpidos como socios activos</strong>. Exentos de cuota mensual y con iguales derechos que los activos.</p>
                </Article>

                <Article title="Artículo 7 — Socios Activos">
                    <p>Requisitos:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>a) Ser mayor de 18 años y tener buenos antecedentes.</li>
                        <li>b) Ser presentado por dos socios activos o vitalicios.</li>
                        <li>c) Abonar cuota de ingreso y la primera mensualidad.</li>
                    </ul>
                    <p>La Comisión Directiva resuelve admisiones y rechazos.</p>
                </Article>

                <Article title="Artículo 8 — Socios Cadetes">
                    <p>Entre 14 y 18 años, con autorización de responsables. Al cumplir 18 pasan automáticamente a activos.</p>
                </Article>

                <Article title="Artículo 9 — Socios de Actividades">
                    <p>Participan en actividades recreativas o educativas. No tienen voto ni pueden integrar Comisión Directiva, pero sí subcomisiones.</p>
                </Article>

                <Article title="Artículo 10 — Socios Protectores">
                    <p>Aportan una cuota superior (≥ 100% de la cuota fijada).</p>
                </Article>

                <Article title="Artículo 11 — Derechos">
                    <p>Incluye:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Beneficios sociales</li>
                        <li>Presentación de proyectos</li>
                        <li>Solicitud de licencia por hasta 6 meses</li>
                        <li>Renuncia por escrito</li>
                    </ul>
                </Article>

                <Article title="Artículo 12 — Altas y Bajas">
                    <p>Se computan desde la fecha de sesión de Comisión Directiva que las aprueba.</p>
                </Article>

                <Article title="Artículo 13 — Obligaciones">
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Cumplir estatuto y reglamentos</li>
                        <li>Abonar cuotas</li>
                        <li>Mantener actualizado domicilio</li>
                    </ul>
                </Article>

                <Article title="Artículo 14 — Mora y Separación">
                    <p>Tres cuotas impagas → intimación → separación si no regulariza.</p>
                    <p>Reingreso automático dentro de un año abonando la deuda.</p>
                </Article>

                <Article title="Artículo 15 — Cesantía y Expulsión">
                    <p>Causas:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Cesantía: incumplimiento del art. 11</li>
                        <li>Expulsión: conducta inmoral, daño a la institución, deshonestidad, etc.</li>
                    </ul>
                </Article>

                <Article title="Artículo 16 — Sanciones">
                    <p>La Comisión Directiva debe notificar fehacientemente al asociado, permitiendo descargo y prueba.</p>
                </Article>

                <Article title="Artículo 17 — Apelación">
                    <p>El socio podrá apelar ante la primera Asamblea, dentro de los 15 días.</p>
                </Article>

                <Title icon={<FaGavel size={24} color="var(--color-blue-light)" />}>TÍTULO III — COMISIÓN DIRECTIVA Y COMISIÓN REVISORA DE CUENTAS</Title>

                <Article title="Artículo 18 — Integración">
                    <p>La Comisión Directiva estará compuesta por:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Presidente</li>
                        <li>Vicepresidente</li>
                        <li>Secretario General</li>
                        <li>Prosecretario</li>
                        <li>Tesorero</li>
                        <li>Protesorero</li>
                        <li>6 Vocales Titulares</li>
                        <li>4 Vocales Suplentes</li>
                    </ul>
                    <p>La Comisión Revisora de Cuentas tendrá 3 titulares y 1 suplente.</p>
                    <p>Mandato: <strong>2 años</strong>.</p>
                </Article>

                <Article title="Artículo 19 — Elección">
                    <p>Elección por lista completa en Asamblea General Ordinaria.</p>
                    <p>La Junta Escrutadora tendrá 3 miembros.</p>
                </Article>

                <Article title="Artículo 20 — Requisitos para integrar CD o CRC">
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Ser activo o vitalicio con 6 meses de antigüedad</li>
                        <li>Ser mayor de edad</li>
                        <li>Estar al día con Tesorería</li>
                        <li>No estar sancionado</li>
                    </ul>
                </Article>

                <Article title="Artículo 21 — Reuniones">
                    <p>La CD se reunirá al menos una vez al mes.</p>
                </Article>

                <Article title="Artículo 22 — Quórum y Resoluciones">
                    <p>Válida con <strong>mitad más uno</strong>.</p>
                    <p>Presidente tiene voto doble en caso de empate.</p>
                </Article>

                <Title icon={<FaBook size={24} color="var(--color-blue-light)" />}>TÍTULO IV — DEBERES Y ATRIBUCIONES</Title>

                <Article title="Artículo 23 — Comisión Directiva">
                    <p>Incluye:</p>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Cumplir estatuto</li>
                        <li>Resolver admisiones y sanciones</li>
                        <li>Ejecutar resoluciones de Asambleas</li>
                        <li>Realizar actos de administración</li>
                        <li>Elevar Memoria y Balance</li>
                        <li>Fijar cuotas</li>
                        <li>Proponer reglamentos internos</li>
                    </ul>
                </Article>

                <Article title="Artículo 24 — Comisión Revisora de Cuentas">
                    <p>Control mensual de libros, inventario, caja, legalidad de actos.</p>
                    <p>Puede convocar Asamblea cuando CD no lo haga.</p>
                </Article>

                <Title icon={<FaUsers size={24} color="var(--color-blue-light)" />}>TÍTULO V — PRESIDENTE Y VICEPRESIDENTE</Title>

                <Article title="Artículo 25 — Atribuciones">
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Presidir Asambleas y sesiones</li>
                        <li>Firmar documentación</li>
                        <li>Autorizar gastos</li>
                        <li>Representar legalmente a la Institución</li>
                    </ul>
                </Article>

                <Title icon={<FaUsers size={24} color="var(--color-blue-light)" />}>TÍTULO VI — SECRETARIO, TESORERO Y VOCALES</Title>

                <Article title="Artículo 26 — Secretario General">
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Redactar actas</li>
                        <li>Firmar documentación</li>
                        <li>Citar a reuniones</li>
                        <li>Llevar libros de actas</li>
                    </ul>
                </Article>

                <Article title="Artículo 27 — Tesorero">
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Llevar registro de asociados y contabilidad</li>
                        <li>Presentar balances</li>
                        <li>Firmar cheques (dos firmas: Presidente/Secretario/Tesorero)</li>
                        <li>Depositar fondos</li>
                        <li>Informar estado económico</li>
                    </ul>
                </Article>

                <Article title="Artículo 28 — Vocales Titulares">
                    <p>Asistir con voz y voto y cumplir tareas asignadas.</p>
                </Article>

                <Article title="Artículo 29 — Vocales Suplentes">
                    <p>Reemplazan titulares según orden de lista.</p>
                </Article>

                <Title icon={<FaGavel size={24} color="var(--color-blue-light)" />}>TÍTULO VII — ASAMBLEAS</Title>

                <Article title="Artículo 30 — Tipos de Asambleas">
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        <li>Ordinarias (anuales)</li>
                        <li>Extraordinarias</li>
                    </ul>
                </Article>

                <Article title="Artículo 31 — Convocatoria Extraordinaria">
                    <p>Puede convocarla CD, CRC o el 10% de los socios.</p>
                </Article>

                <Article title="Artículo 32 — Notificación">
                    <p>Con 20 días de anticipación, por avisos en sede y notas o publicaciones.</p>
                </Article>

                <Article title="Artículo 33 — Quórum">
                    <p>Primera convocatoria: 51% de socios con voto.</p>
                    <p>Segunda: mínimo igual a CD + CRC + 1 (si menos de 100 socios), o 20% (si más de 100).</p>
                </Article>

                <Article title="Artículo 34 — Votación y Representación">
                    <p>Un voto por socio.</p>
                    <p>Puede haber representación por carta poder certificada.</p>
                </Article>

                <Article title="Artículo 35 — Padrón">
                    <p>Disponible 30 días antes. Reclamos hasta 5 días antes.</p>
                </Article>

                <Article title="Artículo 36 — Reconsideraciones">
                    <p>Requiere 2/3 de votos presentes.</p>
                </Article>

                <Title icon={<FaBalanceScale size={24} color="var(--color-blue-light)" />}>TÍTULO VIII — REFORMAS, DISOLUCIÓN Y FUSIÓN</Title>

                <Article title="Artículo 37 — Reformas de Estatuto">
                    <p>Requiere 2/3 de votos en Asamblea convocada al efecto.</p>
                </Article>

                <Article title="Artículo 38 — Disolución">
                    <p>El remanente se destinará a la <strong>Biblioteca Pública de la Universidad Nacional de La Plata</strong>.</p>
                </Article>

                <Article title="Artículo 39 — Fusión">
                    <p>Requiere 2/3 de votos y aprobación de Personas Jurídicas.</p>
                </Article>

                <Article title="Artículo 40 — Disposición Transitoria">
                    <p>Presidente y Secretario podrán aceptar modificaciones formales solicitadas por Personas Jurídicas.</p>
                </Article>

            </motion.div>
        </motion.div>
    );
}

export default Estatuto;
