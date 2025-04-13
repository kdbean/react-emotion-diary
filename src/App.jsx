import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext } from "react";

// Pages
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

// Dummy data for test
const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-04-13").getTime(),
    emotionId: 1,
    content: "Record #1",
  },
  {
    id: 2,
    createdDate: new Date("2025-04-12").getTime(),
    emotionId: 2,
    content: "Record #2",
  },
  {
    id: 3,
    createdDate: new Date("2025-03-17").getTime(),
    emotionId: 3,
    content: "Record #3",
  },
];

// Reducer function for managing diary state
// Handles Create / Update / Delete based on action type
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state]; // Add new entry to the beginning
    case "UPDATE":
      return state.map(
        (item) =>
          String(item.id) === String(action.data.id) ? action.data : item // Type casting to avoid ID type mismatch
      ); // Replace entry with matching ID
    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id) // Type casting to avoid ID type mismatch
      ); // Remove matching entry
    default:
      return state;
  }
}

/**
 * DiaryStateContext
 * - Provides global read-only access to the list of diary entries
 * - Used for reading state from any component without prop drilling
 */
export const DiaryStateContext = createContext();

/**
 * DiaryDispatchContext
 * - Provides global access to action handlers (create, update, delete)
 * - Used for dispatching changes to the diary state from any component
 */
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);

  // Ref for generating unique IDs when creating new entries
  const idRef = useRef(3);

  /**
   * CREATE: Add a new diary entry
   * - ID is managed using useRef to ensure uniqueness (auto-increment)
   * - Dispatches a CREATE action to the reducer
   *
   * @param {number} createdDate - Timestamp of the diary entry
   * @param {number} emotionId   - Selected emotion ID (1~5)
   * @param {string} content     - Content of the diary entry
   */
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  /**
   * UPDATE: Edit an existing diary entry
   * - Finds entry by ID and replaces it with updated content
   * - Dispatches an UPDATE action to the reducer
   *
   * @param {number} id           - ID of the entry to update
   * @param {number} createdDate  - Updated creation date (timestamp)
   * @param {number} emotionId    - Updated emotion ID (1~5)
   * @param {String} content      - Updated text content
   */
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  /**
   * DELETE: Remove a diary entry
   * - Filters out the entry with the matching ID
   * - Dispatches a DELETE action to the reducer
   *
   * @param {number} id  - ID of the entry to delete
   */
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  /**
   * Application Root Layout
   *
   * - Provides global state (`DiaryStateContext`) and action handlers (`DiaryDispatchContext`)
   *   to child components using React Context API.
   *
   * - DiaryStateContext: Exposes diary entry list for read-only access
   * - DiaryDispatchContext: Exposes action functions for create/update/delete operations
   *
   * - Uses React Router for page navigation:
   *   - "/"          → Home page (diary list)
   *   - "/new"       → Create new diary entry
   *   - "/diary/:id" → View specific diary entry
   *   - "/edit/:id"  → Edit specific diary entry
   *   - "*"          → Fallback for undefined routes (NotFound)
   *
   * Notes:
   * - <Routes> must contain only <Route> as direct children
   * - Wrapping tags like <div> inside <Routes> will throw an error
   */
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />{" "}
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
