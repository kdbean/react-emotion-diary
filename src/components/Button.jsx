import "./Button.css";

/**
 * 공통 Button Component
 *
 * @param {string} text      - Button Text
 * @param {string} type      - Button Style Type (POSITIVE / NEGATIVE)
 * @param {function} onClick - onClick Event Handler
 */
const Button = ({ text, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`Button Button_${type}`} // 기본 버튼 스타일, 타입별 스타일 동시 적용
    >
      {text}
    </button>
  );
};

export default Button;
