import React from "react";
import { 
  FiArrowRight, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiStar 
} from "react-icons/fi";
import { 
  BsFillCarFrontFill, 
  BsShieldCheck, 
  BsCreditCard2Back 
} from "react-icons/bs";
import Carimg from "/public/Carbg.jpg";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Home = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeIn" } },
  };

  const features = [
    { icon: <BsFillCarFrontFill className="text-3xl" />, text: "Premium Cars" },
    { icon: <BsShieldCheck className="text-3xl" />, text: "Full Insurance" },
    { icon: <BsCreditCard2Back className="text-3xl" />, text: "Easy Payment" },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 mt-10">
      <motion.div
        id="home"
        className="container mx-auto px-4 py-16 min-h-screen"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="relative z-10 text-center md:text-left w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold font-lato bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-blue-600">
                Drive Your Dreams Today
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl mt-6">
                Experience luxury and comfort with our premium car rental service. 
                Your journey begins here.
              </p>

              <div className="mt-10">
                <button className="group bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl px-8 py-4 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  <Link
                    to="listings"
                    smooth={true}
                    duration={1000}
                    className="flex items-center gap-2"
                  >
                    <span>Explore Cars</span>
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-200" />
                  </Link>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="text-blue-600 mb-2">{feature.icon}</div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <img
                  src={Carimg}
                  alt="Luxury Car"
                  className="w-full h-auto rounded-lg shadow-xl transform group-hover:scale-[1.01] transition-transform duration-300"
                />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex justify-around text-gray-700">
                <div className="flex items-center gap-2">
                  <FiPhone className="text-blue-600" />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-blue-600" />
                  <span className="text-sm">Multiple Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="text-blue-600" />
                  <span className="text-sm">Instant Booking</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
            <FiStar className="fill-current" />
          </div>
          <p className="mt-2 text-gray-600">Trusted by thousands of happy customers</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;