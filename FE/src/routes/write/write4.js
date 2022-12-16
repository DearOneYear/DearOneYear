import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Write4() {
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let who = urlArr[urlArr.length - 1];
  console.log(who);

  const location = useLocation();
  const selectedDate = location.state.selectedDate;
  const toname = location.state.toname;
  const toyou = location.state.toyou;

  console.log(selectedDate);
  const ToWrite5 = useNavigate();
  function Navigate() {
    console.log(who);
    if (who === "tome") {
      ToWrite5(`/write/write5/tome`, {
        state: {
          selectedDate: selectedDate,
          toname: toname,
          toyou: toyou,
          emotion: emotion,
        },
      });
      console.log("tome write3로 갑시다");
    } else if (who === "toyou") {
      ToWrite5(`/write/write5/toyou`, {
        state: {
          selectedDate: selectedDate,
          toname: toname,
          toyou: toyou,
          emotion: emotion,
        },
      });
      console.log("toyou write3로 갑시다");
    }
  }

  const [emotion, setEmotion] = useState("");

  function ClickEmotion(e) {
    console.log(e.target.innerHTML);
    setEmotion(e.target.innerHTML);
  }
  console.log(emotion);
  return (
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        {who === "tome" ? (
          <PTitle>나에게 편지 쓰는 중...(2/4)</PTitle>
        ) : (
          <PTitle>너에게 편지쓰는 중...(3/5)</PTitle>
        )}
      </DivTop>
      <DivMid>
        <PComment>지금, 당신은 어떤 기분인가요?</PComment>
        <DivEmotions>
          <ButtonEmotion onClick={ClickEmotion}>행복을 나누고 싶은</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>집에 가고 싶은</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>콧노래가 절로 나오는</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>위로가 필요한</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>치킨이 땡기는</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>아무것도 하기 싫은</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>두근두근 설레는</ButtonEmotion>
          <ButtonEmotion onClick={ClickEmotion}>혼자 있고 싶은</ButtonEmotion>
        </DivEmotions>
        <ButtonNext onClick={Navigate}>다음으로</ButtonNext>
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

const PComment = styled.p`
`;

const DivEmotions = styled.div`
`;

const ButtonEmotion = styled.button`
  height: 6vh;
  margin: 0.5vh;
`;

const ButtonNext = styled.div`
  display: flex;
  justify-content: center;

  width: 20vh;

  background-color: black;
  color: white;
  border: solid white;
  border-radius: 1vh;
`;