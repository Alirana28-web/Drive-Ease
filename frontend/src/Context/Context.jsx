import React, { createContext, useState, useEffect } from 'react';

export const RentContext = createContext();

const ContextProvider = ({ children }) => {
  const [rentDetails, setRentDetails] = useState(JSON.parse(localStorage.getItem('rentDetails')) || []);
  const [totalrent, settotalrent] = useState(JSON.parse(localStorage.getItem('rent')) || 0);
  const [cartotal, setcartotal] = useState(JSON.parse(localStorage.getItem('carsTotal')) || 0);
  const [login ,setlogin] = useState(JSON.parse(localStorage.getItem('login')))

  const pricingData = [
    { category: "Economy", hourlyPrice: 2000, carName: "Suzuki Alto" },
    { category: "Business", hourlyPrice: 5000, carName: "Toyota Corolla" },
    { category: "Luxury", hourlyPrice: 8000, carName: "Honda Civic" },
    { category: "Economy", hourlyPrice: 2500, carName: "Daihatsu Mira" },
    { category: "Business", hourlyPrice: 5500, carName: "Suzuki Swift" },
    { category: "Luxury", hourlyPrice: 9000, carName: "Toyota Prado" },
    { category: "Economy", hourlyPrice: 2200, carName: "Suzuki Wagon R" },
    { category: "Business", hourlyPrice: 4800, carName: "Honda City" },
    { category: "Luxury", hourlyPrice: 8500, carName: "BMW 5 Series" },
    { category: "Economy", hourlyPrice: 2100, carName: "Suzuki Cultus" },
  ];


  useEffect(() => {
    localStorage.setItem('pricingData', JSON.stringify(pricingData));
  }, [pricingData]);

  return (
    <RentContext.Provider value={{ rentDetails, setRentDetails, totalrent, settotalrent, pricingData, cartotal, setcartotal,login ,setlogin }}>
      {children}
    </RentContext.Provider>
  );
};

export default ContextProvider;
