import { BrowserRouter, Routes, Route } from "react-router-dom";

// 메인
import Main from "../routes/main/Main";

// 로그인
import KakaoLogin from "../routes/auth/KakaoLogin";

// 마이 페이지
import MyPage from "../routes/mypage/MyPage";
import MyPageEdit from "../routes/mypage/MyPageEdit";

// 편지함
import LetterBoxUnread from "../routes/letterbox/LetterBox_unread";
import LetterBoxRead from "../routes/letterbox/LetterBox_read";

// 편지 확인
import ReadingLetter from "../routes/reading/ReadingLetter";
import OpenGift from "../routes/reading/OpenGift";
import OpenBottle from "../routes/reading/OpenBottle";
import OpenPhoto from "../routes/reading/OpenPhoto";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* // 메인화면 */}
        <Route path="/" element={<Main />} />
        {/* // 로그인 */}
        <Route path="/login" element={<KakaoLogin />} />

        {/* // 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />

        {/* // 편지함 */}
        <Route path="/letterbox/unread" element={<LetterBoxUnread />} />
        <Route path="/letterbox/read" element={<LetterBoxRead />} />

        {/* 편지 오픈 */}
        <Route path="/detail/:id" element={<ReadingLetter />} />
        <Route path="/detail/:id/gift" element={<OpenGift />} />
        <Route path="/detail/:id/bottle" element={<OpenBottle />} />
        <Route path="/detail/:id/photo" element={<OpenPhoto />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
