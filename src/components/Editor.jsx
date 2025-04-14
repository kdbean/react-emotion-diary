import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";

/**
 * @constant emotionList
 * List of selectable emotions with corresponding IDs
 */
const emotionList = [
  { emotionId: 1, emotionName: "Perfect" },
  { emotionId: 2, emotionName: "Good" },
  { emotionId: 3, emotionName: "Okay" },
  { emotionId: 4, emotionName: "Bad" },
  { emotionId: 5, emotionName: "Terrible" },
];

/**
 * @component Editor
 * Diary editor page component
 * - Displays date selector, emotion picker, diary textarea, and action buttons
 */
const Editor = () => {
  const emotionId = 5; // Currently selected emotion (mocked for now)

  return (
    <div className="Editor">
      {/* Date input section */}
      <section className="date_section">
        <h4>Date</h4>
        <input type="date" />
      </section>

      {/* Emotion selection section */}
      <section className="emotion_section">
        <h4>How do you feel today?</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === emotionId}
            />
          ))}
        </div>
      </section>

      {/* Diary text input section */}
      <section className="content_section">
        <h4>Write your diary</h4>
        <textarea placeholder="What about Today?" />
      </section>

      {/* Submit/Cancel buttons */}
      <section className="button_section">
        <Button text={"Cancel"} />
        <Button text={"Submit"} type={"POSITIVE"} />
      </section>
    </div>
  );
};

export default Editor;
