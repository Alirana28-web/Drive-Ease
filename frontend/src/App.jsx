import "./App.css";
import Navbar from "./components/Navbar";
import Context from "./Context/Context";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Carlisting from "./Pages/Carlisting";
import Pricing from "./Pages/Pricing";
import Testimonials from "./Pages/Testimonials";
import Contact from "./Pages/Contact";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RentDetails from "./pages/RentDetails";

import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Admin from "./admin/admin";

function App() {
  
  
  return (
    <Context>
     
      <BrowserRouter>
        <Routes>
          <Route path="/details" element={<RentDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main data-scroll-container>
                  <Home />
                  <About />
                  <Carlisting />
                  <Pricing />
                  <Testimonials />
                  <Contact />
                  <Footer />
                </main>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;