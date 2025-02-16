import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUser, FiMessageCircle } from 'react-icons/fi';
import {Link} from 'react-scroll'
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Excellent service and very convenient! The cars were in pristine condition, and the booking process was seamless. I'll definitely be using their service again for my future trips.",
      name: "Kinza Hassan",
      role: "Business Executive",
      rating: 5,
      image: "/api/placeholder/100/100", 
      location: "Lahore"
    },
    {
      quote: "Highly recommend for luxury car rentals. The staff was incredibly professional, and the range of vehicles available exceeded my expectations. A premium experience throughout.",
      name: "Ali Ahmad",
      role: "Travel Enthusiast",
      rating: 4,
      image: "/api/placeholder/100/100", 
      location: "Lahore"
    },
    {
      quote: "Smooth experience with great support. Their 24/7 customer service was exceptional, and the prices were very competitive. Made my vacation truly special.",
      name: "Asad Khan",
      role: "Professional Driver",
      rating: 5,
      image: "/api/placeholder/100/100", 
      location: "Lahore"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FiMessageCircle className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why thousands of customers trust us for their car rental needs
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="text-white w-4 h-4" />
              </div>

              <div className="flex items-center mb-6">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="ml-2 text-gray-600">
                  {testimonial.rating}.0
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <FiUser className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{testimonial.role}</span>
                    <span className="mx-2">•</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-50 rounded-tl-xl rounded-br-2xl -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied customers who trust our service
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
           <Link to='listing'>
           Start Your Journey
           </Link> 
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;