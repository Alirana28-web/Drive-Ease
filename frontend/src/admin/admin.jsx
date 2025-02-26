import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Car, RefreshCcw, X, LogOut, RefreshCw } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { RentContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { BiMoney } from "react-icons/bi";
import { TbHours24 } from "react-icons/tb";

const Admin = () => {
  const navigate = useNavigate();
  const { login, setlogin } = useContext(RentContext);
  const [activeView, setActiveView] = useState("cars");
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
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
            <CarsList data={cars} />
          ) : (
            <UsersList data={data} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

const CarsList = ({ data }) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <BsPerson className="text-indigo-600" size={20} />
                <span className="font-medium">{item.renterName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdEmail className="text-indigo-600" size={20} />
                <span>{item.renterEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BiMoney className="text-indigo-600" size={20} />
                <span>{item.totalRent}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TbHours24 className="text-indigo-600" size={20} />
                <span>{item.totalHours}</span>
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
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  </motion.div>
);

const UsersList = ({ data }) => (
  <motion.div>
    <h3 className="text-xl font-semibold text-indigo-800 mb-4">Registered Users ({data.length})</h3>
    <motion.ul className="space-y-4">
      <AnimatePresence>
        {data.map((user) => (
          <motion.li
            key={user._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <BsPerson className="text-indigo-600" size={20} />
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdEmail className="text-indigo-600" size={20} />
                <span>{user.email}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  </motion.div>
);

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <RefreshCcw size={48} className="text-indigo-500 animate-spin mb-4" />
    <p className="text-indigo-600">Loading data...</p>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center text-red-500 bg-red-50 p-8 rounded-lg">
    <X size={48} className="mx-auto mb-4 text-red-500" />
    <p className="mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default Admin;