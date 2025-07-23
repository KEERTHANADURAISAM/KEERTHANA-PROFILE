import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import About from "./Pages/About";
// import AnimatedBackground from "./Pages/AnimatedGridBackground";
// import Contact from "./Pages/Contact";
// import CourseDetails from "./Pages/CourseDetails";
import Navbar from "./Pages/Navbar";
// import TradingCourseModules from "./Pages/TradingCourseModules";
// import TradingHeader from "./Pages/TradingHeader";
import TradingRegistrationForm from "./Pages/WorkShopRegistrationForm";
import ScrollToTop from "./Pages/ScrollToTop";
import AdminDashboard from "./Pages/AdminDashboard";
import ClientPage from "./Pages/ClientPage";

function App() {
  return (
    <>
 <ScrollToTop />
  <Navbar/>
      <Routes>
        <Route path="/" element={<ClientPage />} /> {/* ✅ Default route is now ClientPage */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<TradingRegistrationForm/>}/>
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
   
 

    </>
  );
}

export default App;
