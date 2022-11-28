import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    if (key.includes(" access_token") === true) {
      let indexAccessToken = key.indexOf(" my_access_token");
      access_token = cookieArr[indexAccessToken][1];
    }
  };

  // 로그인 상태 체크
  const userCheck = () => {
    console.log(access_token);
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
    // else {
    //   navigate('편지쓰는 url');
    // }
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

  useEffect(() => {
    getCookie();
    userCheck();
  }, []);

  return (
    <div>
      <div>
        <p>내일의 당신에게 편지하세요</p>
        <h1>나의 내일에게</h1>
        {isLoggedIn === false ? (
          <button onClick={login}>로그인</button>
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
      </div>
      <div>
        <p>유리병을 눌러 익명의 편지를 읽어보세요</p>
      </div>
      <div>
        <button onClick={writeLetter}>편지하러 가기</button>
      </div>
    </div>
  );
}

export default Main;
