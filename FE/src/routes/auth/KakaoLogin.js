import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

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

const Title = styled.p`
  position: relative;
  left: 4.5rem;
  top: 0rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 28px;

  letter-spacing: 0.02em;

  color: #ffffff;
`;

const TextArea = styled.div`
  position: relative;
  width: 22rem;
  height: 7rem;
  top: 10.125rem;

  display: flex;
  flex-direction: column;
`;
const InfoTxt = styled.p`
  margin: 0em;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2rem;

  text-align: center;

  color: #ffffff;

  text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
`;

const LoginBtn = styled.img`
  position: relative;
  width: 23.875rem;
  height: 3.563rem;
  top: 34.5rem;
`;

const KakaoLogin = () => {
  // const onClickLogin = async () => {
  //   console.log('ㅋㅋㅇㄺㅇ');
  //    await axios.get('http://localhost:8000/accounts/signin/kakao/')
  //           .then((res) => console.log(res))
  //           .catch(function (error) {
  //               console.log(error);
  //           })
  // }
  const navigate = useNavigate();
  let kakaoUrl = "http://localhost:8000/accounts/signin/kakao/";
  let kakaoCallbackUrl =
    "http://localhost:8000/accounts/signin/kakao/callback/";
  const onClickLogin = () => {
    window.location.href = kakaoUrl;
    // axios.get(kakaoUrl, {
    //   params: {
    //     redirect_uri: "http://localhost:3000/login/"
    //   }
    // })
    //   .then((response) => console.log(response)).catch(function (err) {console.log(err)})
  };
  let currUrl = window.document.location.href;
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
    <Container>
      <IoIosArrowBack
        onClick={() => navigate(-1)}
        style={{
          position: "relative",
          width: "2.125rem",
          height: "2.125rem",
          left: "1.5rem",
          top: "3.4rem",
          color: "white",
        }}
      />
      <Title>로그인 / 회원가입</Title>
      <center>
        <TextArea>
          <InfoTxt>세상에서 가장 소중한 사람,</InfoTxt>
          <InfoTxt>바로 당신에게 편지하세요.</InfoTxt>
          <InfoTxt>세상에서 가장 큰 위로, 응원, 사랑이</InfoTxt>
          <InfoTxt>되어드릴게요.</InfoTxt>
        </TextArea>
        <LoginBtn src="/img/kakaologin.png" onClick={onClickLogin} />
      </center>
    </Container>
  );
};

export default KakaoLogin;
