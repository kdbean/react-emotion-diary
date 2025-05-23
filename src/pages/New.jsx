import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle"; //# ADD 2025-04-21 : import custom Hook (usePageTitle)

const New = () => {
  /** Get onCreate function from DiaryDispatchContext */
  const { onCreate } = useContext(DiaryDispatchContext);

  /** Router navigation handler */
  const nav = useNavigate();

  // # ADD 2025-04-21: Set dynamic page
  usePageTitle("New Diary");

  /**
   * @function onSubmit
   * Handles data submitted from Editor component
   * - Converts createdDate to timestamp
   * - Passes data to context's onCreate
   * - Redirects to home after creation
   *
   * @param {Object} input
   * @param {Date} input.createdDate - Selected date
   * @param {number} input.emotionId - Selected emotion
   * @param {string} input.content - Diary content
   */
  const onSubmit = (input) => {
    //# ADD START 2025-04-20 : EmotionId validation
    //- Prevent saving if no emotion is selected
    if (!input.emotionId) {
      alert("Please select your emotion before saving.");
      return;
    }
    //# ADD END 2025-04-20 : EmotionId validation

    onCreate(input.createdDate.getTime(), input.emotionId, input.content);
    nav("/", { replace: true }); // Prevents back navigation to form
  };

  return (
    <div>
      <Header
        title={"New Diary"}
        leftChild={<Button onClick={() => nav(-1)} text={"< back"} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
