import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const useRentTimer = (rentDetails, handleDelete) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateRemainingTime = (startTime, rentalDuration) => {
    const now = dayjs();
    const expiration = dayjs(startTime).add(rentalDuration, "hour");
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
        if (car.rented && car.rentedAt && car.totalHours) {
          const remaining = calculateRemainingTime(car.rentedAt, car.totalHours); 
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
  }, [rentDetails, handleDelete]);

  return timeLeft;
};
