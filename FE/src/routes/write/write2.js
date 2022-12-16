import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Write2() {
  const navigate = useNavigate();
  let toname = "";
  let toyou = "";

  function Navigate() {
    navigate(`/write/write3/toyou`, {
      state: { toname: toname, toyou: toyou },
    });
  }

  function printToName() {
    toname = document.getElementById("toname").value;
    document.getElementById("result1").innerText = toname;
  }

  function printToYou() {
    toyou = document.getElementById("toyou").value;
    document.getElementById("result2").innerText = toyou;
  }

  return (
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        <PTitle>너에게 편지쓰는 중...(1/5)</PTitle>
      </DivTop>
      <DivMid>
        <DivInputs>
          <label htmlFor="toname">To. </label>
          <input
            id="toname"
            type="text"
            placeholder="받는 사람 이름"
            maxLength="28"
            required
            onKeyUp={printToName}
          ></input>
          님<br></br>
          <label htmlFor="toyou">From. </label>
          <input
            id="toyou"
            type="text"
            placeholder="내 이름"
            maxLength="28"
            required
            onKeyUp={printToYou}
          ></input>
          님
        </DivInputs>
      <p>
        나중에 편지 도착을 알려드려요! <br></br>ex "<span id="result1"></span>
        "님에게 "<span id="result2"></span>"님이 보낸 편지가 도착했어요
      </p>
      <ButtonNext onClick={Navigate}>다음으로</ButtonNext>
      </DivMid>
    </MainWrapper>
    </CenterWrapper>
  );
}

export default Write2;

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

const DivInputs = styled.div`
  width: 100%;
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