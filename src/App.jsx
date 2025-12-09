import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import Inicial from './pages/Inicial';
import Primario from './pages/Primario';
import Secundario from './pages/Secundario';
import Biblioteca from './pages/Biblioteca';
import ComisionDirectiva from './pages/ComisionDirectiva';
import Estatuto from './pages/Estatuto';
import Talleres from './pages/Talleres';
import WorkshopDetail from './pages/WorkshopDetail';
import EOE from './pages/EOE';
// import Uniformes from './pages/Uniformes'; // Replaced by StorePage
import StorePage from './pages/StorePage';
import Blog from './pages/Blog';
import ArchivoHistorico from './pages/ArchivoHistorico';
import BlogPost from './pages/BlogPost';
import CoursePage from './pages/CoursePage';
import PalabrasLibres from './pages/PalabrasLibres';
import RevistaDigital from './pages/RevistaDigital';

import Historia from './pages/Historia';
import Escuela from './pages/Escuela';
import Institucional from './pages/Institucional';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

// New Pages Phase 2
import Extension from './pages/Extension';
import Bibliomovil from './pages/Bibliomovil';
import Abuelas from './pages/Abuelas';
import Pasantias from './pages/Pasantias';
import Coro from './pages/Coro';
import Radio from './pages/Radio';
import Buffet from './pages/Buffet';
import Alumni from './pages/Alumni';
import Relaciones from './pages/Relaciones';
import ModeloONU from './pages/ModeloONU';
import Ajedrez from './pages/Ajedrez';
import SembrandoCiudadania from './pages/SembrandoCiudadania';
import PortalHome from './pages/Portal/PortalHome';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CartPage from './pages/CartPage';

import ClubLectura from './pages/ClubLectura';
import Ingresos from './pages/Ingresos';
import BookDetail from './pages/BookDetail';
import Asociarse from './pages/Asociarse';
import Servicios from './pages/Servicios';
import Galeria from './pages/Galeria';

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <CartProvider>
                <ScrollToTop />
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/inicial" element={<Layout><Inicial /></Layout>} />
                        <Route path="/primario" element={<Layout><Primario /></Layout>} />
                        <Route path="/secundario" element={<Layout><Secundario /></Layout>} />
                        <Route path="/biblioteca" element={<Layout><Biblioteca /></Layout>} />
                        <Route path="/archivo-historico" element={<Layout><ArchivoHistorico /></Layout>} />
                        <Route path="/autoridades" element={<Layout><ComisionDirectiva /></Layout>} />
                        <Route path="/historia" element={<Layout><Historia /></Layout>} />
                        <Route path="/estatuto" element={<Layout><Estatuto /></Layout>} />
                        <Route path="/institucional" element={<Layout><Institucional /></Layout>} />
                        <Route path="/escuela" element={<Layout><Escuela /></Layout>} />
                        <Route path="/eoe" element={<Layout><EOE /></Layout>} />

                        {/* New Library Routes */}
                        <Route path="/biblioteca/ingresos" element={<Layout><Ingresos /></Layout>} />
                        <Route path="/biblioteca/ingresos/:id" element={<Layout><BookDetail /></Layout>} />
                        <Route path="/asociarse" element={<Layout><Asociarse /></Layout>} />
                        <Route path="/servicios" element={<Layout><Servicios /></Layout>} />

                        {/* New Institucional Routes */}
                        <Route path="/galeria" element={<Layout><Galeria /></Layout>} />

                        {/* Store Routes */}
                        <Route path="/tienda" element={<Layout><StorePage /></Layout>} />
                        <Route path="/uniformes" element={<Layout><StorePage /></Layout>} /> {/* Redirect/Alias */}

                        <Route path="/carrito" element={<Layout><CartPage /></Layout>} />
                        <Route path="/novedades" element={<Layout><Blog /></Layout>} />
                        <Route path="/novedades/:id" element={<Layout><BlogPost /></Layout>} />
                        <Route path="/palabras-libres" element={<Layout><PalabrasLibres /></Layout>} />
                        <Route path="/revista-digital" element={<Layout><RevistaDigital /></Layout>} />
                        <Route path="/:level/:courseId" element={<Layout><CoursePage /></Layout>} />
                        <Route path="/:level/:courseId/:turn" element={<Layout><CoursePage /></Layout>} />

                        {/* New Routes Phase 2 */}
                        <Route path="/extension" element={<Layout><Extension /></Layout>} />
                        <Route path="/bibliomovil" element={<Layout><Bibliomovil /></Layout>} />
                        <Route path="/abuelas" element={<Layout><Abuelas /></Layout>} />
                        <Route path="/pasantias" element={<Layout><Pasantias /></Layout>} />
                        <Route path="/coro" element={<Layout><Coro /></Layout>} />
                        <Route path="/radio" element={<Layout><Radio /></Layout>} />
                        <Route path="/buffet" element={<Layout><Buffet /></Layout>} />
                        <Route path="/alumni" element={<Layout><Alumni /></Layout>} />
                        <Route path="/relaciones" element={<Layout><Relaciones /></Layout>} />
                        <Route path="/modelo-onu" element={<Layout><ModeloONU /></Layout>} />
                        <Route path="/ajedrez" element={<Layout><Ajedrez /></Layout>} />
                        <Route path="/club-lectura" element={<Layout><ClubLectura /></Layout>} />

                        <Route path="/sembrando-ciudadania" element={<Layout><SembrandoCiudadania /></Layout>} />
                        <Route path="/talleres" element={<Layout><Talleres /></Layout>} />
                        <Route path="/talleres/:id" element={<Layout><WorkshopDetail /></Layout>} />

                        {/* Portal Socio */}
                        <Route path="/portal" element={<Layout><PortalHome /></Layout>} />
                        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />

                        <Route path="*" element={<Layout><NotFound /></Layout>} />
                    </Routes>
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
