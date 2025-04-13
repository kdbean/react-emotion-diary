import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

import { getEmotionImage } from "./util/get-emotion-image"; //# ADD 2025-04-13 : import image rendering function

function App() {
  return (
    <>
      {/*
       <Routes> 컴포넌트는 <Route>만 자식 요소로 허용.
       <div> 등의 일반 Tag 사용 시 오류 발생 (React Router 제한) 
       */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />{" "}
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
