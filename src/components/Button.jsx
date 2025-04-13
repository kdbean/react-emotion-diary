import "./Button.css";

/**
 * Common Button Component
 *
 * @param {string} text      - Text to display inside the button
 * @param {string} type      - Button style type (e.g., "POSITIVE", "NEGATIVE")
 * @param {function} onClick - Click event handler
 */
const Button = ({ text, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`Button Button_${type}`} // Applies base button style + type-specific style
    >
      {text}
    </button>
  );
};

export default Button;
