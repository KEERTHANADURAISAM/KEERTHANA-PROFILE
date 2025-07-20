import About from "./Pages/About"
import AnimatedBackground from "./Pages/AnimatedGridBackground"
import Navbar from "./Pages/Navbar"
import TradingHeader from "./Pages/TradingHeader"
import TradingHomePage from "./Pages/TradingHomePage"
import WorkshopRegistrationForm from "./Pages/WorkShopRegistrationForm"


function App() {


  return (
  
 <AnimatedBackground>
  <Navbar/>
  <TradingHeader/>
  <About/>
  {/* <TradingHomePage/> */}
  </AnimatedBackground>
  )
}

export default App
