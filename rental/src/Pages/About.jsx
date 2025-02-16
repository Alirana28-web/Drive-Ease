import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCar, FaHistory } from 'react-icons/fa';

const About = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cards = [
    {
      id: 1,
      icon: <FaCar size={40} className="text-blue-500" />,
      title: "Reliable Car Rentals",
      description:
        "We offer a wide range of vehicles to suit your needs, whether you're traveling for business or leisure. Enjoy competitive pricing and seamless booking options.",
    },
    {
      id: 2,
      icon: <FaHistory size={40} className="text-green-500" />,
      title: "Trusted Past Services",
      description:
        "Over the years, we've served hundreds of satisfied customers, providing top-notch car rental services with a focus on reliability and customer satisfaction.",
    },
    {
      id: 3,
      icon: <FaRocket size={40} className="text-yellow-500" />,
      title: "Fast and Easy Process",
      description:
        "Experience a hassle-free rental process with quick approvals and user-friendly platforms that save you time and effort.",
    },
  ];

  return (
    <motion.div
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={animationVariants}
    >
      <section className="min-h-screen bg-gray-100 p-6 sm:p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Welcome to our website! We specialize in providing reliable car rental services and have a proven track record of customer satisfaction. Discover how we can make your journey easier and more enjoyable.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default About;
