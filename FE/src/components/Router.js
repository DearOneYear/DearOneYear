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

// 편지 작성
import Write1 from "../routes/write/write1";
import Write2 from "../routes/write/write2";
import Write3 from "../routes/write/write3";
import Write4 from "../routes/write/write4";
import Write5 from "../routes/write/write5";
import Write6 from "../routes/write/write6";
import Confirm from "../routes/write/confirm";

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

        {/* 편지 작성 */}
        <Route path="/write/write1" element={<Write1 />} />
        <Route path="/write/write2" element={<Write2 />} />
        <Route path="/write/write3/tome" element={<Write3 />} />
        <Route path="/write/write3/toyou" element={<Write3 />} />
        <Route path="/write/write4/tome" element={<Write4 />} />
        <Route path="/write/write4/toyou" element={<Write4 />} />
        <Route path="/write/write5/tome" element={<Write5 />} />
        <Route path="/write/write5/toyou" element={<Write5 />} />
        <Route path="/write/write6/tome" element={<Write6 />} />
        <Route path="/write/write6/toyou" element={<Write6 />} />
        <Route path="/write/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
