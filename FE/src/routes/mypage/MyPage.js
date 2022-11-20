import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";

const MyPage = () => {
  const email = dummyLetter.email;
  const birth_month = dummyLetter.birthMonth;
  const birth_date = dummyLetter.birthDate;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h1>마이 페이지</h1>
      <button onClick={handleGoBack}>뒤로 가기</button>

      <p>이메일</p>
      <p>{email}</p>
      <p>생일</p>
      <p>
        {birth_month} 월 {birth_date} 일
      </p>
      <Link to="/mypage/edit">
        <button>정보 수정하기</button>
      </Link>
      <button>탈퇴하기</button>
    </>
  );
};

export default MyPage;
