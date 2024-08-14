import React from 'react';

const CurrentQuarterDate = () => {
  const currentDate = new Date();
  const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);
  let startDate, endDate;

  switch (currentQuarter) {
    case 1:
      startDate = new Date(currentDate.getFullYear(), 0, 1);
      endDate = new Date(currentDate.getFullYear(), 2, 31);
      break;
    case 2:
      startDate = new Date(currentDate.getFullYear(), 3, 1);
      endDate = new Date(currentDate.getFullYear(), 5, 30);
      break;
    case 3:
      startDate = new Date(currentDate.getFullYear(), 6, 1);
      endDate = new Date(currentDate.getFullYear(), 8, 30);
      break;
    case 4:
      startDate = new Date(currentDate.getFullYear(), 9, 1);
      endDate = new Date(currentDate.getFullYear(), 11, 31);
      break;
  }

  const startDateString = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
  const endDateString = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
  const currentQuarterDateRange = `${startDateString} - ${endDateString}`;

  return currentQuarterDateRange;
};

export default CurrentQuarterDate;

export const currentQuarterDateRange = CurrentQuarterDate(); // Export the value of currentQuarterDateRange