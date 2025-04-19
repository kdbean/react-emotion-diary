import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

/**
 * Filters diary entries based on the selected month
 *
 * @param {Date} pivotDate - The reference date (used to determine the month)
 * @param {Array} data - All diary entries
 * @returns {Array} Filtered diary entries within the same month as pivotDate
 */
const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

/**
 * Home Page Component
 * - Displays a list of diary entries for the selected month
 * - Allows navigation to previous/next months
 * - Uses Context to read global diary state
 */
const Home = () => {
  const data = useContext(DiaryStateContext); // Global diary entry list

  const [pivotDate, setPivotDate] = useState(new Date()); // Current target month

  const monthlyData = getMonthlyData(pivotDate, data); // Filtered list by month
  console.log(monthlyData);

  /**
   * Go to the next month
   */
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  /**
   * Go to the previous month
   */
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      {/* Header with title, month navigation buttons */}
      <Header
        //# UPDATE START 2025-04-19 : change header date format to 'MMMM yyyy'
        //title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        title={`${pivotDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}`}
        //# UPDATE END 2025-04-19 : change header date format to 'MMMM yyyy'

        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />

      {/* Render diary list filtered by current month */}
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
