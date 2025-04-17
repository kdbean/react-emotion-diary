import { useParams, useNavigate } from "react-router-dom"; //# ADD 2025-04-17 : import useNavigate Hook
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

/**
 * @component Diary
 * Renders a single diary entry in read-only mode.
 * Retrieves diary data by ID, and redirects if not found.
 */
const Diary = () => {
  const params = useParams(); // Get diary ID from URL parameters
  const nav = useNavigate(); // React Router navigation

  const curDiaryItem = useDiary(params.id); // Custom hook to fetch diary item by ID

  if (!curDiaryItem) {
    return <div>Data Loading...</div>; // Show loading or fallback UI while data is being fetched
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate)); // Format date for title

  return (
    <div>
      {/* Page Header */}
      <Header
        title={`${title} Diary`}
        leftChild={<Button onClick={() => nav(-1)} text={"< back"} />}
        rightChild={
          <Button onClick={() => nav(`/edit/${params.id}`)} text={"edit"} />
        }
      />

      {/* Diary Viewer */}
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
