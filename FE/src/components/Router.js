import { BrowserRouter, Routes, Route } from "react-router-dom";
import LetterBox from "../routes/LetterBox";
import LetterCheck from "../routes/LetterDetail";
import MyPage from "../routes/MyPage";
import MyPageEdit from "../routes/MyPageEdit";
import Home from "../routes/Home";
import Read from "./Read";
import Authcheck from '../routes/auth/Authcheck';
import KakaoLogin from '../routes/auth/KakaoLogin';
import Auth from "../routes/auth/Auth";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        // 로그인
        <Route path="/oauth/kakao/callback" element={<Authcheck />} />

        // 마이페이지
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />

        // 편지함
        <Route path="/letterbox" element={<LetterBox />} />
        <Route path="/letterbox/read" element={<Read />} />
        <Route path="/detail/:id" element={<LetterCheck />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
