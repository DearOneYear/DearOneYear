import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const url = "/img/background.png";
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(${url});
  background-repeat: no-repeat;
  background-origin: padding-box;
  background-size: cover;
`;
const Header = styled.div`
  width: 100vw;
`;
const Title = styled.p`
  position: relative;
  left: 4.5rem;
  top: 0rem;
  width: 10rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 28px;

  letter-spacing: 0.02em;

  color: #ffffff;
`;

const LogoutBtn = styled.p`
  position: relative;
  height: 1.5rem;
  width: 7rem;
  left: 15rem;
  top: -2.9rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  /* identical to box height */

  text-align: right;

  color: #ffffff;
`;
const Welcome = styled.div`
  position: relative;
  left: 1.5rem;
  top: 0rem;
  width: 70vw;
`;

const Bottle = styled.img`
  width: 3.25rem;
  height: 4.063rem;
  filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.15));
`;

const WelcomeTxt = styled.p`
  position: relative;
  left: 3.5rem;
  top: -4.5rem;

  margin: 0.5rem;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75rem;

  color: #ffffff;

  text-shadow: 0px 0px 0.313rem rgba(0, 0, 0, 0.25);
`;
const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 3.5rem;
`;
const Label = styled.span`
  position: relative;
  top: -1rem;
  left: 1.5rem;
  width: 7rem;
  height: 1.5rem;
  margin: 1.625rem 0;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;
`;

const Value = styled.span`
  position: relative;
  top: -5.75rem;
  left: 5.5rem;
  width: 20rem;
  height: 24px;
  margin: 1.625rem 0;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;
`;

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
    let cookie = document.cookie.split("; ");
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
    let indexAccessToken = key.indexOf("my_access_token");
    let indexKakaoToken = key.indexOf("access_token");
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
  const email = location.state.email;
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
    <Container>
      <Header>
        <IoIosArrowBack
          onClick={() => navigate("/")}
          style={{
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "1.5rem",
            top: "3.4rem",
            color: "white",
          }}
        />

        <Title>마이 페이지</Title>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      </Header>

      <Welcome>
        <Bottle src="img/closedbottle.png" alt="closedbottle" />
        <WelcomeTxt>안녕하세요, {dbUserInfo.name} 님.</WelcomeTxt>
        <WelcomeTxt>당신만의 유리병을 찾으셨나요?</WelcomeTxt>
      </Welcome>

      <Info>
        <Label>이름</Label>
        <Value>{dbUserInfo.name}</Value>
      </Info>
      <Info>
        <Label>계정</Label>
        <Value>{dbUserInfo.email}</Value>
      </Info>
      <Info>
        <Label>생일</Label>
        <Value>
          {month}월 {date}일
        </Value>
      </Info>

      {/* <Link to="/mypage/edit">
        <button>프로필 수정하기</button>
      </Link> */}
    </Container>
  );
};

export default MyPage;
