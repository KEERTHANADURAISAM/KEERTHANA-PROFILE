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
import Payment from "./Pages/Payment";

function Layout({ children }) {
  const location = useLocation();
  // Fixed the logic - check if current path is in the array of paths to hide navbar/footer
  const hideNavFooter = ['/register', '/admin'].includes(location.pathname);

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
            <Route path="/" element={<ClientPage />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/course" element={<TradingCourseModules />} />
            <Route path="/p&lrecords" element={<PlLinkShowcase />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/register" element={<TradingRegistrationForm />} />
            <Route path="/payment" element={<Payment/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </AnimatedBackground>
    </>
  );
}

export default App;