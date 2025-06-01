import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Car, LogOut, RefreshCw, CheckCircle, XCircle, HomeIcon, Trash2 } from "lucide-react";
import { MdPhoneAndroid } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { RentContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { BiMoney } from "react-icons/bi";
import { TbHours24 } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage } from "./components/Error";
import { StatusBadge } from "./components/Status";
import { LoadingSpinner } from "./components/Loading";
import { UsersList } from "./components/Userslist";

const Admin = () => {
  const navigate = useNavigate();
  const { login, setlogin } = useContext(RentContext);
  const [activeView, setActiveView] = useState("cars");
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
    
        if (!token || !login || role !== "admin") {
          setlogin(false);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
          return;
        }
    
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchData(); 
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [login, navigate, setlogin]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [carsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/details", {
          withCredentials: true
        }),
        axios.get("http://localhost:5000/signup", {
          withCredentials: true
        })
      ]);
      
      if (carsRes.data && Array.isArray(carsRes.data)) {
        setCars(carsRes.data);
      }
      
      if (usersRes.data && Array.isArray(usersRes.data)) {
        setData(usersRes.data);
      }
      
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        setlogin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const handleLogout = () => {
    setlogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleAccept = async (carId) => {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:5000/details/accept/${carId}`, {}, {
        withCredentials: true
      });
      toast.success("Rental request approved successfully");
      handleRefresh();
    } catch (error) {
      console.error("Error accepting rental:", error);
      toast.error("Failed to approve rental request");
    } finally {
      setIsLoading(false);
    }
  };

  const openRejectionModal = (carId) => {
    setSelectedCarId(carId);
    setRejectionReason("");
    setIsRejectionModalOpen(true);
  };

  const openDeleteModal = (car) => {
    setCarToDelete(car);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!carToDelete || !carToDelete._id) return; 

    try {
        setIsLoading(true);
        await axios.delete(`http://localhost:5000/details/${carToDelete._id}`, {
            withCredentials: true
        });

        toast.success(`${carToDelete.name || "Car"} has been deleted successfully`);
        setIsDeleteModalOpen(false);
        handleRefresh();
    } catch (error) {
        console.error("Error deleting car:", error);
        toast.error("Failed to delete the car");
    } finally {
        setIsLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedCarId) return;
    
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:5000/details/reject/${selectedCarId}`, {
        rejectionReason: rejectionReason
      }, {
        withCredentials: true
      });
      toast.success("Rental request rejected");
      setIsRejectionModalOpen(false);
      handleRefresh();
    } catch (error) {
      console.error("Error rejecting rental:", error);
      toast.error("Failed to reject rental request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ToastContainer />
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full lg:w-64 bg-white shadow-xl p-6 space-y-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800">Admin Panel</h2>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-indigo-100 transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={20} className="text-indigo-600" />
          </button>
        </div>

        {["cars", "users"].map((view) => (
          <motion.button
            key={view}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView(view)}
            className={`w-full flex items-center p-3 rounded-lg transition ${
              activeView === view ? "bg-indigo-500 text-white" : "hover:bg-indigo-100"
            }`}
          >
            {view === "cars" ? (
              <Car className={`mr-2 ${activeView === view ? "text-white" : "text-indigo-600"}`} />
            ) : (
              <BsPerson className={`mr-2 ${activeView === view ? "text-white" : "text-indigo-600"}`} size={20} />
            )}
            {view === "cars" ? "Rented Cars" : "Users"}
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg mt-auto text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="mr-2" size={20} />
          Logout
        </motion.button>
      </motion.div>

      <div className="flex-grow p-4 lg:p-8">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-2xl rounded-2xl p-4 lg:p-8"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRefresh} />
          ) : activeView === "cars" ? (
            <CarsList 
              data={cars} 
              onAccept={handleAccept} 
              onReject={openRejectionModal}
              onDelete={openDeleteModal}
            />
          ) : (
            <UsersList data={data} />
          )}
        </motion.div>
      </div>

      {/* Rejection Modal */}
      <AnimatePresence>
        {isRejectionModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Reject Rental Request</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Reason for rejection:</label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg h-32"
                  placeholder="Please provide a reason for rejecting this rental request..."
                ></textarea>
              </div>
              <div className="flex flex-wrap justify-end space-x-3">
                <button
                  onClick={() => setIsRejectionModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Reject Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-red-600">Delete Car</h3>
              <p className="mb-6">
                Are you sure you want to delete <span className="font-bold">{carToDelete?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex flex-wrap justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CarsList = ({ data, onAccept, onReject, onDelete }) => (
  <motion.div>
    <h3 className="text-xl font-semibold text-indigo-800 mb-4">Rented Cars ({data.length})</h3>
    <motion.ul className="space-y-4">
      <AnimatePresence>
        {data.map((item) => (
          <motion.li
            key={item._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <BsPerson className="text-indigo-600" size={20} />
                <span className="font-medium">{item.renterName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdPhoneAndroid className="text-indigo-600" size={20} />
                <span>{item.renterPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BiMoney className="text-indigo-600" size={20} />
                <span>Rs {item.totalRent}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TbHours24 className="text-indigo-600" size={20} />
                <span>{item.totalHours} hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <HomeIcon className="text-indigo-600" size={20} />
                <span>{item.address} </span>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="text-indigo-600" size={20} />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-indigo-600" size={20} />
                <span>{new Date(item.rentedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <StatusBadge status={item.status} />
              
              <div className="flex flex-wrap gap-2 ml-auto">
                {item.status === "pending" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onAccept(item._id)}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg flex items-center gap-1 hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onReject(item._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg flex items-center gap-1 hover:bg-red-600 transition-colors"
                    >
                      <XCircle size={16} />
                      Reject
                    </motion.button>
                  </>
                )}
                
                {/* Delete button always visible */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(item)}
                  className="px-3 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-1 hover:bg-gray-700 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </motion.button>
              </div>
            </div>

            {item.status === "rejected" && item.rejectionReason && (
              <div className="mt-3 text-sm text-gray-600 bg-red-50 p-2 rounded border border-red-100">
                <span className="font-semibold">Reason for rejection:</span> {item.rejectionReason}
              </div>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  </motion.div>
);

export default Admin;
