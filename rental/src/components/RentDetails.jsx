import React, { useState, useContext, useEffect } from "react";
import { RentContext } from "../Context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogOutCircle, BiTimeFive, BiCar, BiDollar, BiTrash } from "react-icons/bi";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import clsx from "clsx";
import dayjs from "dayjs";


const RentDetails = () => {
  const { rentDetails, setRentDetails, totalrent, settotalrent } = useContext(RentContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [renterName, setRenterName] = useState("");  
  const [renterEmail, setRenterEmail] = useState("");  

  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  const calculateRemainingTime = (timestamp) => {
    const now = dayjs();
    const expiration = dayjs(timestamp).add(24, "hours");
    const diff = expiration.diff(now, "second");
    if (diff <= 0) return null;

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = {};
      rentDetails.forEach((car, index) => {
        if (car.rented && car.rentedAt) {
          const remaining = calculateRemainingTime(car.rentedAt);
          if (remaining) {
            updatedTimeLeft[index] = remaining;
          } else {
            handleDelete(index, true);
          }
        }
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [rentDetails]);

  //delete
  const handleDelete = (index, auto = false) => {
    const carToRemove = rentDetails[index];
    const updatedRentDetails = rentDetails.filter((_, i) => i !== index);
    const updatedTotalRent = totalrent - (carToRemove.totalRent || carToRemove.hourlyPrice);

    setRentDetails(updatedRentDetails);
    settotalrent(updatedTotalRent);

    localStorage.setItem('rentDetails', JSON.stringify(updatedRentDetails));
    localStorage.setItem('rent', JSON.stringify(updatedTotalRent));

    if (!auto) {
      toast.success(`${carToRemove.name} removed from rent details!`);
    }
  };


  //proceed
  const handleProceed = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  //confirm rent
 const handleConfirm = async () => {
   
  if (!renterEmail) {
    toast.error("Please enter your email.");
    return;
  }

  if (!renterName) {
    toast.error("Please enter your name.");
    return;
  }

  const calculatedRent = selectedCar.hourlyPrice * selectedHours;

  if (selectedCar.rented) {
    toast.error("This car has already been rented.");
    return;
  }

  const updatedDetails = rentDetails.map((car) =>
    car.name === selectedCar.name
      ? {
          ...car,
          rented: true,
          rentedAt: new Date(),
          hours: selectedHours,
          totalRent: calculatedRent,
        }
      : car
  );

  const rentalData = {
    renterEmail,
    renterName,
    car: {
      name: selectedCar.name,
      hourlyPrice: selectedCar.hourlyPrice,
      description: selectedCar.description,
      imageUrl: selectedCar.imageUrl,
      category: selectedCar.category,
    },
    totalRent: calculatedRent,
    totalHours: selectedHours,
  };
  

  try {
    const response = await fetch("http://localhost:5000/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rentalData),
    });

    if (response.ok) {
      setRentDetails(updatedDetails);
      settotalrent((prevTotal) => prevTotal + calculatedRent);

      localStorage.setItem('rentDetails', JSON.stringify(updatedDetails));
      localStorage.setItem('rent', JSON.stringify(totalrent + calculatedRent));

      toast.success(`${selectedCar.name} rented successfully for Rs ${calculatedRent}! Check your email for confirmation.`);
    } else {
      toast.error("Error renting the car.");
    }
  } catch (error) {
    toast.error("Failed to rent.");
  }

  setIsModalOpen(false);
};

  const handleHoursChange = (event) => {
    setSelectedHours(event.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div id="details" className="bg-gray-100 min-h-screen">
      <ToastContainer />
      <motion.div 
        className="p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <motion.h2 
            className="text-2xl font-bold flex items-center gap-2"
            variants={itemVariants}
          >
            <BiCar className="text-blue-600" /> Rent Details
          </motion.h2>
          <motion.h1 
            className="text-2xl font-bold text-blue-700 mt-4 sm:mt-0 flex items-center gap-2"
            variants={itemVariants}
          >
            <BiDollar /> Total Rent: Rs {totalrent}
          </motion.h1>
          <motion.button 
            onClick={() => navigate("/")}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BiLogOutCircle size={40} className="text-blue-600" />
          </motion.button>
        </div>
     <motion.div  variants={itemVariants} className="mb-5">
      <span className="font-bold">Note : </span><span>Your renting offer will be expired in 24 hours after confirmation</span>
      </motion.div>
        <AnimatePresence>
          {rentDetails && rentDetails.length > 0 ? (
            <motion.ul variants={containerVariants}>
              {rentDetails.map((car, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col sm:flex-row items-center"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center sm:w-1/3">
                    <img src={car.imageUrl} alt={car.name} className="w-full h-30 sm:w-96 px-14 rounded-lg object-cover" />
                  </div>
                  <div className="sm:w-2/3 mt-4 sm:mt-0 sm:ml-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <BiCar className="text-blue-600" /> {car.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{car.description} {car.category}</p>

                    <div className="flex flex-wrap gap-4 mt-4">
                      <p className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                        <BiDollar /> Hourly Rate: Rs {car.hourlyPrice}
                      </p>
                      {car.hours && (
                        <p className="text-lg font-semibold text-green-700 flex items-center gap-2">
                          <FaHourglassHalf /> Hours: {car.hours}
                        </p>
                      )}
                      {car.hours && (
                        <p className="text-lg font-bold text-indigo-700 flex items-center gap-2">
                          <BiDollar /> Total: Rs {car.hourlyPrice * car.hours}
                        </p>
                      )}
                    </div>

                    {car.rented ? "" :<div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={clsx(
                          'bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2',
                          car.rented && 'bg-gray-600'
                        )}
                        onClick={() => handleDelete(i)}
                        disabled={car.rented}
                      >
                        <BiTrash /> Delete
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={clsx(
                          'bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2',
                          car.rented && 'bg-gray-600'
                        )}
                        onClick={() => handleProceed(car)}
                        disabled={car.rented}
                      >
                        {car.rented ? (
                          <FaCheckCircle />
                        ) : (
                          <BiTimeFive />
                        )}
                        Rent Now
                      </motion.button>
                    </div>}
                  </div>
                </motion.div>
              ))}
            </motion.ul>
          ) : (
            <p className="text-center text-lg">No items in your rent details yet!</p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
              >
                <h3 className="text-xl font-semibold text-center">Confirm Rent for {selectedCar?.name}</h3>
                <div className="flex flex-col mt-4 gap-4">
                  <div>
                    <label className="block text-sm">Name</label>
                    <input
                      type="text"
                      value={renterName}
                      placeholder="Ali...."
                      onChange={(e) => setRenterName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      value={renterEmail}
                      placeholder="alimahmood@gmail.com"
                      onChange={(e) => setRenterEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Select Hours</label>
                    <input
                      type="number"
                      value={selectedHours}
                      onChange={handleHoursChange}
                      min="1"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <motion.button
                    className="bg-green-600 text-white p-2 rounded-lg w-full mt-4"
                    onClick={handleConfirm}
                  >
                    Confirm Rent
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RentDetails;
