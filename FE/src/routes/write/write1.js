import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

function Write1() {
  const navigate = useNavigate();
  const [who, setWho] = useState("");
  function Who(e) {
    if (e.target.id === "tome") {
      setWho("tome");
      navigate(`/write/write3/tome`, {
        state: { toname: "me", toyou: "me" },
      });
    } else if (e.target.id === "toyou") {
      setWho("toyou");
      navigate(`/write/write2`);
    }
  }

  return (
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        <PTitle>편지하기</PTitle>
      </DivTop>
      <DivMid>
        <PComment>누구에게 편지할 건가요?</PComment>
        <DivButtons>
          <button type="button" id="tome" onClick={Who}>
            나에게
          </button>
          <button type="button" id="toyou" onClick={Who}>
            너에게
          </button>
        </DivButtons>
      </DivMid>
    </MainWrapper>
    </CenterWrapper>
  );
}

export default Write1;

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
`;

const PComment = styled.p`
`;

const DivButtons = styled.div`
  display: flex;
  flex-direction: column;
`;