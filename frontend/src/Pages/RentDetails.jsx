import React, { useContext, useState, useEffect } from "react";
import { RentContext } from "../Context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogOutCircle, BiTimeFive, BiCar, BiDollar, BiTrash } from "react-icons/bi";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRentTimer } from '../RentHooks/useRentTimer';
import { useRentManagement } from '../RentHooks/useRentManagement';

const RentDetails = () => {
  const { rentDetails, setRentDetails, totalrent, settotalrent } = useContext(RentContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    isModalOpen,
    selectedCar,
    selectedHours,
    setSelectedHours,
    renterName,
    address,
    setaddress,
    setRenterName,
    renterPhone,
    setrenterPhone,
    handleDelete,
    handleProceed,
    handleConfirm,
  } = useRentManagement(rentDetails, setRentDetails, totalrent, settotalrent);

  const timeLeft = useRentTimer(rentDetails, handleDelete) || [];

  // Fetch rent details from backend
  useEffect(() => {
    const fetchRentDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5173/details'); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch rent details');
        }
        
        const data = await response.json();
        setRentDetails(data);
        
        // Calculate total rent
        const total = data.reduce((sum, car) => {
          return sum + (car.hourlyPrice * (car.hours || 0));
        }, 0);
        
        settotalrent(total);
      } catch (error) {
        console.error('Error fetching rent details:', error);
        // toast.error('Failed to load rent details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRentDetails();
  }, [setRentDetails, settotalrent]);

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
          <span>Your renting request will be pending until approved by an administrator. Once approved, your rental will be valid for 24 hours.</span>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg">Loading rent details...</p>
          </div>
        ) : (
          <AnimatePresence>
            {rentDetails && rentDetails.length > 0 ? (
              <RentList 
                rentDetails={rentDetails}
                handleDelete={handleDelete}
                handleProceed={handleProceed}
                timeLeft={timeLeft}
                itemVariants={itemVariants}
                containerVariants={containerVariants}
                setRentDetails={setRentDetails}
              />
            ) : (
              <p className="text-center text-lg">No items in your rent details yet!</p>
            )}
          </AnimatePresence>
        )}

        <RentModal 
          isOpen={isModalOpen}
          selectedCar={selectedCar}
          address={address}
          setaddress={setaddress}
          selectedHours={selectedHours}
          setSelectedHours={setSelectedHours}
          renterName={renterName}
          setRenterName={setRenterName}
          renterPhone={renterPhone}
          setrenterPhone={setrenterPhone}
          handleConfirm={handleConfirm}
        />
      </motion.div>
    </div>
  );
};

const RentList = ({ rentDetails, handleDelete, handleProceed, timeLeft, itemVariants, containerVariants, setRentDetails }) => (
  <motion.ul variants={containerVariants}>
    {rentDetails.map((car, i) => (
      <RentItem 
        key={car._id || i}
        car={car}
        index={i}
        handleDelete={handleDelete}
        handleProceed={handleProceed}
        timeRemaining={timeLeft[i] || { hours: 0, minutes: 0, seconds: 0 }}
        itemVariants={itemVariants}
        setRentDetails={setRentDetails}
      />
    ))}
  </motion.ul>
);

const StatusBadge = ({ status }) => {
  switch (status) {
    case "approved":
      return (
        <div className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-full">
          <FaCheckCircle />
          <span>Approved</span>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-center gap-1 text-red-600 bg-red-100 px-3 py-1 rounded-full">
          <FaTimesCircle />
          <span>Rejected</span>
        </div>
      );
    case "pending":
    default:
      return (
        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          <MdPending />
          <span>Pending</span>
        </div>
      );
  }
};

const RentItem = ({ car, index, handleDelete, handleProceed, timeRemaining, itemVariants, setRentDetails }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const showTimer = car.rented && car.status === "approved" && timeRemaining;
  const showRentActions = !car.rented;
  const isPending = car.rented && car.status === "pending";

  const handleApproveReject = async (action) => {
      try {
        setIsUpdating(true);
  
        const response = await fetch(`http://localhost:5173/details/${action}/${car._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(action === "reject" ? { 
            rejectionReason: "Administrator rejected this request" 
          } : {}),
        });
      
        if (!response.ok) {
          throw new Error(`Failed to ${action} car rental`);
        }
      
        // Extract the updated car from the response
        const responseData = await response.json();
        const updatedCar = responseData.data;
      
        // Fetch the updated rent details from the backend to ensure consistency
        const updatedRentDetailsResponse = await fetch('http://localhost:5173/details');
        const updatedRentDetails = await updatedRentDetailsResponse.json();
        setRentDetails(updatedRentDetails);
      
        toast.success(responseData.message || `Car rental request ${action === "accept" ? "approved" : "rejected"} successfully`);
      } catch (error) {
        console.error(`Error ${action}ing car rental:`, error);
        toast.error(`Failed to ${action} car rental request`);
      } finally {
        setIsUpdating(false);
      }
    };

  return (
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
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <BiCar className="text-blue-600" /> {car.name}
          </h3>
          {car.rented ? (
            <StatusBadge status={car.status} />
          ) : (
            <StatusBadge status="pending" />
          )}
        </div>
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

        {car.status === "rejected" && car.rejectionReason && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm">
            <span className="font-semibold">Reason for rejection:</span> {car.rejectionReason}
          </div>
        )}

        {isPending && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
            <span className="font-semibold">Status:</span> Your rental request is pending approval
          </div>
        )}

        {showTimer && (
          <div className="mt-4 text-sm text-gray-600">
            Time remaining: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2"
            onClick={() => handleDelete(index)}
            disabled={isUpdating}
          >
            <BiTrash /> Delete
          </motion.button>
          
          {showRentActions && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2"
              onClick={() => handleProceed(car)}
              disabled={isUpdating}
            >
              <BiTimeFive /> Request Rental
            </motion.button>
          )}
          
          {car.rented && car.status === "pending" && (
  <div className="flex mt-4 sm:mt-0 sm:ml-4">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 mr-2 flex items-center gap-2 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => handleApproveReject("accept")}
      disabled={isUpdating}
    >
      <FaCheckCircle /> Approve
    </motion.button>
    
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500 flex items-center gap-2 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => handleApproveReject("reject")}
      disabled={isUpdating}
    >
      <FaTimesCircle /> Reject
    </motion.button>
  </div>
)}

        </div>
      </div>
    </motion.div>
  );
};

const RentModal = ({
  isOpen,
  address,
  setaddress,
  selectedCar,
  selectedHours,
  setSelectedHours,
  renterName,
  setRenterName,
  renterPhone,
  setrenterPhone,
  handleConfirm
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50"
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
          <h3 className="text-xl font-semibold text-center">Request Rental for {selectedCar?.name}</h3>
          <p className="text-center text-sm text-gray-600 mt-1">
            Your request will need approval before the rental is confirmed
          </p>
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
              <label className="block text-sm">Phone</label>
              <input
                type="tel"
                value={renterPhone}
                placeholder="+92 318-2321921"
                onChange={(e) => setrenterPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm">Address</label>
              <input
                type="text"
                value={address}
                placeholder="123 park city ,lahore"
                onChange={(e) => setaddress(e.target.value)}
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
              Submit Request
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default RentDetails;