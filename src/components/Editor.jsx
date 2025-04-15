import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @constant emotionList
 * Predefined list of emotions to be selected by user.
 * Each object includes:
 * - emotionId: numerical identifier
 * - emotionName: label displayed under the emotion icon
 */
const emotionList = [
  { emotionId: 1, emotionName: "Perfect" },
  { emotionId: 2, emotionName: "Good" },
  { emotionId: 3, emotionName: "Okay" },
  { emotionId: 4, emotionName: "Bad" },
  { emotionId: 5, emotionName: "Terrible" },
];

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

const Editor = ({ onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: "",
    content: "",
  });

  // Navigation handler (React Router)
  const nav = useNavigate();

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
              // UPDATE 2025-04-15 : Type casting for stable emotionId comparison
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
