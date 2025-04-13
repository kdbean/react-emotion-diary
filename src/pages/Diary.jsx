import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();

  return <div>{params.id}번째 기록🌸</div>;
};

export default Diary;
