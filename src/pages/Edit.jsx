import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  const params = useParams(); // Get dynamic ID from URL
  const nav = useNavigate(); // Navigation handler

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext); // Context for modifying diary data
  const data = useContext(DiaryStateContext); // Diary list from context

  const [currentDiaryItem, setCurDiaryItem] = useState();

  /**
   * Load the diary item to edit when component mounts.
   * If the diary doesn't exist, redirect to Home with alert.
   */
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("The requested diary entry does not exist.");
      nav("/", { replace: true }); // Redirect to home
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id]);

  /**
   * Handle delete button click.
   * Show confirmation alert → Delete item → Redirect to Home.
   */
  const onClickDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this diary? This action cannot be undone."
      )
    ) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  /**
   * Handle form submission from Editor.
   * Confirm update → Apply update → Redirect to Home.
   *
   * @param {Object} input - Updated diary data
   */
  const onSubmit = (input) => {
    if (window.confirm("Do you want to save the changes?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true }); // Redirect to home
    }
  };

  return (
    <div>
      {/* Page header with back and delete buttons */}
      <Header
        title={"Edit Diary"}
        leftChild={<Button onClick={() => nav(-1)} text={"< back"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"delete"} type={"NEGATIVE"} />
        }
      />

      {/* Editor component with pre-filled data */}
      <Editor initData={currentDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
