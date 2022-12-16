import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoIosArrowBack, HiPencil } from "react-icons/io";

const url = "/img/background.png";

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

  // 이메일로 유저 정보 받아오기
  const getUserInfo = async () => {
    await axios
      .get("http://localhost:8000/accounts/mypage/", {
        headers: { Email: `Bearer ${email}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
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
            Kakaoauth: `${kakaoToken}`,
          },
        }
      );
      console.log(response);
      deleteCookie("access_token");
      deleteCookie("my_access_token");
      deleteCookie("my_refresh_token");

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
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        <DivTopSubLeft>
          <DivArrowButton>
            <IoIosArrowBack onClick={() => navigate("/")} style={{ width: "4vh", height: "4vh"}}/>
          </DivArrowButton>
          <PTitle>마이페이지</PTitle>
        </DivTopSubLeft>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      </DivTop>

      <DivMid>
        <DivMid1>
          <ImgBottle src="img/closedbottle.png" alt="closedbottle" />
          <DivMid1Sub>
            <PComment>안녕하세요, {dbUserInfo.name} 님.</PComment>
            <PComment>당신만의 유리병을 찾으셨나요?</PComment>
          </DivMid1Sub>
        </DivMid1>
        <DivMid2>
          <DivMid2L>
            <DivInfo>
              <PLabel>이름</PLabel>
              <PValue>{dbUserInfo.name}</PValue>
            </DivInfo>
            <DivInfo>
              <PLabel>계정</PLabel>
              <PValue>{dbUserInfo.email}</PValue>
            </DivInfo>
            <DivInfo>
              <PLabel>생일</PLabel>
              <PValue>{month}월 {date}일</PValue>
            </DivInfo>
          </DivMid2L>
          <ButtonEdit onClick={() => { navigate("/mypage/edit", { state: { email: email, name: dbUserInfo.name, month: month, day: date, }, });}}
              ><img src="/img/edit.png" style={{width: "3vh"}}></img></ButtonEdit>
        </DivMid2>

      </DivMid>

      <DivBottom>
        <ButtonBottom>이용 방법</ButtonBottom>
        <ButtonBottom>소중한 의견 남기기</ButtonBottom>
        <ButtonBottom>만든 사람들</ButtonBottom>
      </DivBottom>
    </MainWrapper>
    </CenterWrapper>
  );
};

export default MyPage;

const CenterWrapper = styled.div`
  width: 100vw;  
  height: 100vh;
  display: grid;
  justify-content: center;
  background-color: black;
`;

const MainWrapper = styled.div`
  width: 53vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url(${url});
  background-size: cover; 
  background-position: center;
  color: white;
  // background-origin: padding-box;
`;

const DivTop = styled.div`
  width: 100%;
  margin: 1vh 0vh;  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DivTopSubLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DivArrowButton = styled.div`
  padding-left: 2.5vh;
`;

const PTitle = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 3vh 1.5vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const LogoutBtn = styled.p`
  font-family: "MapoGoldenPier";
  font-style: normal;ㅇ
  color: white;
  font-size: 2.5vh;
  margin: 3vh;
`;

const DivMid = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivMid1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ImgBottle = styled.img`
  width: 5vh;
  height: 6.25vh;
  filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.15));
  margin: 2vh;
`;

const DivMid1Sub = styled.div`
`;

const PComment = styled.p`
  font-size: 2.5vh;
`;

const DivMid2 = styled.div`
  width: 47vh;
  height: 21vh;
  margin: 2vh 0vh 0vh;

  display: flex;
  flex-direction: row;
  background-color: white;
  color: black;
  padding: 3vh;
  border-radius: 1vh;
  justify-content: space-between;
`;

const DivMid2L = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DivInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const PLabel = styled.p`
  font-size: 2.5vh;
  margin-right: 1vh;
`;

const PValue = styled.p`
  font-size: 2.5vh;
`;

const ButtonEdit = styled.button`
  position: static;
  right: 1vh;
  height: 3vh;
  background: none;
  border: none;
`;

const DivBottom = styled.div`
  display: flex;
  width: 47vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 3vh;
  border-top: white solid 0.2vh;
  padding: 1vh;
`;

const ButtonBottom = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2.5vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 2vh 0vh;
`;