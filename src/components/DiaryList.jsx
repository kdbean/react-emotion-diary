import "./DiaryList.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import DiaryItem from "./DiaryItem";

/**
 * DiaryList Component
 * - Renders diary entries sorted by creation date
 * - Includes sort type selector and "Write New Diary" button
 *
 * @param {Array} data - List of diary entries
 */
const DiaryList = ({ data }) => {
  const nav = useNavigate(); // Page Navigator for routing

  const [sortType, setSortType] = useState("latest"); // Sorting State: latest / oldest

  // Handle sort type change
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // Return a new array sorted by the selected sort type
  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      {/* Menu-Bar : Sort selector + New diary button */}
      <div className="menu_bar">
        {/* Sorting Type */}
        <select onChange={onChangeSortType}>
          <option value={"latest"}>Latest</option>
          <option value={"oldest"}>Oldest</option>
        </select>

        {/* Navigate to New Diary Page */}
        <Button
          onClick={() => nav(`/new`)}
          text={"Write New Diary"}
          type={"POSITIVE"}
        />
      </div>

      {/* Render sorted diary list */}
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
