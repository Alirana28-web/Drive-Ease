import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const useRentManagement = (initialRentDetails, setRentDetails, totalrent, settotalrent) => {
  const [address, setaddress] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [renterName, setRenterName] = useState("");
  const [renterPhone, setrenterPhone] = useState("");
  const [timers, setTimers] = useState({}); // Store timers for approved rentals

  const initialRentDetailsRef = useRef(initialRentDetails);

  const loadRentDetails = () => {
    const storedDetails = localStorage.getItem("rentDetails");
    return storedDetails ? JSON.parse(storedDetails) : initialRentDetailsRef.current;
  };

  const saveRentDetails = (details) => {
    localStorage.setItem("rentDetails", JSON.stringify(details));
  };

  const calculateTotalRent = (details) => {
    let newTotal = 0;
    details.forEach((car) => {
      if (car.status === "Approved" && car.totalRent) {  
        newTotal += car.totalRent;
      }
    });
    settotalrent(newTotal);
    localStorage.setItem("totalrent", JSON.stringify(newTotal));
  };

  useEffect(() => {
    if (initialRentDetails !== initialRentDetailsRef.current) {
      initialRentDetailsRef.current = initialRentDetails;
    }
    fetchRentalStatus(); // Fetch latest rental status on load
  }, [initialRentDetails]);

  // Fetch rental status & start timer 
  const fetchRentalStatus = async () => {
    try {
      const response = await fetch("http://localhost:5000/details");
      if (!response.ok) throw new Error("Failed to fetch rental status");
  
      const updatedDetails = await response.json();
  
      const processedDetails = updatedDetails.map((car) => {
        if (car.status === "Approved" && car.startTime) {
          const totalRent = car.hourlyPrice * car.totalHours;
          car.totalRent = totalRent;
          startCountdown(car._id, car.startTime, car.totalHours);
        }
        return {
          ...car,
          image: car.image || "default-car-image.jpg",
        };
      });
  
      setRentDetails(processedDetails);
      saveRentDetails(processedDetails);
      calculateTotalRent(processedDetails);
    } catch (error) {
      console.error("Error fetching rental status:", error);
    }
  };
  
  // Start countdown for rented car
  const startCountdown = (carId, startTime, totalHours) => {
      const endTime = new Date(startTime).getTime() + totalHours * 60 * 60 * 1000;
  
    const updateTimer = () => {
      const timeLeft = endTime - new Date().getTime();
      if (timeLeft <= 0) {
        setTimers((prev) => ({ ...prev, [carId]: "Time expired" }));
        return;
      }
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      setTimers((prev) => ({ ...prev, [carId]: `${hours}h ${minutes}m left` }));
      setTimeout(updateTimer, 60000); 
    };
  
    updateTimer();
  };

  // Delete rental request
  const handleDelete = (index) => {
    const details = loadRentDetails();
    const updatedDetails = details.filter((_, i) => i !== index);
    setRentDetails(updatedDetails);
    saveRentDetails(updatedDetails);
    calculateTotalRent(updatedDetails);
    
    toast.success("Item removed successfully!");

    localStorage.setItem("rentDetails", JSON.stringify(updatedDetails));
  };

  // Proceed to rent a car
  const handleProceed = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Confirm rental request
  const handleConfirm = async () => {
    if (!renterName || !renterPhone || !selectedHours) {
      toast.error("Please fill all fields");
      return;
    }
  
    if (!/^\+92\s\d{3}-\d{7}$/.test(renterPhone)) {
      toast.error("Please enter a valid phone number (e.g., +92 318-2321921)");
      return;
    }
  
    const hours = Number(selectedHours);
    const calculatedRent = selectedCar.hourlyPrice * hours;
  
    const rentalData = {
      car: selectedCar,
      renterPhone,
      renterName,
      address,
      totalRent: calculatedRent,
      totalHours: hours,
      status: "Pending",
    };
  
    try {
      const response = await fetch("http://localhost:5000/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalData),
      });
  
      if (response.status === 201) {
        startCountdown(selectedCar._id, hours);  
        fetchRentalStatus(); // Fetch latest status after submission
        setIsModalOpen(false);
        toast.success("Rental request submitted! Status: Pending");
      } else {
        toast.error("Failed to submit rental request.");
      }
    } catch (error) {
      console.error("Error submitting rental request:", error);
      toast.error("Failed to submit rental request.");
    }
  };
  

  // Check if delete button should be shown
  const shouldShowDeleteButton = (status) => {
    return status !== "Approved";
  };

  return {
    isModalOpen,
    selectedCar,
    selectedHours,
    setSelectedHours,
    address,
    setaddress,
    renterName,
    setRenterName,
    renterPhone,
    setrenterPhone,
    handleDelete,
    handleProceed,
    handleConfirm,
    setIsModalOpen,
    fetchRentalStatus,
    timers, // Expose timer state for frontend
    shouldShowDeleteButton, // For frontend use to hide delete button
    totalrent, // Expose total rent for frontend
  };
};
