import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import KakaoLogin from "./auth/KakaoLogin";


function Home() {
  const [token, setToken] = useState("")


  // 카카오 로그인
  const REST_API_KEY = "489dc458a9a2b77d9583aa0e98ef0f52";
  const REDIRECT_URI = "http://localhost:3000"
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const GetKakaoLogin = async () => {
    console.log("눌렀음")
    await axios.get(KAKAO_AUTH_URL)
    // 응답(성공)
    .then(function(res) {
      console.log(res)
      setToken(res)
    })
    // 응답(실패)
    .catch(function(error) {
      console.log(error)
    })
  }
  return (
    <div>
      <Link to="/mypage">
        <button>마이 페이지</button>
      </Link>
      <Link to="/letterbox">
        <button>편지함</button>
      </Link>
      <>--------------------------</>
{/* <KakaoLogin></KakaoLogin> */}
        {/* <div style={{cursor:"pointer"}}onClick={GetKakaoLogin}>카카오로 시작하기</div>
        {token && <div>{token}</div>} */}
      <a href={KAKAO_AUTH_URL}><button>카카오로 시작하기</button></a>
    </div>
  );
}

export default Home;
