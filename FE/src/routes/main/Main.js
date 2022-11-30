import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const url = "/img/clear.png";
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

const NewLetterBtn = styled.button`
  position: relative;
  width: 90vw;
  height: 3.563rem;
  top: 21rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const NewLetterTxt = styled.p`
  position: relative;
  width: 12.188rem;
  height: 1.5rem;
  top: 24.7rem;
  z-index: 3;

  font-family: "MapoGoldenPier";
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;

  color: #ffffff;
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
        navigate("/letterbox/unread", { state: { email:  userEmail } } });
    }
    {
      e.target.id === "mypage" &&
        navigate("/mypage", { state: { email:  userEmail } });
    }
  };

  useEffect(() => {
    getCookie();
    userCheck();
  }, []);

  return (
    <Container>
      <Header>
        <Title>나의 내일에게</Title>
        {isLoggedIn === false ? (
          <LoginBtn onClick={login}>로그인</LoginBtn>
        ) : (
          <>
            <button id="letterbox" onClick={moveTo}>
              편지함
            </button>
            <button id="mypage" onClick={moveTo}>
              마이페이지
            </button>
          </>
        )}
      </Header>

      <div>
        <Text1>내일의 당신에게 편지하세요</Text1>
        <Text2>나의 내일에게</Text2>
      </div>

      <center>
        <Text3>유리병을 눌러</Text3>
        <Text3>익명의 편지를 읽어보세요</Text3>

        <NewLetterTxt onClick={writeLetter}>편지하러 가기</NewLetterTxt>
        <NewLetterBtn></NewLetterBtn>
      </center>
    </Container>
  );
}

export default Main;
