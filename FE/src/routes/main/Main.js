import { React, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../main/Modal.css";
import Modal from "../main/Modal.js";

import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";

function Main() {
  // navigator
  const navigate = useNavigate();

  // 전역 변수
  let access_token = "";
  let [userEmail, setUserEmail] = useState("");
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  // 쿠키 받기
  const getCookie = () => {
    let cookie = document.cookie.split("; ");
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
    if (key.includes("access_token") === true) {
      let indexAccessToken = key.indexOf("my_access_token");
      access_token = cookieArr[indexAccessToken][1];
    }
    userCheck();
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
          setUserEmail(response.data.email);
          setIsLoggedIn(true);
          getLetter(response.data.email);
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

  // 편지함, 마이페이지 이동
  const moveTo = (e) => {
    {
      e.target.id === "letterbox" &&
        navigate("/letterbox/unread", { state: { email: userEmail } });
    }
    {
      e.target.id === "mypage" &&
        navigate("/mypage", { state: { email: userEmail } });
    }
  };

  // 이메일로 편지 목록 가져오기
  let [dbLetter, setDbLetter] = useState([]);
  let [dbDday, setDbDday] = useState([]);
  const getLetter = async (userEmail) => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${userEmail}` },
      })
      .then((res) => {
        setDbLetter([...res.data.letter]);
        setDbDday([...res.data.ddays]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 디데이 기존 배열에 합치기
  for (let j = 0; j < dbLetter.length; j++) {
    dbLetter[j].dday = dbDday[j] + 2;
  }

  // 읽음 대기 중인 편지 개수 세기
  let arrivedLetter = [];
  let arrivedLetterId = 0;

  dbLetter.map((letter) => {
    if (letter.isOpened === false && letter.dday <= 0) {
      arrivedLetter.push(letter);
    }
  });
  if (arrivedLetter.length !== 0) {
    arrivedLetterId = arrivedLetter[0].id;
  }

  // 가장 빠른 디데이 값 가져오기
  let latestDday = 0;
  let yetLetter = [];

  dbLetter.map((letter) => {
    if (letter.isOpened === false) {
      yetLetter.push(letter);
    }
  });

  yetLetter = yetLetter.sort(function (a, b) {
    return a.dday - b.dday;
  });

  if (yetLetter.length > 0) {
    latestDday = yetLetter[0].dday;
  }

  useEffect(() => {
    getCookie();
    userCheck();
  }, []);

  return (
    <CenterWrapper>
      <MainWrapper>
        {isLoggedIn === false ? (
          <>
            <DivTop>
              <PLogo>나의 내일에게</PLogo>
              <ButtonLogin onClick={login}>로그인</ButtonLogin>
            </DivTop>

            <DivMid>
              <DivMid1>
                <PComment1>내일의 당신에게 편지하세요.</PComment1>
                <PComment2>나의 내일에게</PComment2>
              </DivMid1>
              <DivMid2>
                <PComment3>유리병을 눌러</PComment3>
                <PComment3>익명의 편지를 읽어보세요</PComment3>
              </DivMid2>
            </DivMid>

            <Modal />
            <ButtonWrite onClick={login}>편지하러 가기</ButtonWrite>
          </>
        ) : (
          <>
            <>
              <DivTop>
                <PLogo>나의 내일에게</PLogo>
                <DivSubTop>
                  {arrivedLetter.length === 0 && (
                    <>
                      <DivSubTopLetterBox>
                        <img
                          id="letterbox"
                          onClick={moveTo}
                          src="img/closedbottle.png"
                          alt="letterbox"
                          style={{ width: "4vh", height: "4vh" }}
                        />
                        <span>{yetLetter.length}</span>
                      </DivSubTopLetterBox>
                    </>
                  )}
                  {arrivedLetter.length > 0 && (
                    <>
                      <DivSubTopLetterBox>
                        <img
                          id="letterbox"
                          onClick={moveTo}
                          src="img/redletterbox.png"
                          alt="letterbox"
                          style={{ width: "6.5vh", height: "7.8vh" }}
                        />
                        <span>{yetLetter.length}</span>
                      </DivSubTopLetterBox>
                    </>
                  )}
                  <div onClick={moveTo}>
                    <BsFillPersonFill
                      id="mypage"
                      style={{
                        color: "white",
                        position: "relative",
                        width: "3.6vh",
                        height: "3.6vh",
                      }}
                    />
                  </div>
                </DivSubTop>
              </DivTop>
            </>
            <>
              {dbLetter.length === 0 && ( // 원래 : {dbLetter.length === 0 && (
                <DivMid>
                  <DivMid1>
                    <PComment1>
                      {yetLetter.length}개의 편지, 기다리는 중
                    </PComment1>
                    <PComment2>기다림을 시작해 보세요.</PComment2>
                  </DivMid1>
                  <DivMid2>
                    <PComment3>아직 보낸 편지가 없어요.</PComment3>
                    <PComment3>아래의 버튼을 눌러</PComment3>
                    <PComment3>
                      미래의 당신에게 위로와 응원을 보내주세요.
                    </PComment3>
                  </DivMid2>
                </DivMid>
              )}

              {dbLetter.length !== 0 &&
                latestDday > 0 && ( // 원래 : {dbLetter.length !== 0 && latestDday > 0 && (
                  <DivMid>
                    <DivMid1>
                      <PComment1>
                        {yetLetter.length}개의 편지, 기다리는 중
                      </PComment1>
                      <PComment2>D - {latestDday}</PComment2>
                    </DivMid1>
                    <DivMid2>
                      <PComment3>아직 도착한 유리병이 없어요.</PComment3>
                      <PComment3>새로운 편지를 보내보는 건 어떨까요?</PComment3>
                    </DivMid2>
                  </DivMid>
                )}

              {dbLetter.length !== 0 &&
                latestDday <= 0 && ( // 원래 : {dbLetter.length !== 0 && latestDday <= 0 && (
                  <DivMid>
                    <DivMid1>
                      <PComment1>
                        {yetLetter.length}개의 편지 중, {arrivedLetter.length}
                        개가 도착했어요!
                      </PComment1>
                      <PComment2>D - DAY</PComment2>
                    </DivMid1>
                    <DivMid2>
                      <PComment3>유리병을 눌러</PComment3>
                      <PComment3>당신의 편지를 읽어보세요.</PComment3>
                    </DivMid2>
                    <DivForImgButton>
                      <img
                        id="letterbox"
                        onClick={() => {
                          navigate(`/detail/${arrivedLetterId}`);
                        }}
                        src="img/closedbottle.png"
                        alt="letterbox"
                        style={{ width: "20vh" }}
                      />
                    </DivForImgButton>
                  </DivMid>
                )}
            </>
            <ButtonWrite
              onClick={() =>
                navigate("/write/1", { state: { email: userEmail } })
              }
            >
              편지하러 가기
            </ButtonWrite>
          </>
        )}
      </MainWrapper>
    </CenterWrapper>
  );
}

export default Main;

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
  background-image: url("img/beach.png");
  background-size: cover;
  background-position: center;
  color: white;
`;

const DivTop = styled.div`
  width: 100%;
  margin: 1vh 0vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PLogo = styled.p`
  font-size: 3vh;
  font-weight: bold;
  margin: 2.5vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const DivSubTop = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0vh 2vh;
  width: 10vh;
  height: 8.5vh;
  justify-content: space-between;
  align-items: center;
`;

const DivSubTopLetterBox = styled.div`
  display: flex;
  flex-direction; row;
  align-items: center;
`;

const ButtonLogin = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2.5vh;
  margin: 2.5vh;
`;

const DivMid = styled.div`
  width: 100%;
`;

const DivForImgButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 5vh;
`;

const DivMid1 = styled.div`
  width: 100%;
  height: 9vh;
  margin: 8vh 0vh;
  padding: 0vh 3vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const PComment1 = styled.p`
  font-size: 3vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const PComment2 = styled.p`
  font-size: 4vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const DivMid2 = styled.div`
  width: 100%;
  margin-top: 5vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PComment3 = styled.p`
  font-size: 2.5vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const ButtonWrite = styled.button`
  width: 47vh;
  height: 7.5vh;
  position: absolute;
  margin-top: 76.5vh;

  border: solid 0.2vh;
  border-color: white;
  border-radius: 1vh;

  color: white;
  font-size: 2.2vh;
  background-color: rgba(50, 50, 50, 0.7);
`; // 221215:1429 -> 주석 지우기
