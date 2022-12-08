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
      console.log("로그인");
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
  const getLetter = async (userEmail) => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${userEmail}` },
      })
      .then((res) => {
        setDbLetter(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 읽음 대기 중인 편지 개수 세기
  // 읽음 대기 편지 중 배열 상 첫번째꺼 아이디
  let openingLetter = [];
  let openingLetterId = 0;
  let receivedLetter = 0;

  // 오늘 날짜랑 비교
  let now = new Date();
  let yearNow = now.getFullYear();
  yearNow = yearNow.toString();
  let monthNow = now.getMonth() + 1;
  monthNow = monthNow.toString();
  let dayNow = now.getDay();
  dayNow = dayNow.toString();
  let today = yearNow + monthNow + dayNow;

  // n개의 편지 기다리는 중
  dbLetter.map((letter) => {
    let dday = letter.openAt.split("T")[0].split("-").join("");
    if (letter.isOpend !== true) {
      receivedLetter += 1;
      openingLetter.push(letter);
    }
  });
  if (openingLetter.length !== 0) {
    openingLetterId = openingLetter[0].id;
  }

  // 가장 빠른 디데이 값 가져오기
  let latestDday = 0;
  let yetLetter = [];
  dbLetter.map((letter) => {
    if (letter.isOpend !== true) {
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
    <>
      {isLoggedIn === false ? (
        <>
          <div>
            <p>나의 내일에게</p>
            <button onClick={login}>로그인</button>
          </div>

          <div>
            <p>내일의 당신에게 편지하세요</p>
            <p>나의 내일에게</p>
          </div>

          <p>유리병을 눌러</p>
          <p>익명의 편지를 읽어보세요</p>
          <Modal />
          <button onClick={login}>편지하러 가기</button>
        </>
      ) : (
        <>
          <>
            <p>나의 내일에게</p>

            {yetLetter.length === 0 && (
              <>
                <img
                  id="letterbox"
                  onClick={moveTo}
                  src="img/closedbottle.png"
                  alt="letterbox"
                  style={{ width: "3rem", height: "3rem" }}
                />
                <span>{receivedLetter}</span>
              </>
            )}
            {yetLetter.length !== 0 && (
              <>
                <img
                  id="letterbox"
                  onClick={moveTo}
                  src="img/redletterbox.png"
                  alt="letterbox"
                  style={{ width: "3rem", height: "3rem" }}
                />
                <span>{receivedLetter}</span>
              </>
            )}
            <div onClick={moveTo}>
              <BsFillPersonFill
                id="mypage"
                style={{
                  color: "black",
                  position: "relative",
                  width: "3.125rem",
                  height: "3.125rem",
                  padding: "1rem",
                }}
              />
            </div>
          </>
          <>
            {dbLetter.length === 0 && (
              <>
                <p>{yetLetter.length}개의 편지, 기다리는 중</p>
                <p>기다림을 시작해 보세요.</p>
                <p>
                  아직 보낸 편지가 없어요. <br /> 아래의 버튼을 눌러 <br />
                  미래의 당신에게 위로와 응원을 보내주세요.
                </p>
              </>
            )}

            {dbLetter.length !== 0 && receivedLetter === 0 && (
              <>
                <p>{yetLetter.length}개의 편지, 기다리는 중</p>
                <p>D - {latestDday}</p>
                <p>
                  아직 도착한 유리병이 없어요.
                  <br />
                  새로운 편지를 보내보는 건 어떨까요?
                </p>
              </>
            )}

            {yetLetter.length !== 0 && receivedLetter > 0 && (
              <>
                <p>
                  {dbLetter.length}개의 편지 중, {receivedLetter}개가
                  도착했어요!
                </p>
                <p>D - DAY</p>
                <p>
                  유리병을 눌러
                  <br />
                  당신의 편지를 읽어보세요.
                </p>
                <img
                  id="letterbox"
                  onClick={() => {
                    navigate(`/detail/${openingLetterId}`);
                  }}
                  src="img/closedbottle.png"
                  alt="letterbox"
                  style={{ width: "8rem", height: "8rem" }}
                />
              </>
            )}
          </>
          <button onClick={() => navigate("/write/write1")}>
            편지하러 가기
          </button>
        </>
      )}
    </>
  );
}

export default Main;
