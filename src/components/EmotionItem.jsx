import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

/**
 * @component EmotionItem
 * Render a selectable emotion box with an image and label.
 *
 * @param {number} props.emotionId - Unique ID for the emotion (1 to 5)
 * @param {string} props.emotionName - Display label for the emotion
 * @param {boolean} props.isSelected - Whether this emotion is currently selected
 * @param {Function} [props.onClick] - Optional click handler to notify parent of selection

 */
const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
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
