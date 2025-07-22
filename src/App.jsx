import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./Pages/About";
import AnimatedBackground from "./Pages/AnimatedGridBackground";
import Contact from "./Pages/Contact";
import CourseDetails from "./Pages/CourseDetails";
import Navbar from "./Pages/Navbar";
import TradingCourseModules from "./Pages/TradingCourseModules";
import TradingHeader from "./Pages/TradingHeader";
import TradingRegistrationForm from "./Pages/WorkShopRegistrationForm";

function App() {
  return (
 
      <AnimatedBackground>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TradingHeader />
                <About />
                <TradingCourseModules />
                {/* <Contact /> */}
              </>
            }
          />
          <Route path="/register" element={<TradingRegistrationForm />} />
        </Routes>
      </AnimatedBackground>
    
  );
}

export default App;
