import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRentTimer } from './useRentTimer';

export const useRentManagement = (rentDetails, setRentDetails, totalrent, settotalrent) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");
  
  
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

  const timeLeft = useRentTimer(rentDetails, handleDelete);
  
  const handleProceed = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

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

  return {
    isModalOpen,
    setIsModalOpen,
    selectedCar,
    selectedHours,
    setSelectedHours,
    renterName,
    setRenterName,
    renterEmail,
    setRenterEmail,
    handleDelete,
    handleProceed,
    handleConfirm
  };
};