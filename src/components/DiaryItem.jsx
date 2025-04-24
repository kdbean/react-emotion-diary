import "./DiaryItem.css";
import Button from "./Button";

import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-image";

import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

/**
 * @component DiaryItem
 * Renders a single diary entry card in the list view.
 * Provides navigation to detail/edit pages and supports deletion.
 *
 * @param {number} id - Diary entry unique identifier
 * @param {number} emotionId - Emotion level (1 to 5)
 * @param {number} createdDate - Entry creation timestamp
 * @param {string} content - Short preview of the diary content
 */
const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const { onDelete } = useContext(DiaryDispatchContext);

  const nav = useNavigate(); // React Router navigation handler

  // Navigate to diary detail page
  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };

  // Navigate to edit page
  const goEditPage = () => {
    nav(`/edit/${id}`);
  };

  // Delete handler with confirmation dialog
  const onClickDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this diary? This action cannot be undone."
      )
    ) {
      onDelete(id);
      nav("/", { replace: true });
    }
  };

  return (
    <div className="DiaryItem">
      {/* Emotion image area - click to view details */}
      <div
        onClick={goDiaryPage}
        className={`img_section img_section_${emotionId}`} // Background color depends on emotionId
      >
        <img src={getEmotionImage(emotionId)} />
      </div>

      {/* Created date and content preview - click to view details */}
      <div onClick={goDiaryPage} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>

      {/* Button group: Edit + Delete */}
      <div className="button_section">
        <Button onClick={goEditPage} text={"Edit"} />
        <Button type={"NEGATIVE"} onClick={onClickDelete} text={"Delete"} />
      </div>
    </div>
  );
};

export default DiaryItem;
