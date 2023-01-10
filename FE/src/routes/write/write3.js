import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function Write3() {
  // 다음 버튼
  const [nextBtn, setNextBtn] = useState("disabled");
  const navigate = useNavigate();

  // 1년 후
  const [selectedDate, setChangeText] = useState("");

  const oneYearLater = () => {
    let now = new Date();
    let nextYear = now.getFullYear() + 1;
    let todayMonth = now.getMonth() + 1;
    if (todayMonth < 10) {
      todayMonth = "0" + todayMonth;
    }
    let todayDate = now.getDate();
    let day1 = nextYear + "-" + todayMonth + "-" + todayDate;

    setChangeText(day1);
    setNextBtn("");
  };

  // 다음 내 생일
  const [dbUserInfo, setDbUserInfo] = useState([]);
  const [birthMonth, setMonth] = useState(0);
  const [birthDay, setDay] = useState(0);
  const location = useLocation();
  const email = location.state.email;

  const getUserInfo = async () => {
    await axios
      .get("http://localhost:8000/accounts/mypage/", {
        headers: { Email: `Bearer ${email}` },
      })
      .then((res) => {
        setDbUserInfo(res.data);
        birthbirth(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const birthbirth = (dbUserInfo) => {
    let birthday = dbUserInfo.birthday.split("T")[0].split("-");
    setMonth(birthday[1]);
    setDay(birthday[2]);
  };

  const nextBirthday = () => {
    let now = new Date();
    let nextYear = now.getFullYear() + 1;
    let todayYear = now.getFullYear();
    let todayMonth = now.getMonth() + 1;
    let todayDate = now.getDate();

    let nextbirthday = "";
    if (todayMonth > birthMonth) {
      nextbirthday = `${nextYear}-${birthMonth}-${birthDay}`;
    } else if (todayMonth === birthMonth && todayDate >= birthDay) {
      nextbirthday = `${nextYear}-${birthMonth}-${birthDay}`;
    } else {
      nextbirthday = `${todayYear}-${birthMonth}-${birthDay}`;
    }

    setChangeText(nextbirthday);
    setNextBtn("");
  };

  // 다른 날짜 선택하기
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

  // 기간 안내 문구
  function input() {
    const calendarDays = document.querySelector("#input_date").value;
    setChangeText(calendarDays);
    setNextBtn("");
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <CenterWrapper>
      <MainWrapper>
        <DivTop>
          <PTitle>나에게 편지 쓰는 중...(1/4)</PTitle>
        </DivTop>
        <DivMid>
          <PComment>언제의 나에게 보낼 건가요?</PComment>
          <DivButtons>
            <button onClick={oneYearLater}>1년 후</button> <br></br>
            <button onClick={nextBirthday}>다음 내 생일</button>
            <br></br>
            <span>다른 날짜 선택하기</span>
            <input
              type="date"
              min={availableDay}
              id="input_date"
              onChange={input}
            ></input>
            <br></br>
            <p>{selectedDate}</p>
          </DivButtons>
          <ButtonNext
            disabled={nextBtn}
            onClick={() =>
              navigate("/write/2", { state: { selectedDate: selectedDate } })
            }
          >
            다음으로
          </ButtonNext>
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

const PComment = styled.p``;

const DivButtons = styled.div`
  display: flex;
  flex-direction: column;
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
