import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";

const url = "/img/beach.png";
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
  width: 10rem;
  height: 2rem;
  left: 1.5rem;
  top: 2rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;

  letter-spacing: 0.02rem;

  color: #ffffff;

  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const LoginBtn = styled.p`
  position: relative;
  height: 1.5rem;
  left: -2rem;
  top: -1.3rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  /* identical to box height */

  text-align: right;

  color: #ffffff;
`;

const Text1 = styled.p`
  position: relative;
  width: 313px;
  height: 4.875rem;
  left: 5rem;
  top: 4rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.5rem;

  text-align: right;

  color: #ffffff;

  text-shadow: 0px 0px 0.25rem rgba(0, 0, 0, 0.25);
`;

const Text2 = styled.p`
  position: relative;
  width: 313px;
  left: 5rem;
  top: 0rem;

  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.5rem;

  text-align: right;

  color: #ffffff;

  text-shadow: 0px 0px 0.25rem rgba(0, 0, 0, 0.25);
`;
const Text3 = styled.p`
  position: relative;
  width: 60vw;
  height: 2rem;
  top: 5rem;
  margin: 0;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75ren;

  color: #ffffff;

  text-shadow: 0px 0px 0.25rem rgba(0, 0, 0, 0.25);
`;

const NewLetterBtn1 = styled.button`
  position: relative;
  width: 90vw;
  height: 3.563rem;
  top: 35vh;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const NewLetterTxt1 = styled.p`
  position: relative;
  width: 12.188rem;
  height: 1.5rem;
  top: 42vh;
  z-index: 3;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;
`;

const NewLetterBtn2 = styled.button`
  position: relative;
  width: 90vw;
  height: 3.563rem;
  top: 2rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const NewLetterTxt2 = styled.p`
  position: relative;
  width: 12.188rem;
  height: 1.5rem;
  top: 5.7rem;
  z-index: 3;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;
`;

const LetterBox = styled.img`
  position: relative;

  left: 16.625rem;
  top: -1.7rem;
  width: 2.125rem;
  height: 2.75rem;

  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.2));
`;

const LetterNum = styled.p`
  position: relative;

  left: 19.625rem;
  top: -5.5rem;
  width: 2.125rem;
  height: 2.75rem;

  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const T1 = styled.p`
  position: relative;
  width: 17.313rem;
  height: 4.875rem;
  left: 7rem;
  top: -2.875rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.5rem;

  text-align: right;

  color: #ffffff;

  text-shadow: 0px 0px 0.313rem rgba(0, 0, 0, 0.25);
`;
const T2 = styled.p`
  position: relative;
  width: 16.313rem;
  height: 4.875rem;
  left: 7.7rem;
  top: -6.875rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.5rem;

  text-align: right;

  color: #ffffff;

  text-shadow: 0px 0px 0.313rem rgba(0, 0, 0, 0.25);
`;
const T3 = styled.p`
  position: relative;
  width: 100%;
  height: 4.875rem;
  top: 0rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 0.313rem rgba(0, 0, 0, 0.25);
`;
const T4 = styled.p`
  position: relative;
  width: 100%;
  height: 4.875rem;
  top: -3.5rem;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2.5rem;

  color: #ffffff;

  text-shadow: 0px 0px 0.313rem rgba(0, 0, 0, 0.25);
`;

function Main() {
  // navigator
  const navigate = useNavigate();

  // 전역 변수
  let access_token = "";
  let [userEmail, setUserEmail] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  // 쿠키 받기
  const getCookie = () => {
    let cookie = document.cookie.split(";");
    let cookieArr = [];
    if (cookie.length !== 0) {
      cookie.map((e) => {
        let c = e.split("=");
        cookieArr.push(c);
      });
    }

    // 쿠키 속 access_token 받기
    let key = [];
    cookieArr.map((e) => {
      key.push(e[0]);
    });
    console.log(cookieArr);
    if (key.includes(" access_token") === true) {
      let indexAccessToken = key.indexOf("my_access_token");
      access_token = cookieArr[indexAccessToken][1];
    }
  };

  // 로그인 상태 체크
  const userCheck = () => {
    let tokenVerifyUrl = "http://localhost:8000/accounts/verify/";
    const getDB = async () => {
      try {
        const response = await axios.get(`${tokenVerifyUrl}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (response.data.email.length !== 0) {
          console.log("로그인");
          setUserEmail(response.data.email);
          setIsLoggedIn(true);
        } else {
          console.log("login");
          getLetter();
          // navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDB();
  };


  // 로그인 버튼 클릭 시, 카카오 로그인하기 페이지로 이동
  const login = () => {
    if (access_token === "") {
      navigate("/login");
    }
  };

  // 편지하러 가기 클릭 시,
  // 로그인 안되어 있으면 로그인 페이지
  // 로그인되어 있으면 편지 작성 페이지
  const writeLetter = () => {
    if (access_token === "") {
      navigate("/login");
    }
    else {
      navigate('/write/write1');
    }
  };

  // 편지함, 마이페이지 이동
  const moveTo = (e) => {
    console.log(e.target.id);
    {
      e.target.id === "letterbox" &&
        navigate("/letterbox/unread", { state: { email: { userEmail } } });
    }
    {
      e.target.id === "mypage" &&
        navigate("/mypage", { state: { email: { userEmail } } });
    }
  };

  // 이메일로 편지 목록 가져오기
  let [dbLetter, setDbLetter] = useState([]);
  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${userEmail}` }, // userEmail 앞에서 받은 놈 넣어줍쇼
      })
      .then((res) => {
        setDbLetter([...res.data]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 디데이 >= 0 인 편지 개수 세기
  let receivedLetter = 0;
  dbLetter.map((letter) => {
    if (letter.dday >= 0) {
      receivedLetter += 1;
    }
  });

  // 가장 빠른 디데이 값 가져오기
  let latestDday = 0;
  let yetLetter = [];
  dbLetter.map((letter) => {
    if (letter.isOpend === false) {
      yetLetter.push(letter);
    }
  });
  yetLetter = yetLetter.sort(function (a, b) {
    return a.dday - b.dday;
  });
  // 백 연결 확인하고 이거 켜기
  // latestDday = yetLetter[0].dday;

  useEffect(() => {
    getCookie();
    userCheck();
  }, []);

  return (
    <Container>
      {isLoggedIn === false ? (
        <>
          <Header>
            <Title>나의 내일에게</Title>
            <LoginBtn onClick={login}>로그인</LoginBtn>
          </Header>

          <div>
            <Text1>내일의 당신에게 편지하세요</Text1>
            <Text2>나의 내일에게</Text2>
          </div>

          <center>
            <Text3>유리병을 눌러</Text3>
            <Text3>익명의 편지를 읽어보세요</Text3>
          </center>
          <center>
            <NewLetterTxt1 onClick={writeLetter}>편지하러 가기</NewLetterTxt1>
            <NewLetterBtn1></NewLetterBtn1>
          </center>
        </>
      ) : (
        <>
          <Header>
            <Title>나의 내일에게</Title>
            <LetterBox
              id="letterbox"
              onClick={moveTo}
              src="img/closedbottle.png"
              alt="letterbox"
            />
            <LetterNum>{receivedLetter}</LetterNum>
            <BsFillPersonFill
              id="mypage"
              onClick={moveTo}
              style={{
                color: "white",
                position: "relative",
                width: "2.125rem",
                height: "2.125rem",
                left: "22rem",
                top: "-10rem",
              }}
            />
          </Header>
          {dbLetter.length === 0 ? (
            <>
              <T1>{dbLetter.length}개의 편지, 기다리는 중</T1>
              <T2>D - {latestDday}</T2>
              <center>
                <T3>아직 도착한 유리병이 없어요.</T3>
                <T4>새로운 편지를 보내보는 건 어떨까요?</T4>
              </center>
            </>
          ) : (
            <>
              <T1>
                {dbLetter.length}개의 편지 중, {receivedLetter}개가 도착했어요!
              </T1>
              <T2>D-DAY</T2>
              <center>
                <T3>유리병을 눌러</T3>
                <T4>당신의 편지를 읽어보세요.</T4>
              </center>
            </>
          )}
          <center>
            <NewLetterTxt2 onClick={writeLetter}>편지하러 가기</NewLetterTxt2>
            <NewLetterBtn2></NewLetterBtn2>
          </center>
        </>
      )}
    </Container>
  );
}

export default Main;
