import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();

  return <div>{params.id}번째 기록🍀</div>;
};

export default Edit;
