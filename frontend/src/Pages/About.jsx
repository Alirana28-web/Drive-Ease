import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCar, FaHistory } from 'react-icons/fa';

const About = () => {
  const cards = [
    {
      id: 1,
      icon: <FaCar size={40} className="text-blue-500" />,
      title: "Reliable Car Rentals",
      description: "We offer a wide range of vehicles to suit your needs, whether you're traveling for business or leisure.",
      stats: "10+ Cars"
    },
    {
      id: 2,
      icon: <FaHistory size={40} className="text-green-500" />,
      title: "Trusted Past Services",
      description: "Over the years, we've served hundreds of satisfied customers with a focus on reliability.",
      stats: "1.5 Years"
    },
    {
      id: 3,
      icon: <FaRocket size={40} className="text-yellow-500" />,
      title: "Fast and Easy Process",
      description: "Experience a hassle-free rental process with quick approvals and user-friendly platforms.",
      stats: "15min Average"
    }
  ];

  return (
    <motion.div
      id="about"
      className="bg-gradient-to-b from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="min-h-screen p-6 sm:p-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to our premier car rental service. We're dedicated to making your journey seamless and enjoyable with our extensive fleet and exceptional service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-6 p-4 rounded-full bg-gray-50">
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <div className="mt-auto">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium">
                  {card.stats}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default About;