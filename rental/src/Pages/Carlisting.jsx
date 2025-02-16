import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RentContext } from '../Context/Context';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cars } from '../components/Carlistings';
import { 
  FiFilter, 
  FiClock, 
  FiTrash2, 
  FiCheck 
} from 'react-icons/fi';
import { 
  BsFillCarFrontFill, 
  BsFuelPump, 
  BsSpeedometer2 
} from 'react-icons/bs';

const Carlisting = () => {
  const { rentDetails, setRentDetails, totalrent, settotalrent, setcartotal , login } = useContext(RentContext);
  const [filteredCars, setFilteredCars] = useState(Cars);
  const [isFilter, setIsFilter] = useState(false);
  const [filterId, setFilterId] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  useEffect(() => {
    const savedRentDetails = JSON.parse(localStorage.getItem('rentDetails')) || [];
    setRentDetails(savedRentDetails);
    const totalRent = savedRentDetails.reduce((acc, car) => acc + car.hourlyPrice, 0);
    settotalrent(totalRent);
    const carTotal = savedRentDetails.length;
    setcartotal(carTotal);
  }, [setRentDetails, settotalrent, setcartotal]);

  const applyFilter = (minPrice, maxPrice) => {
    const filtered = Cars.filter(car => car.hourlyPrice >= minPrice && car.hourlyPrice <= maxPrice);
    setFilteredCars(filtered);
    setIsFilter(true);
    toast.success('Filter applied successfully', {
      icon: <FiCheck className="text-green-500" />
    });
  };

  const clearFilter = () => {
    setFilteredCars(Cars);
    setIsFilter(false);
    setFilterId('all');
    toast.info('Filters cleared', {
      icon: <FiTrash2 className="text-blue-500" />
    });
  };

  const handleRentNow = (car) => {
    if(login){

      const updatedRentDetails = [...rentDetails, car];
      const updatedTotalRent = totalrent + car.hourlyPrice;
      
      setRentDetails(updatedRentDetails);
      setcartotal(updatedRentDetails.length);
      
      localStorage.setItem('rentDetails', JSON.stringify(updatedRentDetails));
      localStorage.setItem('totalrent', JSON.stringify(updatedTotalRent));
      localStorage.setItem('carsTotal', JSON.stringify(updatedRentDetails.length));
      
      toast.success(`${car.name} added to rent details`, {
        autoClose: 3000,
      });
    }
    else{
      window.location.href = "/login"
      toast.info("Login first to rent")
    }
      
  }

  const handleFilter = (id) => {
    setFilterId(id);
    if (id === 'range1') {
      applyFilter(0, 5000);
    } else if (id === 'range2') {
      applyFilter(5000, 10000);
    }
  };

  return (
    <div id="listings" className="bg-gray-50 min-h-screen">
  
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <FiFilter className="text-xl" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <motion.div
            className={`md:w-1/4 bg-white rounded-2xl shadow-lg p-6 ${
              isFilterOpen ? 'fixed inset-0 z-40 md:relative' : 'hidden md:block'
            }`}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FiFilter className="text-blue-600" />
                Filters
              </h2>
              <button
                className="md:hidden text-gray-500"
                onClick={() => setIsFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Price Range</h3>
                <div className="space-y-4">
                  {[
                    { id: 'range1', label: 'Rs 1,000 - 5,000' },
                    { id: 'range2', label: 'Rs 5,000 - 10,000'}
                  ].map((range) => (
                    <label
                      key={range.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                        filterId === range.id
                          ? 'bg-blue-50 border-blue-500 border'
                          : 'bg-white border border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="price-range"
                        className="hidden"
                        checked={filterId === range.id}
                        onChange={() => handleFilter(range.id)}
                      />
                      <span className="flex items-center gap-2 text-gray-700">
                        {range.icon}
                        {range.label}
                      </span>
                      {filterId === range.id && (
                        <FiCheck className="ml-auto text-blue-500" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                onClick={clearFilter}
              >
                <FiTrash2 />
                Clear Filters
              </button>
            </div>
          </motion.div>

          <div className="md:w-3/4">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center"
              {...fadeInUp}
              >
              Available Cars
            </motion.h1>
              <p>*You can only select 3 cars at a time</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={car.imageUrl}
                      alt={car.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                      <div className="flex items-center gap-1">
                        <FiClock className="text-blue-600" />
                        <span className="text-sm font-semibold">Hourly</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{car.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BsFuelPump />
                        <span className="text-sm">Petrol</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <BsSpeedometer2 />
                        <span className="text-sm">Auto</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-gray-800">
                          Rs{car.hourlyPrice}
                        </span>
                        <span className="text-gray-500 text-sm">/hr</span>
                      </div>

                      <button
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                          rentDetails.length === 3
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        onClick={() => handleRentNow(car)}
                        disabled={rentDetails.length === 3}
                      >
                        <BsFillCarFrontFill />
                        Rent Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carlisting;