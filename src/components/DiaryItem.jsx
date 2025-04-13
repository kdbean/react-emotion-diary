import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";

import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";

/**
 * DiaryItem Component
 * - Renders a single diary entry
 * - Navigates to detail or edit page on click
 *
 * @param {number} id          - pk
 * @param {number} emotionId   - Emotion ID (1~5)
 * @param {number} createdDate - Creation date (timestamp)
 * @param {string} content     - Diary content text
 */
const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate(); // React Router navigation handler

  return (
    <div className="DiaryItem">
      {/* Emotion image area - navigates to detail page on click */}
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`} // Background color depends on emotionId
      >
        <img src={getEmotionImage(emotionId)} />
      </div>

      {/* Date and content area - navigates to detail page on click */}
      <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>

      {/* Edit button area - navigates to edit page */}
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={"Edit"} />
      </div>
    </div>
  );
};

export default DiaryItem;
