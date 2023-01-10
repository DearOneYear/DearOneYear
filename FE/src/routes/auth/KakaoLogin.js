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

  // let kakaoUrl =
  //   "https://port-0-dearoneyearbe-cf24lcbtczhq.gksl2.cloudtype.app/accounts/signin/kakao/";
  // let kakaoCallbackUrl =
  //   "https://port-0-dearoneyearbe-cf24lcbtczhq.gksl2.cloudtype.app/accounts/signin/kakao/callback/";
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
        // 쿠키 설정
        setCookie("my_access_token", res.data.my_access_token, 3);
        setCookie("my_refresh_token", res.data.my_refresh_token, 3);
        setCookie("access_token", res.data.access_token, 3);
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
    <CenterWrapper>
      <MainWrapper>
        <DivTop>
          <DivArrowButton>
            <IoIosArrowBack
              onClick={() => navigate(-1)}
              style={{ width: "4vh", height: "4vh" }}
            />
          </DivArrowButton>
          <PLogin>로그인 / 회원가입</PLogin>
        </DivTop>
        <DivMid>
          <PComment>세상에서 가장 소중한 사람,</PComment>
          <PComment>바로 당신에게 편지하세요.</PComment>
          <PComment>세상에서 가장 큰 위로, 응원, 사랑이</PComment>
          <PComment>되어드릴게요.</PComment>
        </DivMid>
        <ImgBottle src="/img/closedbottle.png" />
        <ImgLoginButton
          alt="카카오 로그인 버튼"
          src="/img/kakaologin.png"
          onClick={onClickLogin}
        />
      </MainWrapper>
    </CenterWrapper>
  );
};

export default KakaoLogin;

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
  align-items: center;
`;

const DivArrowButton = styled.div`
  padding-left: 2.5vh;
`;

const PLogin = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 3vh 1.5vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const DivMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 12vh 0vh;
`;

const PComment = styled.p`
  font-size: 2.5vh;
  text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.2);
`;

const ImgBottle = styled.img`
  width: 20vh;
`;

const ImgLoginButton = styled.img`
  position: absolute;
  width: 47vh;
  height: 7.5vh;
  border-radius: 1.02vh;
  margin-top: 76.5vh;
`;
