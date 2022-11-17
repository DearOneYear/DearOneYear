import { useState } from "react";
import { Link } from "react-router-dom";

const MyPageEdit = () => {
  const currEmail = "inner0509@gmail.com";
  const currBirthMonth = 5;
  const currBirthDate = 9;

  const [email, setEmail] = useState(currEmail);
  const [birthMonth, setBirthMonth] = useState(currBirthMonth);
  const [birthDate, setBirthDate] = useState(currBirthDate);
  const [maxDate, setMaxDate] = useState(31);

  const thirtyOne = ["1", "3", "5", "7", "8", "10", "12"];
  const thirty = ["4", "6", "9", "11"];

  const onChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "birth_month") {
      setBirthMonth(e.target.value);
      console.log(typeof e.target.value);
      if (thirtyOne.includes(e.target.value)) {
        setMaxDate(31);
      } else if (thirty.includes(e.target.value)) {
        setMaxDate(30);
      } else {
        setMaxDate(29);
      }
    }
    if (e.target.id === "birth_date") {
      setBirthDate(e.target.value);
    }
  };
  return (
    <>
      <h1>마이 페이지</h1>
      <label htmlFor="email">이메일</label>
      <input id="email" onChange={onChange} type="text" value={email} />
      <p>생일</p>
      <input
        id="birth_month"
        type="number"
        min="1"
        max="12"
        value={birthMonth}
        onChange={onChange}
      />
      <label htmlFor="birth_month">월</label>
      <input
        id="birth_date"
        type="number"
        min="1"
        max={maxDate}
        value={birthDate}
        onChange={onChange}
      />
      <label htmlFor="birth_date">일</label>

      <br />
      <br />
      <Link to="/mypage">
        <button>저장하기</button>
      </Link>
    </>
  );
};

export default MyPageEdit;
