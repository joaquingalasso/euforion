import Breadcrumbs from './Breadcrumbs';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                <Breadcrumbs />
                {children}
            </main>

            <Footer />
        </div >
    );
}

export default Layout;
