import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import TradingCourseModules from "./Pages/TradingCourseModules";
import TradingRegistrationForm from "./Pages/WorkShopRegistrationForm";
import ScrollToTop from "./Pages/ScrollToTop";
import AdminDashboard from "./Pages/AdminDashboard";
import ClientPage from "./Pages/ClientPage";
import TradingHeader from "./Pages/TradingHeader";
import PlLinkShowcase from "./Pages/PlLinkShowCase";
import Footer from "./Pages/Footer";
import AnimatedBackground from "./Pages/AnimatedGridBackground";


function Layout({ children }) {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/register';

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className={!hideNavFooter ? 'pt-20' : ''}>
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AnimatedBackground>
      <Layout>
        <Routes>
          <Route path="/" element={<TradingHeader />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/course" element={<TradingCourseModules />} />
          <Route path="/p&lrecords" element={<PlLinkShowcase />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/register" element={<TradingRegistrationForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      </AnimatedBackground>
    </>
  );
}

export default App;
