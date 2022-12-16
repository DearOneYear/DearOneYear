import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Write3() {
  const location = useLocation();
  let toname = location.state.toname;
  let toyou = location.state.toyou;

  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let who = urlArr[urlArr.length - 1];
  const ToWrite4 = useNavigate();
  function Navigate() {
    if (who === "tome") {
      ToWrite4(`/write/write4/tome`, {
        state: { selectedDate: selectedDate, toname: toname, toyou: toyou },
      });
    } else if (who === "toyou") {
      ToWrite4(`/write/write4/toyou`, {
        state: { selectedDate: selectedDate, toname: toname, toyou: toyou },
      });
    }
  }

  // 1년 후 눌렀을 때 날짜 표시
  const [selectedDate, setChangeText] = useState("");

  function Oneyearlater() {
    let now = new Date();
    console.log(now);

    let nextYear = now.getFullYear() + 1;
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();
    let day1 = nextYear + "-" + todayMonth + "-" + todayDate;

    console.log(day1);
    setChangeText(day1);

    console.log("1년 후 눌렀을 때 날짜 표시 완료");
  }
  function input() {
    const calendarDays = document.querySelector("#input_date").value;
    console.log(calendarDays);
    setChangeText(calendarDays);
  }
  // function MyNextBirthday() {
  // 생일을 가지고 오고, 년도를 올해로 바꾼다.
  // 올해 날짜와 비교해서, 그 날짜가 지났으면 년도에 1을 더해서 날짜를 보여준다.
  // 올해 날짜와 비교해서, 그 날짜가 지나지 않았으면 그대로 날짜를 보여준다.

  // }

  // 다른 날짜 선택 시, 내일부터 선택가능하게 하기
  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 1));
  let year = tomorrow.getFullYear();
  let month = tomorrow.getMonth() + 1;
  let day = tomorrow.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  let availableDay = `${year}-${month}-${day}`;

  return (
    <CenterWrapper>
    <MainWrapper>
      <DivTop>
        {who === "tome" ? (
          <PTitle>나에게 편지 쓰는 중...(1/4)</PTitle>
        ) : (
          <PTitle>너에게 편지쓰는 중...(2/5)</PTitle>
        )}
      </DivTop>
      <DivMid>
        {who === "tome" ? (
          <PComment>언제의 나에게 보낼 건가요?</PComment>
        ) : (
          <PComment>언제의 너에게 보낼 건가요?</PComment>
        )}
        {/* 버튼 누르면 해당 날짜 보여주고, 값을 전달해줘야해. */}
        <DivButtons>
          <button onClick={Oneyearlater}>1년 후</button> <br></br>
          {toname === toyou ? <button>다음 내 생일</button> : <></>}
          <br></br>
          <span> 다른 날짜 선택하기 :</span>
          <input
            type="date"
            min={availableDay}
            id="input_date"
            onChange={input}
          ></input>
          <br></br>
          <p>{selectedDate}</p>
        </DivButtons>
        <ButtonNext onClick={Navigate}>다음으로</ButtonNext>
      </DivMid>
    </MainWrapper>
    </CenterWrapper>
  );
}

export default Write3;

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

const DivButtons = styled.div`
  display: flex;
  flex-direction: column;
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