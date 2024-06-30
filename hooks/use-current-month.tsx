import { useState } from "react";

const useMonth = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonth;
    });
  };

  const getPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonth;
    });
  };

  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return { currentMonth, getNextMonth, getPreviousMonth };
};

export default useMonth;
