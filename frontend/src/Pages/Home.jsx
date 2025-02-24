import React from "react";
import { 
  FiArrowRight, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiStar,
  FiCheck 
} from "react-icons/fi";
import { 
  BsFillCarFrontFill, 
  BsShieldCheck, 
  BsCreditCard2Back,
  BsSpeedometer 
} from "react-icons/bs";
import Carimg from "/public/Carbg.jpg";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 }
    }
  };

  const features = [
    { 
      icon: <BsFillCarFrontFill className="text-3xl" />, 
      text: "Premium Cars",
      description: "Luxury vehicles for every occasion" 
    },
    { 
      icon: <BsShieldCheck className="text-3xl" />, 
      text: "Full Insurance",
      description: "Complete peace of mind" 
    },
    { 
      icon: <BsCreditCard2Back className="text-3xl" />, 
      text: "Easy Payment",
      description: "Secure and flexible options" 
    }
  ];

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
        className="container mx-auto px-4 py-20 min-h-screen"
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          variants={fadeInUp}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.text}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
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