import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

/**
 * @component EmotionItem
 * Single emotion item used for emotion selection UI.
 *
 * @param {number} emotionId - ID of the emotion (1~5)
 * @param {string} emotionName - Label to display under the image
 * @param {boolean} isSelected - Whether this emotion is currently selected
 */
const EmotionItem = ({ emotionId, emotionName, isSelected }) => {
  return (
    <div
      className={`EmotionItem ${
        isSelected ? `EmotionItem_on_${emotionId}` : ""
      }`}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
