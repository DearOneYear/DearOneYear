import { BrowserRouter, Routes, Route } from "react-router-dom";
import LetterBox from "../routes/LetterBox";
import LetterCheck from "../routes/LetterDetail";
import MyPage from "../routes/MyPage";
import MyPageEdit from "../routes/MyPageEdit";
import Suji from "../routes/Suji";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suji />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/letterbox" element={<LetterBox />} />
        <Route path="/detail/:id" element={<LetterCheck />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
