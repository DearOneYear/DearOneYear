import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const KakaoLogin = () => {
  const navigate = useNavigate();

  let kakaoUrl = "http://localhost:8000/accounts/signin/kakao/";
  let kakaoCallbackUrl =
    "http://localhost:8000/accounts/signin/kakao/callback/";
  const onClickLogin = () => {
    window.location.href = kakaoUrl;
  };
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  const data = {
    code: `${code}`,
  };
  const config = { "Content-Type": "application/json" };

  const loginHandler = async () => {
    await axios
      .post(`${kakaoCallbackUrl}`, data, config)
      .then((res) => {
        console.log(res);
        // 쿠키 설정
        setCookie("my_access_token", res.data.my_access_token, 30);
        setCookie("my_refresh_token", res.data.my_refresh_token, 30);
        setCookie("access_token", res.data.access_token, 1);
        navigate("/");
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    if (code) {
      loginHandler(code);
    } else {
      console.log("에러");
    }
  }, []);

  return (
    <>
      <IoIosArrowBack onClick={() => navigate(-1)} />
      <p>로그인 / 회원가입</p>
      <>
        <p>세상에서 가장 소중한 사람,</p>
        <p>바로 당신에게 편지하세요.</p>
        <p>세상에서 가장 큰 위로, 응원, 사랑이</p>
        <p>되어드릴게요.</p>
      </>
      <img
        alt="카카오 로그인 버튼"
        src="/img/kakaologin.png"
        onClick={onClickLogin}
      />
    </>
  );
};

export default KakaoLogin;
