import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

/**
 * @hook useDiary
 * Custom hook to retrieve a single diary entry by ID.
 *
 * - Looks up the diary item from the global context (DiaryStateContext).
 * - If not found, shows an alert and navigates back to the home page.
 * - Returns the matched diary item for use in edit or view components.
 *
 * @param {string|number} id - ID of the diary entry to retrieve
 * @returns {Object|undefined} curDiaryItem - The matched diary item, or undefined if not found
 */
const useDiary = (id) => {
  const data = useContext(DiaryStateContext); // Global diary list from context
  const [curDiaryItem, setCurDiaryItem] = useState(); // Local state to store the matched item
  const nav = useNavigate(); // React Router navigation function

  /**
   * Load the diary item to edit when component mounts.
   * If the diary doesn't exist, redirect to Home with alert.
   */
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      window.alert("The requested diary entry does not exist.");
      nav("/", { replace: true }); // Redirect to home
    }

    setCurDiaryItem(currentDiaryItem); // Set matched item to local state
  }, [id]);

  return curDiaryItem;
};

export default useDiary;
