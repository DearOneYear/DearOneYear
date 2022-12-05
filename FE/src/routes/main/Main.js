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
    navigate("/write/write1");
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
  const getLetter = async () => {
    await axios
      .get("http://localhost:8000/letter/letterbox/", {
        headers: { Email: `Bearer ${userEmail}` },
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
          <button>편지하러 가기</button>
        </>
      ) : (
        <>
          <>
            <p>나의 내일에게</p>
            <img
              id="letterbox"
              onClick={moveTo}
              src="img/closedbottle.png"
              alt="letterbox"
            />
            <p>{receivedLetter}</p>
            <BsFillPersonFill
              id="mypage"
              onClick={moveTo}
              style={{
                color: "white",
                position: "relative",
                width: "3.125rem",
                height: "3.125rem",
                left: "20rem",
                top: "-11rem",
              }}
            />
          </>
          {dbLetter.length === 0 ? (
            <>
              <p>{dbLetter.length}개의 편지, 기다리는 중</p>
              <p>D - {latestDday}</p>
              <p>아직 도착한 유리병이 없어요.</p>
              <p>새로운 편지를 보내보는 건 어떨까요?</p>
            </>
          ) : (
            <>
              <p>
                {dbLetter.length}개의 편지 중, {receivedLetter}개가 도착했어요!
              </p>
              <p>D-DAY</p>
              <p>유리병을 눌러</p>
              <p>당신의 편지를 읽어보세요.</p>
              <img
                src="/img/closedbottle.png"
                alt="편지함 가기"
                onClick={() => navigate("/letterbox/unread")}
              />
            </>
          )}
          <button onClick={writeLetter}>편지하러 가기</button>
        </>
      )}
    </>
  );
}

export default Main;
