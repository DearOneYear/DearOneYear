import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Write4() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state.selectedDate;

  const [emotion, setEmotion] = useState("");

  function ClickEmotion(e) {
    setEmotion(e.target.innerHTML);
    setNextBtn("");
  }

  // 다음 버튼
  const [nextBtn, setNextBtn] = useState("disabled");

  return (
    <CenterWrapper>
      <MainWrapper>
        <DivTop>
          <PTitle>나에게 편지 쓰는 중...(2/4)</PTitle>
        </DivTop>
        <DivMid>
          <PComment>지금, 당신은 어떤 기분인가요?</PComment>
          <DivEmotions>
            <ButtonEmotion onClick={ClickEmotion}>
              행복을 나누고 싶은
            </ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>집에 가고 싶은</ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>
              콧노래가 절로 나오는
            </ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>위로가 필요한</ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>치킨이 땡기는</ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>
              아무것도 하기 싫은
            </ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>
              두근두근 설레는
            </ButtonEmotion>
            <ButtonEmotion onClick={ClickEmotion}>혼자 있고 싶은</ButtonEmotion>
          </DivEmotions>
          <ButtonNext
            disabled={nextBtn}
            onClick={() =>
              navigate("/write/3", {
                state: { selectedDate: selectedDate, emotion: emotion },
              })
            }
          >
            다음으로
          </ButtonNext>
        </DivMid>
      </MainWrapper>
    </CenterWrapper>
  );
}

export default Write4;

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
  background-image: url("img/background.png");
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

const PTitle = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 3vh 1.5vh;
`;

const DivMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PComment = styled.p``;

const DivEmotions = styled.div``;

const ButtonEmotion = styled.button`
  height: 6vh;
  margin: 0.5vh;
`;

const ButtonNext = styled.button`
  display: flex;
  justify-content: center;

  width: 20vh;

  background-color: black;
  color: white;
  border: solid white;
  border-radius: 1vh;
`;
