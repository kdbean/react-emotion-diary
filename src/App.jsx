import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useReducer, useRef, createContext, useEffect, useState } from "react"; //# UPDATE 2025-04-20 : import useEffect, useState Hook

// Pages
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

/**
 * Reducer function to manage diary state
 * Handles CRUD operations: INIT (load), CREATE, UPDATE, DELETE
 * Syncs updated state to localStorage
 */
//# UPDATE START 2025-04-20 : add localStorage persistence and initialization to App state
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data; // Initialize state from localStorage

    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }

    case "UPDATE": {
      nextState = state.map(
        (item) =>
          String(item.id) === String(action.data.id) ? action.data : item // Type casting to avoid ID type mismatch
      ); // Replace entry with matching ID
      break;
    }

    case "DELETE": {
      nextState = state.filter(
        (item) => String(item.id) !== String(action.id) // Type casting to avoid ID type mismatch
      ); // Remove matching entry
      break;
    }

    default:
      return state;
  }

  // Sync updated state to localStorage
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}
//# UPDATE END 2025-04-20 : add localStorage persistence and initialization to App state

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

//# UPDATE START 2025-04-20 : add localStorage persistence and initialization to App state
function App() {
  const [isLoading, setIsLoading] = useState(true); // Used to block UI while loading localStorage

  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0); // Unique ID generator for new diary entries

  /**
   * On initial mount: load data from localStorage
   */
  useEffect(() => {
    const storedData = localStorage.getItem("diary");

    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    // Find the largest ID value to initialize idRef
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    // Initialize state
    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);
  //# UPDATE END 2025-04-20 : add localStorage persistence and initialization to App state

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

  //# ADD START 2025-04-20 : add localStorage persistence and initialization to App state
  //- Show loading fallback before state initialization
  if (isLoading) {
    return <div>Loading your diary...</div>;
  }
  //# ADD END 2025-04-20 : add localStorage persistence and initialization to App state

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
