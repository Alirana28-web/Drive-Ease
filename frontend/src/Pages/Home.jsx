import React, { useState, useEffect } from "react";
import { 
  FiArrowRight, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiStar,
  FiCheck,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import { 
  BsFillCarFrontFill, 
  BsShieldCheck, 
  BsCreditCard2Back,
  BsSpeedometer,
  BsFuelPump,
  BsGeoAlt,
  BsCalendar4Week
} from "react-icons/bs";
import Carimg from "/public/Carbg.jpg";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  // Feature slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Features
  const featureSlides = [
    {
      title: "Premium Fleet",
      description: "Choose from our extensive collection of luxury vehicles for any occasion",
      icon: <BsFillCarFrontFill className="text-4xl" />,
      bgColor: "from-blue-600 to-blue-800"
    },
    {
      title: "Flexible Rental",
      description: "Daily, weekly, or monthly plans with competitive pricing options",
      icon: <BsCalendar4Week className="text-4xl" />,
      bgColor: "from-purple-600 to-purple-800"
    },
    {
      title: "Nationwide Coverage",
      description: "Pick up and drop off at any of our convenient locations across the country",
      icon: <BsGeoAlt className="text-4xl" />,
      bgColor: "from-green-600 to-green-800"
    },
    {
      title: "Full Insurance",
      description: "Drive with complete peace of mind with our comprehensive insurance coverage",
      icon: <BsShieldCheck className="text-4xl" />,
      bgColor: "from-red-600 to-red-800"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [featureSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featureSlides.length) % featureSlides.length);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 }
    }
  };



  const highlights = [
    "24/7 Customer Support",
    "Free Cancellation",
    "No Hidden Charges",
    "Best Price Guarantee"
  ];

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <motion.div
        id="home"
        className="container mx-auto px-4 py-10 min-h-screen"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
       
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="relative z-10 text-center md:text-left w-full md:w-1/2">
            <motion.div
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-blue-600 font-semibold tracking-wide">
                  PREMIUM CAR RENTAL SERVICE
                </h2>
                <h1 className="text-5xl md:text-6xl font-bold font-lato">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Drive Your Dreams
                  </span>
                  <br />
                  <span className="text-gray-800">Today</span>
                </h1>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Experience luxury and comfort with our premium car rental service. 
                Your journey begins here with our exceptional fleet of vehicles.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center space-x-2"
                  >
                    <FiCheck className="text-green-500" />
                    <span className="text-gray-600">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xl px-8 py-4 rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <Link
                    to="listings"
                    smooth={true}
                    duration={1000}
                    className="flex items-center gap-2"
                  >
                    <span>Explore Cars</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </button>
                <div className="flex items-center space-x-2">
                  <BsSpeedometer className="text-blue-600 text-2xl" />
                  <span className="text-gray-600">Instant Booking</span>
                </div>
              </div>
            </motion.div>
          </div>

    

    {/* Car Image Section */}
          <motion.div
            className="relative w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={Carimg}
                  alt="Luxury Car"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <div className="flex justify-around text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-full">
                        <FiPhone className="text-blue-600" />
                      </div>
                      <span className="font-medium">24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-full">
                        <FiMapPin className="text-blue-600" />
                      </div>
                      <span className="font-medium">Multiple Locations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-full">
                        <FiClock className="text-blue-600" />
                      </div>
                      <span className="font-medium">Instant Booking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Slider Section */}

        <motion.div 
          variants={fadeInUp}
          className="mb-16 relative overflow-hidden rounded-2xl shadow-xl mt-16"
        >
          <div className="relative h-64 md:h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-r ${featureSlides[currentSlide].bgColor} flex items-center p-8 md:p-12`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full">
                  <div className="text-white text-center md:text-left md:max-w-2xl space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">{featureSlides[currentSlide].title}</h2>
                    <p className="text-lg md:text-xl opacity-90">{featureSlides[currentSlide].description}</p>
                  </div>
                  <div className="mt-6 md:mt-0 text-white">
                    {featureSlides[currentSlide].icon}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featureSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
            >
              <FiChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <div className="inline-flex items-center justify-center px-6 py-3 bg-yellow-50 rounded-full">
            <div className="flex items-center gap-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="fill-current" />
              ))}
            </div>
            <span className="ml-3 text-gray-700 font-medium">
              Trusted by thousands of happy customers
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;