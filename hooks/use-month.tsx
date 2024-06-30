import { useState } from "react";

export default function useMonth() {
  // Get current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get next month
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

  // Get previous month
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

  // Formatter for current date to "Month Year"
  const formatToMonthYear = (date: Date) => {
    return date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  // Format current month as "Month Year" e.g. January 2022
  const currentMonth = formatToMonthYear(currentDate);

  // Return
  return { currentMonth, getNextMonth, getPreviousMonth, formatToMonthYear };
}
