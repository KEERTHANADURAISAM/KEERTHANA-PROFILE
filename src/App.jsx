import About from "./Pages/About"
import AnimatedBackground from "./Pages/AnimatedGridBackground"
import Contact from "./Pages/Contact"
import CourseDetails from "./Pages/CourseDetails"
import Navbar from "./Pages/Navbar"
import TradingCourseModules from "./Pages/TradingCourseModules"
import TradingHeader from "./Pages/TradingHeader"
import TradingHomePage from "./Pages/TradingHomePage"
import WorkshopRegistrationForm from "./Pages/WorkShopRegistrationForm"


function App() {


  return (
  
 <AnimatedBackground>
  <Navbar/>
  <TradingHeader/>
  <About/>
  <TradingCourseModules/>
  {/* <CourseDetails/> */}
  <Contact/>
  {/* <TradingHomePage/> */}
  </AnimatedBackground>
  )
}

export default App
