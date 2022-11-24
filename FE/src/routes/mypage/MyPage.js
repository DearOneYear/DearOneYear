import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dummyLetter from "../letterbox/dummy/dummyLetter.json";

const MyPage = () => {
  const name = "토끼";
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
      <p>이름 {name}</p>
      <p>카카오계정 이메일 {email}</p>
      <p>
        생일 {birth_month} 월 {birth_date} 일
      </p>

      <Link to="/mypage/edit">
        <button>프로필 수정하기</button>
      </Link>
      <p>로그아웃</p>
    </>
  );
};

export default MyPage;
