import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { emotionList } from "../constants/emotions";

/**
 * @component Viewer
 * Displays a read-only view of a diary entry, including emotion and content.
 *
 * @param {number|string} emotionId - Emotion identifier (1–5)
 * @param {string} content - Diary content
 */
const Viewer = ({ emotionId, content }) => {
  // Find the emotion item from list using id
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );
  return (
    <div className="Viewer">
      {/* Emotion Display Section */}
      <section className="img_section">
        <h4>Today’s Emotion</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
        </div>
        <div>{emotionItem.emotionName}</div>
      </section>

      {/* Diary Content Section */}
      <section className="content_section">
        <h4>Today’s Diary</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
