import React, { useContext } from "react";
import { RentContext } from "../Context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogOutCircle, BiTimeFive, BiCar, BiDollar, BiTrash } from "react-icons/bi";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRentTimer } from '../Hooks/useRentTimer';
import { useRentManagement } from '../Hooks/useRentManagement';

const RentDetails = () => {
  const { rentDetails, setRentDetails, totalrent, settotalrent } = useContext(RentContext);
  const navigate = useNavigate();

  const {
    isModalOpen,
    selectedCar,
    selectedHours,
    setSelectedHours,
    renterName,
    setRenterName,
    renterEmail,
    setRenterEmail,
    handleDelete,
    handleProceed,
    handleConfirm,
  } = useRentManagement(rentDetails, setRentDetails, totalrent, settotalrent);

  const timeLeft = useRentTimer(rentDetails, handleDelete);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
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
          <motion.h2 variants={itemVariants} className="text-2xl font-bold flex items-center gap-2">
            <BiCar className="text-blue-600" /> Rent Details
          </motion.h2>
          <motion.h1 variants={itemVariants} className="text-2xl font-bold text-blue-700 mt-4 sm:mt-0 flex items-center gap-2">
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

        <motion.div variants={itemVariants} className="mb-5">
          <span className="font-bold">Note : </span>
          <span>Your renting offer will be expired in 24 hours after confirmation</span>
        </motion.div>

        <AnimatePresence>
          {rentDetails && rentDetails.length > 0 ? (
            <RentList 
              rentDetails={rentDetails}
              handleDelete={handleDelete}
              handleProceed={handleProceed}
              timeLeft={timeLeft}
              itemVariants={itemVariants}
              containerVariants={containerVariants}
            />
          ) : (
            <p className="text-center text-lg">No items in your rent details yet!</p>
          )}
        </AnimatePresence>

        <RentModal 
          isOpen={isModalOpen}
          selectedCar={selectedCar}
          selectedHours={selectedHours}
          setSelectedHours={setSelectedHours}
          renterName={renterName}
          setRenterName={setRenterName}
          renterEmail={renterEmail}
          setRenterEmail={setRenterEmail}
          handleConfirm={handleConfirm}
        />
      </motion.div>
    </div>
  );
};

const RentList = ({ rentDetails, handleDelete, handleProceed, timeLeft, itemVariants, containerVariants }) => (
  <motion.ul variants={containerVariants}>
    {rentDetails.map((car, i) => (
      <RentItem 
        key={i}
        car={car}
        index={i}
        handleDelete={handleDelete}
        handleProceed={handleProceed}
        timeRemaining={timeLeft[i]}
        itemVariants={itemVariants}
      />
    ))}
  </motion.ul>
);

const RentItem = ({ car, index, handleDelete, handleProceed, timeRemaining, itemVariants }) => (
  <motion.div
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
          <>
            <p className="text-lg font-semibold text-green-700 flex items-center gap-2">
              <FaHourglassHalf /> Hours: {car.hours}
            </p>
            <p className="text-lg font-bold text-indigo-700 flex items-center gap-2">
              <BiDollar /> Total: Rs {car.hourlyPrice * car.hours}
            </p>
          </>
        )}
      </div>

      {car.rented && timeRemaining && (
        <div className="mt-4 text-sm text-gray-600">
          Time remaining: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
        </div>
      )}

      {!car.rented && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2"
            onClick={() => handleDelete(index)}
          >
            <BiTrash /> Delete
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2"
            onClick={() => handleProceed(car)}
          >
            <BiTimeFive /> Rent Now
          </motion.button>
        </div>
      )}
    </div>
  </motion.div>
);

const RentModal = ({
  isOpen,
  selectedCar,
  selectedHours,
  setSelectedHours,
  renterName,
  setRenterName,
  renterEmail,
  setRenterEmail,
  handleConfirm
}) => (
  <AnimatePresence>
    {isOpen && (
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
                onChange={(e) => setSelectedHours(e.target.value)}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <motion.button
              className="bg-green-600 text-white p-2 rounded-lg w-full mt-4 hover:bg-green-500"
              onClick={handleConfirm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Confirm Rent
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default RentDetails;