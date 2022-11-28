import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MyPage = () => {
  // navigate
  const navigate = useNavigate();

  // 전역 변수
  let kakaoToken = "";
  let access_token = "";
  const [dbUserInfo, setDbUserInfo] = useState([]);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);

  // 쿠키 받기
  const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    cookie.map((e) => {
      let c = e.split("=");
      cookieArr.push(c);
    });
    console.log(cookieArr);
    // 쿠키 속 access_token, my_access_token 받기
    let key = [];
    cookieArr.map((e) => {
      key.push(e[0]);
    });
    let indexAccessToken = key.indexOf(" my_access_token");
    let indexKakaoToken = key.indexOf(" access_token");
    access_token = cookieArr[indexAccessToken][1];
    kakaoToken = cookieArr[indexKakaoToken][1];

    // access_token이 있다면 (로그인이 되어 있다면) 유저 정보 가져오기
    if (access_token !== "") {
      getUserInfo();
    }
    return access_token, kakaoToken;
  };

  // 이전 페이지에서 넘겨준 email 값 가져오기
  const location = useLocation();
  const email = location.state.email.userEmail;
  console.log(email);

  // 이메일로 유저 정보 받아오기
  const getUserInfo = async () => {
    await axios
      .get("http://localhost:8000/accounts/mypage/", {
        headers: { Email: `Bearer ${email}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
        console.log(res);
        setDbUserInfo(res.data);
        birthbirth(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 월 일 따로 받아오는 함수
  const birthbirth = (dbUserInfo) => {
    let birthday = dbUserInfo.birthday.split("T")[0].split("-");
    setMonth(birthday[1]);
    setDate(birthday[2]);
  };

  // 로그아웃 버튼 클릭 시
  const logout = () => {
    getCookie();
    console.log(kakaoToken);
    sendToken(kakaoToken);
  };

  // 카카오 로그아웃
  const sendToken = async (kakaoToken) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/accounts/signout/kakao/",
        "",
        {
          headers: {
            Kakaoauth: `${kakaoToken}`, // Bearer 넣지 말 것! JWT 토큰으로 착각해서 Unauthorized 에러 남.
          },
        }
      );
      console.log(response);
      deleteCookie(" access_token");
      deleteCookie(" my_access_token");
      deleteCookie(" my_refresh_token");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const setCookie = (key, value, expiredays) => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie =
      key +
      "=" +
      escape(value) +
      "; path=/; expires=" +
      todayDate.toGMTString() +
      ";";
  };

  const deleteCookie = (key) => {
    setCookie(key, "", -1);
  };

  useEffect(() => {
    getCookie();
  }, []);

  return (
    <>
      <h1>마이 페이지</h1>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
      <button onClick={logout}>로그아웃</button>
      <p>이름 {dbUserInfo.name}</p>
      <p>카카오계정 이메일 {dbUserInfo.email}</p>
      <p>
        생일 {month} 월 {date} 일
      </p>

      <Link to="/mypage/edit">
        <button>프로필 수정하기</button>
      </Link>
    </>
  );
};

export default MyPage;
