import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react"; //# ADD 2025-04-17: import useEffect Hook
import { useNavigate } from "react-router-dom";

import { emotionList } from "../constants/emotions";

/**
 * @function getStringedDate
 * Converts Date object into a string formatted as 'YYYY-MM-DD'.
 *
 * @param {Date} targetDate
 * @returns {string}
 */
const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: "",
    content: "",
  });

  // Navigation handler (React Router)
  const nav = useNavigate();

  // # ADD START 2025-04-17 : implement "Edit" Page for updating diary entries
  //- Initialize state from initData when editing
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);
  // # ADD END 2025-04-17 : implement "Edit" Page for updating diary entries

  /**
   * Handles input changes from:
   * - Date input : converted to Date object
   * - Textarea : content
   * - Emotion selection : custom event structure
   *
   * @param {Event | { target: { name: string, value: any }}} e
   */
  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value); // <input type="date"> returns string

      //# ADD START 2025-04-16 : block future date selection with alert in Editor
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove hours/minutes/seconds from today's date
      value.setHours(0, 0, 0, 0); // Remove hours/minutes/seconds from selected date

      if (value > today) {
        alert("Future dates are not allowed🚫");

        // Reset the date input back to today
        setInput({
          ...input,
          [name]: new Date(), // today
        });

        return; // Prevent state update if date is in the future
      }
      //# ADD END 2025-04-16 : block future date selection with alert in Editor
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  /**
   * Calls the provided onSubmit prop with the current input state.
   */
  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      {/* Date input section */}
      <section className="date_section">
        <h4>Date</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>

      {/* Emotion selection section */}
      <section className="emotion_section">
        <h4>How do you feel today?</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              //# UPDATE 2025-04-15 : Type casting for stable emotionId comparison
              //isSelected={item.emotionId === input.emotionId}
              isSelected={String(item.emotionId) === String(input.emotionId)}
            />
          ))}
        </div>
      </section>

      {/* Diary text input section */}
      <section className="content_section">
        <h4>Write your diary</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="What about Today?"
        />
      </section>

      {/* Submit/Cancel buttons */}
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"Cancel"} />
        <Button
          onClick={onClickSubmitButton}
          text={"Submit"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
