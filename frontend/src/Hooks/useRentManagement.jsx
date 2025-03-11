import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const useRentManagement = (initialRentDetails, setRentDetails, totalrent, settotalrent) => {
  const [address, setaddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");

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
      if (car.rented && car.hours) {
        newTotal += car.hourlyPrice * car.hours;
      }
    });
    settotalrent(newTotal);
    localStorage.setItem("totalrent", JSON.stringify(newTotal));
  };

  useEffect(() => {
    if (initialRentDetails !== initialRentDetailsRef.current) {
        initialRentDetailsRef.current = initialRentDetails;
    }
    const details = loadRentDetails();
    calculateTotalRent(details);
  }, [initialRentDetails]);

  //delete
  const handleDelete = (index) => {
    const details = loadRentDetails();
    const deletedCar = details[index];
    const deletedCarPrice = deletedCar.hourlyPrice * (deletedCar.hours || 0);

    const updatedDetails = details.filter((_, i) => i !== index);
    setRentDetails(updatedDetails);
    saveRentDetails(updatedDetails);
    calculateTotalRent(updatedDetails);
    
    toast.success("Item removed successfully!");
  };

  //proceed
  const handleProceed = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  //confirm
  const handleConfirm = async () => {
    if (!renterName || !renterEmail || !selectedHours) {
      toast.error("Please fill all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(renterEmail)) {
      toast.error("Please enter a valid email");
      return;
    }

    const hours = Number(selectedHours);
    const calculatedRent = selectedCar.hourlyPrice * hours;

    const rentalData = {
      car: selectedCar,
      renterEmail,
      renterName,
      address,
      totalRent: calculatedRent,
      totalHours: hours,
    };

    try {
      const response = await fetch("http://localhost:5000/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalData),
      });

      if (response.status === 201) {
        const details = loadRentDetails();
        const updatedDetails = details.map((item) =>
          item._id === selectedCar._id ? { ...item, rented: true, hours } : item
        );

        setRentDetails(updatedDetails);
        saveRentDetails(updatedDetails);
        calculateTotalRent(updatedDetails);

        setIsModalOpen(false);
        toast.success("Rental request submitted successfully!");
      } else {
        toast.error("Failed to submit rental request.");
      }
    } catch (error) {
      console.error("Error submitting rental request:", error);
      toast.error("Failed to submit rental request.");
    }
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
    renterEmail,
    setRenterEmail,
    handleDelete,
    handleProceed,
    handleConfirm,
    setIsModalOpen,
  };
};